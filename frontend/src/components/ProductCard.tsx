import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  images: string[];
  stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass rounded-2xl overflow-hidden transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="text-sm text-gray-400 mb-1">{product.brand}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
        
        <div className="flex items-center gap-3 mb-4">
          {product.discountPercentage > 0 ? (
            <>
              <span className="text-2xl font-bold text-white">
                ${discountedPrice.toLocaleString()}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-white">
              ${product.price.toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="flex gap-3">
          <Link 
            href={`/products/${product.id}`} 
            className="flex-1 premium-button text-center text-sm"
          >
            View Details
          </Link>
          <button className="premium-button p-3">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
