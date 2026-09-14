import { ArrowLeft, Coffee, Sparkles, Star, ChevronDown } from 'lucide-react';
import type { Page } from '@/components/Header';
import { useReveal, useParallax } from '@/hooks/useReveal';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import FeatureStrip from '@/components/FeatureStrip';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onOpenProduct?: (id: string) => void;
}

export default function Home({ onNavigate, onOpenProduct }: HomeProps) {
  const { addItem } = useCart();
  const storyReveal = useReveal();
  const featuredReveal = useReveal();
  const testimonialsReveal = useReveal();
  const heroParallax = useParallax<HTMLDivElement>(-0.15);
  const storyImgParallax = useParallax<HTMLDivElement>(0.08);

  const featuredProducts = products.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <div ref={heroParallax.ref} className="absolute inset-0 -z-0" style={{ transform: `translateY(${heroParallax.offset}px)` }}>
          <img
            src="https://images.pexels.com/photos/30772799/pexels-photo-30772799.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920"
            alt="بن شغف"
            className="h-[120%] w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coffee-950/85 via-coffee-950/60 to-coffee-950/90" />
          <div className="absolute inset-0 bg-gradient-to-l from-coffee-950/30 via-transparent to-coffee-950/30" />
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-gold-400/8 blur-[100px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-coffee-600/15 blur-[100px] animate-glow-pulse" style={{ animationDelay: '2s' }} />

        <div className="container-xl relative z-10 pt-20 text-center">
          <div className="animate-fade-in-down">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/5 px-5 py-2 text-xs font-bold tracking-[0.15em] text-gold-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              قهوة يمنية أصيلة
            </span>
          </div>

          <div className="mx-auto mt-8 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <img
              src="/logo.png"
              alt="بن شغف"
              className="mx-auto h-24 w-auto object-contain drop-shadow-2xl sm:h-32 lg:h-36"
            />
          </div>

          {/* Gold divider */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400/60" />
            <Coffee className="h-4 w-4 text-gold-400/70" />
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400/60" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-cream-200/70 animate-fade-in-up sm:text-xl" style={{ animationDelay: '0.3s' }}>
            مذاقٌ فريد من نوعه — توليفة يمنية بأجود حبوب البن،
            محمّصة ومطحنة طبقاً للمواصفات القياسية اليمنية والمصرية.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 animate-fade-in-up sm:flex-row" style={{ animationDelay: '0.45s' }}>
            <button onClick={() => onNavigate('store')} className="btn-gold group">
              تسوّق الآن
              <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:-translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-200/15 px-7 py-3.5 text-sm font-bold tracking-wide text-cream-100/90 backdrop-blur-md transition-all duration-500 ease-luxury hover:border-gold-300/40 hover:text-gold-300"
            >
              تواصل معنا
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
          <ChevronDown className="h-5 w-5 text-gold-300/50" />
        </div>
      </section>

      {/* ============ FEATURE STRIP ============ */}
      <FeatureStrip />

      {/* ============ STORY ============ */}
      <section
        ref={storyReveal.ref}
        className={`relative py-32 reveal ${storyReveal.visible ? 'visible' : ''}`}
      >
        {/* Decorative coffee bean watermark */}
        <Coffee className="absolute top-12 left-8 h-32 w-32 text-coffee-100/40 -rotate-12 hidden lg:block" />

        <div className="container-xl relative">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Image with parallax + layered frame */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.5rem] border border-gold-200/30" />
              <div className="absolute -inset-1.5 rounded-[2.25rem] border border-coffee-200/40" />
              <div
                ref={storyImgParallax.ref}
                className="noise-overlay relative flex h-[480px] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-cream-100 via-cream-50 to-cream-200 shadow-luxury"
                style={{ transform: `translateY(${storyImgParallax.offset}px)` }}
              >
                <div className="absolute inset-0 opacity-[0.04] bg-coffee-texture bg-cover bg-center" />
                <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gold-400/10 blur-[80px]" />
                <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-coffee-400/10 blur-[80px]" />
                <img
                  src="/logo.png"
                  alt="بن شغف"
                  className="relative h-64 w-auto max-w-[80%] object-contain drop-shadow-xl transition-transform duration-[1.5s] ease-luxury hover:scale-105"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">قصتنا</span>
              <h2 className="section-title mt-4">
                توليفة يمنية <span className="text-gold-500">بمذاقٍ فريد</span>
              </h2>

              {/* Mini divider */}
              <div className="mt-5 flex items-center gap-2">
                <span className="h-px w-10 bg-gold-400/50" />
                <span className="h-1 w-1 rounded-full bg-gold-400" />
              </div>

              <p className="mt-6 text-lg leading-loose text-coffee-600">
                نقدم لكم أجود وأنواع حبوب البن بتوليفة يمنية ومذاق فريد من نوعه.
                تم تحميص وطحن وتعبئة المنتج طبقاً للمواصفات القياسية اليمنية والمصرية
                لتصبح التوليفة بالمذاق الأفضل والأجود في مصر والعالم العربي.
              </p>
              <p className="mt-4 text-sm leading-loose text-coffee-400">
                تحميص ومطحنة بن شغف — العاشر من رمضان.
              </p>

              <button
                onClick={() => onNavigate('store')}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-coffee-800 transition-colors duration-300 hover:text-gold-600"
              >
                تصفّح المنتجات
                <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section
        ref={featuredReveal.ref}
        className={`bg-cream-100/50 py-32 reveal ${featuredReveal.visible ? 'visible' : ''}`}
      >
        {/* Top ornamental divider */}
        <div className="container-xl mb-16 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-300/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold-300/50" />
          <span className="h-px w-3 bg-gold-300/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400/60" />
          <span className="h-px w-3 bg-gold-300/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold-300/50" />
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-300/40" />
        </div>

        <div className="container-xl">
          <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">الأكثر مبيعاً</span>
              <h2 className="section-title mt-4">منتجات يعشقها زبائننا</h2>
            </div>
            <button
              onClick={() => onNavigate('store')}
              className="group inline-flex items-center gap-2 text-sm font-bold text-coffee-700 transition-colors duration-300 hover:text-gold-600"
            >
              عرض كل المنتجات
              <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:-translate-x-1" />
            </button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="transition-all duration-700 ease-luxury"
                style={{
                  opacity: featuredReveal.visible ? 1 : 0,
                  transform: featuredReveal.visible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                <ProductCard product={product} onClick={() => onOpenProduct?.(product.id)} onAddToCart={() => addItem(product)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section
        ref={testimonialsReveal.ref}
        className={`py-32 reveal ${testimonialsReveal.visible ? 'visible' : ''}`}
      >
        <div className="container-xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">آراء زبائننا</span>
            <h2 className="section-title mt-4">ماذا قالوا عنّا</h2>
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400/60" />
              <span className="h-px w-2 bg-gold-400/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400/60" />
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400/50" />
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: 'أحمد المصري', text: 'أفضل بن يمني جربته. النكهة أصيلة والرائحة تأخذك لعالم آخر. التوصيل سريع والتغليف فاخر.' },
              { name: 'سارة عبدالله', text: 'طلبت علبة الهدايا وكانت رائعة. ثلاثة أنواع كل واحد بتجربة مختلفة. تستاهل كل جنيه.' },
              { name: 'خالد العمري', text: 'كنت أشرب بن عادي لسنوات، لما جربت بن شغف ما رجعت لغيره. قهوة بمعنى الكلمة.' },
            ].map((review, idx) => (
              <div
                key={review.name}
                className="group relative rounded-3xl bg-white p-8 card-luxury transition-all duration-700 ease-luxury hover:card-luxury-hover hover:-translate-y-1.5"
                style={{
                  opacity: testimonialsReveal.visible ? 1 : 0,
                  transform: testimonialsReveal.visible ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: `${idx * 120}ms`,
                }}
              >
                {/* Quote mark */}
                <div className="absolute top-6 left-6 text-5xl font-black text-gold-200/50 select-none">"</div>

                <div className="relative">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-coffee-600">{review.text}</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-coffee-100/80 pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-coffee-700 to-coffee-900 text-sm font-bold text-gold-400">
                      {review.name.charAt(0)}
                    </div>
                    <div className="font-bold text-coffee-900">{review.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="pb-32">
        <div className="container-xl">
          <div className="noise-overlay relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-950 px-8 py-24 text-center shadow-luxury inner-glow-dark sm:px-16">
            {/* Texture + glows */}
            <div className="absolute inset-0 opacity-[0.03] bg-coffee-texture bg-cover bg-center" />
            <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gold-400/8 blur-[80px] animate-glow-pulse" />
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gold-400/5 blur-[80px] animate-glow-pulse" style={{ animationDelay: '2s' }} />

            {/* Border accents */}
            <div className="absolute inset-x-0 top-0 h-px gold-divider opacity-40" />
            <div className="absolute inset-x-0 bottom-0 h-px gold-divider opacity-20" />
            {/* Corner ornaments */}
            <div className="absolute top-6 right-6 h-8 w-8 border-t border-r border-gold-400/15 rounded-tr-lg" />
            <div className="absolute top-6 left-6 h-8 w-8 border-t border-l border-gold-400/15 rounded-tl-lg" />
            <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-gold-400/15 rounded-br-lg" />
            <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-gold-400/15 rounded-bl-lg" />

            <div className="relative">
              <div className="mx-auto flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-gold-400/40" />
                <Coffee className="h-8 w-8 text-gold-400" />
                <span className="h-px w-8 bg-gold-400/40" />
              </div>
              <h2 className="mt-6 text-balance text-3xl font-extrabold text-cream-100 sm:text-4xl lg:text-5xl">
                جرّب المذاق <span className="gold-shimmer">الأفضل والأجود</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-cream-300/50">
                توصيل سريع لكل المحافظات
              </p>
              <button onClick={() => onNavigate('store')} className="btn-gold mt-8 group">
                ابدأ التسوّق
                <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
