import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkAndCompleteMagicLinkSignIn } from '../lib/firebase';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  uid?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  login: (email: string, name?: string, avatar?: string) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('naturabeefarm_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    checkAndCompleteMagicLinkSignIn().then((profile) => {
      if (profile) {
        setUser(profile);
      }
    }).catch(err => console.warn('Magic link verification notice:', err));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('naturabeefarm_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('naturabeefarm_user');
    }
  }, [user]);

  const login = (email: string, name?: string, avatar?: string) => {
    const newUser: UserProfile = {
      name: name || email.split('@')[0],
      email,
      avatar: avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const setUserProfile = (profile: UserProfile | null) => {
    setUser(profile);
    if (profile) setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        login,
        setUserProfile,
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
