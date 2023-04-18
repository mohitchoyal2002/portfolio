import React, { useState } from 'react'
import { GrStackOverflow } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'

const Header = () => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='fixed w-full'>
        <div className='w-full py-4 flex items-center justify-between px-5 lg:justify-around md:justify-around font-nunito bg-white  bg-opacity-50 sticky border-b' style={{backdropFilter: "blur(20px)"}} >
        <a href="#home">
          <div className='rounded-full py-2 px-4 flex items-center gap-2 bg-white'>
            <GrStackOverflow className='text-sky-500 text-base lg:text-xl md:text-xl' />
            <h1 className='text-sm font-bold text-blue-950  lg:text-xl md:text-xl'>MohitWebDev</h1>
          </div>
          </a>
          <div className='hidden items-center gap-8 lg:flex md:flex'>
            <a href='#about' className='font-semibold text-gray-600'>About Me</a>
            <a href='#skills' className='font-semibold text-gray-600'>Skills</a>
            <a href='#projects' className='font-semibold text-gray-600'>Projects</a>
            <a href='#experience' className='font-semibold text-gray-600'>Experience</a>
            <a href='#contact-me' className='font-semibold text-gray-600'>Contact Me</a>

          </div>
          <div className='block md:hidden lg:hidden cursor-pointer' onClick={() => setOpen(!open)}>
            <RxHamburgerMenu />
          </div>
        </div>
      </div>
      { open?
        <div style={{backdropFilter: "blur(20px)"}} className='py-4 px-10 bg-sky-200 bg-opacity-20 flex flex-col gap-5 fixed top-20 right-5 rounded-xl shadow-custom' onClick={()=>setOpen(false)}>
          <a href='#about' className='font-semibold text-gray-600'>About Me</a>
          <a href='#skills' className='font-semibold text-gray-600'>Skills</a>
          <a href='#projects' className='font-semibold text-gray-600'>Projects</a>
          <a href='#experience' className='font-semibold text-gray-600'>Experience</a>
          <a href='#contact-me' className='font-semibold text-gray-600'>Contact Me</a>
        </div>:
        <div className='w-0 h-0'></div>
      }
    </>
  )
}

export default Header