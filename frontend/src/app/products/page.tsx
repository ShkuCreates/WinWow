'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { Search, Watch } from 'lucide-react';

const allProducts = [
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
    stock: 0,
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Ambient header */}
      <section className="collection-header grain-overlay">
        <div className="collection-header-glow" />
        <div className="container mx-auto px-6 py-16 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#f5f3ee] mb-4">
              Our Collection
            </h1>
            <p className="text-[#9a958c] text-lg">
              Discover our exclusive selection of luxury watches
            </p>
            <div className="section-header-rule" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto"
          >
            <div className="search-bar px-4 py-3">
              <div className="relative">
                <Search className="search-icon absolute left-2 top-1/2 -translate-y-1/2" size={20} />
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-transparent text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product grid */}
      <section className="products-grid-section py-16">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ScrollReveal delay={index * 100}>
                      <ProductCard product={product} />
                    </ScrollReveal>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="empty-state text-center py-20 px-8 max-w-lg mx-auto"
              >
                <div className="w-20 h-20 rounded-full bg-[#c9a24b]/10 flex items-center justify-center mx-auto mb-6">
                  <Watch size={36} className="text-[#c9a24b]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-[#f5f3ee] mb-2">
                  No timepieces match your search
                </h3>
                <p className="text-[#9a958c]">
                  Try a different name or browse our full collection.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
