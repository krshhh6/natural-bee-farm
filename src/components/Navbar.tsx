import React, { useState } from 'react';
import { Home, Store, Info, MessageSquare, User, Heart, ShoppingBag, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  selectedCategory: string;
  onSelectCategory: (category: any) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Logo - Meadlight Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="#" className="flex items-center space-x-3 group">
              <img
                src="/logo.png"
                alt="Meadlight Honey Jar Logo"
                className="w-12 h-12 object-contain transform group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#2d1e18] dark:text-amber-50 leading-none">
                  Mead<span className="text-[#c8674d]">light</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500 dark:text-amber-400/80 mt-0.5">
                  Artisanal Honey & Co.
                </span>
              </div>
            </a>
          </div>

          {/* Center Floating Pill Navigation Bar */}
          <nav className="hidden lg:flex items-center bg-[#f4ebd9] dark:bg-stone-800/90 p-1.5 rounded-full shadow-inner border border-stone-200/50 dark:border-stone-700">
            
            {/* Home Pill */}
            <a
              href="#"
              className="bg-[#c8674d] text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md shadow-[#c8674d]/25 transition-transform hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>

            {/* Shop Dropdown Pill */}
            <div className="relative">
              <button
                onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                className="text-stone-800 dark:text-stone-200 hover:text-[#c8674d] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors"
              >
                <Store className="w-4 h-4" />
                <span>Shop</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {/* Dropdown Menu */}
              {shopDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-48 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 py-2 z-50 animate-fadeIn">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setShopDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ${
                        selectedCategory === cat.id ? 'text-[#c8674d] font-bold' : 'text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About Pill */}
            <a
              href="#our-story"
              className="text-stone-800 dark:text-stone-200 hover:text-[#c8674d] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </a>

            {/* Contact Pill */}
            <a
              href="#contact"
              className="text-stone-800 dark:text-stone-200 hover:text-[#c8674d] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact</span>
            </a>

          </nav>

          {/* Right User, Wishlist & Cart Pill Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* User Account / Profile Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  if (user) {
                    setUserDropdownOpen(!userDropdownOpen);
                  } else {
                    setIsAuthModalOpen(true);
                  }
                }}
                className="p-2 rounded-full text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1"
                aria-label="User Account"
                title={user ? user.name : 'Sign In / Register'}
              >
                {user ? (
                  <div className="w-8 h-8 rounded-full bg-[#c8674d] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>

              {/* User Logged In Dropdown */}
              {user && userDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-56 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-3 z-50 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800">
                    <div className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">{user.name}</div>
                    <div className="text-xs text-stone-500 truncate">{user.email}</div>
                  </div>
                  <div className="pt-2 space-y-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Heart Icon */}
            <button
              onClick={() => alert('Wishlist items')}
              className="p-2.5 rounded-full text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>

            {/* Terracotta Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#c8674d] hover:bg-[#b5563d] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-[#c8674d]/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              <span className="bg-white/25 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </button>

          </div>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200 dark:border-stone-800 space-y-2 animate-fadeIn">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#c8674d] text-white font-bold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

      </div>
    </header>
  );
};
