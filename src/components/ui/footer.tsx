import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Footer = () => {
  return (
    <>

      <footer className='py-12 border-t'>
        <div className='px-14 mx-auto flex flex-col md:flex-row justify-start gap-20 items-center'>
          <section className='text-center md:text-left mb-6 md:mb-0 leading-[50px]'>
          <Link href="/">
        <Image src="/logo.svg" alt="Brand Logo" width={150} height={100} priority className='ml-2' />
      </Link>
            <h1 className='text-[60px] font-extrabold text-black tracking-tighter ml-2 mt-4'>
              URL, SUMMARIZE
            </h1>
            <h1 className='text-neutral-300 text-[60px] font-extrabold tracking-tighter ml-2'>
                & ENJOY
            </h1>
          </section>
          <ul className='flex gap-4 md:gap-8 text-sm text-neutral-700 font-medium'>
          <li><Link className=' duration-300  p-2 rounded-[18px]' href={'/about'}>About Us</Link></li>
          </ul>
        </div>
        <div className='px-16 text-gray-400 mt-8'>
          <p>&copy; {new Date().getFullYear()} Tube Abstract. All rights reserved.</p>
        </div>
      </footer>


    </>
  )
}

export default Footer
