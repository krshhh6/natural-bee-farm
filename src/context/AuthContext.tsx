import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  checkAndCompleteMagicLinkSignIn,
  saveUserProfileToFirestore,
  getUserProfileFromFirestore,
  onFirebaseAuthStateChanged,
  signOutFirebase,
} from '../lib/firebase';
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
  login: (email: string, name?: string, avatar?: string, uid?: string) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  toggleWishlist: (productId: string) => void;
  addOrder: (order: Order) => void;
  logout: () => void;
}

const STORAGE_ACCOUNTS_KEY = 'naturabeefarm_accounts_v3';
const STORAGE_CURRENT_USER_EMAIL_KEY = 'naturabeefarm_current_user_email_v3';

// Sample demo account for customer preview testing
const DEMO_ACCOUNT_EMAIL = 'demo@naturabeefarm.in';
const DEMO_SAMPLE_ADDRESSES: Address[] = [
  {
    id: 'addr-demo-1',
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
    id: 'addr-demo-2',
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

const DEMO_SAMPLE_ORDERS: Order[] = [
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
];

// Helper to load multi-user database from local cache
const loadAccountsDb = (): Record<string, UserProfile> => {
  try {
    const raw = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading accounts db', e);
  }
  return {
    [DEMO_ACCOUNT_EMAIL]: {
      name: 'Ananya Sharma (Demo)',
      email: DEMO_ACCOUNT_EMAIL,
      phone: '9939055989',
      gender: 'female',
      dob: '1995-06-15',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      honeyPoints: 240,
      membershipTier: 'Artisanal Gold',
      addresses: DEMO_SAMPLE_ADDRESSES,
      orders: DEMO_SAMPLE_ORDERS,
      wishlist: ['wild-forest-honey', 'natura-acacia-honey-500g'],
      notifications: {
        whatsapp: true,
        email: true,
        sms: true,
        promotions: true,
      },
    },
  };
};

const saveAccountsDb = (db: Record<string, UserProfile>) => {
  try {
    localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(db));
  } catch (e) {
    console.error('Error saving accounts db', e);
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const currentEmail = localStorage.getItem(STORAGE_CURRENT_USER_EMAIL_KEY);
    const db = loadAccountsDb();

    if (currentEmail && db[currentEmail.toLowerCase()]) {
      return db[currentEmail.toLowerCase()];
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<ProfileTab>('profile');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Real-time Firebase Auth state change listener
  useEffect(() => {
    const unsubscribe = onFirebaseAuthStateChanged(async (fbUser) => {
      if (fbUser && fbUser.email) {
        const emailKey = fbUser.email.toLowerCase();
        // Try fetching cloud profile from Firestore
        const cloudProfile = await getUserProfileFromFirestore(fbUser.uid);
        if (cloudProfile) {
          setUser(cloudProfile);
          const db = loadAccountsDb();
          db[emailKey] = cloudProfile;
          saveAccountsDb(db);
        } else {
          // Initialize user from local or fresh template
          const db = loadAccountsDb();
          const localProfile = db[emailKey];
          if (localProfile) {
            setUser({ ...localProfile, uid: fbUser.uid });
            await saveUserProfileToFirestore(fbUser.uid, { ...localProfile, uid: fbUser.uid });
          } else {
            const newProfile: UserProfile = {
              uid: fbUser.uid,
              name: fbUser.displayName || fbUser.email.split('@')[0],
              email: fbUser.email,
              phone: fbUser.phoneNumber || '',
              gender: '',
              dob: '',
              avatar: fbUser.photoURL || '',
              honeyPoints: 100,
              membershipTier: 'Standard',
              addresses: [],
              orders: [],
              wishlist: [],
              notifications: {
                whatsapp: true,
                email: true,
                sms: true,
                promotions: false,
              },
            };
            setUser(newProfile);
            db[emailKey] = newProfile;
            saveAccountsDb(db);
            await saveUserProfileToFirestore(fbUser.uid, newProfile);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync active user to local storage and Cloud Firestore whenever modified
  useEffect(() => {
    if (user && user.email) {
      const emailKey = user.email.toLowerCase();
      const db = loadAccountsDb();
      db[emailKey] = user;
      saveAccountsDb(db);
      localStorage.setItem(STORAGE_CURRENT_USER_EMAIL_KEY, emailKey);
      localStorage.setItem('naturabeefarm_user', JSON.stringify(user));

      // Sync to Cloud Firestore if UID exists
      if (user.uid) {
        saveUserProfileToFirestore(user.uid, user);
      }
    } else {
      localStorage.removeItem(STORAGE_CURRENT_USER_EMAIL_KEY);
      localStorage.removeItem('naturabeefarm_user');
    }
  }, [user]);

  // Magic link listener
  useEffect(() => {
    checkAndCompleteMagicLinkSignIn()
      .then((profile) => {
        if (profile) {
          login(profile.email, profile.name, profile.avatar, profile.uid);
        }
      })
      .catch((err) => {
        console.error('Magic link check notice:', err);
      });
  }, []);

  const openProfile = (tab: ProfileTab = 'profile') => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveProfileTab(tab);
    setIsProfileModalOpen(true);
  };

  const login = (email: string, name?: string, avatar?: string, uid?: string) => {
    const emailKey = email.trim().toLowerCase();
    const db = loadAccountsDb();

    if (db[emailKey]) {
      const existing = { ...db[emailKey], uid: uid || db[emailKey].uid };
      setUser(existing);
      setIsAuthModalOpen(false);
      if (existing.uid) {
        saveUserProfileToFirestore(existing.uid, existing);
      }
      return;
    }

    const displayName = name || email.split('@')[0];
    const newUser: UserProfile = {
      uid: uid || `usr-${Date.now()}`,
      name: displayName,
      email: email.trim(),
      phone: '',
      gender: '',
      dob: '',
      avatar: avatar || '',
      honeyPoints: 100,
      membershipTier: 'Standard',
      addresses: [],
      orders: [],
      wishlist: [],
      notifications: {
        whatsapp: true,
        email: true,
        sms: true,
        promotions: false,
      },
    };

    db[emailKey] = newUser;
    saveAccountsDb(db);
    setUser(newUser);
    setIsAuthModalOpen(false);
    if (newUser.uid) {
      saveUserProfileToFirestore(newUser.uid, newUser);
    }
  };

  const setUserProfile = (profile: UserProfile | null) => {
    if (!profile) {
      setUser(null);
      return;
    }
    login(profile.email, profile.name, profile.avatar, profile.uid);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const merged = { ...prev, ...updated };
      if (merged.uid) {
        saveUserProfileToFirestore(merged.uid, merged);
      }
      return merged;
    });
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    setUser((prev) => {
      if (!prev) return null;
      const id = `addr-${Date.now()}`;
      const addresses = prev.addresses || [];
      const isFirst = addresses.length === 0;
      const willBeDefault = newAddr.isDefault || isFirst;

      const updatedList = willBeDefault
        ? addresses.map((a) => ({ ...a, isDefault: false }))
        : [...addresses];

      const merged = {
        ...prev,
        addresses: [{ ...newAddr, id, isDefault: willBeDefault }, ...updatedList],
      };

      if (merged.uid) {
        saveUserProfileToFirestore(merged.uid, merged);
      }
      return merged;
    });
  };

  const updateAddress = (id: string, fields: Partial<Address>) => {
    setUser((prev) => {
      if (!prev) return null;
      let addresses = prev.addresses || [];
      if (fields.isDefault) {
        addresses = addresses.map((a) => ({ ...a, isDefault: false }));
      }
      const merged = {
        ...prev,
        addresses: addresses.map((a) => (a.id === id ? { ...a, ...fields } : a)),
      };
      if (merged.uid) {
        saveUserProfileToFirestore(merged.uid, merged);
      }
      return merged;
    });
  };

  const deleteAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const filtered = (prev.addresses || []).filter((a) => a.id !== id);
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      const merged = {
        ...prev,
        addresses: filtered,
      };
      if (merged.uid) {
        saveUserProfileToFirestore(merged.uid, merged);
      }
      return merged;
    });
  };

  const setDefaultAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const merged = {
        ...prev,
        addresses: (prev.addresses || []).map((a) => ({
          ...a,
          isDefault: a.id === id,
        })),
      };
      if (merged.uid) {
        saveUserProfileToFirestore(merged.uid, merged);
      }
      return merged;
    });
  };

  const toggleWishlist = (productId: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const current = prev.wishlist || [];
      const updated = current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId];
      const merged = {
        ...prev,
        wishlist: updated,
      };
      if (merged.uid) {
        saveUserProfileToFirestore(merged.uid, merged);
      }
      return merged;
    });
  };

  const addOrder = (order: Order) => {
    setUser((prev) => {
      if (!prev) return null;
      const earnedPoints = Math.round(order.total / 10);
      const merged = {
        ...prev,
        orders: [order, ...(prev.orders || [])],
        honeyPoints: (prev.honeyPoints || 0) + earnedPoints,
      };
      if (merged.uid) {
        saveUserProfileToFirestore(merged.uid, merged);
      }
      return merged;
    });
  };

  const logout = () => {
    signOutFirebase();
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
        addOrder,
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
