'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, TrendingUp, Heart, Shield, Truck, Award, CheckCircle } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { useEffect, useRef, useState } from 'react';

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'WinWow S8 Balzer Series - Male',
    brand: 'WinWow',
    price: 35,
    preBookDepositPercentage: 15,
    thumbnail: 'https://i.ibb.co/Rp2dTv4v/Chat-GPT-Image-Jun-22-2026-01-51-42-AM.png',
    images: [
      'https://i.ibb.co/Rp2dTv4v/Chat-GPT-Image-Jun-22-2026-01-51-42-AM.png',
      'https://i.ibb.co/RGtSPMsz/Chat-GPT-Image-Jun-22-2026-01-51-39-AM.png',
      'https://i.ibb.co/bjpqDgjH/Chat-GPT-Image-Jun-22-2026-01-51-37-AM.png',
      'https://i.ibb.co/67XfMrvX/Chat-GPT-Image-Jun-22-2026-01-51-34-AM.png',
    ],
    stock: 0, // Out of stock, pre-booking only
  },
  {
    id: '2',
    name: 'WinWow 114A Premium - Men',
    brand: 'WinWow',
    price: 59,
    preBookDepositPercentage: 24,
    thumbnail: 'https://i.ibb.co/tTSbZVR3/Chat-GPT-Image-Jun-22-2026-03-25-33-AM.png',
    images: [
      'https://i.ibb.co/tTSbZVR3/Chat-GPT-Image-Jun-22-2026-03-25-33-AM.png',
      'https://i.ibb.co/hx3GssYD/Chat-GPT-Image-Jun-22-2026-03-25-31-AM.png',
      'https://i.ibb.co/fzNKpCty/Chat-GPT-Image-Jun-22-2026-03-25-28-AM.png',
      'https://i.ibb.co/wZF0ZtGW/Chat-GPT-Image-Jun-22-2026-03-26-23-AM.png',
    ],
    stock: 0,
  },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const step = target / (duration / 16);

      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="inline-block">
      {count}{suffix || ''}
    </div>
  );
};

export default function Home() {
  return (
    <div className="noise-overlay min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center relative z-0">
        <div className="hero-scrim"></div>
        <div className="container mx-auto px-6 relative z-10 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-[#c9a24b] uppercase tracking-[0.2em] text-sm mb-4 font-medium">
              Swiss Horology Since 1985
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#f5f3ee] mb-6 leading-[1.05]">
              Timeless Elegance
            </h1>
            <p className="text-lg md:text-xl mb-10 text-[#9a958c]">
              Discover the world's finest luxury watches
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="glass-panel px-6 py-4 flex flex-col min-w-[150px]">
                <span className="text-4xl font-bold text-[#c9a24b]">
                  <AnimatedCounter target={3000} suffix="+" />
                </span>
                <span className="text-[#9a958c]">Units Sold</span>
              </div>
              <div className="glass-panel px-6 py-4 flex flex-col min-w-[150px]">
                <div className="flex items-center gap-1 text-4xl font-bold text-[#c9a24b]">
                  <AnimatedCounter target={4.9} />
                  <Star size={24} fill="currentColor" className="text-[#c9a24b] ml-1" />
                </div>
                <span className="text-[#9a958c]">Customer Rating</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="btn-gold flex items-center justify-center gap-2 w-full sm:w-auto">
                Browse Collection
                <ArrowRight size={20} />
              </Link>
              <button className="btn-ghost w-full sm:w-auto">
                Our Heritage
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="trust-strip py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="flex items-center gap-3 justify-center">
              <Shield size={24} className="text-[#c9a24b]" />
              <span className="text-[#f5f3ee] text-sm md:text-base">Authenticity Guaranteed</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Truck size={24} className="text-[#c9a24b]" />
              <span className="text-[#f5f3ee] text-sm md:text-base">Free Insured Shipping</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Award size={24} className="text-[#c9a24b]" />
              <span className="text-[#f5f3ee] text-sm md:text-base">2-Year Warranty</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <CheckCircle size={24} className="text-[#c9a24b]" />
              <span className="text-[#f5f3ee] text-sm md:text-base">Certified Pre-Owned</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="featured-section grain-overlay py-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#f5f3ee] mb-3">
              Featured Collection
            </h2>
            <p className="text-[#9a958c]">
              Handpicked timepieces for the discerning collector
            </p>
            <div className="section-header-rule" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 100}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products" className="btn-gold flex items-center gap-2 inline-flex">
              View All Products
              <TrendingUp size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
