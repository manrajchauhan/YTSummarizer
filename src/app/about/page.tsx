"use client";

import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
        <div className="container mx-auto max-w-5xl">

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
            Discover <span className="text-gray-400">Tube Abstract</span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-3xl">
            Welcome to <span className="text-white font-bold">Tube Abstract</span> {`— your AI-powered assistant for summarizing digital content. Whether you're exploring web articles or YouTube videos, our intelligent platform extracts key insights, saving you time and effort.`}
          </p>

          {/* Core Features */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-700 pt-6">
            {[
              "AI-Driven Web Article Summaries",
              "Automated YouTube Video Transcription & Summarization",
              "Smart Note-Taking for Researchers & Students",
              "Time-Efficient Learning Insights",
              "Enhancing Productivity with AI-Powered Intelligence",
              "Seamless & Lightning-Fast User Experience",
            ].map((feature, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-700 py-3">
                <span className="text-gray-300 text-lg">
                  <span className="text-gray-500">{String(index + 1).padStart(2, "0")}</span> {feature}
                </span>
                <ArrowRight className="text-gray-500 h-5 w-5" />
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="mt-12 text-gray-400">
            <h2 className="text-3xl text-white font-bold">Our Mission</h2>
            <p className="mt-4">
              At <span className="text-white font-bold">Tube Abstract</span>, our mission is to combat information overload by delivering concise, AI-generated summaries. We empower individuals to learn faster, absorb knowledge effortlessly, and stay ahead in a world of endless content.
            </p>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}
