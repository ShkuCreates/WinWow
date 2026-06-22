import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  preBookDepositPercentage: number;
  thumbnail: string;
  images: string[];
  stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const preBookDeposit = product.price * (product.preBookDepositPercentage / 100);

  const navigateToProduct = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      className="product-card overflow-hidden cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={navigateToProduct}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigateToProduct();
        }
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover product-card-image"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <button
          onClick={(event) => event.stopPropagation()}
          className="wishlist-btn absolute top-4 right-4 p-2 glass-panel rounded-full"
          aria-label="Add to wishlist"
        >
          <Heart size={20} className="text-[#f5f3ee]" strokeWidth={1.5} />
        </button>
        {product.stock === 0 && (
          <div className="discount-shimmer absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Pre-Book
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="text-sm text-[#9a958c] mb-1">{product.brand}</div>
        <h3 className="text-xl font-medium text-[#f5f3ee] mb-2">{product.name}</h3>
        
        <div className="flex flex-col gap-1 mb-4">
          <span className="text-2xl font-bold text-[#f5f3ee]">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-sm text-[#c9a24b]">
            Pre-book with ${preBookDeposit.toFixed(2)} ({product.preBookDepositPercentage}% deposit)
          </span>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={(event) => {
              event.stopPropagation();
              navigateToProduct();
            }}
            className="flex-1 premium-button text-center text-sm py-3"
          >
            View Details
          </button>
          <button
            onClick={(event) => event.stopPropagation()}
            className="premium-button p-3"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
