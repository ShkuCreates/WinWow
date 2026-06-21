'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';

// Mock products data (expanded)
const allProducts = [
  {
    id: '1',
    name: 'WinWow S8 Balzer Series - Male',
    brand: 'WinWow',
    price: 35,
    discountPercentage: 15,
    thumbnail: 'https://i.ibb.co/XWd3Y7L2/2.jpg',
    images: [
      'https://i.ibb.co/XWd3Y7L2/2.jpg',
      'https://i.ibb.co/xgQjZ4Z9/1.jpg',
      'https://i.ibb.co/1d7mY6C9/4.jpg',
      'https://i.ibb.co/t4vQxZJf/3.jpg',
    ],
    stock: 12,
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

      {/* Search Bar Only */}
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
