import React, { useState } from 'react';
import { Search, User, ShoppingBag, Heart, ChevronDown, Menu, X, LogOut, Sun, Moon, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  selectedCategory: string;
  onSelectCategory: (category: any) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentPage?: 'home' | 'products' | 'admin';
  onNavigate?: (page: 'home' | 'products' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  isDarkMode,
  toggleDarkMode,
  currentPage = 'home',
  onNavigate,
}) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const categories = [
    { id: 'all', label: 'All Delicacies' },
    { id: 'honey', label: 'Artisanal Honey' },
    { id: 'ghee', label: 'Bilona A2 Ghee' },
    { id: 'oils', label: 'Cold Pressed Oils' },
    { id: 'pickles', label: 'Traditional Pickles' },
    { id: 'badis', label: 'Sun-Dried Badis' },
    { id: 'spices', label: 'Handcrafted Spices' },
    { id: 'flours', label: 'Organic Flours' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('products');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FEFDF5]/95 dark:bg-[#1A1816]/95 backdrop-blur-md border-b border-[#E7DFD3] dark:border-neutral-800 text-[#231F1B] dark:text-[#FEFDF5] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* LEFT SECTION: Main Navigation Links */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 font-medium text-sm sm:text-base">
              
              {/* Home */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('home');
                }}
                className={`transition-colors hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] ${
                  currentPage === 'home' ? 'font-bold text-[#9C5B23] dark:text-[#E9BE5F]' : 'text-[#3D3730] dark:text-[#E6DBCB]'
                }`}
              >
                Home
              </a>

              {/* Shop Dropdown */}
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
                  className={`flex items-center gap-1 transition-colors hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] ${
                    currentPage === 'products' ? 'font-bold text-[#9C5B23] dark:text-[#E9BE5F]' : 'text-[#3D3730] dark:text-[#E6DBCB]'
                  }`}
                >
                  <span>Shop</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {shopDropdownOpen && (
                  <div className="absolute top-full pt-2 left-0 w-56 z-50 animate-fadeIn">
                    <div className="bg-white dark:bg-[#231F1B] rounded-xl shadow-2xl border border-[#E7DFD3] dark:border-neutral-800 py-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onSelectCategory(cat.id);
                            onNavigate?.('products');
                            setShopDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#FDF8F0] dark:hover:bg-[#2F2923] transition-colors ${
                            selectedCategory === cat.id ? 'text-[#9C5B23] dark:text-[#E9BE5F] font-bold' : 'text-[#3D3730] dark:text-[#E6DBCB]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Our Story */}
              <a
                href="#our-story"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('home');
                  setTimeout(() => {
                    const el = document.getElementById('our-story');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-[#3D3730] dark:text-[#E6DBCB] hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors"
              >
                Our Story
              </a>

              {/* Admin Panel Access Link */}
              <button
                onClick={() => onNavigate?.('admin')}
                className={`flex items-center gap-1.5 transition-colors px-2.5 py-1 rounded-full text-xs font-bold ${
                  currentPage === 'admin'
                    ? 'bg-[#9C5B23] text-white shadow-sm'
                    : 'text-[#9C5B23] dark:text-[#E9BE5F] bg-[#9C5B23]/10 dark:bg-[#E9BE5F]/10 hover:bg-[#9C5B23] hover:text-white'
                }`}
                title="Open Admin & Business Operations Panel"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </button>

            </nav>
          </div>

          {/* CENTER SECTION: Centered Brand Logo & Typography */}
          <div className="flex flex-col items-center justify-center text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('home');
              }}
              className="flex flex-col items-center group"
            >
              {/* Circular Logo Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center p-0.5 bg-[#FEFDF5] dark:bg-[#1A1816] shadow-xs group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="Natura Bee Farm Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Brand Title */}
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-widest text-[#231F1B] dark:text-white uppercase leading-none mt-1">
                NATURA <span className="text-[#9C5B23] dark:text-[#E9BE5F]">BEE FARM</span>
              </span>

              {/* Brand Tagline Subtext */}
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold text-[#8C5E2B] dark:text-[#E9BE5F]/80 uppercase mt-0.5">
                ARTISANAL TRADITION
              </span>
            </a>
          </div>

          {/* RIGHT SECTION: Search Bar, Account, Wishlist & Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Bar Input */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="w-40 lg:w-56 bg-[#F5EEDD] dark:bg-[#25221D] border border-[#E0D0B6] dark:border-[#40382C] text-[#231F1B] dark:text-[#FEFDF5] placeholder-[#8C7A65] dark:placeholder-[#998A76] rounded-lg px-3.5 py-2 pr-9 text-xs sm:text-sm focus:outline-none focus:border-[#9C5B23] dark:focus:border-[#E9BE5F] transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-2.5 text-[#8C5E2B] dark:text-[#E9BE5F] hover:text-[#231F1B] transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E] transition-colors"
              aria-label="Toggle Theme Mode"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-[#E9BE5F]" /> : <Moon className="w-5 h-5 text-[#231F1B]" />}
            </button>

            {/* User Account Button */}
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
                className="p-2 rounded-full text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E] transition-colors flex items-center gap-1"
                aria-label="User Account"
                title={user ? user.name : 'Sign In / Register'}
              >
                {user ? (
                  <div className="w-8 h-8 rounded-full bg-[#9C5B23] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <User className="w-5 h-5 text-[#231F1B] dark:text-[#FEFDF5]" />
                )}
              </button>

              {/* User Dropdown */}
              {user && userDropdownOpen && (
                <div className="absolute top-full pt-1.5 right-0 w-56 z-50 animate-fadeIn">
                  <div className="bg-white dark:bg-[#231F1B] rounded-xl shadow-xl border border-[#E7DFD3] dark:border-neutral-800 p-3">
                    <div className="px-3 py-2 border-b border-[#E7DFD3] dark:border-neutral-800">
                      <div className="font-bold text-sm text-[#231F1B] dark:text-[#FEFDF5] truncate">{user.name}</div>
                      <div className="text-xs text-[#9C5B23] dark:text-[#E9BE5F] truncate">{user.email}</div>
                    </div>
                    <div className="pt-2 space-y-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate?.('admin');
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-[#9C5B23] dark:text-[#E9BE5F] hover:bg-[#FDF8F0] dark:hover:bg-[#2F2923] rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Admin Operations</span>
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-[#FDF8F0] dark:hover:bg-[#2F2923] rounded-lg flex items-center gap-2 transition-colors"
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
              className="hidden sm:block p-2 rounded-full text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-[#231F1B] dark:text-[#FEFDF5]" />
            </button>

            {/* Cart Icon with Red Circle Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E] rounded-full transition-colors flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6 text-[#231F1B] dark:text-[#FEFDF5]" />
              <span className="absolute -top-0.5 -right-0.5 bg-[#D92626] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-[#FEFDF5] dark:border-[#1A1816]">
                {cartCount}
              </span>
            </button>

          </div>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E7DFD3] dark:border-neutral-800 space-y-3 animate-fadeIn bg-[#FEFDF5] dark:bg-[#1A1816]">
            
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearchSubmit} className="px-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-[#F5EEDD] dark:bg-[#25221D] border border-[#E0D0B6] dark:border-[#40382C] text-[#231F1B] dark:text-[#FEFDF5] placeholder-[#8C7A65] rounded-lg px-3.5 py-2 pr-9 text-xs"
                />
                <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C5E2B]">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate?.('home');
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]"
            >
              Home
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate?.('products');
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]"
            >
              Shop All Products
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate?.('home');
                setTimeout(() => {
                  const el = document.getElementById('our-story');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]"
            >
              Our Story
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate?.('home');
                setTimeout(() => {
                  const el = document.getElementById('gallery');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]"
            >
              Gallery
            </button>

            <div className="pt-2 border-t border-[#E7DFD3] dark:border-neutral-800">
              <div className="px-4 py-1 text-xs font-bold text-[#8C5E2B] dark:text-[#E9BE5F] uppercase tracking-wider">Shop Categories</div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onNavigate?.('products');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#9C5B23] text-white font-bold'
                      : 'text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]'
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
