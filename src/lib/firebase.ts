import { initializeApp } from '@firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from '@firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from '@firebase/firestore';
import type { UserProfile } from '../types';

// Firebase configuration for project: NATURAL BEE FARM (natural-bee-farm)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBB7Fv2zkIvtbdoAMlRuJZE5sfnVJG2u3w',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'natural-bee-farm.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'natural-bee-farm',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'natural-bee-farm.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '217633066716',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:217633066716:web:f701c32188cd7f9e516e19',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-GDEDBZ272Q',
};

// Initialize Firebase App & Services
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const appleProvider = new OAuthProvider('apple.com');

/**
 * Save / Sync complete user profile to Cloud Firestore (collection: `users`)
 */
export const saveUserProfileToFirestore = async (
  userId: string,
  data: Partial<UserProfile>
) => {
  if (!userId) return;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(
      userRef,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.warn('Firestore write notice (falling back to local cache):', error);
  }
};

/**
 * Fetch user profile from Cloud Firestore
 */
export const getUserProfileFromFirestore = async (
  userId: string
): Promise<UserProfile | null> => {
  if (!userId) return null;
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
  } catch (error) {
    console.warn('Firestore read notice (using local storage):', error);
  }
  return null;
};

/**
 * Google Popup Sign In with automatic Firestore profile sync
 */
export const signInWithGoogle = async (): Promise<UserProfile> => {
  const result = await signInWithPopup(auth, googleProvider);
  const fbUser = result.user;

  // Check if profile exists in Firestore
  const existing = await getUserProfileFromFirestore(fbUser.uid);
  if (existing) {
    return {
      ...existing,
      uid: fbUser.uid,
      email: fbUser.email || existing.email,
      name: fbUser.displayName || existing.name,
      avatar: fbUser.photoURL || existing.avatar,
    };
  }

  // Create clean initial profile for first-time user
  const newProfile: UserProfile = {
    uid: fbUser.uid,
    name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Artisanal Member',
    email: fbUser.email || '',
    phone: fbUser.phoneNumber || '',
    gender: '',
    dob: '',
    avatar:
      fbUser.photoURL ||
      `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
    honeyPoints: 100, // 100 Welcome Points
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

  await saveUserProfileToFirestore(fbUser.uid, newProfile);
  return newProfile;
};

/**
 * Email & Password Sign In
 */
export const signInWithEmailPassword = async (
  email: string,
  pass: string
): Promise<UserProfile> => {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  const fbUser = result.user;

  const existing = await getUserProfileFromFirestore(fbUser.uid);
  if (existing) {
    return {
      ...existing,
      uid: fbUser.uid,
      email: fbUser.email || existing.email,
      name: fbUser.displayName || existing.name,
    };
  }

  const profile: UserProfile = {
    uid: fbUser.uid,
    name: fbUser.displayName || email.split('@')[0],
    email: email.trim(),
    phone: '',
    gender: '',
    dob: '',
    avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
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

  await saveUserProfileToFirestore(fbUser.uid, profile);
  return profile;
};

/**
 * Email & Password Registration
 */
export const registerWithEmailPassword = async (
  email: string,
  pass: string,
  name: string,
  phone?: string
): Promise<UserProfile> => {
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  const fbUser = result.user;

  const newProfile: UserProfile = {
    uid: fbUser.uid,
    name: name || email.split('@')[0],
    email: email.trim(),
    phone: phone || '',
    gender: '',
    dob: '',
    avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
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

  await saveUserProfileToFirestore(fbUser.uid, newProfile);
  return newProfile;
};

/**
 * 1-Click Passwordless Magic Link
 */
export const sendMagicLinkToEmail = async (email: string) => {
  const actionCodeSettings = {
    url: window.location.origin + '/?magic_link=true',
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem('emailForSignIn', email);
};

/**
 * Complete Magic Link Sign In
 */
export const checkAndCompleteMagicLinkSignIn = async (): Promise<UserProfile | null> => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please enter your email for confirmation:');
    }
    if (email) {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem('emailForSignIn');
      const fbUser = result.user;

      const existing = await getUserProfileFromFirestore(fbUser.uid);
      if (existing) return existing;

      const profile: UserProfile = {
        uid: fbUser.uid,
        name: fbUser.displayName || email.split('@')[0],
        email: email,
        avatar:
          fbUser.photoURL ||
          `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
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
      await saveUserProfileToFirestore(fbUser.uid, profile);
      return profile;
    }
  }
  return null;
};

/**
 * Send Verification Email
 */
export const sendVerificationEmailToUser = async (user: any) => {
  if (user) {
    await sendEmailVerification(user);
  }
};

/**
 * Sign Out from Firebase
 */
export const signOutFirebase = async () => {
  try {
    if (auth.signOut) {
      await auth.signOut();
    }
  } catch (error) {
    console.warn('Firebase sign out notice:', error);
  }
};

/**
 * Firebase Auth State Change Listener
 */
export const onFirebaseAuthStateChanged = (
  callback: (user: any) => void
) => {
  if (auth && typeof auth.onAuthStateChanged === 'function') {
    return auth.onAuthStateChanged(callback);
  }
  return () => {};
};
