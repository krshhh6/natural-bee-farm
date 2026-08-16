import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkAndCompleteMagicLinkSignIn } from '../lib/firebase';
import type { UserProfile, Address, Order, ProfileTab } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  activeProfileTab: ProfileTab;
  setActiveProfileTab: (tab: ProfileTab) => void;
  openProfile: (tab?: ProfileTab) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  login: (email: string, name?: string, avatar?: string) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  toggleWishlist: (productId: string) => void;
  logout: () => void;
}

const DEFAULT_SAMPLE_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'Ananya Sharma',
    phone: '9939055989',
    street: 'Flat 402, Honey Blossom Residency, Bahpura - Bihta Rd',
    landmark: 'Near Mustafapur Chauraha',
    city: 'Patna',
    state: 'Bihar',
    pincode: '801111',
    type: 'home',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Ananya Sharma',
    phone: '9876543210',
    street: 'Tech Park Tower B, 3rd Floor, Outer Ring Rd',
    landmark: 'Opposite Metro Station',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    type: 'work',
    isDefault: false,
  },
];

const DEFAULT_SAMPLE_ORDERS: Order[] = [
  {
    id: 'NBF-89241',
    date: '14 Aug 2026',
    items: [
      {
        id: 'wild-forest-honey',
        name: 'Wild Forest Honey',
        weight: '500g',
        quantity: 2,
        price: 589,
        image: '/Glass_jar_filled_with_honey_202608130958.jpeg',
      },
      {
        id: 'natura-acacia-honey-500g',
        name: 'Himalayan Acacia & Sidr Honey',
        weight: '500g',
        quantity: 1,
        price: 599,
        image: '/Honey_jar_on_wood_table_202608130959.jpeg',
      },
    ],
    total: 1777,
    status: 'In Transit',
    paymentMethod: 'Razorpay UPI (Verified)',
    shippingAddress: 'Flat 402, Honey Blossom Residency, Bahpura - Bihta Rd, Patna, Bihar 801111',
    trackingNumber: 'DEL-99390-55989',
    deliveryDate: 'Expected by 18 Aug 2026',
  },
  {
    id: 'NBF-77190',
    date: '28 Jul 2026',
    items: [
      {
        id: 'tulsi-immunity-honey-500g',
        name: 'Raw Tulsi & Neem Infused Honey',
        weight: '500g',
        quantity: 1,
        price: 499,
        image: '/Jar_of_tulsi_honey_on_202608130958.jpeg',
      },
    ],
    total: 499,
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    shippingAddress: 'Flat 402, Honey Blossom Residency, Bahpura - Bihta Rd, Patna, Bihar 801111',
    trackingNumber: 'SR-77190-PAT',
    deliveryDate: 'Delivered on 31 Jul 2026',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('naturabeefarm_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          addresses: DEFAULT_SAMPLE_ADDRESSES,
          orders: DEFAULT_SAMPLE_ORDERS,
          honeyPoints: 240,
          membershipTier: 'Artisanal Gold',
          wishlist: ['wild-forest-honey', 'natura-acacia-honey-500g'],
          notifications: {
            whatsapp: true,
            email: true,
            sms: true,
            promotions: false,
          },
          ...parsed,
        };
      } catch (e) {
        console.error('Failed to parse stored user profile', e);
      }
    }
    // Return sample logged-in user so the user can test the profile immediately!
    return {
      name: 'Ananya Sharma',
      email: 'ananya.sharma@example.com',
      phone: '+91 99390 55989',
      gender: 'female',
      dob: '1995-06-15',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      honeyPoints: 240,
      membershipTier: 'Artisanal Gold',
      addresses: DEFAULT_SAMPLE_ADDRESSES,
      orders: DEFAULT_SAMPLE_ORDERS,
      wishlist: ['wild-forest-honey', 'natura-acacia-honey-500g'],
      notifications: {
        whatsapp: true,
        email: true,
        sms: true,
        promotions: true,
      },
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<ProfileTab>('profile');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    checkAndCompleteMagicLinkSignIn()
      .then((profile) => {
        if (profile) {
          setUser((prev) => ({
            ...prev,
            ...profile,
            addresses: prev?.addresses || DEFAULT_SAMPLE_ADDRESSES,
            orders: prev?.orders || DEFAULT_SAMPLE_ORDERS,
            honeyPoints: prev?.honeyPoints ?? 240,
            membershipTier: prev?.membershipTier || 'Artisanal Gold',
          }));
        }
      })
      .catch((err) => console.warn('Magic link verification notice:', err));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('naturabeefarm_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('naturabeefarm_user');
    }
  }, [user]);

  const openProfile = (tab: ProfileTab = 'profile') => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveProfileTab(tab);
    setIsProfileModalOpen(true);
  };

  const login = (email: string, name?: string, avatar?: string) => {
    const newUser: UserProfile = {
      name: name || email.split('@')[0],
      email,
      phone: '+91 99390 55989',
      avatar:
        avatar ||
        `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      honeyPoints: 240,
      membershipTier: 'Artisanal Gold',
      addresses: DEFAULT_SAMPLE_ADDRESSES,
      orders: DEFAULT_SAMPLE_ORDERS,
      wishlist: ['wild-forest-honey'],
      notifications: {
        whatsapp: true,
        email: true,
        sms: true,
        promotions: true,
      },
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const setUserProfile = (profile: UserProfile | null) => {
    setUser(profile);
    if (profile) setIsAuthModalOpen(false);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    setUser((prev) => {
      if (!prev) return null;
      const id = `addr-${Date.now()}`;
      const addresses = prev.addresses || [];
      const updatedList = newAddr.isDefault
        ? addresses.map((a) => ({ ...a, isDefault: false }))
        : [...addresses];
      return {
        ...prev,
        addresses: [{ ...newAddr, id }, ...updatedList],
      };
    });
  };

  const updateAddress = (id: string, fields: Partial<Address>) => {
    setUser((prev) => {
      if (!prev) return null;
      let addresses = prev.addresses || [];
      if (fields.isDefault) {
        addresses = addresses.map((a) => ({ ...a, isDefault: false }));
      }
      return {
        ...prev,
        addresses: addresses.map((a) => (a.id === id ? { ...a, ...fields } : a)),
      };
    });
  };

  const deleteAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const filtered = (prev.addresses || []).filter((a) => a.id !== id);
      // If deleted was default, make first remaining default
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return {
        ...prev,
        addresses: filtered,
      };
    });
  };

  const setDefaultAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: (prev.addresses || []).map((a) => ({
          ...a,
          isDefault: a.id === id,
        })),
      };
    });
  };

  const toggleWishlist = (productId: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const current = prev.wishlist || [];
      const updated = current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId];
      return {
        ...prev,
        wishlist: updated,
      };
    });
  };

  const logout = () => {
    setUser(null);
    setIsProfileModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        activeProfileTab,
        setActiveProfileTab,
        openProfile,
        authMode,
        setAuthMode,
        login,
        setUserProfile,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        toggleWishlist,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
