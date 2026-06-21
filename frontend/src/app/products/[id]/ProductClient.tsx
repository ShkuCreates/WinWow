'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check, Calendar, MapPin, CreditCard, User, Mail } from 'lucide-react';

// Mock product data
const productDetails: Record<string, any> = {
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

export default function ProductClient() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = productDetails[productId] || productDetails['1'];
  const [selectedImage, setSelectedImage] = useState(0);
  const [step, setStep] = useState<'detail' | 'form' | 'payment' | 'success'>('detail');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });
  const [selectedCrypto, setSelectedCrypto] = useState('USDT');

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const depositAmount = discountedPrice * 0.1;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = () => {
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {step === 'detail' && (
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
              {product.images.map((image: string, index: number) => (
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
            <div className="text-sm text-[#9a958c] mb-2">{product.brand}</div>
            <h1 className="text-4xl font-bold text-[#f5f3ee] mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" className="text-yellow-400" />
                ))}
              </div>
              <span className="text-[#9a958c]">(4.9 · 247 reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              {product.discountPercentage > 0 ? (
                <>
                  <span className="text-4xl font-bold text-[#f5f3ee]">
                    ${discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-2xl text-[#9a958c] line-through">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-[#f5f3ee]">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-[#9a958c] mb-6 leading-relaxed">{product.description}</p>

            {/* Pre-book CTA */}
            <div className="glass rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-[#f5f3ee] mb-4 flex items-center gap-2">
                <Calendar size={24} className="text-yellow-400" />
                Pre-book Now
              </h3>
              <p className="text-[#9a958c] mb-4">
                Secure your watch with a 10% deposit. The remaining balance will be charged before shipping.
              </p>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <span className="text-[#9a958c]">Deposit Amount</span>
                <span className="text-2xl font-bold text-yellow-400">
                  ${depositAmount.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setStep('form')}
                className="w-full premium-button flex items-center justify-center gap-2 py-4 text-lg"
              >
                <ShoppingCart size={24} />
                Pre-book for ${depositAmount.toLocaleString()}
              </button>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-xl font-semibold text-[#f5f3ee] mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-[#9a958c]">{key}</span>
                    <span className="text-[#f5f3ee] font-medium">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Form Step */}
      {step === 'form' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto glass rounded-2xl p-8"
        >
          <button
            onClick={() => setStep('detail')}
            className="text-[#9a958c] hover:text-[#f5f3ee] mb-6 flex items-center gap-2"
          >
            ← Back to Product
          </button>
          <h2 className="text-3xl font-bold text-[#f5f3ee] mb-6">Your Information</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#9a958c] mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a958c]" size={20} />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none focus:border-[rgba(255,255,255,0.3)]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#9a958c] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a958c]" size={20} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none focus:border-[rgba(255,255,255,0.3)]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#9a958c] mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-[#9a958c]" size={20} />
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Luxury St, Beverly Hills, CA 90210"
                  rows={3}
                  className="w-full pl-12 pr-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none focus:border-[rgba(255,255,255,0.3)]"
                />
              </div>
            </div>
            <button type="submit" className="w-full premium-button py-4 text-lg">
              Continue to Payment
            </button>
          </form>
        </motion.div>
      )}

      {/* Payment Step */}
      {step === 'payment' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto glass rounded-2xl p-8"
        >
          <button
            onClick={() => setStep('form')}
            className="text-[#9a958c] hover:text-[#f5f3ee] mb-6 flex items-center gap-2"
          >
            ← Back to Form
          </button>
          <h2 className="text-3xl font-bold text-[#f5f3ee] mb-6">Pay with Crypto</h2>

          <div className="glass rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <div className="text-[#f5f3ee] font-semibold">{product.name}</div>
                <div className="text-[#9a958c]">{product.brand}</div>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex justify-between text-[#9a958c]">
                <span>Deposit Amount</span>
                <span>${depositAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-[#9a958c] mb-3">Select Cryptocurrency</p>
            <div className="grid grid-cols-3 gap-3">
              {['USDT', 'BTC', 'ETH'].map((crypto) => (
                <button
                  key={crypto}
                  onClick={() => setSelectedCrypto(crypto)}
                  className={`glass py-3 px-4 rounded-lg text-center font-medium transition-all ${
                    selectedCrypto === crypto
                      ? 'text-[#c9a24b] ring-2 ring-[#c9a24b]'
                      : 'text-[#f5f3ee] hover:bg-white/10'
                  }`}
                >
                  {crypto}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full premium-button flex items-center justify-center gap-2 py-4 text-lg"
          >
            <CreditCard size={20} />
            Pay Now with {selectedCrypto}
          </button>
        </motion.div>
      )}

      {/* Success Step */}
      {step === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto glass rounded-2xl p-12 text-center"
        >
          <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={48} className="text-yellow-400" />
          </div>
          <h2 className="text-4xl font-bold text-[#f5f3ee] mb-4">Order Confirmed!</h2>
          <p className="text-[#9a958c] mb-8 text-lg">
            Thank you for your pre-booking! Your watch will be delivered soon.
          </p>
          <button
            onClick={handleGoHome}
            className="premium-button px-8 py-4 text-lg"
          >
            Continue Shopping
          </button>
        </motion.div>
      )}
    </div>
  );
}
