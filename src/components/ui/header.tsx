'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from "next/navigation";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  const isAboutPage = pathname === '/about';
  const isSearchPage = pathname === '/search';
  const isSummarizePage = pathname === '/summarize';
  const isWebSummarizePage = pathname === '/web';

  const logoSrc =
    isHomePage || isAboutPage || isSummarizePage || isWebSummarizePage
      ? isSticky
        ? "/logo.svg"
        : "/logo-white.svg"
      : "/logo.svg";


  const YoutubeSummarizer = `hidden lg:block py-2 px-6 rounded-xl text-[18px] transition duration-200 ${
    isHomePage || isAboutPage || isSummarizePage || isWebSummarizePage
      ? isSticky
        ? 'text-black border-r'
        : 'text-white hover:bg-neutral-800'
      : 'text-white bg-black'
  }`;

  const WebsiteSummarizer = `hidden lg:block py-2 px-6 rounded-xl text-[16px] transition duration-200 ${
    isHomePage || isAboutPage || isSummarizePage || isWebSummarizePage
      ? isSticky
        ? 'text-white bg-black'
        : 'text-black bg-white'
      : 'text-white bg-black'
  }`;

  const mobileButtonClasses = `block text-center py-3 px-5 rounded-full border border-gray-300 shadow text-sm font-semibold text-neutral-50 transition duration-200 bg-red-600 mt-10`;

  const mobileButtonClasses2 = `block text-center py-3 px-5 rounded-full border border-gray-300 shadow text-sm font-semibold text-neutral-50 transition duration-200 bg-black `;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isSticky ? ' bg-white py-3' : 'py-4'} ${isSearchPage && 'bg-white'} `}>
      <div className="px-10 mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src={logoSrc}
            alt="Brand Logo"
            width={120}
            height={50}
          />
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="/summarize"
            className={YoutubeSummarizer}
          >
            Youtube
          </a>

          <a
            href="/web"
            className={WebsiteSummarizer}
          >
            Web Summarizer
          </a>
        </div>

        <button onClick={toggleMenu} className="lg:hidden focus:outline-none bg-gray-200 p-2 rounded-full">
          <svg width="51" height="51" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="56" rx="28" fill="none"></rect>
            <path d="M37 32H19M37 24H19" stroke={isSticky ? 'white' : 'black'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50">
          <div className="fixed inset-0 bg-gray-800 opacity-80 " onClick={toggleMenu}></div>
          <nav className="relative z-10 px-9 py-8 h-full bg-white flex flex-col gap-6 ">
            <div className="flex items-center justify-between">
              <Image
                src={logoSrc}
                alt="Brand Logo"
                width={150}
                height={100}
                priority
                className={`${isSticky ? '' : ''}`}
              />
              <button onClick={toggleMenu} className="bg-gray-200 p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke={isSticky ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
            <a
              href="/summarize"
              className={mobileButtonClasses}
            >
              Youtube
            </a>

            <a
              href="/web"
              className={mobileButtonClasses2}
            >
              Web Summarizer
            </a>

          </nav>
        </div>
      )}
    </header>
  );
}
