"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { useChat } from "ai/react";
import {
  ArrowRight,
  ArrowUpRight,
  Loader2,
  Youtube,
  Languages,
} from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GetVideoDataResponse } from "@/types";
import { isValidYouTubeUrl } from "@/utils/youtube";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import HEROYT from "@/components/ui/hero1";
import LOWERYT from "@/components/ui/lower1";

export default function Home() {
  const {
    messages,
    input,
    handleSubmit: handleChatSubmit,
    setMessages,
    setInput,
    append,
    isLoading,
  } = useChat({api: "/api/chat"});
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [videoData, setVideoData] = React.useState<GetVideoDataResponse | null>(
    null,
  );

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const chatContainer = messagesEndRef.current?.parentElement;
    if (!chatContainer) return;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  async function handleVideoSubmit(formData: FormData) {
    try {
      setIsPending(true);
      setError(null);
      setMessages([]);

      const url = formData.get("url") as string;

      if (!isValidYouTubeUrl(url))
        throw new Error("Please enter a valid YouTube URL");

      const fetchResult = await fetch(`/api/video?url=${url}`);

      if (!fetchResult.ok) {
        const body = await fetchResult.json();
        const errorMessage =
          "error" in body
            ? body.error
            : "Failed to process video. Please try another.";

        throw new Error(errorMessage);
      }

      const result = (await fetchResult.json()) as GetVideoDataResponse;
      setVideoData(result);

      const message = {
        ...result.summaryUserMessage,
        id: crypto.randomUUID(),
      };

      // Trigger the summary generation
      append(message);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsPending(false);
    }
  }
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInput(e.target.value);
  };
  return (
    <>
    <Header/>
    <HEROYT/>
    <div className="bg-gradient-to-b from-background to-muted ">
      <main className="container mx-auto px-4 py-4 md:py-8 mt-[-200px]">
        <div className="flex flex-col gap-4 md:gap-4 max-w-7xl mx-auto">
          {!videoData ? (
            <div className="flex flex-col items-center justify-center ">
              <div
                className="flex items-center justify-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  setMessages([]);
                  setError(null);
                  setVideoData(null);
                }}
              >
              </div>
              <div className="w-full max-w-2xl mx-4">
                <CardContent className="pt-6">
                  <form action={handleVideoSubmit}>
                    <div className="relative flex justify-center gap-4">
                      <Input
                        type="url"
                        name="url"
                        id="youtube-url"
                        placeholder="https://youtube.com/watch?v=..."
                        required
                        aria-label="YouTube video URL"
                        autoComplete="off"
                        spellCheck="false"
                        className="flex flex-col px-7 py-8 w-full bg-white rounded-[14px] overflow-visible max-md:p-5 max-sm:p-4 md:max-w-[600px]"
                        disabled={isPending}
                      />
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="h-10 px-7 py-8 rounded-[14px] bg-primary hover:bg-primary/90"
                      >
                        {isPending ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-1 sm:mr-2 h-4 w-4 animate-spin" />
                            <span className="hidden sm:inline">Loading</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="hidden sm:inline">Summarize</span>
                            <ArrowRight className="h-4 w-4 sm:ml-2" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full mt-10">
                <div className="container mx-auto px-4 py-2 sm:py-4">
                  <div className="flex flex-row sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                    <div
                      className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        setMessages([]);
                        setError(null);
                        setVideoData(null);
                      }}
                    >
                    </div>

                    <form
                      action={handleVideoSubmit}
                      className="flex-1 w-full"
                    >
                      <div className="relative flex justify-center gap-4">
                        <Input
                          type="url"
                          name="url"
                          placeholder="Enter new YouTube URL..."
                          required
                          className="flex flex-col px-7 py-8 w-full bg-white rounded-[14px] overflow-visible max-md:p-5 max-sm:p-4 md:max-w-[600px] "
                          disabled={isPending}
                        />
                        <Button
                          type="submit"
                          disabled={isPending}
                          className=" h-10 px-7 py-8 rounded-[14px] bg-primary hover:bg-primary/90"
                        >
                          {isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <ArrowRight className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
          )}

          {error && (
            <Alert
              variant="destructive"
              className="animate-in fade-in-0 duration-300 max-w-2xl mx-auto w-full"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {videoData && (
            <div className="mt-10">
     <div className="px-4 py-2 sm:px-6 sm:py-4 flex flex-col justify-center h-full sm:h-auto">
     <span className="flex items-center gap-1 sm:gap-2">
       <Youtube className="h-4 w-4 sm:h-8 sm:w-8 text-primary" />{" "}
       <Link
         href={`https://www.youtube.com/watch?v=${videoData.videoId}`}
         target="_blank"
         rel="noreferrer"
         className="font-semibold text-md line-clamp-2  sm:text-lg overflow-hidden text-ellipsis w-[calc(100vw-6rem)] whitespace-nowrap bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
       >
         {videoData.title}
       </Link>
     </span>
     <a
       href={videoData.authorUrl}
       rel="noreferrer"
       target="_blank"
       className="text-xs sm:text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 mt-2 group"
     >
       {videoData.authorName}
       <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
     </a>
   </div>
   <div className="grid lg:grid-cols-2 gap-2 sm:gap-4 md:gap-6 w-full h-[calc(100vh-7rem)] sm:h-[calc(100vh-14rem)] mt-[2rem] sm:mt-0">
              <div className="animate-in fade-in-0 duration-300">
                <CardContent className="p-0 hidden sm:block">
                  <div className="aspect-video bg-black ">
                    <iframe
                      title="YouTube video player"
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoData.videoId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </CardContent>
                <div className="mt-10">
                 <h1>Rel</h1>
                    </div>
              </div>

              <Card className="animate-in fade-in-0 duration-300 h-[calc(100vh-14rem)]">
                <CardHeader className="px-4 py-2 pt-4 sm:px-6 sm:py-4">
                  <CardTitle className="text-base sm:text-lg">
                    Summary
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Ask follow-up questions to learn more.
                  </p>
                </CardHeader>
                <CardContent className="relative h-[calc(100%-5rem)] px-4 py-2 sm:px-6 sm:py-4">
                  <div
                    className={`flex flex-col space-y-4 h-[calc(100%-4rem)] ${
                      !isLoading ? "overflow-y-auto" : "overflow-hidden"
                    } px-1`}
                  >
                    {messages.slice(1).map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${
                          m.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[90%] sm:max-w-[85%] rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-sm whitespace-pre-wrap ${
                            m.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <form
                    onSubmit={handleChatSubmit}
                    className="absolute bottom-2 sm:bottom-8 left-4 right-4"
                  >
                 <div className="relative">
                 <Languages className="h-6 w-6 sm:ml-2 absolute left-0 top-3" />
                <select
                    value={input}
                    onChange={handleSelectChange}
                    className="w-[430px] pr-20 sm:pr-24 h-10 sm:h-12 text-sm border rounded-md px-3 bg-white cursor-pointer ml-10"
                    disabled={isLoading}
                >
                    <option value="">Translate</option>
                    <option value="Translate into English">Translate into English</option>
                    <option value="Translate into Hindi">Translate into Hindi</option>
                    <option value="Translate into Marathi">Translate into Marathi</option>
                    <option value="Translate into Tamil">Translate into Tamil</option>
                </select>
                      <Button
                        type="submit"
                        className="absolute right-0 top-0 h-10 sm:h-12 px-4 sm:px-6 rounded-l-none bg-primary hover:bg-primary/90"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <div className="flex items-center">
                            <span className="hidden sm:inline">Send</span>
                            <ArrowRight className="h-4 w-4 sm:ml-2" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
</div>
            </div>
          )}
        </div>
      </main>
    </div>
    <LOWERYT/>
    <Footer/>
    </>
  );
}
