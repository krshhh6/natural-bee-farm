import React, { useState } from 'react';
import {
  X,
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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import type { Address, ProfileTab, Product } from '../types';

export const ProfileModal: React.FC = () => {
  const {
    user,
    isProfileModalOpen,
    setIsProfileModalOpen,
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

  const { addToCart, setIsCartOpen } = useCart();

  // Personal Info Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [dob, setDob] = useState(user?.dob || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Address Modal/Form State
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrLandmark, setAddrLandmark] = useState('');
  const [addrCity, setAddrCity] = useState('Patna');
  const [addrState, setAddrState] = useState('Bihar');
  const [addrPincode, setAddrPincode] = useState('801111');
  const [addrType, setAddrType] = useState<'home' | 'work' | 'other'>('home');
  const [addrIsDefault, setAddrIsDefault] = useState(false);

  // Invoice Modal State
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<string | null>(null);

  // Sync state when user changes
  React.useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setGender(user.gender || '');
      setDob(user.dob || '');
    }
  }, [user]);

  if (!isProfileModalOpen || !user) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      gender: gender as any,
      dob,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleOpenAddressForm = (addr?: Address) => {
    if (addr) {
      setEditingAddressId(addr.id);
      setAddrName(addr.name);
      setAddrPhone(addr.phone);
      setAddrStreet(addr.street);
      setAddrLandmark(addr.landmark || '');
      setAddrCity(addr.city);
      setAddrState(addr.state);
      setAddrPincode(addr.pincode);
      setAddrType(addr.type);
      setAddrIsDefault(addr.isDefault);
    } else {
      setEditingAddressId(null);
      setAddrName(user.name);
      setAddrPhone(user.phone?.replace('+91 ', '') || '');
      setAddrStreet('');
      setAddrLandmark('');
      setAddrCity('Patna');
      setAddrState('Bihar');
      setAddrPincode('801111');
      setAddrType('home');
      setAddrIsDefault((user.addresses || []).length === 0);
    }
    setIsAddressFormOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrStreet.trim() || !addrName.trim() || !addrPhone.trim()) return;

    if (editingAddressId) {
      updateAddress(editingAddressId, {
        name: addrName,
        phone: addrPhone,
        street: addrStreet,
        landmark: addrLandmark,
        city: addrCity,
        state: addrState,
        pincode: addrPincode,
        type: addrType,
        isDefault: addrIsDefault,
      });
    } else {
      addAddress({
        name: addrName,
        phone: addrPhone,
        street: addrStreet,
        landmark: addrLandmark,
        city: addrCity,
        state: addrState,
        pincode: addrPincode,
        type: addrType,
        isDefault: addrIsDefault,
      });
    }
    setIsAddressFormOpen(false);
  };

  const handleReorder = (orderItems: { id: string; weight: string; quantity: number }[]) => {
    orderItems.forEach((item) => {
      const prod = PRODUCTS.find((p) => p.id === item.id);
      if (prod) {
        addToCart(prod, item.weight, item.quantity);
      }
    });
    setIsProfileModalOpen(false);
    setIsCartOpen(true);
  };

  const wishlistProducts: Product[] = (user.wishlist || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#1C1810]/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsProfileModalOpen(false);
      }}
    >
      <div
        className="relative w-full max-w-5xl bg-[#FEFDF5] dark:bg-[#1E1C18] rounded-[28px] sm:rounded-[36px] shadow-2xl border-2 border-[#E8D5B7] dark:border-[#3D372E] overflow-hidden max-h-[92vh] flex flex-col md:flex-row animate-scale-up font-sans my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={() => setIsProfileModalOpen(false)}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-[#FAF5EB] dark:bg-[#2A2620] border border-[#E8D5B7] dark:border-[#3D372E] text-[#9C5B23] dark:text-[#E9BE5F] flex items-center justify-center hover:bg-[#9C5B23] hover:text-white transition-colors shadow-xs cursor-pointer"
          aria-label="Close Profile"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ─── SIDEBAR NAVIGATION TABS ─────────────────────────────────── */}
        <div className="w-full md:w-72 bg-paper-texture dark:bg-[#181613] p-5 sm:p-6 border-b md:border-b-0 md:border-r border-[#E8D5B7] dark:border-[#3D372E] flex flex-col justify-between shrink-0">
          <div>
            {/* User Profile Mini Header Card */}
            <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-[#E8D5B7] dark:border-[#3D372E]">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#9C5B23] to-[#B8661B] text-white flex items-center justify-center font-serif text-xl font-bold shadow-md border-2 border-amber-300 shrink-0 overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-base font-bold text-[#2C1810] dark:text-white truncate">
                  {user.name}
                </h3>
                <div className="text-[11px] text-[#9C5B23] dark:text-[#E9BE5F] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{user.membershipTier || 'Artisanal Gold'}</span>
                </div>
                <div className="text-[10px] text-[#8C7A65] dark:text-[#A09383] truncate">
                  {user.email}
                </div>
              </div>
            </div>

            {/* Honey Points Reward Badge Card */}
            <div className="bg-gradient-to-r from-[#FFF9EE] to-[#FAF2DF] dark:from-[#25201A] dark:to-[#2F2920] rounded-2xl p-3.5 border border-[#E8D5B7] dark:border-[#4A3F31] mb-5 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-black text-[#9C5B23] dark:text-[#E9BE5F] uppercase tracking-wider mb-1">
                <span>Honey Points</span>
                <span className="text-base font-extrabold text-[#2C1810] dark:text-white">
                  🍯 {user.honeyPoints ?? 240}
                </span>
              </div>
              <div className="text-[10px] text-[#6E5A44] dark:text-[#C5B8A5] leading-tight font-medium">
                Worth <strong>₹{user.honeyPoints ?? 240}</strong> discount on your next order!
              </div>
            </div>

            {/* Nav Tabs List */}
            <nav className="space-y-1.5">
              {[
                { id: 'profile', label: 'Personal Information', icon: User },
                {
                  id: 'addresses',
                  label: 'Saved Addresses',
                  icon: MapPin,
                  count: user.addresses?.length || 0,
                },
                {
                  id: 'orders',
                  label: 'My Orders & Tracking',
                  icon: Package,
                  count: user.orders?.length || 0,
                },
                {
                  id: 'wishlist',
                  label: 'Saved Wishlist',
                  icon: Heart,
                  count: user.wishlist?.length || 0,
                },
                { id: 'settings', label: 'Security & Preferences', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeProfileTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveProfileTab(tab.id as ProfileTab)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#9C5B23] text-white shadow-md'
                        : 'text-[#5C4033] dark:text-[#D8CFBF] hover:bg-[#FAF5EB] dark:hover:bg-[#25221D]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#9C5B23] dark:text-[#E9BE5F]'}`} />
                      <span className="truncate">{tab.label}</span>
                    </div>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#FAF5EB] dark:bg-[#2A2620] text-[#9C5B23] dark:text-[#E9BE5F] border border-[#E8D5B7] dark:border-[#3D372E]'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Logout Button */}
          <div className="pt-4 mt-4 border-t border-[#E8D5B7] dark:border-[#3D372E]">
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out Account</span>
            </button>
          </div>
        </div>

        {/* ─── MAIN CONTENT AREA ──────────────────────────────────────── */}
        <div className="flex-1 p-5 sm:p-8 overflow-y-auto custom-scrollbar bg-[#FEFDF5] dark:bg-[#1E1C18]">
          
          {/* ════ TAB 1: PERSONAL INFORMATION ════ */}
          {activeProfileTab === 'profile' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white">
                  Personal Information
                </h2>
                <p className="text-xs sm:text-sm text-[#735F4C] dark:text-[#B3A492]">
                  Manage your personal details, birthday honey gifts, and contact information.
                </p>
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl text-xs sm:text-sm font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl text-xs sm:text-sm font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider mb-1.5">
                      Mobile Phone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 99390 55989"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl text-xs sm:text-sm font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider mb-1.5">
                      Date of Birth (Birthday Honey Gift)
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl text-xs sm:text-sm font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                      />
                    </div>
                  </div>
                </div>

                {/* Gender Selector */}
                <div>
                  <label className="block text-[11px] font-extrabold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider mb-1.5">
                    Gender
                  </label>
                  <div className="flex gap-3">
                    {['female', 'male', 'other'].map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setGender(g)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize border transition-all cursor-pointer ${
                          gender === g
                            ? 'bg-[#9C5B23] text-white border-[#834917] shadow-sm'
                            : 'bg-[#FAF5EB] dark:bg-[#25221D] text-[#5C4033] dark:text-[#D8CFBF] border-[#E8D5B7] dark:border-[#3D372E]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-[#9C5B23] via-[#B8661B] to-[#9C5B23] hover:from-[#834917] hover:to-[#834917] shadow-md border border-[#834917] cursor-pointer transition-all hover:scale-102"
                  >
                    Save Changes
                  </button>
                </div>
              </form>

              {/* Membership Progress Card */}
              <div className="mt-8 bg-paper-texture dark:bg-[#25221D] rounded-2xl p-5 border border-[#E8D5B7] dark:border-[#3D372E] shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#9C5B23] dark:text-[#E9BE5F]" />
                    <h4 className="font-serif text-sm font-bold text-[#2C1810] dark:text-white">
                      Artisanal Honey Club Tier
                    </h4>
                  </div>
                  <span className="text-xs font-black text-[#9C5B23] dark:text-[#E9BE5F] bg-[#FAF5EB] dark:bg-[#1E1C18] px-2.5 py-1 rounded-full border border-[#E8D5B7] dark:border-[#3D372E]">
                    GOLD MEMBER
                  </span>
                </div>
                <p className="text-xs text-[#6E5A44] dark:text-[#C5B8A5] mb-3">
                  You enjoy 15% discount on seasonal harvest honey and priority dispatch from Patna apiary.
                </p>
                <div className="w-full bg-[#E8D5B7] dark:bg-[#3D372E] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#9C5B23] to-[#E9BE5F] h-full w-3/4 rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-[#8C7A65] font-semibold mt-1">
                  <span>Gold Tier Active</span>
                  <span>Spend ₹1,223 more for Diamond Hive Tier</span>
                </div>
              </div>
            </div>
          )}

          {/* ════ TAB 2: SAVED ADDRESSES (MULTIPLE ADDRESS BOOK) ════ */}
          {activeProfileTab === 'addresses' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white">
                    Saved Addresses
                  </h2>
                  <p className="text-xs sm:text-sm text-[#735F4C] dark:text-[#B3A492]">
                    Manage delivery addresses for fast 1-click checkout.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenAddressForm()}
                  className="bg-[#9C5B23] hover:bg-[#834917] text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Addresses List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(user.addresses || []).map((addr) => (
                  <div
                    key={addr.id}
                    className={`rounded-2xl p-5 bg-paper-texture dark:bg-[#25221D] border-2 transition-all relative flex flex-col justify-between ${
                      addr.isDefault
                        ? 'border-[#9C5B23] shadow-md'
                        : 'border-[#E8D5B7] dark:border-[#3D372E] hover:border-[#9C5B23]'
                    }`}
                  >
                    <div>
                      {/* Top Header Tags */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FAF5EB] dark:bg-[#1E1C18] border border-[#E8D5B7] dark:border-[#3D372E] text-[#9C5B23] dark:text-[#E9BE5F]">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                              DEFAULT
                            </span>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenAddressForm(addr)}
                            className="p-1.5 rounded-lg text-[#8C7A65] hover:text-[#9C5B23] hover:bg-[#FAF5EB] dark:hover:bg-[#1E1C18] transition-colors cursor-pointer"
                            title="Edit Address"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {(user.addresses || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => deleteAddress(addr.id)}
                              className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                              title="Delete Address"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <h4 className="font-serif text-sm font-bold text-[#2C1810] dark:text-white">
                        {addr.name}
                      </h4>
                      <p className="text-xs text-[#5C4033] dark:text-[#D8CFBF] leading-relaxed mt-1">
                        {addr.street}
                        {addr.landmark && `, Near ${addr.landmark}`}
                        <br />
                        {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                      </p>
                      <div className="text-xs text-[#8C7A65] dark:text-[#A09383] mt-2 font-medium">
                        📞 Phone: {addr.phone}
                      </div>
                    </div>

                    {!addr.isDefault && (
                      <div className="pt-3 mt-3 border-t border-[#E8D5B7]/60 dark:border-[#3D372E]">
                        <button
                          type="button"
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-xs font-bold text-[#9C5B23] dark:text-[#E9BE5F] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Set as Default Address</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add / Edit Address Modal Dialog */}
              {isAddressFormOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-fadeIn">
                  <div
                    className="w-full max-w-lg bg-[#FEFDF5] dark:bg-[#1E1C18] rounded-3xl p-6 border-2 border-[#E8D5B7] dark:border-[#3D372E] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar animate-scale-up"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#E8D5B7] dark:border-[#3D372E]">
                      <h3 className="font-serif text-lg font-bold text-[#2C1810] dark:text-white">
                        {editingAddressId ? 'Edit Address' : 'Add New Address'}
                      </h3>
                      <button
                        onClick={() => setIsAddressFormOpen(false)}
                        className="p-1 rounded-full text-[#8C7A65] hover:text-[#2C1810]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveAddress} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-[#5C4033] dark:text-[#D8CFBF] mb-1">
                            Receiver Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={addrName}
                            onChange={(e) => setAddrName(e.target.value)}
                            className="w-full px-3 py-2 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-[#5C4033] dark:text-[#D8CFBF] mb-1">
                            10-Digit Mobile *
                          </label>
                          <input
                            type="tel"
                            required
                            value={addrPhone}
                            onChange={(e) => setAddrPhone(e.target.value)}
                            placeholder="9939055989"
                            className="w-full px-3 py-2 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-[#5C4033] dark:text-[#D8CFBF] mb-1">
                          Flat, House No., Building, Street *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={addrStreet}
                          onChange={(e) => setAddrStreet(e.target.value)}
                          placeholder="Flat 402, Honey Blossom Residency, Bahpura - Bihta Rd"
                          className="w-full px-3 py-2 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-[#5C4033] dark:text-[#D8CFBF] mb-1">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={addrPincode}
                            onChange={(e) => setAddrPincode(e.target.value)}
                            placeholder="801111"
                            className="w-full px-3 py-2 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-[#5C4033] dark:text-[#D8CFBF] mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={addrCity}
                            onChange={(e) => setAddrCity(e.target.value)}
                            className="w-full px-3 py-2 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-[#5C4033] dark:text-[#D8CFBF] mb-1">
                            State *
                          </label>
                          <input
                            type="text"
                            required
                            value={addrState}
                            onChange={(e) => setAddrState(e.target.value)}
                            className="w-full px-3 py-2 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-[#5C4033] dark:text-[#D8CFBF] mb-1">
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          value={addrLandmark}
                          onChange={(e) => setAddrLandmark(e.target.value)}
                          placeholder="Near Mustafapur Chauraha"
                          className="w-full px-3 py-2 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl text-xs font-semibold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23]"
                        />
                      </div>

                      {/* Address Type */}
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-[#5C4033] dark:text-[#D8CFBF] mb-1">
                          Address Type
                        </label>
                        <div className="flex gap-2">
                          {(['home', 'work', 'other'] as const).map((t) => (
                            <button
                              type="button"
                              key={t}
                              onClick={() => setAddrType(t)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize border transition-all cursor-pointer ${
                                addrType === t
                                  ? 'bg-[#9C5B23] text-white border-[#834917]'
                                  : 'bg-[#FAF5EB] dark:bg-[#25221D] border-[#E8D5B7] dark:border-[#3D372E] text-[#5C4033] dark:text-[#D8CFBF]'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="checkbox"
                          id="makeDefault"
                          checked={addrIsDefault}
                          onChange={(e) => setAddrIsDefault(e.target.checked)}
                          className="accent-[#9C5B23] w-4 h-4 rounded cursor-pointer"
                        />
                        <label htmlFor="makeDefault" className="text-xs text-[#5C4033] dark:text-[#D8CFBF] font-semibold cursor-pointer">
                          Make this my default delivery address
                        </label>
                      </div>

                      <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#E8D5B7] dark:border-[#3D372E]">
                        <button
                          type="button"
                          onClick={() => setIsAddressFormOpen(false)}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-[#8C7A65] hover:bg-[#FAF5EB] dark:hover:bg-[#25221D]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#9C5B23] hover:bg-[#834917] shadow-sm cursor-pointer"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════ TAB 3: MY ORDERS & TRACKING ════ */}
          {activeProfileTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white">
                  My Orders &amp; Live Tracking
                </h2>
                <p className="text-xs sm:text-sm text-[#735F4C] dark:text-[#B3A492]">
                  Track past deliveries, download tax invoices, and reorder in 1 click.
                </p>
              </div>

              <div className="space-y-4">
                {(user.orders || []).map((order) => (
                  <div
                    key={order.id}
                    className="bg-paper-texture dark:bg-[#25221D] rounded-2xl p-5 border-2 border-[#E8D5B7] dark:border-[#3D372E] shadow-sm space-y-4"
                  >
                    {/* Order Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8D5B7]/80 dark:border-[#3D372E]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-[#9C5B23] dark:text-[#E9BE5F]">
                            #{order.id}
                          </span>
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8C7A65] font-medium mt-0.5">
                          Ordered on {order.date} • {order.paymentMethod}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceOrder(order.id)}
                          className="px-3 py-1.5 rounded-lg border border-[#E8D5B7] dark:border-[#3D372E] bg-white dark:bg-[#1E1C18] text-[11px] font-bold text-[#5C4033] dark:text-[#D8CFBF] hover:border-[#9C5B23] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Receipt className="w-3.5 h-3.5 text-[#9C5B23]" />
                          <span>Invoice</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReorder(order.items)}
                          className="px-3 py-1.5 rounded-lg bg-[#9C5B23] hover:bg-[#834917] text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reorder</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-xl object-contain bg-white dark:bg-[#1A1816] p-1 border border-[#E8D5B7] dark:border-[#3D372E]"
                            />
                            <div>
                              <h5 className="font-serif text-xs sm:text-sm font-bold text-[#2C1810] dark:text-white">
                                {item.name}
                              </h5>
                              <span className="text-[11px] text-[#8C7A65] font-medium">
                                Pack: {item.weight} × Qty {item.quantity}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-extrabold text-[#2C1810] dark:text-white">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tracking Timeline */}
                    <div className="bg-[#FAF5EB] dark:bg-[#1C1815] rounded-xl p-3.5 border border-[#E8D5B7]/60 dark:border-[#3D372E]">
                      <div className="flex items-center justify-between text-xs font-bold text-[#9C5B23] dark:text-[#E9BE5F] mb-2">
                        <span className="flex items-center gap-1">
                          <Truck className="w-4 h-4" />
                          <span>Tracking: {order.trackingNumber || 'DEL-99390-55989'}</span>
                        </span>
                        <span className="text-[11px] text-[#5C4033] dark:text-[#D8CFBF]">
                          {order.deliveryDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-semibold text-[#8C7A65] pt-1">
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓ Confirmed</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓ Packed</span>
                        <span className={order.status === 'Delivered' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-amber-700 font-bold'}>
                          {order.status === 'Delivered' ? '✓ In Transit' : '🚚 In Transit'}
                        </span>
                        <span className={order.status === 'Delivered' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-neutral-400'}>
                          {order.status === 'Delivered' ? '✓ Delivered' : '○ Out for Delivery'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Invoice Preview Modal */}
              {selectedInvoiceOrder && (
                <div className="fixed inset-0 z-70 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-fadeIn">
                  <div
                    className="w-full max-w-md bg-[#FEFDF5] dark:bg-[#1E1C18] rounded-3xl p-6 border-2 border-[#E8D5B7] dark:border-[#3D372E] shadow-2xl space-y-4 animate-scale-up"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#E8D5B7] dark:border-[#3D372E]">
                      <div className="flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-[#9C5B23]" />
                        <h3 className="font-serif text-lg font-bold text-[#2C1810] dark:text-white">
                          Tax Invoice #{selectedInvoiceOrder}
                        </h3>
                      </div>
                      <button onClick={() => setSelectedInvoiceOrder(null)} className="p-1">
                        <X className="w-4 h-4 text-[#8C7A65]" />
                      </button>
                    </div>
                    <div className="text-xs text-[#5C4033] dark:text-[#D8CFBF] space-y-2 leading-relaxed">
                      <div className="font-bold text-[#2C1810] dark:text-white">NATURA BEE FARM APICULTURE LTD.</div>
                      <div>Bahpura - Bihta Rd, Mustafapur, Patna, Bihar 801111</div>
                      <div>GSTIN: 10AABCN1234F1Z5 • FSSAI Lic: 10421000000000</div>
                      <div className="p-3 bg-[#FAF5EB] dark:bg-[#25221D] rounded-xl border border-[#E8D5B7] dark:border-[#3D372E] text-[11px]">
                        <strong>Customer:</strong> {user.name} ({user.email})<br />
                        <strong>Payment:</strong> Verified Online via Razorpay
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        alert('Invoice downloaded successfully (PDF preview)');
                        setSelectedInvoiceOrder(null);
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#9C5B23] text-white font-extrabold text-xs shadow-md cursor-pointer"
                    >
                      Download PDF Invoice
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════ TAB 4: WISHLIST ════ */}
          {activeProfileTab === 'wishlist' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white">
                  Saved Wishlist
                </h2>
                <p className="text-xs sm:text-sm text-[#735F4C] dark:text-[#B3A492]">
                  Your favorite raw honey varieties saved for future purchases.
                </p>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="p-10 text-center bg-paper-texture dark:bg-[#25221D] rounded-2xl border border-[#E8D5B7] dark:border-[#3D372E] space-y-3">
                  <Heart className="w-10 h-10 text-[#8C7A65] mx-auto stroke-1" />
                  <h4 className="font-serif text-base font-bold text-[#2C1810] dark:text-white">
                    Your Wishlist is Empty
                  </h4>
                  <p className="text-xs text-[#735F4C] dark:text-[#B3A492] max-w-sm mx-auto">
                    Explore our single-origin raw honeys and click the heart icon to save your favorites!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-paper-texture dark:bg-[#25221D] rounded-2xl p-4 border border-[#E8D5B7] dark:border-[#3D372E] flex gap-3.5 items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-14 h-14 object-contain bg-white dark:bg-[#1A1816] rounded-xl p-1 border border-[#E8D5B7] dark:border-[#3D372E]"
                        />
                        <div>
                          <h5 className="font-serif text-xs sm:text-sm font-bold text-[#2C1810] dark:text-white leading-snug">
                            {prod.name}
                          </h5>
                          <span className="text-xs font-black text-[#9C5B23] dark:text-[#E9BE5F]">
                            ₹{prod.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(prod, prod.weight, 1);
                            setIsProfileModalOpen(false);
                            setIsCartOpen(true);
                          }}
                          className="p-2 rounded-xl bg-[#9C5B23] text-white hover:bg-[#834917] transition-all shadow-xs cursor-pointer"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(prod.id)}
                          className="p-2 rounded-xl bg-[#FAF5EB] dark:bg-[#1E1C18] text-red-500 hover:bg-red-50 transition-all border border-[#E8D5B7] dark:border-[#3D372E] cursor-pointer"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════ TAB 5: SECURITY & PREFERENCES ════ */}
          {activeProfileTab === 'settings' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white">
                  Security &amp; Preferences
                </h2>
                <p className="text-xs sm:text-sm text-[#735F4C] dark:text-[#B3A492]">
                  Manage password security, OTP verification, and communication alerts.
                </p>
              </div>

              {/* Notification Toggles */}
              <div className="bg-paper-texture dark:bg-[#25221D] rounded-2xl p-5 border border-[#E8D5B7] dark:border-[#3D372E] space-y-4">
                <h4 className="font-serif text-sm font-bold text-[#2C1810] dark:text-white">
                  Communication Channels
                </h4>
                <div className="space-y-3 text-xs text-[#5C4033] dark:text-[#D8CFBF]">
                  <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF5EB] dark:hover:bg-[#1E1C18] cursor-pointer transition-colors">
                    <div>
                      <div className="font-bold text-[#2C1810] dark:text-white">WhatsApp Order &amp; Dispatch Alerts</div>
                      <div className="text-[11px] text-[#8C7A65]">Receive instant live courier tracking on WhatsApp</div>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#9C5B23] w-4 h-4 rounded" />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF5EB] dark:hover:bg-[#1E1C18] cursor-pointer transition-colors">
                    <div>
                      <div className="font-bold text-[#2C1810] dark:text-white">Email Invoices &amp; Harvest Updates</div>
                      <div className="text-[11px] text-[#8C7A65]">Receive GST tax invoices and new season raw honey alerts</div>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#9C5B23] w-4 h-4 rounded" />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF5EB] dark:hover:bg-[#1E1C18] cursor-pointer transition-colors">
                    <div>
                      <div className="font-bold text-[#2C1810] dark:text-white">SMS Delivery Updates</div>
                      <div className="text-[11px] text-[#8C7A65]">Fast2SMS / MSG91 OTP and delivery status messages</div>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#9C5B23] w-4 h-4 rounded" />
                  </label>
                </div>
              </div>

              {/* Password & Security Card */}
              <div className="bg-paper-texture dark:bg-[#25221D] rounded-2xl p-5 border border-[#E8D5B7] dark:border-[#3D372E] space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#2C1810] dark:text-white">
                  Password &amp; Authentication
                </h4>
                <p className="text-xs text-[#735F4C] dark:text-[#B3A492]">
                  Passwordless Google Sign-In &amp; Firebase Magic Link are enabled for your account ({user.email}).
                </p>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to ' + user.email)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-[#E8D5B7] dark:border-[#3D372E] hover:border-[#9C5B23] text-[#2C1810] dark:text-white bg-[#FAF5EB] dark:bg-[#1E1C18] cursor-pointer transition-colors"
                >
                  Send Password Reset Email
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
