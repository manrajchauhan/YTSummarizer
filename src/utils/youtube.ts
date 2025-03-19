import { z } from "zod";
import { Innertube} from "youtubei.js/web";
import {YouTubeVideo,YouTubeVideoItem} from "@/types"

export function extractVideoId(url: string) {
  const regExp =
    /^.*((youtu\.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*)|youtu\.be\/([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

export function isValidYouTubeUrl(url: string) {
  return Boolean(extractVideoId(url));
}

export async function getTranscript(videoId: string) {
  try {
    const youtube = await Innertube.create({
      lang: "en",
      location: "US",
      retrieve_player: false,
    });

    const info = await youtube.getInfo(videoId);
    const transcriptData = await info.getTranscript();
    const transcript =
      transcriptData?.transcript?.content?.body?.initial_segments
        .map((segment) => segment.snippet.text)
        .join(" ");

    return transcript;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error;
  }
}

export async function getVideoMetadata(
  youtubeUrl: string,
): Promise<YoutubeVideoMetadata> {
  const result = await fetch(
    `https://www.youtube.com/oembed?url=${youtubeUrl}`,
  );
  const data = await result.json();

  return YoutubeVideoMetadataSchema.parse(data);
}

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export async function getRelevantVideosFromVideo(url: string): Promise<YouTubeVideo[]> {
    try {
      const videoId = extractVideoId(url);
      if (!videoId) throw new Error("Invalid YouTube URL");

      if (!YOUTUBE_API_KEY) {
        throw new Error("YouTube API key is missing. Make sure it's set in .env.local");
      }

      const metadata = await getVideoMetadata(url);
      const searchQuery = encodeURIComponent(metadata.title);

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("YouTube API Error:", response.status, errorBody);
        throw new Error(`YouTube API Error: ${response.status} - ${errorBody}`);
      }

      const data = await response.json();

      return data.items.map((item: YouTubeVideoItem) => ({
        title: item.snippet.title,
        videoId: item.id.videoId,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        author: item.snippet.channelTitle,
        thumbnails: item.snippet.thumbnails?.medium?.url ||
                    item.snippet.thumbnails?.high?.url ||
                    item.snippet.thumbnails?.default?.url ||
                    "/hero.jpg",
      }));
    } catch (error) {
      console.error("Error fetching related videos:", error);
      return [];
    }
  }



export const YoutubeVideoMetadataSchema = z.object({
  title: z.string(),
  author_name: z.string(),
  author_url: z.string(),
  type: z.string(),
  height: z.number(),
  width: z.number(),
  version: z.string(),
  provider_name: z.string(),
  provider_url: z.string(),
  thumbnail_height: z.number(),
  thumbnail_width: z.number(),
  thumbnail_url: z.string(),
  html: z.string(),
});

export type YoutubeVideoMetadata = z.infer<typeof YoutubeVideoMetadataSchema>;
