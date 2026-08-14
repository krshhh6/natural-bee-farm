import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { PromoBanners } from './components/PromoBanners';
import { PopularProducts } from './components/PopularProducts';
import { HeritagePillars } from './components/HeritagePillars';
import { BrandStory } from './components/BrandStory';
import { GallerySection } from './components/GallerySection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { ProductsPage } from './components/ProductsPage';
import { PRODUCTS } from './data/products';
import type { CategoryType } from './types';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const { toastMessage, setQuickViewProduct, setIsCartOpen, cartCount } = useCart();
  const [currentPage, setCurrentPage] = useState<'home' | 'products'>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
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

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProducts = (category?: CategoryType) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FEFDF5] dark:bg-[#1C1C18] text-[#282823] dark:text-[#FEFDF5] transition-colors duration-200 selection:bg-[#E9BE5F] selection:text-[#282823]">
      
      {/* Toast Notification with Hover Go To Cart Button */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 left-6 sm:left-auto sm:max-w-md z-50 bg-[#282823]/95 backdrop-blur-md text-[#FEFDF5] px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-2xl border border-[#E9BE5F]/50 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold animate-slide-up">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-5 h-5 text-[#E9BE5F] shrink-0 animate-bounce" />
            <span className="truncate">{toastMessage}</span>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="shrink-0 bg-gradient-to-r from-[#9C5B23] to-[#B8661B] hover:from-[#834917] hover:to-[#9C5B23] text-white px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-all transform hover:scale-105 active:scale-95 border border-white/20 cursor-pointer animate-pulse-glow"
          >
            <span>Go to Cart</span>
            <ShoppingBag className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Persistent Floating Hover "Go to Cart" Pill when cart has items */}
      {!toastMessage && cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-[#9C5B23] hover:bg-[#834917] text-white px-5 py-3 rounded-full text-xs sm:text-sm font-extrabold shadow-2xl shadow-[#9C5B23]/40 border-2 border-white dark:border-[#1C1C18] flex items-center gap-2.5 transition-all transform hover:scale-108 active:scale-95 cursor-pointer group"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="absolute -top-2 -right-2 bg-[#E9BE5F] text-[#282823] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </div>
            <span className="font-serif tracking-wider">Go to Cart</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Navigation Header */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => navigateToProducts(cat)}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentPage={currentPage}
        onNavigate={(page) => (page === 'home' ? navigateToHome() : navigateToProducts())}
      />

      {/* Page View Switcher */}
      {currentPage === 'products' ? (
        <ProductsPage
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onQuickView={setQuickViewProduct}
          onNavigateHome={navigateToHome}
        />
      ) : (
        <>
          {/* Hero Showcase Section */}
          <Hero onExploreClick={() => navigateToProducts()} />

          {/* "Shop by Category" Showcase Card */}
          <CategoryShowcase
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => navigateToProducts(cat)}
          />

          {/* 2 Side-by-Side Promo Cards (Zero Delivery Fee & Taste of Tradition) */}
          <PromoBanners onShopClick={() => navigateToProducts()} />

          {/* Top 4 Honey Showcase Section */}
          <PopularProducts
            products={PRODUCTS}
            onQuickView={setQuickViewProduct}
            onExploreClick={() => navigateToProducts()}
            onSelectCategory={(cat) => navigateToProducts(cat)}
          />

          {/* Heritage Pillars Section (Source To Table, Time-Honored Techniques, Unwavering Purity, Commitment to Community) */}
          <HeritagePillars />

          {/* Brand Heritage Story */}
          <BrandStory />

          {/* Visual Odyssey Gallery Section */}
          <GallerySection />

          {/* Customer Testimonials & Reviews */}
          <Testimonials />

          {/* Footer */}
          <Footer />
        </>
      )}

      {/* Overlays & Modals */}
      <ProductModal />
      <CartDrawer />
      <AuthModal />



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
