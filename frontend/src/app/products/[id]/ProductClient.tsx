'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check, Calendar, MapPin, User, Mail, Copy, ExternalLink, ChevronDown, ChevronUp, Loader2, AlertCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { createOrder, verifyOrderPayment, type OrderResponse } from '@/lib/api';

type Step = 'detail' | 'form' | 'payment' | 'success';
type CryptoCurrency = 'USDT' | 'BTC' | 'ETH' | 'LTC';

const productDetails: Record<string, any> = {
  '1': {
    id: '1',
    name: 'WinWow S8 Balzer Series - Male',
    brand: 'WinWow',
    price: 35,
    preBookDepositPercentage: 15,
    description: 'The WinWow S8 Balzer Series is a refined men\'s timepiece that blends classic horology with modern design. A bold dial, premium finish, and comfortable fit make it ideal for daily wear or formal occasions. Secure yours with a 15% pre-book deposit today.',
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
    stock: 0,
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
      { id: 'r14', user: 'Lucas G.', rating: 4, comment: 'Solid watch for the price point. The 15% deposit pre-book made it an easy decision. Would buy again.', date: '2026-06-14' },
      { id: 'r15', user: 'Nathan J.', rating: 5, comment: 'Exactly what I wanted — masculine, refined, and reliable. Best pre-book purchase I\'ve made. 10/10.', date: '2026-06-19' },
    ],
  },
  '2': {
    id: '2',
    name: 'WinWow 114A Premium - Men',
    brand: 'WinWow',
    price: 59,
    preBookDepositPercentage: 24,
    description: 'The WinWow 114A Premium is a bold men\'s statement piece engineered for those who demand presence and precision. A striking dial, robust case, and premium finish elevate every outfit — secure yours today with a 24% pre-book deposit.',
    specifications: {
      'Movement': 'Japanese Quartz',
      'Case Material': 'Alloy Steel',
      'Case Diameter': '44mm',
      'Water Resistance': '3 ATM',
      'Strap': 'Silicone Sport Band',
    },
    thumbnail: 'https://i.ibb.co/tTSbZVR3/Chat-GPT-Image-Jun-22-2026-03-25-33-AM.png',
    images: [
      'https://i.ibb.co/tTSbZVR3/Chat-GPT-Image-Jun-22-2026-03-25-33-AM.png',
      'https://i.ibb.co/hx3GssYD/Chat-GPT-Image-Jun-22-2026-03-25-31-AM.png',
      'https://i.ibb.co/fzNKpCty/Chat-GPT-Image-Jun-22-2026-03-25-28-AM.png',
      'https://i.ibb.co/wZF0ZtGW/Chat-GPT-Image-Jun-22-2026-03-26-23-AM.png',
    ],
    stock: 0,
    reviews: [
      { id: 'r1', user: 'Arjun S.', rating: 5, comment: 'Bhai, kya watch hai! The 114A looks absolutely premium on wrist. Pre-booked instantly — worth every rupee of the deposit.', date: '2026-05-18' },
      { id: 'r2', user: 'Priya M.', rating: 5, comment: 'Ordered for my husband\'s birthday. He was thrilled — the dial is stunning and build quality exceeds the price.', date: '2026-05-25' },
      { id: 'r3', user: 'Rohit K.', rating: 5, comment: 'Solid watch yaar. Wearing it daily to office and getting compliments every single day. WinWow nailed it with this one.', date: '2026-06-01' },
      { id: 'r4', user: 'Ananya R.', rating: 4, comment: 'Beautiful design and great finish. Strap took two days to feel comfortable but now it\'s perfect. Very happy overall.', date: '2026-06-08' },
      { id: 'r5', user: 'Vikram P.', rating: 5, comment: 'Premium feel at an affordable price. The 24% deposit pre-book was easy and delivery was smooth. Highly recommend!', date: '2026-06-12' },
      { id: 'r6', user: 'Kavya N.', rating: 5, comment: 'Gifted to my brother — he couldn\'t stop showing it off. Looks far more expensive than $59. Shukriya WinWow!', date: '2026-06-15' },
      { id: 'r7', user: 'Rahul D.', rating: 5, comment: 'Masst watch hai! Bold dial, perfect weight, and keeps time accurately. My third WinWow and best one yet.', date: '2026-05-28' },
      { id: 'r8', user: 'Shruti G.', rating: 4, comment: 'Lovely watch with a sporty elegant look. Wish the clasp was slightly easier to adjust, but quality is top-notch.', date: '2026-06-03' },
      { id: 'r9', user: 'Aditya V.', rating: 5, comment: 'Pre-booked without thinking twice. Exactly as shown in photos — premium packaging and flawless timepiece.', date: '2026-06-10' },
      { id: 'r10', user: 'Meera J.', rating: 5, comment: 'Perfect for formal and casual wear. The 114A Premium has that luxury look my husband always wanted. Bahut accha!', date: '2026-06-17' },
      { id: 'r11', user: 'Karan B.', rating: 4, comment: 'Great value watch. Deposit process was simple and payment verification worked smoothly. Would buy again.', date: '2026-06-05' },
      { id: 'r12', user: 'Divya T.', rating: 5, comment: 'Stunning timepiece! The gold and black combination is chef\'s kiss. Gets noticed at every party.', date: '2026-06-20' },
      { id: 'r13', user: 'Aman H.', rating: 5, comment: 'Ek number watch! Comfortable all day, waterproof enough for daily use, and looks like a ₹50,000 watch.', date: '2026-06-14' },
      { id: 'r14', user: 'Neha C.', rating: 4, comment: 'Very satisfied with the pre-book experience. Watch is gorgeous — minor delay in shipping but product is flawless.', date: '2026-06-22' },
      { id: 'r15', user: 'Rajesh L.', rating: 5, comment: 'Best pre-book decision I\'ve made. The 114A Premium is bold, reliable, and turns heads everywhere. 10/10.', date: '2026-06-19' },
    ],
  },
  '3': {
    id: '3',
    name: 'WinWow FZ 6 Series - Male',
    brand: 'WinWow',
    price: 58,
    preBookDepositPercentage: 16,
    description: 'The WinWow FZ 6 Series is a sophisticated men\'s timepiece that combines sporty agility with refined luxury. Its precision movement, scratch-resistant case, and versatile design make it perfect for both business and casual settings. Reserve yours now with a 16% pre-book deposit.',
    specifications: {
      'Movement': 'Swiss Quartz',
      'Case Material': 'Stainless Steel',
      'Case Diameter': '43mm',
      'Water Resistance': '5 ATM',
      'Strap': 'Premium Leather',
    },
    thumbnail: 'https://i.ibb.co/Dgw5bs7r',
    images: [
      'https://i.ibb.co/Dgw5bs7r',
      'https://i.ibb.co/8LgG1KK7',
      'https://i.ibb.co/p6wcgRZP',
      'https://i.ibb.co/pGKGWzn',
    ],
    stock: 0,
    reviews: [
      { id: 'r1', user: 'James H.', rating: 5, comment: 'The FZ 6 is hands down the best WinWow yet. The build quality screams luxury and the leather strap is incredibly comfortable.', date: '2026-05-10' },
      { id: 'r2', user: 'Arjun S.', rating: 5, comment: 'Bhai yeh FZ 6 toh next level hai! Pre-book kar ke liye wait kiya but worth it. Looks way more than $58 on wrist.', date: '2026-05-15' },
      { id: 'r3', user: 'Ahmed R.', rating: 5, comment: 'Absolutely stunning piece. The dial finish and gold accents are exquisite. Pre-book process was seamless. Highly recommended!', date: '2026-05-20' },
      { id: 'r4', user: 'Marcus T.', rating: 4, comment: 'Great watch overall. The 43mm case fits perfectly on my wrist. Only wish the buckle was a bit more robust.', date: '2026-05-22' },
      { id: 'r5', user: 'Priya M.', rating: 5, comment: 'Bought this for my husband and he is obsessed! The packaging was premium and the watch itself is a showstopper.', date: '2026-05-25' },
      { id: 'r6', user: 'Rohit K.', rating: 5, comment: 'FZ 6 Series ka fan ho gaya yaar! Daily office mein pehn ke jaata hoon. compliments ati rehti hai.', date: '2026-05-28' },
      { id: 'r7', user: 'David K.', rating: 5, comment: 'Third WinWow purchase and they keep raising the bar. The FZ 6 has the most refined dial of the entire lineup.', date: '2026-06-01' },
      { id: 'r8', user: 'Hassan M.', rating: 4, comment: 'Beautiful watch with excellent craftsmanship. The leather strap broke in nicely after a few days. Very pleased.', date: '2026-06-03' },
      { id: 'r9', user: 'Ananya R.', rating: 5, comment: 'The FZ 6 is my new favorite accessory. The gold accents pair perfectly with both formal and casual outfits.', date: '2026-06-05' },
      { id: 'r10', user: 'Robert L.', rating: 5, comment: 'Pre-booked the moment it launched. The Swiss quartz movement keeps perfect time. Outstanding value for money.', date: '2026-06-08' },
      { id: 'r11', user: 'Vikram P.', rating: 4, comment: 'Solid watch for the price. The 5 ATM water resistance is a nice bonus. Pre-book deposit was very reasonable.', date: '2026-06-10' },
      { id: 'r12', user: 'Kavya N.', rating: 5, comment: 'Gifted this to my fiance and he absolutely loves it! The premium look fooled everyone at the party.', date: '2026-06-12' },
      { id: 'r13', user: 'Fatima A.', rating: 5, comment: 'The FZ 6 is a masterpiece. Elegant, lightweight, and the leather strap is top quality. Dubai delivery was fast too!', date: '2026-06-14' },
      { id: 'r14', user: 'Layla K.', rating: 4, comment: 'Very happy with my purchase. The watch looks even better in person. Customer service was helpful throughout.', date: '2026-06-15' },
      { id: 'r15', user: 'Tyler B.', rating: 5, comment: 'This watch gets noticed everywhere. The 43mm size is perfect — not too bulky, not too small. True luxury feel.', date: '2026-06-16' },
      { id: 'r16', user: 'Rahul D.', rating: 5, comment: 'Ekdam zabardast watch hai! FZ 6 series ki quality aur finish bohot acchi hai. Pre-book kar ke paise wasool.', date: '2026-06-17' },
      { id: 'r17', user: 'Noor S.', rating: 5, comment: 'The FZ 6 exceeded all expectations. The combination of sporty and elegant is perfectly balanced. Love it!', date: '2026-06-18' },
      { id: 'r18', user: 'Kevin S.', rating: 4, comment: 'Great addition to my collection. The scratch-resistant case holds up well. Would love to see more strap options.', date: '2026-06-19' },
      { id: 'r19', user: 'Zain B.', rating: 5, comment: 'Best pre-book decision this year! The FZ 6 looks like a $200 watch. The gold bezel detail is chef\'s kiss.', date: '2026-06-20' },
      { id: 'r20', user: 'Jason P.', rating: 5, comment: 'Comfortable all-day wear. The Swiss quartz movement is rock solid. WinWow continues to impress with every release.', date: '2026-06-21' },
      { id: 'r21', user: 'Brandon F.', rating: 5, comment: 'The FZ 6 Series is a winner. Sleek design, premium materials, and the $9 deposit made it an easy pre-book. 10/10!', date: '2026-06-22' },
    ],
  '4': {
    id: '4',
    name: 'WinWow Sizzel Beauty - Female',
    brand: 'WinWow',
    price: 67,
    preBookDepositPercentage: 16,
    description: 'The WinWow Sizzel Beauty is an elegant women\'s timepiece crafted for those who appreciate refined aesthetics. A delicate dial, polished case, and premium finish blend seamlessly to complement any outfit. Reserve yours now with a 16% pre-book deposit.',
    specifications: {
      'Movement': 'Precision Quartz',
      'Case Material': 'Rose Gold Plated Steel',
      'Case Diameter': '36mm',
      'Water Resistance': '3 ATM',
      'Strap': 'Genuine Leather',
    },
    thumbnail: 'https://i.ibb.co/ZR48chC7',
    images: [
      'https://i.ibb.co/ZR48chC7',
      'https://i.ibb.co/CcvP8ZH',
      'https://i.ibb.co/5hqbM1Dx',
      'https://i.ibb.co/MDfKG5Jf',
    ],
    stock: 0,
    reviews: [
      { id: 'r1', user: 'Sarah J.', rating: 5, comment: 'The Sizzel Beauty is absolutely gorgeous! The rose gold finish is so elegant and I get compliments every time I wear it. Worth every penny.', date: '2026-05-08' },
      { id: 'r2', user: 'Priya M.', rating: 5, comment: 'Bought this for my wife\'s anniversary and she loves it! The 36mm case is perfect for her wrist. Elegant and classy.', date: '2026-05-12' },
      { id: 'r3', user: 'Emily R.', rating: 5, comment: 'This watch is stunning in person. The rose gold plating is flawless and the leather strap is so soft. My new everyday watch!', date: '2026-05-15' },
      { id: 'r4', user: 'Aisha K.', rating: 4, comment: 'Beautiful piece for women. The dial is delicate and feminine. Only wish it came with an extra strap option.', date: '2026-05-18' },
      { id: 'r5', user: 'Jennifer L.', rating: 5, comment: 'Pre-booked immediately! The 16% deposit was very reasonable. Delivery was fast and the packaging was premium.', date: '2026-05-20' },
      { id: 'r6', user: 'Neha C.', rating: 5, comment: 'Yeh watch toh bohot elegant hai! Pehn ke bahut accha lag raha hai. Pre-book process bhi easy tha.', date: '2026-05-22' },
      { id: 'r7', user: 'Sophia M.', rating: 5, comment: 'The Sizzel Beauty is my favorite accessory now. Lightweight, elegant, and the rose gold tone matches everything!', date: '2026-05-25' },
      { id: 'r8', user: 'Fatima A.', rating: 5, comment: 'Absolutely love this watch! The 3 ATM water resistance is great for daily wear. Dubai delivery was super fast too.', date: '2026-05-28' },
      { id: 'r9', user: 'Rachel T.', rating: 4, comment: 'Pretty watch with a feminine touch. The case size is perfect for smaller wrists. Would recommend to all ladies.', date: '2026-06-01' },
      { id: 'r10', user: 'Anita R.', rating: 5, comment: 'Gifted this to my sister and she was over the moon! The packaging was so elegant. WinWow never disappoints.', date: '2026-06-03' },
      { id: 'r11', user: 'Kavya N.', rating: 5, comment: 'The Sizzel Beauty mein magic hai yaar! Rose gold finish bohot classy hai. Office mein sab puchte hai kaha se liya.', date: '2026-06-05' },
      { id: 'r12', user: 'Olivia P.', rating: 5, comment: 'Finally a luxury-style watch that doesn\'t break the bank. The build quality is impressive for the price. Highly recommend!', date: '2026-06-08' },
      { id: 'r13', user: 'Maria G.', rating: 4, comment: 'Lovely watch for everyday wear. The leather strap is comfortable and the dial sparkles in sunlight. Very satisfied.', date: '2026-06-10' },
      { id: 'r14', user: 'Layla K.', rating: 5, comment: 'This is my third WinWow purchase and they never disappoint. The Sizzel Beauty is the most elegant one yet. Love it!', date: '2026-06-12' },
      { id: 'r15', user: 'Jessica W.', rating: 5, comment: 'The perfect gift! Ordered for my best friend\'s birthday and she absolutely adored it. Beautiful packaging too.', date: '2026-06-14' },
      { id: 'r16', user: 'Divya T.', rating: 5, comment: 'Bohut accha watch hai! Design elegant hai aur price bhi reasonable. Pre-book kar ke mila bahut accha deal.', date: '2026-06-15' },
      { id: 'r17', user: 'Noor S.', rating: 5, comment: 'The Sizzel Beauty is a head-turner. The rose gold case catches the light beautifully. Gets noticed everywhere I go!', date: '2026-06-17' },
      { id: 'r18', user: 'Meera J.', rating: 4, comment: 'Happy with my purchase. The watch is lightweight and comfortable. The only small issue is the strap could use more holes.', date: '2026-06-19' },
      { id: 'r19', user: 'Zain B.', rating: 5, comment: 'Bought this for my wife and she wears it every single day. The quality is outstanding. Best gift I\'ve ever given!', date: '2026-06-20' },
      { id: 'r20', user: 'Samantha H.', rating: 5, comment: 'This watch makes me feel like a million bucks. The rose gold finish is so luxurious. Every woman needs this in her collection!', date: '2026-06-21' },
      { id: 'r21', user: 'Pooja R.', rating: 5, comment: 'Sizzel Beauty is truly a beauty! Ek number quality hai. Pre-book kar ke liye bahut accha decision liya. 10/10!', date: '2026-06-22' },
    ],
  },
};

