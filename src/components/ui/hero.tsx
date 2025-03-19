export default function Hero() {
    return (
      <div
        className="px-4 md:px-14 pb-16 bg-center bg-no-repeat bg-cover relative z-[-1]"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/hero.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="pt-[200px] pb-10 items-center text-center">
          <h1 className="tracking-tighter text-4xl md:text-8xl bg-gradient-to-r from-red-800 to-zinc-100 font-bold mb-6 uppercase text-transparent bg-clip-text">
          Tube Abstract
          </h1>
          <p className="tracking-tight text-white text-xl mb-8">
            Instantly generate concise summaries from web articles and YouTube videos.
            Save time and absorb key insights effortlessly.
          </p>

          {/* <Link href="/summarize">
            <div className="rounded-full border border-gray-200 bg-white px-6 py-4 h-16 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 inline-flex items-center justify-center gap-2 transition duration-200 cursor-pointer">
              <span className="font-bold tracking-tight">Start Summarizing</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 6.66666H7.33333C4.38781 6.66666 2 9.05447 2 12V13.3333M14 6.66666L10 10.6667M14 6.66666L10 2.66666" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </Link> */}
        </div>
      </div>
    );
  }
