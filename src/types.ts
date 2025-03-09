export type ChatMessage = {
    role: "system" | "user" | "assistant";
    content: string;
  };

  export interface GetVideoDataResponse {
    title: string;
    authorName: string;
    authorUrl: string;
    videoId: string;
    summaryUserMessage: ChatMessage;
  }
