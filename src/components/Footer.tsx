import { Phone, MapPin, Facebook, Mail } from 'lucide-react';
import type { Page } from './Header';
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="noise-overlay relative overflow-hidden bg-coffee-950 text-cream-200">
      {/* Top gradient line */}
      <div className="h-px gold-divider opacity-40" />

      {/* Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-gold-400/5 blur-[80px]" />

      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-coffee-texture bg-cover bg-center" />

      <div className="container-xl relative py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center">
              <img src="/logo.png" alt="بن شغف" className="h-16 w-auto object-contain drop-shadow-2xl" />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-cream-300/50">
              قهوة يمنية أصيلة من جبال حراز — محمّصة بشغف ومطحنة طبقاً للمواصفات القياسية.
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href="https://www.facebook.com/ShagafCoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فيسبوك"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-coffee-800/80 text-gold-400/70 transition-all duration-500 ease-luxury hover:bg-gradient-to-br hover:from-gold-400 hover:to-gold-300 hover:text-coffee-900 hover:-translate-y-1 hover:shadow-md"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gold-400">روابط سريعة</h4>
            <ul className="space-y-3">
              {[
                { label: 'الرئيسية', page: 'home' as Page },
                { label: 'المتجر', page: 'store' as Page },
                { label: 'تواصل معنا', page: 'contact' as Page },
              ].map((link) => (
                <li key={link.label}>
                  <button onClick={() => handleNav(link.page)} className="text-sm text-cream-300/50 transition-colors duration-300 hover:text-gold-300">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gold-400">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-cream-300/50">
                <Phone className="h-4 w-4 shrink-0 text-gold-400/70" />
                <span dir="ltr">{WHATSAPP_DISPLAY}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream-300/50">
                <Mail className="h-4 w-4 shrink-0 text-gold-400/70" />
                <span>info@shaghaf.coffee</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream-300/50">
                <MapPin className="h-4 w-4 shrink-0 text-gold-400/70 mt-0.5" />
                <span>القاهرة، مصر — شحن لكل المحافظات</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gold-400">نوّصلك بأخبارنا</h4>
            <p className="mb-4 text-sm text-cream-300/50">اشترك ليصلك كل جديد عن منتجاتنا وعروضنا</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem('email') as HTMLInputElement;
                if (input?.value) {
                  input.value = '';
                  window.open(`https://wa.me/20${WHATSAPP_DISPLAY.slice(1)}?text=${encodeURIComponent('أرغب في الاشتراك في النشرة البريدية')}`, '_blank');
                }
              }}
              className="flex gap-2"
            >
              <input
                name="email"
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full rounded-xl border border-coffee-700/60 bg-coffee-800/50 px-4 py-2.5 text-sm text-cream-100 placeholder:text-cream-400/40 transition-all duration-300 focus:border-gold-400/60 focus:outline-none focus:ring-1 focus:ring-gold-400/30"
              />
              <button type="submit" className="shrink-0 rounded-xl bg-gradient-to-l from-gold-400 to-gold-300 px-4 py-2.5 text-sm font-bold text-coffee-900 transition-all duration-300 hover:shadow-md hover:shadow-gold-500/20">
                اشترك
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-coffee-800/60 pt-6 sm:flex-row">
          <p className="text-xs text-cream-400/40">© 2026 بن شغف. جميع الحقوق محفوظة.</p>
          <p className="text-xs text-cream-400/40">صُنع بشغف للقهوة اليمنية الأصيلة</p>
        </div>
      </div>
    </footer>
  );
}
