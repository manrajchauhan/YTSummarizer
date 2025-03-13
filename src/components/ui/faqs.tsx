"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a free version of our summarization tool for you to try. It allows you to generate AI-powered summaries for web content and YouTube videos effortlessly.",
  },
  {
    question: "What features are included in the free version?",
    answer:
      "The free version includes AI-generated summaries for YouTube videos, web articles, and basic transcription services with limited access to advanced features.",
  },
  {
    question: "Is there an affiliate program?",
    answer:
      "Yes! Join our affiliate program and earn rewards by sharing our AI summarizer with others.",
  },
  {
    question: "Do I need technical knowledge to use this tool?",
    answer:
      "Not at all! Our summarization tool is designed for everyone. Just enter a website URL or a YouTube video link, and our AI will generate a summary for you.",
  },
];

export default function Faqs() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Find answers to common questions about our AI-powered summarization tool. Still have
            questions?{" "}
            <a href="/about" className="text-black font-semibold underline">
              Learn more about us
            </a>
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4 border-neutral-700">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {openFaq === index ? (
                  <Minus className="w-5 h-5 text-gray-500" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openFaq === index && (
                <p className="text-gray-600 text-base mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
