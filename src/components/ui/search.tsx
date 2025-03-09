"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AppDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsPending(true);
      // Assuming the input is a YouTube URL, we'll redirect to the summarize page
      router.push(`/summarize?url=${encodeURIComponent(searchTerm)}`);
      setIsPending(false);
    }
  };

  return (
    <div className="px-20 relative">
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col justify-center px-7 py-8 w-full bg-white rounded-[14px] overflow-visible max-md:p-5 max-sm:p-4 mt-[-48px] md:max-w-[1100px] md:mx-auto relative"
      >
        <div className="flex flex-wrap gap-2 max-sm:flex-col relative">
          {/* Input without suggestions */}
          <div className="relative flex flex-1 items-center">
            <label className="flex flex-1 items-center gap-2 px-4 py-3.5 border-b rounded-full cursor-pointer min-w-[296px] h-[54px] max-md:min-w-[unset] relative z-10">
              <i className="ti ti-map-pin text-lg text-stone-500" />
              <input
                type="url"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="https://youtube.com/watch?v=..."
                className="bg-transparent outline-none w-full text-black placeholder-black"
                required
              />
            </label>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-10 py-3.5 font-medium text-white bg-black rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-zinc-700 h-[54px] w-[236px] max-md:w-[calc(50%_-_6px)] max-sm:w-full"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Summarize"}
          </button>
        </div>
      </form>
    </div>
  );
}
