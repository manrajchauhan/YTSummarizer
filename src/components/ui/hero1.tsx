 import React from 'react'

 export default function HEROYT() {
   return (
<div
          className="relative bg-cover bg-center bg-no-repeat px-4 md:px-14 pb-16"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/hero1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center text-center pt-40 pb-40">
            <h1 className="text-white text-4xl md:text-8xl font-semibold tracking-tighter drop-shadow-lg">
            <span className='text-red-600'>YouTube</span> Video Summarizer
            </h1>
            <p className="text-white text-lg md:text-xl mt-4 max-w-2xl drop-shadow-md">
              Use our AI-powered tool to extract key points and summaries from YouTube videos, helping you save time and absorb information efficiently.
            </p>
          </div>
        </div>
   )
 }
