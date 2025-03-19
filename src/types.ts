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

  export interface GetWebsiteDataResponse {
    url: string;
    summaryUserMessage: ChatMessage;
  }


  export interface YouTubeSnippet {
    title: string;
    channelTitle: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
  }

  export interface YouTubeVideoItem {
    id: { videoId: string };
    snippet: YouTubeSnippet;
  }

  export interface YouTubeVideo {
    title: string;
    videoId: string;
    url: string;
    author: string;
    thumbnails: string;
  }
