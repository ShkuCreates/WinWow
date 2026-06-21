'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, TrendingUp, Users, Star, Package } from 'lucide-react';

// Mock products for admin
const adminProducts = [
  {
    id: '1',
    name: 'Royal Oak Perpetual',
    brand: 'Audemars Piguet',
    price: 45000,
    discountPercentage: 10,
    thumbnail: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
    stock: 5,
  },
  {
    id: '2',
    name: 'Submariner Date',
    brand: 'Rolex',
    price: 12500,
    discountPercentage: 0,
    thumbnail: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=80',
    stock: 3,
  },
  {
    id: '3',
    name: 'Nautilus Blue',
    brand: 'Patek Philippe',
    price: 85000,
    discountPercentage: 5,
    thumbnail: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    stock: 2,
  },
];

// Mock reviews
const mockReviews = [
  { id: '1', productName: 'Royal Oak Perpetual', userName: 'Michael Chen', rating: 5, text: 'Absolutely stunning timepiece. The craftsmanship is impeccable.', date: '2024-05-15' },
  { id: '2', productName: 'Submariner Date', userName: 'Sarah Johnson', rating: 5, text: 'Classic Rolex, worth every penny. Fast shipping too!', date: '2024-05-10' },
  { id: '3', productName: 'Speedmaster Professional', userName: 'David Wilson', rating: 4, text: 'Great watch, love the history behind it.', date: '2024-05-08' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Manage your store and analytics</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-yellow-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">3,000+</div>
              <div className="text-gray-400 text-sm">Units Sold</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Package className="text-green-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">$2.4M</div>
              <div className="text-gray-400 text-sm">Revenue</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Users className="text-blue-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-gray-400 text-sm">Customers</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Star className="text-purple-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">4.9</div>
              <div className="text-gray-400 text-sm">Avg Rating</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 rounded-t-lg font-semibold transition-colors ${
            activeTab === 'products' ? 'text-yellow-400 bg-white/5' : 'text-gray-400 hover:text-white'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-6 py-3 rounded-t-lg font-semibold transition-colors ${
            activeTab === 'reviews' ? 'text-yellow-400 bg-white/5' : 'text-gray-400 hover:text-white'
          }`}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'products' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Product Management</h2>
            <button className="premium-button flex items-center gap-2">
              <Plus size={20} />
              Add Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Product</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Brand</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Stock</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminProducts.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.thumbnail} 
                          alt={product.name} 
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <span className="text-white font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{product.brand}</td>
                    <td className="py-4 px-4 text-white">${product.price.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-300">{product.stock}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'reviews' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Customer Reviews</h2>
          
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-white/5 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-white font-semibold">{review.userName}</div>
                    <div className="text-gray-400 text-sm">{review.productName}</div>
                  </div>
                  <div className="text-gray-400 text-sm">{review.date}</div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < review.rating ? 'currentColor' : 'none'} 
                      className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <p className="text-gray-300">{review.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
