"use client";

import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <><Header/>
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
      <div className="container mx-auto max-w-5xl">

        <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
          Tube Abstract, <span className="text-gray-400">AI Summarizer</span> we simplify, optimize, and enhance
          your <span className="text-white font-bold">learning experience.</span>
        </h1>


        <p className="mt-6 text-gray-400 text-lg max-w-3xl">
          AI Summarizer is designed to help learners review, analyze, and summarize content efficiently.
          We use cutting-edge AI to generate high-quality insights, making note-taking and video analysis
          more accessible than ever.
        </p>

        {/* Service List */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-700 pt-6">
          {[
            "AI-Powered Summaries",
            "Smart Note-Taking",
            "Learning Insights",
            "Video Content Analysis",
            "Productivity Enhancement",
            "Seamless Experience",
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-700 py-3">
              <span className="text-gray-300 text-lg">
                <span className="text-gray-500">{String(index + 1).padStart(2, "0")}</span> {item}
              </span>
              <ArrowRight className="text-gray-500 h-5 w-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
