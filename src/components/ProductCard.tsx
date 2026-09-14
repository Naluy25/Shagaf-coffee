import { Plus, Eye, Star } from 'lucide-react';
import type { Product } from '@/data/products';
import { formatPrice } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  const handleCardClick = () => onClick?.(product);
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex cursor-pointer flex-col overflow-hidden bg-white transition-all duration-700 ease-luxury hover:-translate-y-1.5"
      style={{
        borderRadius: '1.5rem',
        boxShadow: '0 1px 2px rgba(31,23,15,0.03), 0 20px 45px -20px rgba(31,23,15,0.12)',
      }}
    >
      {/* Image container */}
      <div className="relative m-3 mb-0 overflow-hidden" style={{ borderRadius: '1.25rem', aspectRatio: '1 / 1' }}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-luxury group-hover:scale-[1.06]"
        />
        {/* Soft hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3.5 py-1.5 text-[10px] font-extrabold tracking-wide text-gold-700 shadow-sm backdrop-blur-md">
            {product.badge}
          </span>
        )}

        {/* View eye - bottom on hover */}
        <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/50 text-coffee-800 opacity-0 backdrop-blur-md transition-all duration-500 ease-luxury group-hover:opacity-100">
          <Eye className="h-4 w-4" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        {/* Rating */}
        <div className="flex items-center justify-center gap-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.round(product.rating) ? 'fill-gold-400 text-gold-400' : 'fill-cream-200 text-cream-200'}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-coffee-400">{product.rating}</span>
        </div>

        {/* Name */}
        <h3 className="mt-2 text-center text-[15px] font-extrabold leading-snug text-coffee-900">
          {product.name}
        </h3>

        {/* Divider */}
        <div className="mx-auto mt-2.5 h-px w-8 bg-gold-400/30" />

        {/* Price */}
        <div className="mt-2.5 flex items-baseline justify-center gap-2">
          <span className="text-lg font-black text-coffee-900">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-coffee-300 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        {/* Always-visible Add to cart button */}
        <button
          onClick={handleQuickAdd}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-coffee-900 py-3 text-sm font-bold text-cream-100 shadow-sm transition-all duration-500 ease-luxury hover:bg-coffee-800 hover:shadow-lg hover:shadow-coffee-900/20 active:scale-[0.98]"
          aria-label={`أضف ${product.name} للسلة`}
        >
          <Plus className="h-4 w-4" />
          أضف للسلة
        </button>
      </div>
    </div>
  );
}
