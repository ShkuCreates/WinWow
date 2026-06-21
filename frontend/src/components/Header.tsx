'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Menu, X, User, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel px-6 py-3 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-semibold text-[#f5f3ee]">
            WinWow
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
            <Link href="/login" className="btn-gold text-sm">
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
        
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass-panel p-6 flex flex-col gap-4"
          >
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-[#f5f3ee] uppercase text-sm tracking-widest">Home</Link>
            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="text-[#f5f3ee] uppercase text-sm tracking-widest">Products</Link>
          </motion.div>
        )}
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="relative group text-sm uppercase tracking-[0.12em] text-[#9a958c] hover:text-[#f5f3ee] transition-colors"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#c9a24b] transition-all duration-300 ease-out" />
    </Link>
  );
}
