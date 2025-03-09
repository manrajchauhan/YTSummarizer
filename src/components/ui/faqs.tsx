"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we have a free version of AI Summarizer available for you to try out! It's a powerful tool that allows you to generate AI-based video summaries with ease.",
  },
  {
    question: "What does the free version include?",
    answer:
      "The free version includes AI-generated summaries for YouTube videos, basic transcription services, and limited access to premium features.",
  },
  {
    question: "Do you have an affiliate program?",
    answer:
      "Yes! You can join our affiliate program to earn rewards for sharing AI Summarizer with others.",
  },
  {
    question: "Do I need to know how to use AI to use AI Summarizer?",
    answer:
      "No, AI Summarizer is designed to be user-friendly and requires no technical expertise. Simply paste a video link, and our AI will generate a summary for you.",
  },
];

export default function Faqs() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            General FAQs
          </h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Everything you need to know about the product and how it works. Can’t find an answer?{" "}
            <a href="/about" className="text-black font-semibold underline">
             About Us
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
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
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