export default function ProductClient() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = productDetails[productId] || productDetails['1'];

  const [selectedImage, setSelectedImage] = useState(0);
  const [step, setStep] = useState<Step>('detail');
  const [formData, setFormData] = useState({ name: '', address: '', email: '', phone: '' });
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>('USDT');
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [paymentError, setPaymentError] = useState('');

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const preBookDeposit = product.price * (product.preBookDepositPercentage / 100);
  const visibleReviews = showAllReviews ? product.reviews : product.reviews.slice(0, 5);
  const averageRating =
    product.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
    product.reviews.length;
  const ratingDisplay = averageRating.toFixed(1);

  const createOrderForPayment = useCallback(
    async (crypto: CryptoCurrency, customer = formData) => {
      const newOrder = await createOrder({
        productId: product.id,
        productName: product.name,
        fullPriceUsd: product.price,
        depositPercentage: product.preBookDepositPercentage,
        crypto,
        customer,
      });
      setOrder(newOrder);
      return newOrder;
    },
    [formData, product]
  );

  const verifyPayment = useCallback(async () => {
    if (!order?.id) return;

    setIsVerifying(true);
    setPaymentError('');
    try {
      const result = await verifyOrderPayment(order.id);
      if (result.status === 'paid') {
        setPaymentMessage('Payment confirmed on the blockchain!');
        setStep('success');
        if (pollRef.current) clearInterval(pollRef.current);
        if (result.txHash) {
          setOrder((prev) => prev ? { ...prev, status: 'paid', txHash: result.txHash } : prev);
        }
      } else if (result.status === 'expired') {
        setPaymentError('This order expired. Please start pre-booking again.');
        setStep('detail');
      } else {
        setPaymentMessage(result.message || 'Payment not detected yet. We will keep checking automatically.');
      }
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : 'Could not verify payment. Make sure the backend server is running and try again.'
      );
    } finally {
      setIsVerifying(false);
    }
  }, [order?.id]);

  useEffect(() => {
    if (step !== 'payment' || !order?.id || order.status === 'paid') return;

    verifyPayment();
    pollRef.current = setInterval(verifyPayment, 20000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [step, order?.id, order?.status, verifyPayment]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentError('');
    try {
      await createOrderForPayment(selectedCrypto, formData);
      setStep('payment');
      setPaymentMessage('Send the exact crypto amount below. We verify payment automatically on the blockchain.');
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : 'Failed to start payment. Please ensure the backend server is running.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCryptoChange = async (crypto: CryptoCurrency) => {
    if (crypto === selectedCrypto) return;
    setSelectedCrypto(crypto);
    setIsSubmitting(true);
    setPaymentError('');
    try {
      await createOrderForPayment(crypto);
      setPaymentMessage(`Order updated for ${crypto}. Send the new exact amount shown below.`);
    } catch {
      setPaymentError('Failed to update payment method.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sellerAddress = order?.sellerAddress ?? '';

  return (
    <div className="product-detail-page noise-overlay">
      <div className="container mx-auto px-6 py-12 relative z-10">
      {step === 'detail' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="glass rounded-2xl overflow-hidden aspect-square mb-4">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`glass rounded-xl overflow-hidden w-20 h-20 ${selectedImage === index ? 'ring-2 ring-[#c9a24b]' : ''}`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="text-sm text-[#9a958c] mb-2">{product.brand}</div>
            <h1 className="text-4xl font-bold text-[#f5f3ee] mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < Math.floor(averageRating) ? '#c9a24b' : 'transparent'} className={i < Math.floor(averageRating) ? 'text-[#c9a24b]' : 'text-[#9a958c]'} />
                ))}
              </div>
              <span className="text-[#9a958c]">({ratingDisplay} · {product.reviews.length} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl font-bold text-[#f5f3ee]">${product.price.toLocaleString()}</span>
              <span className="bg-[#c9a24b]/20 text-[#c9a24b] px-3 py-1 rounded-full text-sm font-semibold">Pre-Book Available</span>
            </div>
            <p className="text-[#c9a24b] mb-6 text-lg">
              Pre-book deposit: ${preBookDeposit.toFixed(2)} ({product.preBookDepositPercentage}% of ${product.price})
            </p>

            <p className="text-[#9a958c] mb-6 leading-relaxed">{product.description}</p>

            <div className="glass rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-[#f5f3ee] mb-4 flex items-center gap-2">
                <Calendar size={24} className="text-[#c9a24b]" />
                Pre-Book Now
              </h3>
              <p className="text-[#9a958c] mb-4">
                Currently out of stock! Secure your order by paying a {product.preBookDepositPercentage}% deposit now. The remaining balance is due before delivery.
              </p>
              <div className="space-y-3 mb-6 pb-4 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-[#9a958c]">Full Watch Price</span>
                  <span className="text-lg text-[#f5f3ee]">${product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9a958c]">Pre-Book Deposit ({product.preBookDepositPercentage}%)</span>
                  <span className="text-2xl font-bold text-[#c9a24b]">${preBookDeposit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#9a958c]">Remaining on delivery</span>
                  <span className="text-[#9a958c]">${(product.price - preBookDeposit).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => setStep('form')} className="w-full premium-button flex items-center justify-center gap-2 py-4 text-lg">
                <ShoppingCart size={24} />
                Pre-Book — Pay ${preBookDeposit.toFixed(2)} Deposit
              </button>
            </div>

            <div className="service-coverage-glass glass rounded-3xl p-6 mb-12">
              <div className="text-center mb-4">
                <p className="text-[#c9a24b] uppercase text-xs tracking-[0.3em] font-semibold">Serving Today</p>
                <h3 className="text-2xl font-semibold text-[#f5f3ee] mt-2">Available in key luxury markets</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { flag: '🇺🇸', label: 'USA' },
                  { flag: '🇮🇳', label: 'India' },
                  { flag: '🇨🇦', label: 'Canada' },
                  { flag: '🇦🇪', label: 'Dubai' },
                ].map((region) => (
                  <div key={region.label} className="service-chip glass-panel p-4 text-center">
                    <div className="text-4xl mb-2">{region.flag}</div>
                    <div className="text-sm font-semibold text-[#f5f3ee]">{region.label}</div>
                  </div>
                ))}
              </div>
            </div>

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

            <div>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold text-[#f5f3ee]">Customer Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < Math.floor(averageRating) ? '#c9a24b' : 'transparent'} className={i < Math.floor(averageRating) ? 'text-[#c9a24b]' : 'text-[#9a958c]'} />
                    ))}
                  </div>
                  <span className="text-[#f5f3ee] font-medium">{ratingDisplay}</span>
                  <span className="text-[#9a958c]">({product.reviews.length} reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                {visibleReviews.map((review: any) => (
                  <div key={review.id} className="glass p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#c9a24b]/20 flex items-center justify-center">
                          <span className="text-[#c9a24b] font-semibold">{review.user.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-[#f5f3ee] font-medium">{review.user}</div>
                          <div className="text-[#9a958c] text-sm">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? '#c9a24b' : 'transparent'} className={i < review.rating ? 'text-[#c9a24b]' : 'text-[#9a958c]'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#9a958c] leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>

              {product.reviews.length > 5 && (
                <div className="mt-8 text-center">
                  <button onClick={() => setShowAllReviews(!showAllReviews)} className="btn-ghost flex items-center gap-2 mx-auto">
                    {showAllReviews ? (<>Show Less Reviews<ChevronUp size={16} /></>) : (<>Show {product.reviews.length - 5} More Reviews<ChevronDown size={16} /></>)}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {step === 'form' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto glass rounded-2xl p-8">
          <button onClick={() => setStep('detail')} className="text-[#9a958c] hover:text-[#f5f3ee] mb-6 flex items-center gap-2">← Back to Product</button>
          <h2 className="text-3xl font-bold text-[#f5f3ee] mb-2">Your Information</h2>
          <p className="text-[#9a958c] mb-6">Pre-book deposit: <span className="text-[#c9a24b] font-semibold">${preBookDeposit.toFixed(2)}</span> (full price ${product.price})</p>

          {paymentError && (
            <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2 text-red-300 text-sm">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              {paymentError}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#9a958c] mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a958c]" size={20} />
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none focus:border-white/30" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#9a958c] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a958c]" size={20} />
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none focus:border-white/30" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#9a958c] mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-[#9a958c]" size={20} />
                <textarea required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="123 Luxury St, Beverly Hills, CA 90210" rows={3} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#f5f3ee] placeholder-[#9a958c] focus:outline-none focus:border-white/30" />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full premium-button py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Creating order...</> : 'Continue to Payment'}
            </button>
          </form>
        </motion.div>
      )}

      {step === 'payment' && order && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto glass rounded-2xl p-8">
          <button onClick={() => setStep('form')} className="text-[#9a958c] hover:text-[#f5f3ee] mb-6 flex items-center gap-2">← Back to Form</button>
          <h2 className="text-3xl font-bold text-[#f5f3ee] mb-2 text-center">Pay Pre-Book Deposit</h2>
          <p className="text-center text-[#9a958c] mb-2">Order ID: <span className="font-mono text-[#f5f3ee]">{order.id}</span></p>
          <p className="text-center text-sm text-[#9a958c] mb-6">Payment is verified automatically on the blockchain</p>

          <div className="glass rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img src={product.thumbnail} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
              <div>
                <div className="text-[#f5f3ee] font-semibold">{product.name}</div>
                <div className="text-[#9a958c]">{product.brand}</div>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/10 text-sm">
              <div className="flex justify-between"><span className="text-[#9a958c]">Full Price</span><span className="text-[#f5f3ee]">${order.fullPriceUsd.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#9a958c]">Pre-Book Deposit</span><span className="text-2xl font-bold text-[#c9a24b]">${order.depositUsd.toFixed(2)}</span></div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm text-[#9a958c] mb-3">Select Cryptocurrency</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['USDT', 'BTC', 'ETH', 'LTC'] as const).map((crypto) => (
                <button key={crypto} onClick={() => handleCryptoChange(crypto)} disabled={isSubmitting} className={`glass py-4 px-4 rounded-lg text-center font-medium transition-all disabled:opacity-60 ${selectedCrypto === crypto ? 'text-[#c9a24b] ring-2 ring-[#c9a24b] bg-yellow-500/10' : 'text-[#f5f3ee] hover:bg-white/10'}`}>
                  <div className="text-lg font-bold">{crypto}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-[#f5f3ee] mb-2">Send {selectedCrypto}</h3>
            <p className="text-3xl font-bold text-[#c9a24b] mb-1">{order.formattedCryptoAmount} {selectedCrypto}</p>
            <p className="text-sm text-[#9a958c] mb-6">≈ ${order.depositUsd.toFixed(2)} USD — send this exact amount</p>

            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-xl">
                <QRCodeSVG value={sellerAddress} size={200} level="H" includeMargin={true} />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-[#f5f3ee] text-sm font-mono break-all max-w-md">{sellerAddress}</span>
                <button onClick={() => navigator.clipboard.writeText(sellerAddress)} className="text-[#c9a24b] hover:text-yellow-300 transition-colors flex-shrink-0" title="Copy Address">
                  <Copy size={20} />
                </button>
              </div>
            </div>

            <div className="text-left mb-6 space-y-3 text-[#9a958c] text-sm">
              <p className="font-semibold text-[#f5f3ee]">Instructions:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Send exactly <span className="text-[#c9a24b] font-semibold">{order.formattedCryptoAmount} {selectedCrypto}</span> to the address above</li>
                <li>Wait for blockchain confirmation (usually 5–30 minutes)</li>
                <li>We automatically verify your payment on the blockchain</li>
              </ol>
            </div>

            {paymentMessage && (
              <div className="mb-4 p-3 rounded-lg bg-[#c9a24b]/10 border border-[#c9a24b]/30 text-[#c9a24b] text-sm">{paymentMessage}</div>
            )}
            {paymentError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-2">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />{paymentError}
              </div>
            )}

            <button onClick={verifyPayment} disabled={isVerifying} className="w-full premium-button flex items-center justify-center gap-2 py-4 text-lg disabled:opacity-60">
              {isVerifying ? <><Loader2 size={20} className="animate-spin" /> Checking blockchain...</> : <><Check size={20} /> Verify Payment Now</>}
            </button>

            <div className="mt-4 text-sm text-[#9a958c]">
              <a href={(() => {
                switch (selectedCrypto) {
                  case 'BTC': return `https://mempool.space/address/${sellerAddress}`;
                  case 'LTC': return `https://litecoinspace.org/address/${sellerAddress}`;
                  default: return `https://etherscan.io/address/${sellerAddress}`;
                }
              })()} target="_blank" rel="noopener noreferrer" className="text-[#c9a24b] hover:text-yellow-300 flex items-center justify-center gap-1">
                <ExternalLink size={14} /> View on Block Explorer
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {step === 'success' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto glass rounded-2xl p-12 text-center">
          <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={48} className="text-[#c9a24b]" />
          </div>
          <h2 className="text-4xl font-bold text-[#f5f3ee] mb-4">Pre-Book Confirmed!</h2>
          <p className="text-[#9a958c] mb-4 text-lg">
            Your deposit payment was verified on the blockchain. Product updates and delivery notifications will be sent to the contact details you provided.
          </p>
          {order?.txHash && (
            <p className="text-sm text-[#9a958c] mb-8 font-mono break-all">Transaction: {order.txHash}</p>
          )}
          <button onClick={() => router.push('/')} className="premium-button px-8 py-4 text-lg">Continue Shopping</button>
        </motion.div>
      )}
      </div>
    </div>
  );
}
