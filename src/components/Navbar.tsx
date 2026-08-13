import React, { useState } from 'react';
import { Home, Store, Info, MessageSquare, User, Heart, ShoppingBag, ChevronDown, Menu, X, LogOut, Image } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  selectedCategory: string;
  onSelectCategory: (category: any) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentPage?: 'home' | 'products';
  onNavigate?: (page: 'home' | 'products') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  currentPage = 'home',
  onNavigate,
}) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Delicacies' },
    { id: 'honey', label: 'Artisanal Honey' },
    { id: 'pickles', label: 'Traditional Pickles' },
    { id: 'badis', label: 'Sun-Dried Badis' },
    { id: 'spices', label: 'Handcrafted Spices' },
    { id: 'flours', label: 'Organic Flours' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#282823]/95 dark:bg-[#1C1C18]/95 backdrop-blur-md border-b border-[#595C56]/30 text-[#F5E8B6] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left Logo - Natura Bee Farm Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-[#F5E8B6] hover:bg-[#595C56]/30 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('home');
              }}
              className="flex items-center space-x-2 sm:space-x-3 group"
            >
              <img
                src="/logo.png"
                alt="Natura Bee Farm Logo"
                className="w-8 h-8 sm:w-12 sm:h-12 object-contain transform group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-base sm:text-2xl font-bold tracking-tight text-white leading-none truncate">
                  Natura <span className="text-[#E9BE5F]">Bee Farm</span>
                </span>
                <span className="hidden sm:block text-[10px] tracking-widest uppercase font-semibold text-[#F5E8B6]/80 mt-0.5">
                  Artisanal Honey & Co.
                </span>
              </div>
            </a>
          </div>

          {/* Center Floating Pill Navigation Bar */}
          <nav className="hidden lg:flex items-center bg-[#1C1C18] p-1.5 rounded-full shadow-inner border border-[#595C56]/40">
            
            {/* Home Pill */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('home');
              }}
              className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:scale-105 ${
                currentPage === 'home'
                  ? 'bg-[#E9BE5F] text-[#282823] shadow-md shadow-[#E9BE5F]/30'
                  : 'text-[#F5E8B6] hover:text-[#E9BE5F]'
              }`}
            >
              <Home className="w-4 h-4 text-[#282823]" />
              <span>Home</span>
            </a>

            {/* Shop Dropdown Pill */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  onNavigate?.('products');
                  setShopDropdownOpen(!shopDropdownOpen);
                }}
                className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 transition-all ${
                  currentPage === 'products'
                    ? 'bg-[#E9BE5F] text-[#282823] shadow-md shadow-[#E9BE5F]/30'
                    : 'text-[#F5E8B6] hover:text-[#E9BE5F]'
                }`}
              >
                <Store className="w-4 h-4 text-[#E9BE5F]" />
                <span>Shop</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#E9BE5F] transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {shopDropdownOpen && (
                <div className="absolute top-full pt-1.5 left-0 w-52 z-50 animate-fadeIn">
                  <div className="bg-[#282823] rounded-2xl shadow-xl border border-[#595C56]/40 py-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          onNavigate?.('products');
                          setShopDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#595C56]/30 transition-colors ${
                          selectedCategory === cat.id ? 'text-[#E9BE5F] font-bold' : 'text-[#F5E8B6]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Pill */}
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('gallery');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#F5E8B6] hover:text-[#E9BE5F] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              <Image className="w-4 h-4 text-[#E9BE5F]" />
              <span>Gallery</span>
            </a>

            {/* About Pill */}
            <a
              href="#our-story"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('our-story');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#F5E8B6] hover:text-[#E9BE5F] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              <Info className="w-4 h-4 text-[#E9BE5F]" />
              <span>About</span>
            </a>

            {/* Contact Pill */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#F5E8B6] hover:text-[#E9BE5F] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#E9BE5F]" />
              <span>Contact</span>
            </a>

          </nav>

          {/* Right User, Wishlist & Cart Pill Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* User Account / Profile Menu */}
            <div
              className="relative"
              onMouseEnter={() => user && setUserDropdownOpen(true)}
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  if (user) {
                    setUserDropdownOpen(!userDropdownOpen);
                  } else {
                    setIsAuthModalOpen(true);
                  }
                }}
                className="p-2 rounded-full text-[#F5E8B6] hover:bg-[#595C56]/30 transition-colors flex items-center gap-1"
                aria-label="User Account"
                title={user ? user.name : 'Sign In / Register'}
              >
                {user ? (
                  <div className="w-8 h-8 rounded-full bg-[#E9BE5F] text-[#282823] flex items-center justify-center font-bold text-xs shadow-sm border border-[#282823]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <User className="w-5 h-5 text-[#E9BE5F]" />
                )}
              </button>

              {/* User Logged In Dropdown */}
              {user && userDropdownOpen && (
                <div className="absolute top-full pt-1.5 right-0 w-56 z-50 animate-fadeIn">
                  <div className="bg-[#282823] rounded-2xl shadow-xl border border-[#595C56]/40 p-3">
                    <div className="px-3 py-2 border-b border-[#595C56]/30">
                      <div className="font-bold text-sm text-[#F5E8B6] truncate">{user.name}</div>
                      <div className="text-xs text-[#E9BE5F] truncate">{user.email}</div>
                    </div>
                    <div className="pt-2 space-y-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-red-400 hover:bg-[#595C56]/30 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Heart Icon */}
            <button
              onClick={() => alert('Wishlist feature - items saved to your favorites!')}
              className="p-2.5 rounded-full text-[#F5E8B6] hover:bg-[#595C56]/30 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-[#E9BE5F]" />
            </button>

            {/* Sunray Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-[#E9BE5F]/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#282823]" />
              <span>Cart</span>
              <span className="bg-[#282823]/20 text-[#282823] text-xs font-extrabold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </button>

          </div>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#595C56]/30 space-y-2 animate-fadeIn bg-[#282823]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#F5E8B6] hover:bg-[#595C56]/30 flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-[#E9BE5F]" />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('our-story');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#F5E8B6] hover:bg-[#595C56]/30 flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-[#E9BE5F]" />
              <span>About Us</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#F5E8B6] hover:bg-[#595C56]/30 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#E9BE5F]" />
              <span>Contact Us</span>
            </button>
            <div className="pt-2 border-t border-[#595C56]/30">
              <div className="px-4 py-1 text-xs font-bold text-[#E9BE5F] uppercase tracking-wider">Shop Categories</div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setMobileMenuOpen(false);
                    const el = document.getElementById('product-catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#E9BE5F] text-[#282823] font-bold'
                      : 'text-[#F5E8B6] hover:bg-[#595C56]/30'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
