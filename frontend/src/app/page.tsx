'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, TrendingUp, Heart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'Royal Oak Perpetual',
    brand: 'Audemars Piguet',
    price: 45000,
    discountPercentage: 10,
    thumbnail: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80'],
    stock: 5,
  },
  {
    id: '2',
    name: 'Submariner Date',
    brand: 'Rolex',
    price: 12500,
    discountPercentage: 0,
    thumbnail: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=80'],
    stock: 3,
  },
  {
    id: '3',
    name: 'Nautilus Blue',
    brand: 'Patek Philippe',
    price: 85000,
    discountPercentage: 5,
    thumbnail: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80'],
    stock: 2,
  },
  {
    id: '4',
    name: 'Speedmaster Professional',
    brand: 'Omega',
    price: 6500,
    discountPercentage: 15,
    thumbnail: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80'],
    stock: 8,
  },
];

export default function Home() {
  return (
    <div className="noise-overlay min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center relative z-0">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-[#c9a24b] uppercase tracking-[0.2em] text-sm mb-4 font-medium">
              Swiss Horology Since 1985
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#f5f3ee] mb-6 leading-[1.0">
              Timeless Elegance
            </h1>
            <p className="text-lg md:text-xl mb-10 text-[#9a958c]">
              Discover the world's finest luxury watches
            </p>
            
            {/* Stats */}
            <div className="flex items-center gap-6 mb-10">
              <div className="glass-panel px-6 py-4 flex flex-col">
                <span className="text-4xl font-bold text-[#c9a24b]">3,000+</span>
                <span className="text-[#9a958c]">Units Sold</span>
              </div>
              <div className="glass-panel px-6 py-4 flex flex-col">
                <div className="flex items-center gap-1 text-4xl font-bold text-[#c9a24b]">
                4.9 <Star size={24} fill="currentColor" className="text-[#c9a24b] ml-1" />
                </div>
                <span className="text-[#9a958c]">Customer Rating</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/products" className="btn-gold flex items-center gap-2">
                Browse Collection
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 relative">
            {/* Glow effect behind title */}
            <div className="absolute -z-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#c9a24b] opacity-10 blur-3xl" />
            <h2 className="relative font-serif text-4xl md:text-5xl text-[#f5f3ee] mb-3">
              Featured Collection
            </h2>
            <p className="text-[#9a958c]">
              Handpicked timepieces for the discerning collector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
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
