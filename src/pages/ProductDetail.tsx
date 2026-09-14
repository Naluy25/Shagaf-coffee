import { useState } from 'react';
import { ArrowRight, Star, Plus, Minus, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/whatsapp';
import type { Product } from '@/data/products';
import { products } from '@/data/products';
import type { Page } from '@/components/Header';
import ProductCard from '@/components/ProductCard';

interface ProductDetailProps {
  productId: string;
  onNavigate?: (page: Page) => void;
  onOpenProduct?: (id: string) => void;
}

export default function ProductDetail({ productId, onNavigate, onOpenProduct }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === productId);

  const handleAdd = () => {
    if (!product || added) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-24">
        <div className="container-xl">
          <div className="mx-auto max-w-md rounded-3xl bg-white p-12 text-center shadow-sm">
            <h1 className="text-xl font-black text-coffee-900">المنتج غير موجود</h1>
            <button
              onClick={() => onNavigate?.('store')}
              className="mt-6 text-sm font-bold text-gold-600 hover:text-gold-700"
            >
              العودة للمتجر
            </button>
          </div>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      {/* ── Breadcrumb / Back ── */}
      <div className="container-xl pt-28">
        <button
          onClick={() => onNavigate?.('store')}
          className="group inline-flex items-center gap-2 text-sm font-bold text-coffee-500 transition-colors duration-300 hover:text-coffee-900"
        >
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          العودة إلى المتجر
        </button>
      </div>

      {/* ── Product main ── */}
      <div className="container-xl mt-6">
        <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-sm lg:grid-cols-2">
          {/* Image */}
          <div className="relative bg-gradient-to-br from-cream-100 to-cream-200">
            <div className="aspect-square w-full overflow-hidden lg:h-full">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coffee-950/10 via-transparent to-transparent" />

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-6 right-6 rounded-full bg-white/90 px-5 py-2 text-xs font-extrabold tracking-wide text-gold-700 shadow-lg backdrop-blur-md">
                {product.badge}
              </span>
            )}

            {/* Rating */}
            <div className="absolute bottom-6 left-6 flex items-center gap-1.5 rounded-full bg-white/85 px-4 py-2 shadow-lg backdrop-blur-md">
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
              <span className="text-sm font-extrabold text-coffee-900">{product.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col p-7 sm:p-10 lg:p-12">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="بن شغف" className="h-5 w-auto" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-400">
                بن شغف للبن اليمني
              </span>
            </div>

            {/* Name */}
            <h1 className="mt-5 text-3xl font-black leading-snug text-coffee-900 sm:text-4xl">
              {product.name}
            </h1>

            {/* Divider */}
            <div className="mt-4 flex items-center gap-2">
              <span className="h-px w-10 bg-gold-400/50" />
              <Sparkles className="h-3.5 w-3.5 text-gold-400/70" />
            </div>

            {/* Description */}
            <p className="mt-5 text-[15px] leading-relaxed text-coffee-500 sm:text-base">
              {product.description}
            </p>

            {/* Info chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-4 py-2 text-sm font-bold text-coffee-600">
                <Sparkles className="h-3.5 w-3.5 text-coffee-400" />
                {product.weight}
              </span>
            </div>

            {/* Flavor notes */}
            {product.flavorNotes.length > 0 && (
              <div className="mt-6">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-coffee-400">
                  ملاحظات النكهة
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.flavorNotes.map((note) => (
                    <span
                      key={note}
                      className="rounded-full border border-gold-200/60 bg-gold-50 px-4 py-1.5 text-sm font-bold text-gold-700"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="my-7 h-px bg-gradient-to-l from-transparent via-coffee-200/60 to-transparent" />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-coffee-900">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-lg text-coffee-300 line-through">{formatPrice(product.oldPrice)}</span>
              )}
            </div>

            {/* Quantity + Add */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-coffee-600">الكمية</span>
                <div className="flex items-center rounded-full bg-cream-50 ring-1 ring-coffee-100">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-coffee-500 transition-all duration-300 hover:bg-cream-200/60 hover:text-coffee-800"
                    aria-label="تقليل"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-11 text-center text-xl font-black text-coffee-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-coffee-500 transition-all duration-300 hover:bg-cream-200/60 hover:text-coffee-800"
                    aria-label="زيادة"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add button */}
              <button
                onClick={handleAdd}
                className={`flex flex-1 items-center justify-center gap-3 rounded-full py-4 text-sm font-extrabold shadow-lg transition-all duration-500 ease-luxury ${
                  added
                    ? 'bg-success-500 text-white shadow-success-500/25'
                    : 'bg-gradient-to-l from-coffee-800 to-coffee-700 text-cream-100 shadow-coffee-900/15 hover:shadow-xl hover:shadow-coffee-900/20 hover:-translate-y-0.5'
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5" />
                    تمت الإضافة للسلة
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    أضف للسلة — {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <div className="container-xl mt-20">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-coffee-900">منتجات مشابهة</h2>
            <button
              onClick={() => onNavigate?.('store')}
              className="text-sm font-bold text-gold-600 hover:text-gold-700"
            >
              عرض الكل
            </button>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <div key={p.id} onClick={() => onOpenProduct?.(p.id)}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
