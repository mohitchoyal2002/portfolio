import React, { useState } from 'react'
import { GrStackOverflow } from 'react-icons/gr'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'

const Header = () => {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { label: 'About Me', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Meet', href: '#meeting' },
    { label: 'Contact Me', href: '#contact-me' },
  ]

  return (
    <>
      <div className='fixed w-full z-50 top-0 left-0 transition-all duration-300'>
        <div className='w-full py-4 flex items-center justify-between px-6 lg:justify-around font-nunito bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm'>
          <a href="#home" className='group'>
            <div className='rounded-full py-2 px-4 flex items-center gap-2 bg-gradient-to-r from-sky-50 to-white shadow-sm border border-sky-100 transition-all duration-300 group-hover:shadow-md group-hover:scale-105'>
              <GrStackOverflow className='text-sky-500 text-xl' />
              <h1 className='text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-sky-600 tracking-tight'>MohitWebDev</h1>
            </div>
          </a>

          <div className='hidden lg:flex items-center gap-6'>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className='font-bold text-gray-600 hover:text-sky-500 transition-colors duration-300 relative group'>
                {link.label}
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full'></span>
              </a>
            ))}
          </div>

          <button type='button' aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls='mobile-navigation' className='block lg:hidden cursor-pointer p-2 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors' onClick={() => setOpen(!open)}>
            {open ? <RxCross2 size={24} className='text-blue-950' /> : <RxHamburgerMenu size={24} className='text-blue-950' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id='mobile-navigation' hidden={!open} className={`fixed top-20 right-5 z-40 lg:hidden transition-all duration-300 ease-in-out transform origin-top-right ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <div className='py-6 px-10 bg-white/90 backdrop-blur-xl border border-white/40 flex flex-col gap-6 rounded-2xl shadow-2xl'>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)} className='font-bold text-lg text-gray-700 hover:text-sky-500 hover:translate-x-1 transition-all duration-300'>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default Header
