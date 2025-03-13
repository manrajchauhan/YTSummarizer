import React from 'react'

export default function HEROWEB() {
  return (
    <div>
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


    </div>
  )
}
