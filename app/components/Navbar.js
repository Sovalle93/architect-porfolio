'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Inicio' },
     { href: '/projects', label: 'Proyectos' },
    { href: '/gallery', label: 'Objetos' },
    { href: '/contact', label: 'Contacto' },
    {},
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 bg-[#f6f6f2] shadow-sm font-hacen"
      style={{ 
        fontFamily: 'var(--font-hacen)',
        height: '6.8rem',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full items-center">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <img
              src="https://res.cloudinary.com/dmivjpb65/image/upload/v1754339907/Screenshot_2025-08-04_163815_tagjjo.png"
              alt="Studio Logo"
              className="h-[40px] w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-black transition-colors ${
                  pathname === link.href ? 'text-black font-bold' : 'text-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0 }}
                className="h-0.5 w-full bg-black"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-0.5 w-full bg-black"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0 }}
                className="h-0.5 w-full bg-black"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#f6f6f2] shadow-lg"
          >
            <div className="px-4 py-3 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors ${
                    pathname === link.href ? 'text-black font-bold' : 'text-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}