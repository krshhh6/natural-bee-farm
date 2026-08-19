import React, { useState } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  MapPin,
  Package,
  Coins,
  Settings,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import type { ProfileTab, AppPage } from '../types';

interface NavbarProps {
  selectedCategory: string;
  onSelectCategory: (category: any) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentPage?: AppPage | 'admin';
  onNavigate?: (page: AppPage | 'admin', tab?: ProfileTab) => void;
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
  const { user, setIsAuthModalOpen, setActiveProfileTab, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const categories = [
    { id: 'all', label: 'All Honey' },
    { id: 'honey', label: 'Wild Forest Honey' },
    { id: 'honey', label: 'Himalayan Acacia & Sidr' },
    { id: 'honey', label: 'Spice & Saffron Infused' },
    { id: 'honey', label: 'Ayurvedic Blends' },
    { id: 'honey', label: 'Monofloral Blossoms' },
    { id: 'honey', label: 'Herbal Honey' },
    { id: 'honey', label: 'Raw Honeycomb' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('products');
    }
  };

  const handleGoToAccount = (tab: ProfileTab = 'profile') => {
    setActiveProfileTab(tab);
    if (onNavigate) {
      onNavigate('account', tab);
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
              className="lg:hidden p-2 rounded-lg text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E] focus:outline-none cursor-pointer"
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
                  currentPage === 'home'
                    ? 'font-bold text-[#9C5B23] dark:text-[#E9BE5F]'
                    : 'text-[#3D3730] dark:text-[#E6DBCB]'
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
                  className={`flex items-center gap-1 transition-colors hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] cursor-pointer ${
                    currentPage === 'products'
                      ? 'font-bold text-[#9C5B23] dark:text-[#E9BE5F]'
                      : 'text-[#3D3730] dark:text-[#E6DBCB]'
                  }`}
                >
                  <span>Shop</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      shopDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {shopDropdownOpen && (
                  <div className="absolute top-full pt-2 left-0 w-56 z-50 animate-fadeIn">
                    <div className="bg-white dark:bg-[#231F1B] rounded-xl shadow-2xl border border-[#E7DFD3] dark:border-neutral-800 py-2">
                      {categories.map((cat, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            onSelectCategory(cat.id);
                            onNavigate?.('products');
                            setShopDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#FDF8F0] dark:hover:bg-[#2F2923] transition-colors cursor-pointer ${
                            selectedCategory === cat.id
                              ? 'text-[#9C5B23] dark:text-[#E9BE5F] font-bold'
                              : 'text-[#3D3730] dark:text-[#E6DBCB]'
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
              className="flex flex-col items-center group py-1"
            >
              {/* Circular Logo Icon */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex items-center justify-center p-0.5 bg-[#FEFDF5] dark:bg-[#1A1816] shadow-xs group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="Natural Bee Farm Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Small Brand Title */}
              <span className="font-serif text-xs sm:text-sm font-bold tracking-wider text-[#231F1B] dark:text-white uppercase leading-none mt-1">
                NATURAL <span className="text-[#9C5B23] dark:text-[#E9BE5F]">BEE FARM</span>
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
                className="absolute right-2.5 text-[#8C5E2B] dark:text-[#E9BE5F] hover:text-[#231F1B] transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Dark Mode Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E] transition-all duration-300 transform hover:rotate-45 hover:scale-110 active:scale-90 cursor-pointer"
              aria-label="Toggle Theme Mode"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-[#E9BE5F]" /> : <Moon className="w-5 h-5 text-[#231F1B]" />}
            </button>

            {/* User Account Button & Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => user && setUserDropdownOpen(true)}
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  if (user) {
                    handleGoToAccount('profile');
                  } else {
                    setIsAuthModalOpen(true);
                  }
                }}
                className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                  currentPage === 'account'
                    ? 'bg-[#9C5B23] text-white shadow-md'
                    : 'text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]'
                }`}
                aria-label="User Account"
                title={user ? `${user.name} - View Account` : 'Sign In / Register'}
              >
                {user ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9C5B23] to-[#B8661B] text-white flex items-center justify-center font-bold text-xs shadow-sm border border-amber-300">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                ) : (
                  <User className="w-5 h-5 text-[#231F1B] dark:text-[#FEFDF5]" />
                )}
              </button>

              {/* Rich User Dropdown */}
              {user && userDropdownOpen && (
                <div className="absolute top-full pt-1.5 right-0 w-64 z-50 animate-slide-down">
                  <div className="bg-[#FEFDF5] dark:bg-[#1E1C18] rounded-2xl shadow-2xl border-2 border-[#E8D5B7] dark:border-[#3D372E] p-3 space-y-2">
                    
                    {/* Header Card */}
                    <div
                      onClick={() => {
                        handleGoToAccount('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="p-2.5 bg-paper-texture dark:bg-[#25221D] rounded-xl border border-[#E8D5B7] dark:border-[#3D372E] cursor-pointer hover:border-[#9C5B23] transition-colors"
                    >
                      <div className="font-serif font-bold text-sm text-[#2C1810] dark:text-white truncate">
                        {user.name}
                      </div>
                      <div className="text-[11px] text-[#8C7A65] dark:text-[#A09383] truncate">
                        {user.email}
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-black text-[#9C5B23] dark:text-[#E9BE5F] mt-1.5 pt-1.5 border-t border-[#E8D5B7]/60">
                        <span>🍯 Honey Wallet</span>
                        <span>{user.honeyPoints ?? 240} pts</span>
                      </div>
                    </div>

                    {/* Navigation Menu Items */}
                    <div className="space-y-0.5 text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF]">
                      <button
                        onClick={() => {
                          handleGoToAccount('profile');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#FAF5EB] dark:hover:bg-[#2A2620] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#9C5B23]" />
                          <span>Personal Details</span>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          handleGoToAccount('addresses');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#FAF5EB] dark:hover:bg-[#2A2620] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#9C5B23]" />
                          <span>Saved Addresses</span>
                        </div>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-[#FAF5EB] dark:bg-[#2A2620] border border-[#E8D5B7]">
                          {user.addresses?.length || 0}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          handleGoToAccount('orders');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#FAF5EB] dark:hover:bg-[#2A2620] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Package className="w-3.5 h-3.5 text-[#9C5B23]" />
                          <span>My Orders &amp; Tracking</span>
                        </div>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-[#FAF5EB] dark:bg-[#2A2620] border border-[#E8D5B7]">
                          {user.orders?.length || 0}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          handleGoToAccount('wishlist');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#FAF5EB] dark:hover:bg-[#2A2620] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Heart className="w-3.5 h-3.5 text-[#9C5B23]" />
                          <span>Saved Wishlist</span>
                        </div>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-[#FAF5EB] dark:bg-[#2A2620] border border-[#E8D5B7]">
                          {user.wishlist?.length || 0}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          handleGoToAccount('rewards');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#FAF5EB] dark:hover:bg-[#2A2620] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Coins className="w-3.5 h-3.5 text-[#9C5B23]" />
                          <span>Honey Points Wallet</span>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          handleGoToAccount('settings');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#FAF5EB] dark:hover:bg-[#2A2620] rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="w-3.5 h-3.5 text-[#9C5B23]" />
                          <span>Security &amp; Preferences</span>
                        </div>
                      </button>
                    </div>

                    <div className="pt-1.5 border-t border-[#E8D5B7] dark:border-[#3D372E]">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          onNavigate?.('home');
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
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
              onClick={() => {
                if (user) {
                  handleGoToAccount('wishlist');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="hidden sm:block p-2 rounded-full text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E] transition-all duration-200 transform hover:scale-110 active:scale-90 cursor-pointer relative"
              aria-label="Wishlist"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5 text-[#231F1B] dark:text-[#FEFDF5]" />
              {user && (user.wishlist || []).length > 0 && (
                <span className="absolute 0 top-1 right-1 w-2 h-2 bg-[#9C5B23] rounded-full animate-ping" />
              )}
            </button>

            {/* Cart Icon with Red Circle Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E] rounded-full transition-all duration-200 transform hover:scale-110 active:scale-90 flex items-center justify-center cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6 text-[#231F1B] dark:text-[#FEFDF5]" />
              <span className="absolute -top-0.5 -right-0.5 bg-[#D92626] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-[#FEFDF5] dark:border-[#1A1816] animate-pulse">
                {cartCount}
              </span>
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 px-2 space-y-2 border-t border-[#E7DFD3] dark:border-neutral-800 animate-slide-down bg-[#FEFDF5] dark:bg-[#1E1C18] rounded-b-2xl shadow-xl">
            
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearchSubmit} className="px-2 pb-2">
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

            {/* User Account Mobile Card */}
            {user ? (
              <div
                onClick={() => {
                  handleGoToAccount('profile');
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-paper-texture dark:bg-[#25221D] rounded-xl border border-[#E8D5B7] dark:border-[#3D372E] flex items-center justify-between cursor-pointer mb-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#9C5B23] text-white flex items-center justify-center font-bold text-sm shadow-sm border border-amber-300">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="font-serif font-bold text-sm text-[#2C1810] dark:text-white">{user.name}</div>
                    <div className="text-[11px] text-[#9C5B23] dark:text-[#E9BE5F] font-bold">🍯 {user.honeyPoints ?? 240} Honey Points</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#9C5B23] underline">Open Dashboard &rarr;</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-[#9C5B23] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm mb-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Register Account</span>
              </button>
            )}

            {user && (
              <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
                <button
                  onClick={() => {
                    handleGoToAccount('orders');
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 bg-[#FAF5EB] dark:bg-[#25221D] rounded-lg text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] flex items-center gap-1.5 border border-[#E8D5B7] dark:border-[#3D372E] cursor-pointer"
                >
                  <Package className="w-3.5 h-3.5 text-[#9C5B23]" />
                  <span>My Orders ({user.orders?.length || 0})</span>
                </button>
                <button
                  onClick={() => {
                    handleGoToAccount('addresses');
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 bg-[#FAF5EB] dark:bg-[#25221D] rounded-lg text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] flex items-center gap-1.5 border border-[#E8D5B7] dark:border-[#3D372E] cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#9C5B23]" />
                  <span>Addresses ({user.addresses?.length || 0})</span>
                </button>
              </div>
            )}

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
              {categories.map((cat, idx) => (
                <button
                  key={idx}
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

export default Navbar;
