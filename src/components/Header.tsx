import { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export type Page = 'home' | 'store' | 'contact' | 'cart';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems: { key: Page; label: string }[] = [
    { key: 'home', label: 'الرئيسية' },
    { key: 'store', label: 'المتجر' },
    { key: 'contact', label: 'تواصل معنا' },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Non-home pages (store/contact) have a light background, so the header
  // must always render the "solid" style there to stay visible and readable.
  const solid = scrolled || currentPage !== 'home';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxury ${
          solid ? 'glass shadow-sm shadow-coffee-900/5 py-3' : 'bg-transparent py-5'
        }`}
      >
        {/* Top accent line when scrolled */}
        <div className={`absolute top-0 inset-x-0 h-px gold-divider transition-opacity duration-500 ${solid ? 'opacity-30' : 'opacity-0'}`} />

        <div className="container-xl flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => handleNav('home')} className="flex items-center group">
            <img
              src="/logo.png"
              alt="بن شغف"
              className="h-10 w-auto object-contain transition-all duration-500 ease-luxury group-hover:scale-105 sm:h-12"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`relative rounded-full px-5 py-2 text-sm font-bold transition-colors duration-300 ${
                  currentPage === item.key
                    ? solid ? 'text-coffee-900' : 'text-gold-300'
                    : solid ? 'text-coffee-600 hover:text-coffee-900' : 'text-cream-200/80 hover:text-gold-300'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gold-400 transition-all duration-500 ease-luxury ${currentPage === item.key ? 'w-5' : 'w-0'}`} />
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav('cart')}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ease-luxury ${
                solid ? 'bg-coffee-50 text-coffee-800 hover:bg-coffee-100' : 'bg-white/10 text-cream-100 backdrop-blur-md hover:bg-white/20'
              }`}
              aria-label="سلة المشتريات"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-l from-gold-400 to-gold-300 px-1 text-[10px] font-extrabold text-coffee-900 shadow-sm animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 md:hidden ${
                solid ? 'bg-coffee-50 text-coffee-800' : 'bg-white/10 text-cream-100 backdrop-blur-md'
              }`}
              aria-label="القائمة"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-coffee-950/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-cream-50 shadow-2xl transition-transform duration-500 ease-luxury ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="absolute top-0 inset-x-0 h-px gold-divider opacity-30" />
          <div className="flex flex-col gap-2 p-6 pt-24">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`rounded-xl px-5 py-3.5 text-right text-base font-bold transition-all duration-300 ${
                  currentPage === item.key ? 'bg-gradient-to-l from-coffee-800 to-coffee-700 text-cream-100 shadow-sm' : 'text-coffee-700 hover:bg-coffee-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
