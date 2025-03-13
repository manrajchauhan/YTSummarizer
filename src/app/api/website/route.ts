import { langfuseClient } from "@/observability/langfuse";
import { ChatMessage, GetWebsiteDataResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) throw new Error("Missing Website URL");


    let initialMessages: ChatMessage[] = [];
    try {
      const prompt = await langfuseClient.getPrompt("web-summarizer", undefined, {
        type: "chat",
      });

      if (!prompt || !prompt.compile) {
        throw new Error("Langfuse prompt is missing or invalid");
      }


      initialMessages = prompt.compile({ url }) as ChatMessage[];
      console.log("Compiled Langfuse Prompt:", initialMessages);
    } catch (promptError) {
      console.warn("Langfuse prompt retrieval failed:", promptError);
      initialMessages = [
        { role: "assistant", content: "I'm unable to generate a summary right now." },
      ];
    }

    const response: GetWebsiteDataResponse = {
      url,
      summaryUserMessage: initialMessages?.[1] ?? {
        role: "assistant",
        content: "No summary available.",
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing video:", error);

    return NextResponse.json(
      {
        error: `Failed to process video: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
