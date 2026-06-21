'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check, Calendar } from 'lucide-react';

// Mock product data (in real app, fetch from API)
const productDetails = {
  '1': {
    id: '1',
    name: 'Royal Oak Perpetual',
    brand: 'Audemars Piguet',
    price: 45000,
    discountPercentage: 10,
    description: 'The Royal Oak Perpetual Calendar is a masterpiece of horology, featuring an octagonal bezel with exposed screws and a stunning perpetual calendar complication.',
    specifications: {
      'Case Material': 'Stainless Steel',
      'Case Diameter': '41mm',
      'Movement': 'Automatic',
      'Water Resistance': '50m',
      'Glass': 'Sapphire Crystal',
      'Strap': 'Leather',
    },
    thumbnail: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1200&q=80',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80',
    ],
    stock: 5,
  },
  '2': {
    id: '2',
    name: 'Submariner Date',
    brand: 'Rolex',
    price: 12500,
    discountPercentage: 0,
    description: 'The Rolex Submariner is the reference among divers\' watches. Recognizable by its unidirectional rotating bezel and luminous display.',
    specifications: {
      'Case Material': 'Oystersteel',
      'Case Diameter': '41mm',
      'Movement': 'Perpetual, Mechanical',
      'Water Resistance': '300m',
      'Glass': 'Sapphire Crystal',
      'Strap': 'Oyster Bracelet',
    },
    thumbnail: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1200&q=80',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80',
    ],
    stock: 3,
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = productDetails[productId] || productDetails['1'];
  const [selectedImage, setSelectedImage] = useState(0);
  const [showPreBookModal, setShowPreBookModal] = useState(false);

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const depositAmount = discountedPrice * 0.1;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="glass rounded-2xl overflow-hidden aspect-square mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`glass rounded-xl overflow-hidden w-20 h-20 ${
                  selectedImage === index ? 'ring-2 ring-yellow-400' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-sm text-gray-400 mb-2">{product.brand}</div>
          <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" className="text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-400">(4.9 · 247 reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            {product.discountPercentage > 0 ? (
              <>
                <span className="text-4xl font-bold text-white">
                  ${discountedPrice.toLocaleString()}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  ${product.price.toLocaleString()}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discountPercentage}% OFF
                </span>
              </>
            ) : (
              <span className="text-4xl font-bold text-white">
                ${product.price.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-gray-300 mb-8 leading-relaxed">{product.description}</p>

          {/* Pre-book CTA */}
          <div className="glass rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar size={24} className="text-yellow-400" />
              Pre-book Now
            </h3>
            <p className="text-gray-400 mb-4">
              Secure your watch with a 10% deposit. The remaining balance will be charged before shipping.
            </p>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
              <span className="text-gray-300">Deposit Amount</span>
              <span className="text-2xl font-bold text-yellow-400">
                ${depositAmount.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => setShowPreBookModal(true)}
              className="w-full premium-button flex items-center justify-center gap-2 py-4 text-lg"
            >
              <ShoppingCart size={24} />
              Pre-book for ${depositAmount.toLocaleString()}
            </button>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Specifications</h3>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">{key}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pre-book Modal */}
      {showPreBookModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 max-w-lg w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Confirm Pre-booking</h2>
              <p className="text-gray-400">You&apos;re one step closer to owning this beautiful timepiece</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <div className="text-white font-semibold">{product.name}</div>
                  <div className="text-gray-400">{product.brand}</div>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between text-gray-300">
                  <span>Total Price</span>
                  <span>${discountedPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Deposit (10%)</span>
                  <span>${depositAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Remaining Balance</span>
                  <span>${(discountedPrice - depositAmount).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowPreBookModal(false)}
                className="flex-1 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 premium-button">
                Proceed to Payment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
