import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';

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
    <div className="product-card glass rounded-2xl overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <button className="wishlist-btn absolute top-4 right-4 p-2 glass-panel rounded-full">
          <Heart size={20} className="text-[#f5f3ee]" strokeWidth={1.5} />
        </button>
        {product.discountPercentage > 0 && (
          <div className="discount-shimmer absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="text-sm text-[#9a958c] mb-1">{product.brand}</div>
        <h3 className="text-xl font-medium text-[#f5f3ee] mb-2">{product.name}</h3>
        
        <div className="flex items-center gap-3 mb-4">
          {product.discountPercentage > 0 ? (
            <>
              <span className="text-2xl font-bold text-[#f5f3ee]">
                ${discountedPrice.toLocaleString()}
              </span>
              <span className="text-lg text-[#9a958c] line-through">
                ${product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-[#f5f3ee]">
              ${product.price.toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="flex gap-3">
          <Link 
            href={`/products/${product.id}`} 
            className="flex-1 premium-button text-center text-sm py-3"
          >
            View Details
          </Link>
          <button className="premium-button p-3">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
