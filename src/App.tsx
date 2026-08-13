import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductGrid } from './components/ProductGrid';
import { PromoBanners } from './components/PromoBanners';
import { PopularProducts } from './components/PopularProducts';
import { BrandStory } from './components/BrandStory';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { FloatingDock } from '@/components/ui/floating-dock';
import { IconHome, IconShoppingBag, IconBook, IconStar, IconBrandGithub } from '@tabler/icons-react';
import { PRODUCTS } from './data/products';
import type { CategoryType } from './types';
import { CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { toastMessage } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery] = useState('');
  const [sortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [organicOnly] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('honey_dark_mode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('honey_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const scrollToProducts = () => {
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-warm-bg dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors duration-200 selection:bg-[#c8674d] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#3b2319] text-[#f4ebd9] px-4 py-3 rounded-2xl shadow-2xl border border-amber-600/40 flex items-center space-x-2 text-xs sm:text-sm font-semibold animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-[#e89b7b] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Navigation Header */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Hero Showcase Section */}
      <Hero onExploreClick={scrollToProducts} />

      {/* 5 White Pill Badges Trust Strip */}
      <TrustStrip />

      {/* "Shop by Category" Showcase Card */}
      <CategoryShowcase onSelectCategory={setSelectedCategory} />

      {/* Main Product Catalog Section ("Featured Products") */}
      <main id="product-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          organicOnly={organicOnly}
          onSelectCategory={setSelectedCategory}
        />
      </main>

      {/* 2 Side-by-Side Promo Cards (Zero Delivery Fee & Taste of Tradition) */}
      <PromoBanners onShopClick={scrollToProducts} />

      {/* "Popular Products" Section */}
      <PopularProducts products={PRODUCTS} onSelectCategory={setSelectedCategory} />

      {/* Brand Heritage Story */}
      <BrandStory />

      {/* Customer Testimonials & Reviews */}
      <Testimonials />

      {/* Footer */}
      <Footer />

      {/* Overlays & Modals */}
      <ProductModal />
      <CartDrawer />
      <AuthModal />

      {/* Floating Dock Navigation (Mobile Only) */}
      <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none md:hidden">
        <div className="pointer-events-auto">
          <FloatingDock
            items={[
              {
                title: 'Home',
                icon: <IconHome className="h-full w-full text-stone-700 dark:text-stone-200" />,
                href: '#',
              },
              {
                title: 'Catalog',
                icon: <IconShoppingBag className="h-full w-full text-stone-700 dark:text-stone-200" />,
                href: '#product-catalog',
              },
              {
                title: 'Story',
                icon: <IconBook className="h-full w-full text-stone-700 dark:text-stone-200" />,
                href: '#brand-story',
              },
              {
                title: 'Reviews',
                icon: <IconStar className="h-full w-full text-stone-700 dark:text-stone-200" />,
                href: '#testimonials',
              },
              {
                title: 'GitHub',
                icon: <IconBrandGithub className="h-full w-full text-stone-700 dark:text-stone-200" />,
                href: 'https://github.com/krshhh6/natural-bee-farm',
              },
            ]}
          />
        </div>
      </div>

    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
