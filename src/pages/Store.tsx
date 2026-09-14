import { useState, useMemo } from 'react';
import { Search, PackageSearch, Coffee, Gift, BadgePercent, ArrowLeft, Plus } from 'lucide-react';
import { products, categoryLabels, type ProductCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { buildWhatsAppUrl, formatPrice } from '@/lib/whatsapp';
import type { Page } from '@/components/Header';

interface StoreProps {
  onOpenProduct?: (id: string) => void;
  onNavigate?: (page: Page) => void;
}

export default function Store({ onOpenProduct, onNavigate }: StoreProps) {
  const { addItem } = useCart();
  const [category, setCategory] = useState<ProductCategory>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (search && !p.name.includes(search) && !p.description.includes(search)) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: list = [...list].sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
    }
    return list;
  }, [category, search, sortBy]);

  const categories: ProductCategory[] = ['all', 'ground'];

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-24">
      {/* ── Hero header ── */}
      <div className="container-xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-600">
            متجر بن شغف
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-coffee-900 sm:text-5xl">
            أفخر أنواع البن
          </h1>
          {/* Ornamental divider */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400/50" />
            <Coffee className="h-4 w-4 text-gold-400/70" />
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400/50" />
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm text-coffee-500">
            قهوة يمنية أصيلة محمّصة ومطحونة بعناية لمذاق لا يُنسى
          </p>
        </div>
      </div>

      {/* ── Special offer section ── */}
      <div className="container-xl mt-14">
        {/* Section heading */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-600">خصومات لا تفوّت</span>
          <h2 className="mt-2 text-2xl font-extrabold text-coffee-900 sm:text-3xl">عروض خاصة</h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400/50" />
            <Gift className="h-4 w-4 text-gold-400/70" />
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400/50" />
          </div>
        </div>

        {/* Offer card */}
        <div className="relative mt-8 overflow-hidden rounded-[2rem] shadow-luxury">
          {/* Gold frame */}
          <div className="absolute inset-0 rounded-[2rem] border border-gold-300/20" />
          <div className="rounded-[2rem] bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-950">
            {/* Texture + glows */}
            <div className="absolute inset-0 opacity-[0.04] bg-coffee-texture bg-cover bg-center" />
            <div className="absolute -top-28 -right-28 h-72 w-72 rounded-full bg-gold-400/10 blur-[90px] animate-glow-pulse" />
            <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-gold-400/6 blur-[90px] animate-glow-pulse" style={{ animationDelay: '2s' }} />

            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-px gold-divider opacity-40" />

            <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-5 lg:items-center lg:gap-6">
              {/* Bundle contents */}
              <div className="lg:col-span-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-4 py-1.5 text-[11px] font-extrabold tracking-[0.18em] text-gold-300">
                  <BadgePercent className="h-3.5 w-3.5" />
                  عرض خاص
                </span>

                <h3 className="mt-4 text-2xl font-black leading-snug text-cream-100 sm:text-3xl lg:text-4xl">
                  توليفة العائلة
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-cream-300/60">
                  اشترِ 2 كيلو من بن محوج واحصل على نصف كيلو إضافي <span className="text-gold-300 font-bold">هدية</span> من نفس التوليفة اليمنية الأصيلة.
                </p>

                {/* Bundle chips */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10 backdrop-blur-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/15">
                      <Coffee className="h-6 w-6 text-gold-300" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-cream-100">2 × بن محوج 1 كيلو</p>
                      <p className="text-[11px] text-cream-300/50">أصلي من جبال حراز</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gold-400">
                    <Plus className="h-5 w-5" />
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10 backdrop-blur-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/15">
                      <Gift className="h-6 w-6 text-gold-300" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-cream-100">+ نصف كيلو هدية</p>
                      <p className="text-[11px] text-cream-300/50">بقيمة 300 ج.م</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="rounded-3xl bg-white/[0.05] p-6 text-center ring-1 ring-gold-400/15 backdrop-blur-sm lg:col-span-2">
                {/* Save stamp */}
                <div className="mx-auto -mt-11 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-300 shadow-lg shadow-gold-500/25">
                  <span className="rotate-[-12deg] text-center text-[10px] font-black leading-tight text-coffee-900">خصم<br />20%</span>
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-cream-300/40">السعر الآن</p>
                <div className="mt-2 flex items-baseline justify-center gap-2.5">
                  <span className="text-4xl font-black text-gold-300">{formatPrice(1200)}</span>
                  <span className="text-lg text-cream-300/40 line-through">{formatPrice(1500)}</span>
                </div>
                <p className="mt-2 text-xs text-cream-300/50">بدلاً من {formatPrice(1500)}</p>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-success-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-success-400 animate-pulse" />
                  الكمية محدودة
                </div>

                <a
                  href={buildWhatsAppUrl('أرغب في طلب عرض: 2 كيلو بن محوج + نصف كيلو هدية')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-gold-400 to-gold-300 px-8 py-3.5 text-sm font-extrabold text-coffee-900 shadow-lg shadow-gold-500/20 transition-all duration-500 ease-luxury hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5"
                >
                  اطلب العرض الآن
                  <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search + Sort bar (floating card) ── */}
      <div className="container-xl mt-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-coffee-100/80 bg-white px-4 py-4 shadow-sm">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-coffee-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث في المتجر..."
              className="w-full rounded-xl bg-cream-50 py-3 pr-11 pl-4 text-sm text-coffee-900 placeholder:text-coffee-400 transition-all duration-300 focus:bg-cream-100 focus:outline-none focus:ring-2 focus:ring-gold-300/30"
            />
          </div>
          {/* Sort */}
          <div className="relative w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full cursor-pointer appearance-none rounded-xl bg-cream-50 py-3 pl-4 pr-10 text-sm font-bold text-coffee-600 transition-all duration-300 focus:bg-cream-100 focus:outline-none focus:ring-2 focus:ring-gold-300/30 sm:w-44"
            >
              <option value="featured">الأكثر رواجاً</option>
              <option value="price-asc">الأقل سعراً</option>
              <option value="price-desc">الأعلى سعراً</option>
              <option value="rating">الأعلى تقييماً</option>
            </select>
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400">▾</span>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-500 ease-luxury ${
                category === cat
                  ? 'bg-coffee-900 text-cream-100 shadow-lg shadow-coffee-900/20'
                  : 'border border-coffee-100 bg-white text-coffee-500 hover:border-gold-300/60 hover:text-coffee-800'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Products count */}
        <div className="mt-8 text-center text-[11px] font-medium uppercase tracking-wider text-coffee-400">
          {filtered.length} {filtered.length === 1 ? 'منتج' : 'منتجات'}
        </div>
      </div>

      {/* ── Products grid ── */}
      <div className="container-xl mt-8">
        {filtered.length > 0 ? (
          <div
            key={`${category}-${sortBy}-${search}`}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((product, idx) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms`, opacity: 0 }}
              >
                <ProductCard
                  product={product}
                  onClick={() => onOpenProduct?.(product.id)}
                  onAddToCart={() => addItem(product)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-20 max-w-sm text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-coffee-100/60">
              <PackageSearch className="h-8 w-8 text-coffee-400" />
            </div>
            <p className="mt-5 text-lg font-bold text-coffee-700">لا توجد منتجات مطابقة</p>
            <p className="mt-2 text-sm text-coffee-400">جرّب البحث بكلمات أخرى</p>
            <button
              onClick={() => { setSearch(''); setCategory('all'); }}
              className="mt-4 text-sm font-bold text-gold-600 transition-colors hover:text-gold-700"
            >
              إعادة ضبط البحث
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
