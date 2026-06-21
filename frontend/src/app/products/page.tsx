'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Filter, Search } from 'lucide-react';

// Mock products data (expanded)
const allProducts = [
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
  {
    id: '5',
    name: 'Portugieser Chronograph',
    brand: 'IWC',
    price: 11000,
    discountPercentage: 0,
    thumbnail: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&q=80'],
    stock: 4,
  },
  {
    id: '6',
    name: 'Datejust 41',
    brand: 'Rolex',
    price: 9500,
    discountPercentage: 8,
    thumbnail: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80'],
    stock: 6,
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');

  const brands = ['All', 'Rolex', 'Omega', 'Audemars Piguet', 'Patek Philippe', 'IWC'];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#f5f3ee] mb-4">Our Collection</h1>
        <p className="text-[#9a958c]">Discover our exclusive selection of luxury watches</p>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a958c]" size={20} />
            <input
              type="text"
              placeholder="Search watches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none focus:border-white/30"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-[#9a958c]" />
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#f5f3ee] focus:outline-none focus:border-white/30"
            >
              {brands.map(brand => (
                <option key={brand} value={brand} className="bg-gray-900">{brand}</option>
              ))}
            </select>
          </div>
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
          <p className="text-xl text-[#9a958c]">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
