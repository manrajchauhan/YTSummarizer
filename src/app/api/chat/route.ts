import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { waitUntil } from "@vercel/functions";
import { langfuseClient, langfuseExporter } from "@/observability/langfuse";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
      });
    }

    // Fetch the system prompt from Langfuse
    const prompt = await langfuseClient.getPrompt("summarizer", undefined, {
      type: "chat",
    });

    if (!prompt || !prompt.prompt || !prompt.prompt[0]) {
      console.error("Langfuse prompt is missing or invalid:", prompt);
      return new Response(
        JSON.stringify({ error: "Langfuse prompt is invalid" }),
        { status: 500 }
      );
    }

    console.log("Langfuse Prompt Content:", prompt.prompt[0].content);

    // Call Google Gemini API with structured input
    const result = streamText({
      model: google("gemini-1.5-pro-latest"), // ✅ Using Google Gemini
      system: prompt.prompt[0].content, // System instructions from Langfuse
      messages, // User messages
      experimental_telemetry: {
        isEnabled: true,
        functionId: "summarize-video",
        metadata: {
          langfusePrompt: JSON.stringify(prompt?.toJSON?.() || {}),
        },
      },
    });

    waitUntil(langfuseExporter.forceFlush());
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing chat:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500 }
    );
  }
}
