'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from "next/navigation";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
    setLoading(false);
  }, []);

      const toggleSettingsModal = () => {
        setSettingsModalOpen(!isSettingsModalOpen);
      };

    const userIcon = {
      href: "#",
      imgSrc: "/icon/user-demo.svg",
      alt: "User",
    };


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

  const logoSrc =
    isHomePage || isAboutPage
      ? isSticky
        ? "/logo.svg"
        : "/logo-white.svg"
      : "/logo.svg";


  const registerButtonClasses = `hidden lg:block py-2 px-6 rounded-lg text-[16px] transition duration-200 ${
    isHomePage || isAboutPage
      ? isSticky
        ? 'text-white bg-black'
        : 'text-black bg-white'
      : 'text-white bg-black'
  }`;

  const mobileButtonClasses = `block text-center py-3 px-5 rounded-full border border-gray-300 shadow text-sm font-semibold text-neutral-800 transition duration-200`;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isSticky ? 'bg-white  py-3' : 'py-4'} ${isSearchPage && 'bg-white'} `}>
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
        {!loading &&!authToken && (
          <>
          <a
            href="/summarize"
            className={registerButtonClasses}
          >
            Summarize
          </a>
</>
        )}
 {!loading && authToken && (
          <>
            <ul className="ml-auto flex items-center gap-4 align-middle">
                    <li className="mt-2 cursor-pointer flex items-center gap-2" id="userIcon"onClick={toggleSettingsModal}>
                        <Image
                        width={40}
                        height={40}
                          src={userIcon.imgSrc}
                          alt={userIcon.alt}
                          className="bg-neutral-200 lg:inline-flex leading-none hover:text-black rounded-full hover:bg-neutral-100 transition duration-200 font-semibold ml-4"
                        />
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" aria-hidden="true" className="w-[1em] h-[1em] fill-[#e5e7eb] text-lg transition-all "><path d="m256 275.6-92.3-92.3c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l110 110c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l110-110c9.8-9.8 9.8-25.6 0-35.4s-25.6-9.8-35.4 0z"></path></svg>
                    </li>
                  </ul>
                  </>
        )}
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
          <div className="fixed inset-0 bg-gray-800 opacity-80" onClick={toggleMenu}></div>
          <nav className="relative z-10 px-9 py-8 h-full bg-white flex flex-col gap-12">
            <div className="flex items-center justify-between">
              <Image
                src={logoSrc}
                alt="Brand Logo"
                width={150}
                height={100}
                priority
                className={`${isSticky ? 'invert' : ''}`}
              />
              <button onClick={toggleMenu} className="bg-gray-200 p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke={isSticky ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
            <Link
              href="/summarize"
              className={mobileButtonClasses}
            >
              Summarize
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
