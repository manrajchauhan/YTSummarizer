"use client";
import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

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

export default function SummarizerAPP() {
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

    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight);
    pdf.save("summary.pdf");
  };

  return (
    <>
      <div>
        <Header />
        <div
          className="relative bg-cover bg-center bg-no-repeat px-4 md:px-14 pb-16"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/hero2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center text-center pt-40 pb-40">
            <h1 className="text-white text-4xl md:text-8xl font-semibold tracking-tighter drop-shadow-lg">
              Website Article Summarizer
            </h1>
            <p className="text-white text-2xl tracking-tighter md:text-xl mt-4 max-w-2xl drop-shadow-md">
              Instantly summarize articles, blogs, and web pages with our AI-powered tool, helping you extract key points efficiently.
            </p>
          </div>
        </div>

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
                <CardContent className="relative h-[calc(100%-5rem)] px-4 py-2 sm:px-6 sm:py-4" ref={pdfRef}>
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
                <div className="flex justify-between p-4">
  {/* Export to PDF Button */}
  <Button onClick={exportToPDF} className="bg-gray-600 text-white flex items-center">
    <Download className="h-4 w-4 mr-2" />
    Export as PDF
  </Button>
</div>

              </Card>
</div>
            </div>
          )}
        </div>
      </main>
    </div>

    <section className="px-6 md:px-20 py-16 bg-gray-100 text-center">
          <h2 className="text-3xl md:text-8xl font-bold tracking-tighter text-gray-800 mb-8">
            How to Summarize Websites & Articles?
          </h2>
          <p className="text-2xl tracking-tighter text-gray-600 mb-12 max-w-2xl mx-auto">
            {`Quickly extract key insights from web pages and articles in 3 simple steps using TubeAbstract's AI-powered summarizer.`}
          </p>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                step: "Step 1",
                title: "Enter Website URL",
                description: "Copy and paste the URL of the article or web page into TubeAbstract.",
                icon: "🌐",
              },
              {
                step: "Step 2",
                title: "Generate Summary",
                description:
                  `Click the "Generate Summary" button, and TubeAbstract will analyze and summarize the webpage content.`,
                icon: "⚡",
              },
              {
                step: "Step 3",
                title: "Read AI Summary",
                description: "Get a concise, AI-generated summary and save time reading lengthy articles.",
                icon: "📖",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                  {item.step}: {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="px-6 md:px-20 py-16 text-center">
          <h2 className="text-3xl md:text-8xl tracking-tighter font-bold text-gray-800 mb-8">
            Who Can Benefit from Website Summarization?
          </h2>
          <p className="text-2xl tracking-tighter text-gray-600 mb-12 max-w-2xl mx-auto">
            Ideal for students, professionals, researchers, and anyone looking to quickly understand lengthy web content.
          </p>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                title: "For Students",
                description:
                  "Summarize educational articles and research papers efficiently to boost your learning.",
                icon: "🎓",
              },
              {
                title: "For Professionals",
                description:
                  "Stay updated with industry news and reports without spending hours reading.",
                icon: "💼",
              },
              {
                title: "For Researchers",
                description:
                  "Quickly extract key findings from academic papers and articles for faster analysis.",
                icon: "🔬",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-md border transition duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
