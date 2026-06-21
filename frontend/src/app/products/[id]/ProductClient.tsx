'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check, Calendar, MapPin, User, Mail, Copy, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Seller crypto configuration
const SELLER_ADDRESSES = {
  USDT: '0xF082C66009e8467C99d9ef03183820ad244F129B',
  BTC: 'bc1qry6ltzu4hk2euunmm4uq6n89f34sz9j3k283hz',
  ETH: '0xF082C66009e8467C99d9ef03183820ad244F129B',
  LTC: 'LZswPU7o7Spwih9P7mb99iD6v9aL1Zc1aD',
};

// Mock product data - ONLY PRODUCT 1 with exact details
const productDetails: Record<string, any> = {
  '1': {
    id: '1',
    name: 'WinWow S8 Balzer Series - Male',
    brand: 'WinWow',
    price: 35,
    discountPercentage: 15,
    description: 'The WinWow S8 Balzer Series is a refined men\'s timepiece that blends classic horology with modern design. A bold dial, premium finish, and comfortable fit make it ideal for daily wear or formal occasions — pre-book now at 15% off.',
    specifications: {
      'Movement': 'Precision Quartz',
      'Case Material': 'Stainless Steel',
      'Case Diameter': '42mm',
      'Water Resistance': '5 ATM',
      'Strap': 'Genuine Leather',
    },
    thumbnail: 'https://i.ibb.co/Rp2dTv4v/Chat-GPT-Image-Jun-22-2026-01-51-42-AM.png',
    images: [
      'https://i.ibb.co/Rp2dTv4v/Chat-GPT-Image-Jun-22-2026-01-51-42-AM.png',
      'https://i.ibb.co/RGtSPMsz/Chat-GPT-Image-Jun-22-2026-01-51-39-AM.png',
      'https://i.ibb.co/bjpqDgjH/Chat-GPT-Image-Jun-22-2026-01-51-37-AM.png',
      'https://i.ibb.co/67XfMrvX/Chat-GPT-Image-Jun-22-2026-01-51-34-AM.png',
    ],
    stock: 0, // Out of stock, pre-booking only
    reviews: [
      { id: 'r1', user: 'James H.', rating: 5, comment: 'Stunning timepiece! The craftsmanship on this S8 is incredible for the price. Pre-booked and couldn\'t be happier.', date: '2026-05-15' },
      { id: 'r2', user: 'Marcus T.', rating: 5, comment: 'Elegant design that gets noticed everywhere. The dial detail is far better than I expected at $35.', date: '2026-05-22' },
      { id: 'r3', user: 'David K.', rating: 5, comment: 'My third WinWow watch and this might be the best one yet. Build quality is solid and feels premium on the wrist.', date: '2026-06-02' },
      { id: 'r4', user: 'Robert L.', rating: 4, comment: 'Beautiful watch overall. Strap feels a bit stiff initially but breaks in nicely after a week of wear.', date: '2026-06-10' },
      { id: 'r5', user: 'Ahmed R.', rating: 5, comment: 'Pre-booked without hesitation. Arrived exactly as shown — premium look and feel. Highly recommend.', date: '2026-06-15' },
      { id: 'r6', user: 'Carlos M.', rating: 5, comment: 'The gold accents on the bezel are perfect. Looks like a much more expensive watch on the wrist.', date: '2026-06-20' },
      { id: 'r7', user: 'Daniel W.', rating: 5, comment: 'Fast delivery after pre-book. Keeps accurate time and the weight feels substantial without being heavy.', date: '2026-05-30' },
      { id: 'r8', user: 'Tyler B.', rating: 4, comment: 'Great value for a luxury-style watch. Minor scratch on the box but the watch itself is flawless.', date: '2026-06-05' },
      { id: 'r9', user: 'Kevin S.', rating: 5, comment: 'Bought for my brother\'s birthday — he absolutely loves it. Will pre-order the next series too.', date: '2026-06-18' },
      { id: 'r10', user: 'Brandon F.', rating: 5, comment: 'The S8 Balzer Series has that classic men\'s look. Comfortable all day wear, even at the office.', date: '2026-06-12' },
      { id: 'r11', user: 'Jason P.', rating: 4, comment: 'Very satisfied with the purchase. Wish the clasp was slightly easier to adjust, otherwise perfect.', date: '2026-05-25' },
      { id: 'r12', user: 'Omar N.', rating: 5, comment: 'Exceeded expectations for a pre-book item. WinWow really delivered on quality this time.', date: '2026-06-08' },
      { id: 'r13', user: 'Ethan C.', rating: 5, comment: 'Clean dial, smooth movement feel. This is my daily driver now — gets compliments constantly.', date: '2026-06-21' },
      { id: 'r14', user: 'Lucas G.', rating: 4, comment: 'Solid watch for the price point. Pre-book discount made it an easy decision. Would buy again.', date: '2026-06-14' },
      { id: 'r15', user: 'Nathan J.', rating: 5, comment: 'Exactly what I wanted — masculine, refined, and reliable. Best pre-book purchase I\'ve made. 10/10.', date: '2026-06-19' },
    ],
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
  const [selectedCrypto, setSelectedCrypto] = useState<'USDT' | 'BTC' | 'ETH' | 'LTC'>('USDT');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const visibleReviews = showAllReviews ? product.reviews : product.reviews.slice(0, 5);

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
                    selectedImage === index ? 'ring-2 ring-[#c9a24b]' : ''
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
                  <Star key={i} size={20} fill={i < Math.floor(4.7) ? "#c9a24b" : "transparent"} className={i < Math.floor(4.7) ? "text-[#c9a24b]" : "text-[#9a958c]"} />
                ))}
              </div>
              <span className="text-[#9a958c]">(4.7 · {product.reviews.length} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-[#f5f3ee]">${discountedPrice.toLocaleString()}</span>
              <span className="text-2xl text-[#9a958c] line-through">${product.price.toLocaleString()}</span>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Pre-Book - 15% OFF</span>
            </div>

            <p className="text-[#9a958c] mb-6 leading-relaxed">{product.description}</p>

            {/* Pre-book CTA */}
            <div className="glass rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-[#f5f3ee] mb-4 flex items-center gap-2">
                <Calendar size={24} className="text-[#c9a24b]" />
                Pre-Book Now
              </h3>
              <p className="text-[#9a958c] mb-4">
                Currently out of stock! Secure your order with pre-booking and get 15% off.
              </p>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <span className="text-[#9a958c]">Pre-Booking Price</span>
                <span className="text-2xl font-bold text-[#c9a24b]">
                  ${discountedPrice.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setStep('form')}
                className="w-full premium-button flex items-center justify-center gap-2 py-4 text-lg"
              >
                <ShoppingCart size={24} />
                Pre-Book for ${discountedPrice.toLocaleString()}
              </button>
            </div>

            {/* Specifications */}
            <div className="mb-12">
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

            {/* Reviews */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold text-[#f5f3ee]">Customer Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < Math.floor(4.7) ? "#c9a24b" : "transparent"} className={i < Math.floor(4.7) ? "text-[#c9a24b]" : "text-[#9a958c]"} />
                    ))}
                  </div>
                  <span className="text-[#f5f3ee] font-medium">4.7</span>
                  <span className="text-[#9a958c]">({product.reviews.length} reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                {visibleReviews.map((review: any) => (
                  <div key={review.id} className="glass p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#c9a24b]/20 flex items-center justify-center">
                          <span className="text-[#c9a24b] font-semibold">
                            {review.user.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-[#f5f3ee] font-medium">{review.user}</div>
                          <div className="text-[#9a958c] text-sm">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "#c9a24b" : "transparent"} className={i < review.rating ? "text-[#c9a24b]" : "text-[#9a958c]"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#9a958c] leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>

              {product.reviews.length > 5 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="btn-ghost flex items-center gap-2 mx-auto"
                  >
                    {showAllReviews ? (
                      <>
                        Show Less Reviews
                        <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        Show {product.reviews.length - 5} More Reviews
                        <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}
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
          <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="space-y-4">
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
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none focus:border-white/30"
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
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none focus:border-white/30"
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
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none focus:border-white/30"
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
          <h2 className="text-3xl font-bold text-[#f5f3ee] mb-6 text-center">Pay with Crypto</h2>

          {/* Order Summary */}
          <div className="glass rounded-xl p-6 mb-8">
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
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-[#9a958c]">Total Amount</span>
              <span className="text-2xl font-bold text-[#f5f3ee]">${discountedPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Crypto Selector */}
          <div className="mb-8">
            <p className="text-sm text-[#9a958c] mb-3">Select Cryptocurrency</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['USDT', 'BTC', 'ETH', 'LTC'] as const).map((crypto) => (
                <button
                  key={crypto}
                  onClick={() => setSelectedCrypto(crypto)}
                  className={`glass py-4 px-4 rounded-lg text-center font-medium transition-all ${
                    selectedCrypto === crypto
                      ? 'text-[#c9a24b] ring-2 ring-[#c9a24b] bg-yellow-500/10'
                      : 'text-[#f5f3ee] hover:bg-white/10'
                  }`}
                >
                  <div className="text-lg font-bold">{crypto}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="glass rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-[#f5f3ee] mb-6">Send {selectedCrypto} to Address</h3>
            
            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-xl">
                <QRCodeSVG
                  value={SELLER_ADDRESSES[selectedCrypto]}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>

            {/* Address Display */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-[#f5f3ee] text-sm font-mono break-all max-w-md">
                  {SELLER_ADDRESSES[selectedCrypto]}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(SELLER_ADDRESSES[selectedCrypto])}
                  className="text-[#c9a24b] hover:text-yellow-300 transition-colors flex-shrink-0"
                  title="Copy Address"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="text-left mb-8 space-y-3 text-[#9a958c]">
              <p className="font-semibold text-[#f5f3ee]">Important Instructions:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Copy the address or scan the QR code above</li>
                <li>Send exactly <span className="text-[#c9a24b] font-semibold">${discountedPrice.toLocaleString()}</span> worth of {selectedCrypto}</li>
                <li>Wait for 1-6 block confirmations (usually 5-30 minutes)</li>
                <li>Click "Check Payment" to verify your payment</li>
              </ol>
            </div>

            {/* Check Payment Button */}
            <button
              onClick={() => setStep('success')}
              className="w-full premium-button flex items-center justify-center gap-2 py-4 text-lg"
            >
              <Check size={20} />
              I've Sent Payment
            </button>

            {/* Block Explorer Link */}
            <div className="mt-4 text-sm text-[#9a958c]">
              <a
                href={(() => {
                  switch (selectedCrypto) {
                    case 'BTC': return `https://mempool.space/address/${SELLER_ADDRESSES[selectedCrypto]}`;
                    case 'LTC': return `https://blockchair.com/litecoin/address/${SELLER_ADDRESSES[selectedCrypto]}`;
                    case 'USDT':
                    case 'ETH':
                    default: return `https://etherscan.io/address/${SELLER_ADDRESSES[selectedCrypto]}`;
                  }
                })()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a24b] hover:text-yellow-300 flex items-center justify-center gap-1"
              >
                <ExternalLink size={14} />
                View on Block Explorer
              </a>
            </div>
          </div>
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
            <Check size={48} className="text-[#c9a24b]" />
          </div>
          <h2 className="text-4xl font-bold text-[#f5f3ee] mb-4">Order Confirmed!</h2>
          <p className="text-[#9a958c] mb-8 text-lg">
            Thank you for your pre-booking! Product updates and delivery notifications will be sent to the contact details you provided.
          </p>
          <button
            onClick={() => router.push('/')}
            className="premium-button px-8 py-4 text-lg"
          >
            Continue Shopping
          </button>
        </motion.div>
      )}
    </div>
  );
}
