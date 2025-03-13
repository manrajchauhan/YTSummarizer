"use client";
import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
import { Download , Volume2} from "lucide-react";
import { useChat } from "ai/react";
import {
  ArrowRight,
  Loader2,
  Languages,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GetVideoDataResponse } from "@/types";
import LOWERWEB from '@/components/ui/lower2';
import HEROWEB from '@/components/ui/hero2';

export default function SummarizerAPP() {

    const [isSpeaking, setIsSpeaking] = React.useState(false);
    const speechInstance = useRef<SpeechSynthesisUtterance | null>(null);
  const {
    messages,
    input,
    handleSubmit: handleChatSubmit,
    setMessages,
    setInput,
    append,
    isLoading,
  } = useChat({api: "/api/web-chat"});
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [videoData, setVideoData] = React.useState<GetVideoDataResponse | null>(
    null,
  );

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const chatContainer = messagesEndRef.current?.parentElement;
    if (!chatContainer) return;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  React.useEffect(() => {
    setVideoData(null);
    setError(null);
    window.speechSynthesis.cancel();
  }, []);


  async function handleVideoSubmit(formData: FormData) {
    try {
      setIsPending(true);
      setError(null);
      setMessages([]);

      const url = formData.get("url") as string;

      const fetchResult = await fetch(`/api/website?url=${url}`);
      console.log(fetchResult);

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

  const exportToPDF = async () => {
    if (!pdfRef.current) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const marginLeft = 15;
    const marginTop = 15;
    const maxWidth = 180;
    let yPosition = marginTop;

    try {

    const fontUrl = "/fonts/NotoSansDevanagari-Regular.ttf";
      const response = await fetch(fontUrl);
      const fontBuffer = await response.arrayBuffer();

      const fontBase64 = btoa(
        new Uint8Array(fontBuffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );

      pdf.addFileToVFS("NotoSansDevanagari-Regular.ttf", fontBase64);
      pdf.addFont("NotoSansDevanagari-Regular.ttf", "NotoSans", "normal");

      const isHindi = messages.some((m) => /[\u0900-\u097F]/.test(m.content));
      pdf.setFont(isHindi ? "NotoSans" : "helvetica", "normal");

      const title = isHindi ? "वेबसाइट सारांश" : "Website Summary";
      pdf.setFontSize(16);
      pdf.text(title, marginLeft, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);

      messages
        .slice(1)
        .filter((m) => m.role !== "user")
        .forEach((m, index) => {
          const text = isHindi ? `उत्तर ${index + 1}:\n${m.content}` : `Response ${index + 1}:\n${m.content}`;
          const splitText = pdf.splitTextToSize(text, maxWidth);
          pdf.text(splitText, marginLeft, yPosition, { maxWidth });
          yPosition += splitText.length * 6 + 4;
        });

      pdf.save("web-summary.pdf");
    } catch (error) {
      console.error("Error loading font:", error);
    }
  };




  const speakText = () => {
    const summaryText = messages.slice(1).map((m) => m.content).join(". ");
    if (!summaryText) return;

    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    } else {
      if (!speechInstance.current) {
        const speech = new SpeechSynthesisUtterance(summaryText);
        speech.onend = () => setIsSpeaking(false);
        speechInstance.current = speech;
      }

      window.speechSynthesis.speak(speechInstance.current);
      setIsSpeaking(true);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    speechInstance.current = null;
  };

  return (
    <>
      <div>
        <Header />
        <HEROWEB/>
        <div className="bg-gradient-to-b from-background to-muted ">
      <main className="container mx-auto px-4 py-4 md:py-8 mt-[-250px]">
        <div className="flex flex-col gap-4 md:gap-4 max-w-7xl mx-auto">
          {!videoData ? (
            <div className="flex flex-col items-center justify-center mt-10">
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
                        placeholder="Enter Website URL..."
                        required
                        autoComplete="off"
                        spellCheck="false"
                        className="flex flex-col px-7 py-8 w-full bg-white rounded-[14px] overflow-visible max-md:p-5 max-sm:p-4 md:max-w-[600px]"
                        disabled={isPending}
                      />
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="h-10 px-7 py-8 rounded-[14px] bg-neutral-50 hover:bg-neutral-400 text-black"
                      >
                        {isPending ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-1 sm:mr-2 h-4 w-4 animate-spin" />
                            <span className="hidden sm:inline">Loading</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="hidden sm:inline text-lg">Summarize</span>
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
                          placeholder="Enter Website URL..."
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
            <div className="mt-20">
   <div className="grid gap-2 sm:gap-4 md:gap-6 w-full h-[calc(100vh-7rem)] sm:h-[calc(100vh-14rem)] mt-[2rem] sm:mt-0">
              <Card className="animate-in fade-in-0 duration-300 h-[calc(100vh-14rem)] rounded-xl">
                <CardHeader className="px-4 py-2 pt-4 sm:px-6 sm:py-4">
                  <CardTitle className="text-base sm:text-lg">
                    Website Summary
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Ask follow-up questions to learn more.
                  </p>
                </CardHeader>
                <CardContent className="relative h-[calc(100%-5rem)] px-4 py-2 sm:px-6 sm:py-4">
                  <div
                   ref={pdfRef}
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
                <div className="flex justify-between p-4">
                    <Button onClick={exportToPDF} className="bg-neutral-950 hover:bg-neutral-800 text-white flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Export as PDF
                    </Button>
                    <div className="flex gap-4">

                    <Button onClick={speakText} className="bg-green-600 hover:bg-green-500 text-white flex items-center">
                        <Volume2 className="h-4 w-4 mr-2" />
                        {isSpeaking ? "Pause" : "Read Aloud"}
                    </Button>


                    <Button onClick={stopSpeech} className="bg-red-600 hover:bg-red-500 text-white flex items-center">
                        Stop
                    </Button>
                    </div>

                    </div>


              </Card>
</div>
            </div>
          )}
        </div>
      </main>
    </div>

<LOWERWEB/>
        <Footer />
      </div>
    </>
  );
}
