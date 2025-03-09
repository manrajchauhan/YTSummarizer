import { langfuseClient } from "@/observability/langfuse";
import { ChatMessage, GetVideoDataResponse } from "@/types";
import {
  extractVideoId,
  getTranscript,
  getVideoMetadata,
} from "@/utils/youtube";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) throw new Error("Missing YouTube URL");

    // Extract video ID
    const videoId = extractVideoId(url);
    if (!videoId) throw new Error("Invalid YouTube URL");

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Fetch video metadata
    const { title, author_name: authorName, author_url: authorUrl } =
      await getVideoMetadata(videoUrl);

    // Fetch transcript
    const transcript = await getTranscript(videoId);
    if (!transcript) throw new Error("Could not retrieve transcript");

    // Fetch Langfuse summarization prompt
    let initialMessages: ChatMessage[] = [];
    try {
      const prompt = await langfuseClient.getPrompt("summarizer", undefined, {
        type: "chat",
      });

      if (!prompt || !prompt.compile) {
        throw new Error("Langfuse prompt is missing or invalid");
      }


      initialMessages = prompt.compile({ title, author: authorName, transcript }) as ChatMessage[];
      console.log("Compiled Langfuse Prompt:", initialMessages);
    } catch (promptError) {
      console.warn("Langfuse prompt retrieval failed:", promptError);
      initialMessages = [
        { role: "assistant", content: "I'm unable to generate a summary right now." },
      ];
    }

    const response: GetVideoDataResponse = {
      title,
      authorName,
      authorUrl,
      videoId,
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
