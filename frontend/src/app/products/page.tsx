'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';

// Mock products data - ONLY PRODUCT 1
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

  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#f5f3ee] mb-4">Our Collection</h1>
        <p className="text-[#9a958c]">Discover our exclusive selection of luxury watches</p>
      </div>

      {/* Search Bar */}
      <div className="glass rounded-xl p-6 mb-10">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a958c]" size={20} />
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-xl">
          <p className="text-xl text-[#9a958c]">No products found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
