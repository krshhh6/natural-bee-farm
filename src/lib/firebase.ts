import { initializeApp } from '@firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider, 
  signInWithPopup, 
  sendEmailVerification,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from '@firebase/auth';
import { getFirestore, doc, setDoc } from '@firebase/firestore';

// Firebase configuration for project: NATURAL BEE FARM (natural-bee-farm)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBB7Fv2zkIvtbdoAMlRuJZE5sfnVJG2u3w",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "natural-bee-farm.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "natural-bee-farm",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "natural-bee-farm.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "217633066716",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:217633066716:web:f701c32188cd7f9e516e19",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-GDEDBZ272Q"
};

// Initialize Firebase App & Services
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

// Firestore Helper: Save User Profile
export const saveUserProfileToFirestore = async (userId: string, data: { name: string; email: string; phone?: string; avatar?: string; isEmailVerified?: boolean }) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log('User profile saved to Firestore successfully!');
  } catch (error) {
    console.warn('Firestore write warning:', error);
  }
};

// 1-Click Passwordless Magic Link Helper
export const sendMagicLinkToEmail = async (email: string) => {
  const actionCodeSettings = {
    url: window.location.origin + '/?magic_link=true',
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem('emailForSignIn', email);
};

// Complete Magic Link Sign In
export const checkAndCompleteMagicLinkSignIn = async () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please enter your email for confirmation:');
    }
    if (email) {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem('emailForSignIn');
      const user = result.user;
      const profile = {
        uid: user.uid,
        name: user.displayName || email.split('@')[0],
        email: email,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
        isEmailVerified: true
      };
      await saveUserProfileToFirestore(user.uid, profile);
      return profile;
    }
  }
  return null;
};

// Send Verification Email Helper
export const sendVerificationEmailToUser = async (user: any) => {
  if (user) {
    await sendEmailVerification(user);
    console.log('Verification email sent to:', user.email);
  }
};

// Google Popup Login with Firebase
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const profile = {
      uid: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Google User',
      email: user.email || '',
      avatar: user.photoURL || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      isEmailVerified: true
    };
    await saveUserProfileToFirestore(user.uid, profile);
    return profile;
  } catch (error: any) {
    console.error('Google Auth Error:', error);
    throw error;
  }
};

// Apple Popup Login with Firebase
export const signInWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    const user = result.user;
    const profile = {
      uid: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Apple User',
      email: user.email || '',
      avatar: user.photoURL || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      isEmailVerified: true
    };
    await saveUserProfileToFirestore(user.uid, profile);
    return profile;
  } catch (error: any) {
    console.error('Apple Auth Error:', error);
    throw error;
  }
};
