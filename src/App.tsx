import { useState, useEffect, useCallback } from 'react';
import { CartProvider } from '@/context/CartContext';
import Header, { type Page } from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Home from '@/pages/Home';
import Store from '@/pages/Store';
import Contact from '@/pages/Contact';
import ProductDetail from '@/pages/ProductDetail';
import CartPage from '@/pages/CartPage';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [productId, setProductId] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('product/')) {
      const id = hash.split('/')[1];
      if (id) {
        setPage('store');
        setProductId(id);
        return;
      }
    }
    if (['home', 'store', 'contact', 'cart'].includes(hash)) {
      setPage(hash as Page);
      setProductId(null);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      window.location.hash = `product/${productId}`;
    } else {
      window.location.hash = page;
    }
  }, [page, productId]);

  const navigate = useCallback((next: Page) => {
    setProductId(null);
    if (next === page) return;
    setTransitioning(true);
    setTimeout(() => {
      setPage(next);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      requestAnimationFrame(() => {
        setTransitioning(false);
      });
    }, 320);
  }, [page]);

  const openProduct = useCallback((id: string) => {
    setProductId(id);
    setPage('store');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <ScrollProgress />
        <Header currentPage={page} onNavigate={navigate} />
        <main
          className={`flex-1 transition-all duration-500 ease-luxury ${
            transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {page === 'home' && <Home onNavigate={navigate} onOpenProduct={openProduct} />}
          {page === 'store' && !productId && (
            <Store onOpenProduct={openProduct} onNavigate={navigate} />
          )}
          {page === 'store' && productId && (
            <ProductDetail productId={productId} onNavigate={navigate} onOpenProduct={openProduct} />
          )}
          {page === 'cart' && (
            <CartPage onNavigate={navigate} onOpenProduct={openProduct} />
          )}
          {page === 'contact' && <Contact />}
        </main>
        <Footer onNavigate={navigate} />
        <BackToTop />
      </div>
    </CartProvider>
  );
}
