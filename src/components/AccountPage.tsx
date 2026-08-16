import React, { useState } from 'react';
import {
  User,
  MapPin,
  Package,
  Heart,
  Settings,
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Truck,
  Check,
  LogOut,
  ShoppingBag,
  Receipt,
  RotateCcw,
  ChevronRight,
  ArrowLeft,
  Gift,
  Coins,
  Share2,
  Lock,
  Bell,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import type { Address, ProfileTab, Product } from '../types';

interface AccountPageProps {
  onNavigateHome: () => void;
  onNavigateProducts: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  onNavigateHome,
  onNavigateProducts,
}) => {
  const {
    user,
    activeProfileTab,
    setActiveProfileTab,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    toggleWishlist,
    logout,
  } = useAuth();

  const { addToCart, showToast, setIsCartOpen } = useCart();

  // Local state for Personal Info form
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '9939055989',
    gender: user?.gender || 'female',
    dob: user?.dob || '1996-05-18',
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSavedSuccess, setProfileSavedSuccess] = useState(false);

  // Address view & editing state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<Omit<Address, 'id'>>({
    name: user?.name || '',
    phone: user?.phone || '9939055989',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    type: 'home',
    isDefault: false,
  });

  // Password modal/form state
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPass: '',
    confirmPass: '',
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Notification toggles
  const [notifications, setNotifications] = useState({
    whatsapp: user?.notifications?.whatsapp ?? true,
    email: user?.notifications?.email ?? true,
    sms: user?.notifications?.sms ?? true,
    promotions: user?.notifications?.promotions ?? false,
  });

  // Order filter state
  const [orderFilter, setOrderFilter] = useState<'all' | 'In Transit' | 'Delivered'>('all');

  // Invoice modal state
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<any | null>(null);

  // Helper PIN code auto-fill for Indian pin codes
  const handlePincodeChange = (pincode: string) => {
    const cleaned = pincode.replace(/\D/g, '').slice(0, 6);
    let newCity = addressForm.city;
    let newState = addressForm.state;

    if (cleaned === '801111') {
      newCity = 'Patna';
      newState = 'Bihar';
    } else if (cleaned === '560103' || cleaned.startsWith('560')) {
      newCity = 'Bengaluru';
      newState = 'Karnataka';
    } else if (cleaned.startsWith('110')) {
      newCity = 'New Delhi';
      newState = 'Delhi';
    } else if (cleaned.startsWith('400')) {
      newCity = 'Mumbai';
      newState = 'Maharashtra';
    }

    setAddressForm((prev) => ({
      ...prev,
      pincode: cleaned,
      city: newCity,
      state: newState,
    }));
  };

  const handleStartAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      name: user?.name || '',
      phone: user?.phone || '9939055989',
      street: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      type: 'home',
      isDefault: (user?.addresses || []).length === 0,
    });
    setIsAddingAddress(true);
  };

  const handleStartEditAddress = (addr: Address) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      name: addr.name,
      phone: addr.phone,
      street: addr.street,
      landmark: addr.landmark || '',
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      type: addr.type,
      isDefault: addr.isDefault,
    });
    setIsAddingAddress(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.name || !addressForm.street || !addressForm.city || !addressForm.pincode) {
      showToast('Please fill in all mandatory address fields.');
      return;
    }

    if (editingAddressId) {
      updateAddress(editingAddressId, addressForm);
      showToast('Address updated successfully! 📍');
    } else {
      addAddress(addressForm);
      showToast('New delivery address added! 📍');
    }

    setIsAddingAddress(false);
    setEditingAddressId(null);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      updateProfile({
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone,
        gender: profileForm.gender as any,
        dob: profileForm.dob,
      });
      setIsSavingProfile(false);
      setProfileSavedSuccess(true);
      showToast('Profile information updated successfully! ✨');
      setTimeout(() => setProfileSavedSuccess(false), 3000);
    }, 400);
  };

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      const fullProd = PRODUCTS.find((p) => p.id === item.id) || {
        id: item.id,
        name: item.name,
        category: 'honey' as const,
        categoryName: 'Artisanal Honey',
        price: item.price,
        rating: 4.9,
        reviewsCount: 120,
        weight: item.weight,
        image: item.image,
        description: '100% Pure Raw Honey',
        ingredients: ['Pure Honey'],
        inStock: true,
        origin: 'Natura Bee Farm',
      };
      addToCart(fullProd as Product, item.weight);
    });
    setIsCartOpen(true);
    showToast(`Added ${order.items.length} items from Order #${order.id} to cart! 🍯`);
  };

  const wishlistedProducts = PRODUCTS.filter((p) => (user?.wishlist || []).includes(p.id));

  const filteredOrders = (user?.orders || []).filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  const tabTitles: Record<ProfileTab, { label: string; desc: string }> = {
    profile: {
      label: 'Personal Information',
      desc: 'Manage your personal details, honey reward points, and verified contact numbers.',
    },
    addresses: {
      label: 'Saved Address Book',
      desc: 'Add, modify, and manage your primary and alternate shipping destinations across India.',
    },
    orders: {
      label: 'My Orders & Tracking',
      desc: 'View real-time Shiprocket & Delhivery tracking, order receipts, and 1-click reorder.',
    },
    wishlist: {
      label: 'My Saved Wishlist',
      desc: 'Keep track of your favorite raw forest honey harvests and reserve seasonal batches.',
    },
    rewards: {
      label: 'Honey Rewards & Perks',
      desc: 'Track your Honey Points balance, cashback value, and VIP tier benefits.',
    },
    settings: {
      label: 'Security & Preferences',
      desc: 'Manage password, WhatsApp dispatch notifications, and account credentials.',
    },
  };

  return (
    <div className="min-h-screen bg-[#FEFDF5] dark:bg-[#161412] text-[#282823] dark:text-[#FEFDF5] transition-colors duration-200">
      
      {/* Top Breadcrumbs & Page Bar */}
      <div className="bg-[#FAF5EB] dark:bg-[#1E1B17] border-b border-[#E8D5B7] dark:border-[#3D372E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#8C7A65] dark:text-[#A69888]">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-[#2C1810] dark:text-[#FEFDF5] font-bold">My Account</span>
            <span>/</span>
            <span className="text-[#9C5B23] dark:text-[#E9BE5F] font-bold">
              {tabTitles[activeProfileTab]?.label}
            </span>
          </div>

          <button
            onClick={onNavigateProducts}
            className="flex items-center gap-1.5 font-bold text-[#9C5B23] dark:text-[#E9BE5F] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping Raw Honey</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        
        {/* VIP Account Header Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2C1810] via-[#422417] to-[#2C1810] text-white p-6 sm:p-8 shadow-2xl border border-amber-900/40">
          <div className="absolute inset-0 bg-[radial-gradient(#E9BE5F_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* User Profile Avatar & Basic Info */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative shrink-0">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br from-[#9C5B23] via-[#B8661B] to-[#E9BE5F] p-1 shadow-xl">
                  <div className="w-full h-full rounded-xl bg-[#2C1810] flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-serif font-black text-2xl sm:text-3xl text-[#E9BE5F]">
                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                      </span>
                    )}
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 p-1 bg-[#E9BE5F] text-[#2C1810] rounded-lg shadow-md">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                    {user?.name || 'Ananya Sharma'}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#E9BE5F]/20 text-[#E9BE5F] border border-[#E9BE5F]/40 shadow-xs">
                    <Sparkles className="w-3 h-3 fill-[#E9BE5F]" />
                    <span>{user?.membershipTier || 'Artisanal Gold Member'}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-amber-100/80">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#E9BE5F]" />
                    <span>{user?.email || 'ananya.sharma@example.com'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#E9BE5F]" />
                    <span>+91 {user?.phone || '99390 55989'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 shrink-0">
              <div
                onClick={() => setActiveProfileTab('orders')}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/10 transition-all cursor-pointer text-center"
              >
                <div className="text-[10px] text-amber-200/80 font-bold uppercase tracking-wider">Orders</div>
                <div className="text-base sm:text-lg font-black text-white">{user?.orders?.length || 2} Placed</div>
              </div>

              <div
                onClick={() => setActiveProfileTab('addresses')}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/10 transition-all cursor-pointer text-center"
              >
                <div className="text-[10px] text-amber-200/80 font-bold uppercase tracking-wider">Addresses</div>
                <div className="text-base sm:text-lg font-black text-white">{user?.addresses?.length || 2} Saved</div>
              </div>

              <div
                onClick={() => setActiveProfileTab('wishlist')}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/10 transition-all cursor-pointer text-center"
              >
                <div className="text-[10px] text-amber-200/80 font-bold uppercase tracking-wider">Wishlist</div>
                <div className="text-base sm:text-lg font-black text-white">{user?.wishlist?.length || 2} Items</div>
              </div>

              <div
                onClick={() => setActiveProfileTab('rewards')}
                className="bg-gradient-to-br from-[#9C5B23] to-[#B8661B] p-3 rounded-2xl border border-amber-400/40 shadow-lg text-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="text-[10px] text-amber-100 font-bold uppercase tracking-wider">Honey Wallet</div>
                <div className="text-base sm:text-lg font-black text-[#FEFDF5]">🍯 {user?.honeyPoints ?? 240} pts</div>
              </div>
            </div>

          </div>
        </div>

        {/* Two-Column Responsive Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sidebar Navigation Rail */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Navigation Tabs List */}
            <div className="bg-[#FAF5EB] dark:bg-[#1E1B17] rounded-3xl p-3 sm:p-4 border border-[#E8D5B7] dark:border-[#3D372E] shadow-sm space-y-1.5">
              <div className="px-3 py-2 text-[11px] font-black uppercase tracking-wider text-[#8C7A65] dark:text-[#A69888]">
                Account Dashboard
              </div>

              <button
                onClick={() => {
                  setActiveProfileTab('profile');
                  setIsAddingAddress(false);
                }}
                className={`w-full text-left px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                  activeProfileTab === 'profile'
                    ? 'bg-[#9C5B23] text-white shadow-md shadow-[#9C5B23]/25 font-black'
                    : 'text-[#4A3B32] dark:text-[#D8CFBF] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4" />
                  <span>Personal Details</span>
                </div>
                <ChevronRight className={`w-4 h-4 opacity-70 ${activeProfileTab === 'profile' ? 'rotate-90' : ''}`} />
              </button>

              <button
                onClick={() => {
                  setActiveProfileTab('addresses');
                  setIsAddingAddress(false);
                }}
                className={`w-full text-left px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                  activeProfileTab === 'addresses'
                    ? 'bg-[#9C5B23] text-white shadow-md shadow-[#9C5B23]/25 font-black'
                    : 'text-[#4A3B32] dark:text-[#D8CFBF] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses</span>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  activeProfileTab === 'addresses'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#E8D5B7] dark:bg-[#3D372E] text-[#5C4033] dark:text-[#FEFDF5]'
                }`}>
                  {user?.addresses?.length || 0}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveProfileTab('orders');
                  setIsAddingAddress(false);
                }}
                className={`w-full text-left px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                  activeProfileTab === 'orders'
                    ? 'bg-[#9C5B23] text-white shadow-md shadow-[#9C5B23]/25 font-black'
                    : 'text-[#4A3B32] dark:text-[#D8CFBF] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  <span>My Orders &amp; Tracking</span>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  activeProfileTab === 'orders'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#E8D5B7] dark:bg-[#3D372E] text-[#5C4033] dark:text-[#FEFDF5]'
                }`}>
                  {user?.orders?.length || 0}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveProfileTab('wishlist');
                  setIsAddingAddress(false);
                }}
                className={`w-full text-left px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                  activeProfileTab === 'wishlist'
                    ? 'bg-[#9C5B23] text-white shadow-md shadow-[#9C5B23]/25 font-black'
                    : 'text-[#4A3B32] dark:text-[#D8CFBF] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4" />
                  <span>Saved Wishlist</span>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  activeProfileTab === 'wishlist'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#E8D5B7] dark:bg-[#3D372E] text-[#5C4033] dark:text-[#FEFDF5]'
                }`}>
                  {user?.wishlist?.length || 0}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveProfileTab('rewards');
                  setIsAddingAddress(false);
                }}
                className={`w-full text-left px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                  activeProfileTab === 'rewards'
                    ? 'bg-[#9C5B23] text-white shadow-md shadow-[#9C5B23]/25 font-black'
                    : 'text-[#4A3B32] dark:text-[#D8CFBF] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Coins className="w-4 h-4" />
                  <span>Honey Rewards Wallet</span>
                </div>
                <span className="text-[10px] font-black text-[#9C5B23] dark:text-[#E9BE5F]">
                  {user?.honeyPoints ?? 240} pts
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveProfileTab('settings');
                  setIsAddingAddress(false);
                }}
                className={`w-full text-left px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                  activeProfileTab === 'settings'
                    ? 'bg-[#9C5B23] text-white shadow-md shadow-[#9C5B23]/25 font-black'
                    : 'text-[#4A3B32] dark:text-[#D8CFBF] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  <span>Security &amp; Preferences</span>
                </div>
              </button>

              <div className="pt-2 border-t border-[#E8D5B7] dark:border-[#3D372E]">
                <button
                  onClick={() => {
                    logout();
                    onNavigateHome();
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-3 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out Account</span>
                </button>
              </div>
            </div>

            {/* Mother-Owned Quality Guarantee Help Badge */}
            <div className="bg-[#FAF5EB] dark:bg-[#1E1B17] p-4 rounded-3xl border border-[#E8D5B7] dark:border-[#3D372E] text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#9C5B23] dark:text-[#E9BE5F] font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Mother-Owned Promise</span>
              </div>
              <p className="text-[11px] text-[#8C7A65] dark:text-[#A69888] leading-relaxed">
                Need assistance with an order or bulk harvest booking? Connect directly with our Patna apiary team.
              </p>
              <a
                href="https://wa.me/919939055989"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#15803D] hover:underline pt-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Apiary Support</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Dedicated Spacious Page Content Views */}
          <div className="lg:col-span-9 bg-[#FAF5EB] dark:bg-[#1E1B17] rounded-3xl p-6 sm:p-8 border border-[#E8D5B7] dark:border-[#3D372E] shadow-sm">
            
            {/* ======================================================== */}
            {/* VIEW 1: PERSONAL INFORMATION & PROFILE                   */}
            {/* ======================================================== */}
            {activeProfileTab === 'profile' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-[#E8D5B7] dark:border-[#3D372E] pb-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white">
                    Personal Information
                  </h2>
                  <p className="text-xs text-[#8C7A65] dark:text-[#A69888] mt-1">
                    Manage your identity, verified contact details, and birthday honey gift preferences.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#9C5B23]" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-[#FEFDF5] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-sm font-semibold text-[#2C1810] dark:text-[#FEFDF5] focus:outline-none focus:border-[#9C5B23] focus:ring-1 focus:ring-[#9C5B23]"
                        placeholder="e.g. Ananya Sharma"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#9C5B23]" />
                          <span>Email Address *</span>
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black">
                          ✓ Verified
                        </span>
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-[#FEFDF5] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-sm font-semibold text-[#2C1810] dark:text-[#FEFDF5] focus:outline-none focus:border-[#9C5B23] focus:ring-1 focus:ring-[#9C5B23]"
                        placeholder="ananya.sharma@example.com"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#9C5B23]" />
                          <span>10-Digit Mobile Number *</span>
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black">
                          ✓ OTP Linked
                        </span>
                      </label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3.5 bg-[#E8D5B7]/50 dark:bg-[#3D372E] border border-r-0 border-[#E8D5B7] dark:border-[#423A30] rounded-l-xl text-xs font-bold text-[#5C4033] dark:text-[#FEFDF5]">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                          required
                          className="w-full px-4 py-3 bg-[#FEFDF5] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#423A30] rounded-r-xl text-sm font-semibold text-[#2C1810] dark:text-[#FEFDF5] focus:outline-none focus:border-[#9C5B23] focus:ring-1 focus:ring-[#9C5B23]"
                          placeholder="9939055989"
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#9C5B23]" />
                        <span>Date of Birth</span>
                      </label>
                      <input
                        type="date"
                        value={profileForm.dob}
                        onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FEFDF5] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-sm font-semibold text-[#2C1810] dark:text-[#FEFDF5] focus:outline-none focus:border-[#9C5B23] focus:ring-1 focus:ring-[#9C5B23]"
                      />
                      <span className="text-[10px] text-[#8C7A65] dark:text-[#A69888] block">
                        🎁 We send a complimentary 250g artisanal honey jar on your birthday!
                      </span>
                    </div>

                  </div>

                  {/* Gender Selector */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider">
                      Gender
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'female', label: 'Female' },
                        { id: 'male', label: 'Male' },
                        { id: 'other', label: 'Other' },
                        { id: '', label: 'Prefer not to say' },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setProfileForm({ ...profileForm, gender: item.id as any })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                            profileForm.gender === item.id
                              ? 'bg-[#9C5B23] text-white border-[#9C5B23] shadow-xs'
                              : 'bg-[#FEFDF5] dark:bg-[#25221D] text-[#5C4033] dark:text-[#D8CFBF] border-[#E8D5B7] dark:border-[#423A30] hover:border-[#9C5B23]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tier Progress Card */}
                  <div className="p-4 rounded-2xl bg-paper-texture dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5 text-[#9C5B23] dark:text-[#E9BE5F]">
                        <Sparkles className="w-4 h-4" />
                        <span>Artisanal Gold Status</span>
                      </span>
                      <span className="text-[#5C4033] dark:text-[#D8CFBF]">
                        {user?.honeyPoints ?? 240} / 500 Points to Platinum
                      </span>
                    </div>
                    <div className="w-full bg-[#E8D5B7] dark:bg-[#3D372E] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#9C5B23] to-[#E9BE5F] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, ((user?.honeyPoints ?? 240) / 500) * 100)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-[#8C7A65] dark:text-[#A69888]">
                      Tier perks: 10% instant checkout discount, priority festive packaging, and zero shipping minimums.
                    </p>
                  </div>

                  {/* Save Profile CTA */}
                  <div className="pt-3 flex items-center justify-end gap-3">
                    {profileSavedSuccess && (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Changes saved successfully!</span>
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="px-6 py-3 bg-[#9C5B23] hover:bg-[#834917] text-white rounded-xl font-bold text-sm shadow-md shadow-[#9C5B23]/25 flex items-center gap-2 transition-all transform hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-50"
                    >
                      {isSavingProfile ? (
                        <span>Saving Changes...</span>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Save Profile Details</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 2: SAVED ADDRESS BOOK (MANAGE, ADD & EDIT)          */}
            {/* ======================================================== */}
            {activeProfileTab === 'addresses' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Header with CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8D5B7] dark:border-[#3D372E] pb-4">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white">
                      Saved Delivery Addresses
                    </h2>
                    <p className="text-xs text-[#8C7A65] dark:text-[#A69888] mt-1">
                      Manage multiple shipping locations across India for faster 1-click checkout.
                    </p>
                  </div>

                  {!isAddingAddress && (
                    <button
                      onClick={handleStartAddAddress}
                      className="px-4 py-2.5 bg-[#9C5B23] hover:bg-[#834917] text-white rounded-xl font-bold text-xs shadow-md shadow-[#9C5B23]/20 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Address</span>
                    </button>
                  )}
                </div>

                {/* DEDICATED IN-PAGE ADDRESS FORM (SPACIOUS & FULL PAGE) */}
                {isAddingAddress ? (
                  <div className="bg-[#FEFDF5] dark:bg-[#25221D] p-6 rounded-2xl border-2 border-[#9C5B23] shadow-lg space-y-5 animate-slide-down">
                    <div className="flex items-center justify-between border-b border-[#E8D5B7] dark:border-[#3D372E] pb-3">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C1810] dark:text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#9C5B23]" />
                        <span>{editingAddressId ? 'Edit Delivery Address' : 'Add New Shipping Address'}</span>
                      </h3>
                      <button
                        onClick={() => setIsAddingAddress(false)}
                        className="text-xs font-bold text-[#8C7A65] hover:text-[#2C1810] cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleSaveAddress} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Receiver Name */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider">
                            Receiver Full Name *
                          </label>
                          <input
                            type="text"
                            value={addressForm.name}
                            onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                            required
                            placeholder="e.g. Ananya Sharma"
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                          />
                        </div>

                        {/* Receiver 10-Digit Mobile */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider">
                            10-Digit Mobile Number *
                          </label>
                          <input
                            type="tel"
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                            required
                            placeholder="e.g. 9939055989"
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                          />
                        </div>

                      </div>

                      {/* Street / Building Address */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider">
                          Flat, House No., Building Name &amp; Street Address *
                        </label>
                        <textarea
                          value={addressForm.street}
                          onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                          required
                          rows={2}
                          placeholder="e.g. Flat 402, Honey Blossom Residency, Bahpura - Bihta Rd"
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        
                        {/* PIN Code with auto-fill helper */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider">
                            6-Digit PIN Code *
                          </label>
                          <input
                            type="text"
                            value={addressForm.pincode}
                            onChange={(e) => handlePincodeChange(e.target.value)}
                            required
                            placeholder="e.g. 801111"
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                          />
                        </div>

                        {/* City */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider">
                            City / District *
                          </label>
                          <input
                            type="text"
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                            required
                            placeholder="e.g. Patna"
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                          />
                        </div>

                        {/* State */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider">
                            State *
                          </label>
                          <input
                            type="text"
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                            required
                            placeholder="e.g. Bihar"
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                          />
                        </div>

                      </div>

                      {/* Landmark & Address Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider">
                            Landmark (Optional)
                          </label>
                          <input
                            type="text"
                            value={addressForm.landmark}
                            onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                            placeholder="e.g. Near Mustafapur Chauraha"
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider">
                            Address Type
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 'home', label: '🏠 Home' },
                              { id: 'work', label: '🏢 Work' },
                              { id: 'other', label: '📍 Other' },
                            ].map((t) => (
                              <button
                                type="button"
                                key={t.id}
                                onClick={() => setAddressForm({ ...addressForm, type: t.id as any })}
                                className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                                  addressForm.type === t.id
                                    ? 'bg-[#9C5B23] text-white border-[#9C5B23]'
                                    : 'bg-white dark:bg-[#1E1B17] text-[#5C4033] dark:text-[#D8CFBF] border-[#E8D5B7] dark:border-[#423A30]'
                                }`}
                              >
                                {t.label}
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Default Checkbox */}
                      <label className="flex items-center gap-2 text-xs font-bold text-[#4A3B32] dark:text-[#D8CFBF] cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={addressForm.isDefault}
                          onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                          className="w-4 h-4 rounded text-[#9C5B23] focus:ring-[#9C5B23]"
                        />
                        <span>Set as my default shipping address</span>
                      </label>

                      {/* Form Actions */}
                      <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#E8D5B7] dark:border-[#3D372E]">
                        <button
                          type="button"
                          onClick={() => setIsAddingAddress(false)}
                          className="px-4 py-2.5 text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] hover:bg-[#E8D5B7]/40 rounded-xl cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#9C5B23] hover:bg-[#834917] text-white rounded-xl font-bold text-xs shadow-md shadow-[#9C5B23]/25 cursor-pointer"
                        >
                          {editingAddressId ? 'Update Address' : 'Save Address'}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : null}

                {/* ADDRESS CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(user?.addresses || []).map((addr) => (
                    <div
                      key={addr.id}
                      className={`relative p-5 rounded-2xl bg-[#FEFDF5] dark:bg-[#25221D] border-2 transition-all flex flex-col justify-between ${
                        addr.isDefault
                          ? 'border-[#9C5B23] shadow-md shadow-[#9C5B23]/10'
                          : 'border-[#E8D5B7] dark:border-[#3D372E] hover:border-[#9C5B23]/60'
                      }`}
                    >
                      <div className="space-y-2.5">
                        {/* Badges & Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FAF5EB] dark:bg-[#1E1B17] text-[#9C5B23] dark:text-[#E9BE5F] border border-[#E8D5B7] dark:border-[#3D372E]">
                              {addr.type === 'home' ? '🏠 Home' : addr.type === 'work' ? '🏢 Work' : '📍 Other'}
                            </span>
                            {addr.isDefault && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#15803D]/15 text-[#15803D] dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                                Default Address
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStartEditAddress(addr)}
                              className="p-1.5 text-[#8C7A65] hover:text-[#9C5B23] hover:bg-[#FAF5EB] dark:hover:bg-[#1E1B17] rounded-lg transition-colors cursor-pointer"
                              title="Edit Address"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this address?')) {
                                  deleteAddress(addr.id);
                                  showToast('Address deleted.');
                                }
                              }}
                              className="p-1.5 text-[#8C7A65] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                              title="Delete Address"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Name & Phone */}
                        <div>
                          <div className="font-serif font-bold text-sm text-[#2C1810] dark:text-white">
                            {addr.name}
                          </div>
                          <div className="text-xs text-[#8C7A65] dark:text-[#A69888] font-medium">
                            Mobile: +91 {addr.phone}
                          </div>
                        </div>

                        {/* Street & Location */}
                        <div className="text-xs text-[#4A3B32] dark:text-[#D8CFBF] leading-relaxed">
                          <p>{addr.street}</p>
                          {addr.landmark && <p className="text-[11px] text-[#8C7A65]">Landmark: {addr.landmark}</p>}
                          <p className="font-semibold text-[#2C1810] dark:text-white mt-1">
                            {addr.city}, {addr.state} - <span className="font-mono font-bold">{addr.pincode}</span>
                          </p>
                        </div>
                      </div>

                      {/* Default Action Button */}
                      {!addr.isDefault && (
                        <div className="pt-3 mt-3 border-t border-[#E8D5B7] dark:border-[#3D372E]">
                          <button
                            onClick={() => {
                              setDefaultAddress(addr.id);
                              showToast(`Set "${addr.street.slice(0, 20)}..." as default address! 📍`);
                            }}
                            className="text-[11px] font-black text-[#9C5B23] dark:text-[#E9BE5F] hover:underline cursor-pointer"
                          >
                            Set as Default Delivery Address &rarr;
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {(user?.addresses || []).length === 0 && !isAddingAddress && (
                  <div className="text-center py-12 space-y-3">
                    <MapPin className="w-12 h-12 text-[#9C5B23] mx-auto opacity-50" />
                    <h3 className="font-serif text-lg font-bold text-[#2C1810] dark:text-white">No Addresses Saved Yet</h3>
                    <p className="text-xs text-[#8C7A65] max-w-sm mx-auto">
                      Add your home or office shipping address for instant 1-click doorstep delivery.
                    </p>
                    <button
                      onClick={handleStartAddAddress}
                      className="px-5 py-2.5 bg-[#9C5B23] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                    >
                      + Add First Address
                    </button>
                  </div>
                )}

              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 3: MY ORDERS & REAL-TIME TRACKING                   */}
            {/* ======================================================== */}
            {activeProfileTab === 'orders' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Header & Status Filter Pills */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8D5B7] dark:border-[#3D372E] pb-4">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white">
                      My Orders &amp; Tracking
                    </h2>
                    <p className="text-xs text-[#8C7A65] dark:text-[#A69888] mt-1">
                      Live status, official tax invoice download, and 1-click reordering.
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#FEFDF5] dark:bg-[#25221D] p-1 rounded-xl border border-[#E8D5B7] dark:border-[#3D372E]">
                    {(['all', 'In Transit', 'Delivered'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setOrderFilter(filter)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          orderFilter === filter
                            ? 'bg-[#9C5B23] text-white shadow-xs'
                            : 'text-[#5C4033] dark:text-[#D8CFBF] hover:bg-[#FAF5EB] dark:hover:bg-[#1E1B17]'
                        }`}
                      >
                        {filter === 'all' ? 'All Orders' : filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orders List Cards */}
                <div className="space-y-5">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-[#FEFDF5] dark:bg-[#25221D] rounded-2xl border border-[#E8D5B7] dark:border-[#3D372E] p-5 sm:p-6 shadow-sm space-y-5"
                    >
                      {/* Order Card Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8D5B7]/60 dark:border-[#3D372E] pb-3 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-black text-sm text-[#2C1810] dark:text-white">
                            #{order.id}
                          </span>
                          <span className="text-[#8C7A65] dark:text-[#A69888]">
                            Placed on {order.date}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 ${
                            order.status === 'In Transit'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/40 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
                          }`}>
                            <Truck className="w-3.5 h-3.5" />
                            <span>{order.status}</span>
                          </span>

                          <span className="font-black text-sm text-[#2C1810] dark:text-white">
                            ₹{order.total}.00
                          </span>
                        </div>
                      </div>

                      {/* Items list with images */}
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-paper-texture dark:bg-[#1E1B17] border border-[#E8D5B7]/60"
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-contain bg-white shrink-0 p-1 border border-amber-100"
                              />
                              <div className="truncate">
                                <div className="font-serif font-bold text-xs sm:text-sm text-[#2C1810] dark:text-white truncate">
                                  {item.name}
                                </div>
                                <div className="text-[11px] text-[#8C7A65] flex items-center gap-2 mt-0.5">
                                  <span className="font-bold text-[#9C5B23]">{item.weight}</span>
                                  <span>•</span>
                                  <span>Qty: {item.quantity}</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-xs font-black text-[#2C1810] dark:text-white shrink-0">
                              ₹{item.price * item.quantity}.00
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Visual Live Delhivery / Shiprocket Tracking Bar */}
                      <div className="p-4 rounded-xl bg-[#FAF5EB] dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#3D372E] space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-[#5C4033] dark:text-[#D8CFBF] flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-[#9C5B23]" />
                            <span>Shiprocket Express AWB: {order.trackingNumber}</span>
                          </span>
                          <span className="text-[#9C5B23] dark:text-[#E9BE5F]">
                            {order.deliveryDate || 'Expected Soon'}
                          </span>
                        </div>

                        {/* Step progress bar */}
                        <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center text-[10px] font-bold">
                          <div className="space-y-1">
                            <div className="h-1.5 rounded-full bg-emerald-600" />
                            <span className="text-emerald-700 dark:text-emerald-400">1. Confirmed ✓</span>
                          </div>
                          <div className="space-y-1">
                            <div className="h-1.5 rounded-full bg-emerald-600" />
                            <span className="text-emerald-700 dark:text-emerald-400">2. Apiary Sealed ✓</span>
                          </div>
                          <div className="space-y-1">
                            <div className={`h-1.5 rounded-full ${order.status === 'In Transit' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'}`} />
                            <span className={order.status === 'In Transit' ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-700'}>
                              3. In Transit 🚚
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className={`h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-600' : 'bg-neutral-200 dark:bg-neutral-700'}`} />
                            <span className={order.status === 'Delivered' ? 'text-emerald-700 dark:text-emerald-400' : 'text-neutral-400'}>
                              4. Delivered
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Action Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="text-[11px] text-[#8C7A65]">
                          <span>Paid via </span>
                          <span className="font-bold text-[#2C1810] dark:text-white">{order.paymentMethod}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveInvoiceOrder(order)}
                            className="px-3.5 py-2 bg-white dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#3D372E] text-[#5C4033] dark:text-[#D8CFBF] rounded-xl text-xs font-bold hover:bg-[#FAF5EB] flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Receipt className="w-3.5 h-3.5 text-[#9C5B23]" />
                            <span>Tax Invoice</span>
                          </button>

                          <button
                            onClick={() => handleReorder(order)}
                            className="px-4 py-2 bg-[#9C5B23] hover:bg-[#834917] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reorder Items</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 4: SAVED WISHLIST                                   */}
            {/* ======================================================== */}
            {activeProfileTab === 'wishlist' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-[#E8D5B7] dark:border-[#3D372E] pb-4">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white">
                      My Saved Wishlist
                    </h2>
                    <p className="text-xs text-[#8C7A65] dark:text-[#A69888] mt-1">
                      Your handpicked raw forest honey jars ready to be ordered.
                    </p>
                  </div>
                  <span className="text-xs font-black text-[#9C5B23] dark:text-[#E9BE5F]">
                    {wishlistedProducts.length} Items Saved
                  </span>
                </div>

                {wishlistedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-[#FEFDF5] dark:bg-[#25221D] rounded-2xl border border-[#E8D5B7] dark:border-[#3D372E] p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="space-y-3">
                          <div className="relative rounded-xl overflow-hidden bg-white p-4 h-40 flex items-center justify-center border border-amber-100">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="max-h-full object-contain group-hover:scale-108 transition-transform duration-300"
                            />
                            <button
                              onClick={() => {
                                toggleWishlist(prod.id);
                                showToast(`Removed ${prod.name} from wishlist.`);
                              }}
                              className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 text-red-500 shadow-sm hover:scale-110 transition-transform cursor-pointer"
                              title="Remove from Wishlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div>
                            <span className="text-[10px] font-black text-[#9C5B23] uppercase tracking-wider">
                              {prod.categoryName}
                            </span>
                            <h3 className="font-serif font-bold text-sm text-[#2C1810] dark:text-white line-clamp-1">
                              {prod.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-black text-[#2C1810] dark:text-white">
                                ₹{prod.price}.00
                              </span>
                              {prod.originalPrice && (
                                <span className="text-xs text-neutral-400 line-through">
                                  ₹{prod.originalPrice}.00
                                </span>
                              )}
                              <span className="text-[10px] font-bold text-[#15803D]">
                                15% OFF
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#E8D5B7] dark:border-[#3D372E]">
                          <button
                            onClick={() => {
                              addToCart(prod, prod.weight);
                              setIsCartOpen(true);
                            }}
                            className="w-full py-2 bg-[#9C5B23] hover:bg-[#834917] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-3">
                    <Heart className="w-12 h-12 text-[#9C5B23] mx-auto opacity-40" />
                    <h3 className="font-serif text-lg font-bold text-[#2C1810] dark:text-white">Your Wishlist is Empty</h3>
                    <p className="text-xs text-[#8C7A65] max-w-sm mx-auto">
                      Explore our single-origin raw honeys and save your favorites here.
                    </p>
                    <button
                      onClick={onNavigateProducts}
                      className="px-5 py-2.5 bg-[#9C5B23] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                    >
                      Explore Honey Collection &rarr;
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 5: HONEY REWARDS & WALLET                           */}
            {/* ======================================================== */}
            {activeProfileTab === 'rewards' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-[#E8D5B7] dark:border-[#3D372E] pb-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white">
                    Honey Rewards &amp; Wallet
                  </h2>
                  <p className="text-xs text-[#8C7A65] dark:text-[#A69888] mt-1">
                    Earn 1 Honey Point for every ₹10 spent. Redeem points for instant cashback discounts at checkout.
                  </p>
                </div>

                {/* Big Balance Wallet Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#9C5B23] via-[#B8661B] to-[#834917] text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                      <Coins className="w-4 h-4" />
                      <span>Available Reward Balance</span>
                    </div>
                    <div className="font-serif text-3xl sm:text-4xl font-black text-white">
                      🍯 {user?.honeyPoints ?? 240} <span className="text-lg font-normal">Points</span>
                    </div>
                    <p className="text-xs text-amber-100 font-medium">
                      Equivalent to <strong className="text-white">₹{user?.honeyPoints ?? 240}.00 INR</strong> instant checkout savings
                    </p>
                  </div>

                  <button
                    onClick={onNavigateProducts}
                    className="px-5 py-3 bg-white text-[#2C1810] hover:bg-[#FEFDF5] font-extrabold text-xs rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                  >
                    Redeem on Honey Order &rarr;
                  </button>
                </div>

                {/* Earning Rules & Ledger */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-paper-texture dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] space-y-1.5">
                    <div className="font-bold text-[#9C5B23] dark:text-[#E9BE5F] flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Earn 10% On Orders</span>
                    </div>
                    <p className="text-[#8C7A65]">Get 10 Honey Points for every ₹100 spent across all artisanal collections.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-paper-texture dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] space-y-1.5">
                    <div className="font-bold text-[#9C5B23] dark:text-[#E9BE5F] flex items-center gap-1.5">
                      <Gift className="w-4 h-4" />
                      <span>Birthday Rewards</span>
                    </div>
                    <p className="text-[#8C7A65]">Receive 100 bonus Honey Points deposited directly on your birthday month.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-paper-texture dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] space-y-1.5">
                    <div className="font-bold text-[#9C5B23] dark:text-[#E9BE5F] flex items-center gap-1.5">
                      <Share2 className="w-4 h-4" />
                      <span>Refer a Friend</span>
                    </div>
                    <p className="text-[#8C7A65]">Share your code to gift ₹100 off and receive 150 points on their first delivery.</p>
                  </div>
                </div>

                {/* Recent Points Activity Ledger */}
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-sm text-[#2C1810] dark:text-white">Recent Points Activity</h3>
                  <div className="rounded-2xl border border-[#E8D5B7] dark:border-[#3D372E] overflow-hidden bg-[#FEFDF5] dark:bg-[#25221D]">
                    <div className="p-3.5 border-b border-[#E8D5B7] dark:border-[#3D372E] flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-[#2C1810] dark:text-white">Order #NBF-89241 Cashback</div>
                        <div className="text-[10px] text-[#8C7A65]">14 Aug 2026 • 2x Wild Forest Honey</div>
                      </div>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">+180 pts</span>
                    </div>
                    <div className="p-3.5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-[#2C1810] dark:text-white">Welcome Honey Club Bonus</div>
                        <div className="text-[10px] text-[#8C7A65]">10 Aug 2026 • New Account Registration</div>
                      </div>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">+60 pts</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 6: SECURITY & PREFERENCES                           */}
            {/* ======================================================== */}
            {activeProfileTab === 'settings' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-[#E8D5B7] dark:border-[#3D372E] pb-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white">
                    Security &amp; Communication Preferences
                  </h2>
                  <p className="text-xs text-[#8C7A65] dark:text-[#A69888] mt-1">
                    Manage password credentials, two-factor authentication, and WhatsApp dispatch alerts.
                  </p>
                </div>

                {/* Password Change Form */}
                <div className="bg-[#FEFDF5] dark:bg-[#25221D] p-5 sm:p-6 rounded-2xl border border-[#E8D5B7] dark:border-[#3D372E] space-y-4">
                  <h3 className="font-serif font-bold text-sm text-[#2C1810] dark:text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#9C5B23]" />
                    <span>Change Account Password</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF]">Current Password</label>
                      <input
                        type="password"
                        value={passwordForm.current}
                        onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#9C5B23]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF]">New Password</label>
                      <input
                        type="password"
                        value={passwordForm.newPass}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                        placeholder="Min 8 characters"
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#9C5B23]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF]">Confirm Password</label>
                      <input
                        type="password"
                        value={passwordForm.confirmPass}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPass: e.target.value })}
                        placeholder="Re-enter password"
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1B17] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#9C5B23]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {passwordSuccess && (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        Password updated successfully!
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (!passwordForm.newPass || passwordForm.newPass.length < 6) {
                          showToast('Password must be at least 6 characters.');
                          return;
                        }
                        if (passwordForm.newPass !== passwordForm.confirmPass) {
                          showToast('Passwords do not match.');
                          return;
                        }
                        setPasswordSuccess(true);
                        showToast('Password updated securely.');
                        setPasswordForm({ current: '', newPass: '', confirmPass: '' });
                      }}
                      className="px-5 py-2.5 bg-[#9C5B23] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer ml-auto"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Communication Channels Toggles */}
                <div className="bg-[#FEFDF5] dark:bg-[#25221D] p-5 sm:p-6 rounded-2xl border border-[#E8D5B7] dark:border-[#3D372E] space-y-4">
                  <h3 className="font-serif font-bold text-sm text-[#2C1810] dark:text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#9C5B23]" />
                    <span>Notification &amp; Dispatch Channels</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <label className="flex items-center justify-between p-3 rounded-xl bg-paper-texture dark:bg-[#1E1B17] border border-[#E8D5B7]/60 cursor-pointer">
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#2C1810] dark:text-white">WhatsApp Live Tracking Alerts</div>
                        <div className="text-[11px] text-[#8C7A65]">Get shipment dispatch, out-for-delivery, and OTP verification via WhatsApp.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.whatsapp}
                        onChange={(e) => {
                          setNotifications({ ...notifications, whatsapp: e.target.checked });
                          showToast('Notification preference saved.');
                        }}
                        className="w-4 h-4 text-[#9C5B23] rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-paper-texture dark:bg-[#1E1B17] border border-[#E8D5B7]/60 cursor-pointer">
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#2C1810] dark:text-white">SMS Delivery Notifications</div>
                        <div className="text-[11px] text-[#8C7A65]">Receive courier driver contact and delivery status via SMS.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={(e) => {
                          setNotifications({ ...notifications, sms: e.target.checked });
                          showToast('Notification preference saved.');
                        }}
                        className="w-4 h-4 text-[#9C5B23] rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-paper-texture dark:bg-[#1E1B17] border border-[#E8D5B7]/60 cursor-pointer">
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#2C1810] dark:text-white">Seasonal Harvest &amp; Member Offers Email</div>
                        <div className="text-[11px] text-[#8C7A65]">Early bird notifications when limited wild forest batches are bottled.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.promotions}
                        onChange={(e) => {
                          setNotifications({ ...notifications, promotions: e.target.checked });
                          showToast('Notification preference saved.');
                        }}
                        className="w-4 h-4 text-[#9C5B23] rounded"
                      />
                    </label>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* TAX INVOICE MODAL PREVIEW */}
      {activeInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FEFDF5] dark:bg-[#1E1B17] w-full max-w-lg rounded-3xl p-6 border-2 border-[#E8D5B7] dark:border-[#3D372E] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8D5B7] dark:border-[#3D372E] pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2C1810] dark:text-white">Official Tax Invoice</h3>
                <p className="text-[11px] text-[#8C7A65]">GSTIN: 10AAHCN8924M1Z2 • FSSAI: 10424000000123</p>
              </div>
              <button
                onClick={() => setActiveInvoiceOrder(null)}
                className="p-1.5 rounded-full hover:bg-[#E8D5B7] cursor-pointer text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span>Invoice No:</span>
                <span className="font-bold">INV-{activeInvoiceOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{activeInvoiceOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span>{activeInvoiceOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Ship To:</span>
                <span className="text-right truncate max-w-[220px]">{activeInvoiceOrder.shippingAddress}</span>
              </div>
            </div>

            <div className="border-t border-b border-[#E8D5B7] dark:border-[#3D372E] py-2 space-y-1.5 text-xs">
              {activeInvoiceOrder.items.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} ({item.weight}) x {item.quantity}</span>
                  <span className="font-bold">₹{item.price * item.quantity}.00</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-sm font-black text-[#2C1810] dark:text-white">
              <span>Total Amount (Incl. GST):</span>
              <span>₹{activeInvoiceOrder.total}.00</span>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-[#9C5B23] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Download / Print PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
