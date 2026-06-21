'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Rounded Glass Container for Header Content */}
        <div className="glass-panel px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl md:text-2xl font-medium tracking-[0.03em] text-[#f5f3ee] relative pb-1">
            WinWow
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-3">
            {['Home', 'Products'].map((item) => (
              <Link 
                key={item} 
                href={item === 'Home' ? '/' : '/products'}
                className="relative group px-4 py-2 rounded-xl text-sm uppercase tracking-[0.12em] text-[#9a958c] hover:text-[#f5f3ee] transition-all hover:bg-white/10"
              >
                {item}
                <span className="absolute bottom-1 left-1/2 w-0 h-[1.5px] bg-[#c9a24b] transition-all duration-300 ease-out -translate-x-1/2 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-2">
            <button className="p-2.5 rounded-xl text-[#f5f3ee] hover:text-[#c9a24b] transition-all hover:bg-white/10">
              <Heart size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden glass-panel p-2 text-[#f5f3ee]"
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
          </div>
        </motion.div>
      )}
    </header>
  );
}
