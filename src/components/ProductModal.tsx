import { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Check, Star, Sparkles } from 'lucide-react';
import type { Product } from '@/data/products';
import { formatPrice } from '@/lib/whatsapp';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (added) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => {
      onClose();
      openCart();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-coffee-950/70 backdrop-blur-lg animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-in"
        style={{ maxHeight: '92vh' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-coffee-700 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-coffee-900 hover:scale-110 sm:top-5 sm:left-5 sm:h-11 sm:w-11"
          aria-label="إغلاق"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex max-h-[92vh] flex-col overflow-y-auto lg:flex-row">
          {/* ── Image side ── */}
          <div className="relative shrink-0 bg-gradient-to-br from-cream-100 to-cream-200 lg:w-1/2">
            <div className="aspect-[4/4] w-full overflow-hidden sm:aspect-[4/4] lg:h-full lg:aspect-auto lg:min-h-[560px]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coffee-950/15 via-transparent to-transparent" />

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-5 right-5 z-10 rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-extrabold tracking-wide text-gold-700 shadow-md backdrop-blur-md">
                {product.badge}
              </span>
            )}

            {/* Rating floating */}
            <div className="absolute bottom-5 left-5 flex items-center gap-1.5 rounded-full bg-white/85 px-4 py-2 shadow-lg backdrop-blur-md">
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
              <span className="text-sm font-extrabold text-coffee-900">{product.rating}</span>
            </div>
          </div>

          {/* ── Content side ── */}
          <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="بن شغف" className="h-5 w-auto" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-400">
                بن شغف للبن اليمني
              </span>
            </div>

            {/* Name */}
            <h2 className="mt-5 text-2xl font-black leading-snug text-coffee-900 sm:text-3xl">
              {product.name}
            </h2>

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-coffee-500 sm:text-[15px]">
              {product.description}
            </p>

            {/* Info chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-xs font-bold text-coffee-600">
                <Sparkles className="h-3.5 w-3.5 text-coffee-400" />
                {product.weight}
              </span>
            </div>

            {/* Flavor notes */}
            {product.flavorNotes.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-coffee-400">
                  ملاحظات النكهة
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.flavorNotes.map((note) => (
                    <span
                      key={note}
                      className="rounded-full border border-gold-200/60 bg-gold-50 px-3.5 py-1.5 text-xs font-bold text-gold-700"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="my-6 h-px bg-gradient-to-l from-transparent via-coffee-200/60 to-transparent" />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-coffee-900">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-base text-coffee-300 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Quantity + Add */}
            <div className="mt-auto space-y-4 pt-6">
              {/* Quantity */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-coffee-600">الكمية</span>
                <div className="flex items-center rounded-full bg-cream-50 ring-1 ring-coffee-100">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-coffee-500 transition-all duration-300 hover:bg-cream-200/60 hover:text-coffee-800"
                    aria-label="تقليل"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-lg font-black text-coffee-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-coffee-500 transition-all duration-300 hover:bg-cream-200/60 hover:text-coffee-800"
                    aria-label="زيادة"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="mr-auto text-sm text-coffee-500">
                  الإجمالي: <span className="font-extrabold text-coffee-900">{formatPrice(product.price * quantity)}</span>
                </div>
              </div>

              {/* Add button */}
              <button
                onClick={handleAdd}
                className={`flex w-full items-center justify-center gap-3 rounded-full py-4 text-sm font-extrabold shadow-lg transition-all duration-500 ease-luxury ${
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
    </div>
  );
}
