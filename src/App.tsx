import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider, useStore } from '@/context/StoreContext';
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
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { FloatingDock } from '@/components/ui/floating-dock';
import { IconHome, IconShoppingBag, IconStar, IconLock } from '@tabler/icons-react';
import type { CategoryType } from './types';
import { CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { toastMessage, setQuickViewProduct } = useCart();
  const { products, isAdminLoggedIn } = useStore();
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'admin'>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

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

  const navigateToAdmin = () => {
    if (isAdminLoggedIn) {
      setCurrentPage('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  const handleAdminAuthSuccess = () => {
    setCurrentPage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render full-screen Admin Dashboard when currentPage === 'admin'
  if (currentPage === 'admin' && isAdminLoggedIn) {
    return (
      <AdminDashboard
        onReturnToStore={navigateToHome}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FEFDF5] dark:bg-[#1C1C18] text-[#282823] dark:text-[#FEFDF5] transition-colors duration-200 selection:bg-[#E9BE5F] selection:text-[#282823]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#282823] text-[#F5E8B6] px-4 py-3 rounded-2xl shadow-2xl border border-[#595C56]/40 flex items-center space-x-2 text-xs sm:text-sm font-semibold animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-[#E9BE5F] shrink-0" />
          <span>{toastMessage}</span>
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
        onNavigate={(page) => {
          if (page === 'home') navigateToHome();
          else if (page === 'products') navigateToProducts();
          else if (page === 'admin') navigateToAdmin();
        }}
      />

      {/* Page View Switcher */}
      {currentPage === 'products' ? (
        <ProductsPage
          products={products}
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
            products={products}
            onQuickView={setQuickViewProduct}
            onExploreClick={() => navigateToProducts()}
            onSelectCategory={(cat) => navigateToProducts(cat)}
          />

          {/* Heritage Pillars Section */}
          <HeritagePillars />

          {/* Brand Heritage Story */}
          <BrandStory />

          {/* Visual Odyssey Gallery Section */}
          <GallerySection />

          {/* Customer Testimonials & Reviews */}
          <Testimonials />

          {/* Footer */}
          <Footer onNavigateAdmin={navigateToAdmin} />
        </>
      )}

      {/* Overlays & Modals */}
      <ProductModal />
      <CartDrawer />
      <AuthModal />
      
      {/* Admin Authentication Gate Modal */}
      <AdminLoginModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={handleAdminAuthSuccess}
      />

      {/* Floating Dock Navigation (Mobile Only) */}
      <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none md:hidden px-3">
        <div className="pointer-events-auto max-w-[calc(100vw-1.5rem)]">
          <FloatingDock
            items={[
              {
                title: 'Home',
                icon: <IconHome className="h-full w-full text-[#F5E8B6]" />,
                href: '#',
                onClick: navigateToHome,
              },
              {
                title: 'Catalog',
                icon: <IconShoppingBag className="h-full w-full text-[#F5E8B6]" />,
                href: '#',
                onClick: () => navigateToProducts(),
              },
              {
                title: 'Admin',
                icon: <IconLock className="h-full w-full text-[#E9BE5F]" />,
                href: '#',
                onClick: navigateToAdmin,
              },
              {
                title: 'Reviews',
                icon: <IconStar className="h-full w-full text-[#F5E8B6]" />,
                href: '#testimonials',
                onClick: () => {
                  navigateToHome();
                  setTimeout(() => {
                    const el = document.getElementById('testimonials');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                },
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
    <StoreProvider>
      <AuthProvider>
        <CartProvider>
          <MainContent />
        </CartProvider>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;
