'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''} px-6 py-4`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-medium tracking-[0.03em] text-[#f5f3ee] relative pb-1">
            WinWow
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#c9a24b] opacity-70"></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'Products'].map((item) => (
              <NavLink key={item} href={item === 'Home' ? '/' : '/products'}>
                {item}
              </NavLink>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="p-2 text-[#f5f3ee] hover:text-[#c9a24b] transition-colors">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <button className="p-2 text-[#f5f3ee] hover:text-[#c9a24b] transition-colors">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <Link href="/login" className="btn-gold text-sm px-6 py-3">
              Sign In
            </Link>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-[#f5f3ee]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mobile-menu md:hidden"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif text-[#f5f3ee] uppercase tracking-[0.2em]">Home</Link>
            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif text-[#f5f3ee] uppercase tracking-[0.2em]">Products</Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="btn-gold mt-8 text-lg">Sign In</Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="relative group text-sm uppercase tracking-[0.12em] text-[#9a958c] hover:text-[#f5f3ee] transition-colors py-2"
    >
      {children}
      <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#c9a24b] transition-all duration-300 ease-out -translate-x-1/2 group-hover:w-full"></span>
    </Link>
  );
}
