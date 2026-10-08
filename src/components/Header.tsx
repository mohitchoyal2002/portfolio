import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className='site-header'>
      <div className='shell header-inner'>
        <a href='#home' className='brand' aria-label='Mohit Choyal, home'>
          <span className='brand-mark' aria-hidden='true'>m<span>.</span></span>
          <span className='brand-name'>Mohit Choyal<span>Software Developer</span></span>
        </a>
        <nav className='desktop-nav' aria-label='Main navigation'>
          {navLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className='header-actions'>
          <a href='#meeting' className='button button-small button-lime'>Let’s talk <FiArrowUpRight aria-hidden='true' /></a>
          <button ref={toggle} type='button' className='menu-toggle' aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls='mobile-navigation' onClick={() => setOpen(value => !value)}>
            {open ? <FiX aria-hidden='true' /> : <FiMenu aria-hidden='true' />}
          </button>
        </div>
      </div>
      <nav id='mobile-navigation' className='mobile-nav shell' hidden={!open} aria-label='Mobile navigation'>
        {navLinks.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<FiArrowUpRight aria-hidden='true' /></a>)}
        <a href='#contact-me' onClick={() => setOpen(false)}>Contact<FiArrowUpRight aria-hidden='true' /></a>
      </nav>
    </header>
  );
};

export default Header;
