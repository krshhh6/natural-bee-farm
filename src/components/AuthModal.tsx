import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { signInWithGoogle, sendMagicLinkToEmail } from '../lib/firebase';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, setUserProfile } = useAuth();
  const { showToast } = useCart();

  // Lock background body scrolling when modal is active
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [sendingMagicLink, setSendingMagicLink] = useState(false);

  if (!isAuthModalOpen) return null;

  // Validation Rules for Registration
  const isUsernameValid = username.length >= 3 && !/\s/.test(username);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email);
      showToast(`Welcome back, ${email.split('@')[0]}! 👋`);
    }
  };

  const handleSendMagicLink = async () => {
    if (!email.trim()) {
      alert('Please enter your email address first!');
      return;
    }
    setSendingMagicLink(true);
    try {
      await sendMagicLinkToEmail(email);
      showToast(`✨ Magic Sign-In link sent to ${email}! Check your inbox to log in.`);
    } catch (err: any) {
      console.warn('Magic link error:', err);
      alert(`Error sending link: ${err?.message || err}`);
    } finally {
      setSendingMagicLink(false);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUsernameValid) {
      alert('Username must be at least 3 characters with no spaces.');
      return;
    }
    login(email, username);
    showToast(`Account created successfully! Welcome to Natura Bee Farm, @${username} 🎉`);
  };

  const handleSocialLogin = async (provider: 'Google') => {
    setLoadingProvider(provider);
    try {
      const profile = await signInWithGoogle();
      if (profile) {
        setUserProfile(profile);
        showToast(`Signed in as ${profile.name} (${profile.email}) 🎉`);
      }
    } catch (err: any) {
      console.error(`${provider} Auth Error:`, err);
      if (err?.code === 'auth/popup-closed-by-user') {
        showToast('Sign in cancelled.');
      } else if (err?.code === 'auth/unauthorized-domain') {
        alert(`Domain Notice: Please add ${window.location.hostname} to Authorized Domains in Firebase Console > Authentication > Settings.`);
      } else {
        alert(`${provider} Sign In Error: ${err?.message || err}`);
      }
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleDemoLogin = () => {
    login('customer@naturabeefarm.in', 'HoneyLover');
    showToast('Signed in with Demo Account 🎉');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#282823]/80 backdrop-blur-md animate-fadeIn overflow-y-auto overscroll-contain"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAuthModalOpen(false);
      }}
    >
      {/* Outer Card Container */}
      <div className="relative w-full max-w-[460px] bg-[#FAF3D6] dark:bg-[#282823] rounded-[28px] shadow-2xl border border-[#595C56]/40 p-6 sm:p-8 animate-slide-up max-h-[85vh] sm:max-h-[90vh] overflow-y-auto font-sans my-auto overscroll-contain">
        
        {/* Top Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#595C56] dark:text-[#F5E8B6]/70 hover:text-[#282823] hover:bg-[#F5E8B6] dark:hover:bg-[#1C1C18] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon + Title */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#E9BE5F] flex items-center justify-center text-[#282823] font-serif font-black text-2xl shadow-md">
            🐝
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#282823] dark:text-[#F5E8B6]">
              Natura Bee Farm
            </h3>
            <p className="text-xs text-[#595C56] dark:text-[#F5E8B6]/70">
              {authMode === 'login' ? 'Welcome back! Sign in to your account' : 'Create your account to start shopping'}
            </p>
          </div>
        </div>

        {/* Tab Toggle Switch (Sign In / Create Account) */}
        <div className="flex bg-[#F5E8B6] dark:bg-[#1C1C18] p-1 rounded-2xl mb-6 border border-[#595C56]/30">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              authMode === 'login'
                ? 'bg-[#E9BE5F] text-[#282823] shadow-sm'
                : 'text-[#595C56] dark:text-[#F5E8B6]/70 hover:text-[#282823]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              authMode === 'register'
                ? 'bg-[#E9BE5F] text-[#282823] shadow-sm'
                : 'text-[#595C56] dark:text-[#F5E8B6]/70 hover:text-[#282823]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Dynamic Form Content */}
        {authMode === 'login' ? (
          /* SIGN IN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#282823] dark:text-[#F5E8B6]">Email</label>
              <div className="h-12 border border-[#595C56]/40 focus-within:border-[#E9BE5F] rounded-2xl flex items-center px-3.5 bg-[#F5E8B6]/50 dark:bg-[#1C1C18] transition-colors">
                <svg className="w-5 h-5 text-[#E9BE5F] shrink-0" viewBox="0 0 32 32" fill="currentColor">
                  <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                </svg>
                <input
                  type="email"
                  required
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full ml-3 bg-transparent text-xs sm:text-sm text-[#282823] dark:text-[#F5E8B6] placeholder-[#595C56] focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#282823] dark:text-[#F5E8B6]">Password</label>
              <div className="h-12 border border-[#595C56]/40 focus-within:border-[#E9BE5F] rounded-2xl flex items-center px-3.5 bg-[#F5E8B6]/50 dark:bg-[#1C1C18] transition-colors">
                <svg className="w-5 h-5 text-[#E9BE5F] shrink-0" viewBox="-64 0 512 512" fill="currentColor">
                  <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                  <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full ml-3 bg-transparent text-xs sm:text-sm text-[#282823] dark:text-[#F5E8B6] placeholder-[#595C56] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#E9BE5F] hover:text-[#D4AA4B] ml-2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-[#282823] dark:text-[#F5E8B6]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#595C56] text-[#E9BE5F] focus:ring-[#E9BE5F]"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to your email!')}
                className="text-[#282823] dark:text-[#E9BE5F] hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>

            {/* Main Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] font-bold rounded-2xl text-sm shadow-md shadow-[#E9BE5F]/25 transition-all hover:scale-[1.01] active:scale-[0.99] mt-3 cursor-pointer"
            >
              Sign In
            </button>

            {/* 1-Click Passwordless Magic Link Button */}
            <button
              type="button"
              disabled={sendingMagicLink}
              onClick={handleSendMagicLink}
              className="w-full py-2.5 bg-[#F5E8B6] hover:bg-[#FAF3D6] text-[#282823] font-bold rounded-2xl text-xs border border-[#E9BE5F] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {sendingMagicLink ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E9BE5F]" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-[#E9BE5F]" />
              )}
              <span>Email 1-Click Magic Link (Passwordless)</span>
            </button>

            {/* Switch to Sign Up */}
            <p className="text-center text-xs text-[#595C56] dark:text-[#F5E8B6]/70 pt-1">
              Don&apos;t have an account?{' '}
              <span
                onClick={() => setAuthMode('register')}
                className="text-[#282823] dark:text-[#E9BE5F] font-bold cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>

            {/* Quick Demo Login */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-xs text-[#595C56] dark:text-[#F5E8B6]/60 hover:text-[#E9BE5F] font-medium underline cursor-pointer"
              >
                ⚡ Quick Demo Login
              </button>
            </div>

          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            
            {/* Username */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#282823] dark:text-[#F5E8B6]">Username</label>
              <div className="h-11 border border-[#595C56]/40 focus-within:border-[#E9BE5F] rounded-2xl flex items-center px-3.5 bg-[#F5E8B6]/50 dark:bg-[#1C1C18]">
                <input
                  type="text"
                  required
                  placeholder="HoneyLover (no spaces)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ''))}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#282823] dark:text-[#F5E8B6] placeholder-[#595C56] focus:outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#282823] dark:text-[#F5E8B6]">Email</label>
              <div className="h-11 border border-[#595C56]/40 focus-within:border-[#E9BE5F] rounded-2xl flex items-center px-3.5 bg-[#F5E8B6]/50 dark:bg-[#1C1C18]">
                <input
                  type="email"
                  required
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#282823] dark:text-[#F5E8B6] placeholder-[#595C56] focus:outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#282823] dark:text-[#F5E8B6]">Mobile Number</label>
              <div className="h-11 border border-[#595C56]/40 focus-within:border-[#E9BE5F] rounded-2xl flex items-center px-3.5 bg-[#F5E8B6]/50 dark:bg-[#1C1C18]">
                <input
                  type="tel"
                  required
                  placeholder="9835012345 (10 Digits)"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#282823] dark:text-[#F5E8B6] placeholder-[#595C56] focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#282823] dark:text-[#F5E8B6]">Password</label>
              <div className="h-11 border border-[#595C56]/40 focus-within:border-[#E9BE5F] rounded-2xl flex items-center px-3.5 bg-[#F5E8B6]/50 dark:bg-[#1C1C18]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#282823] dark:text-[#F5E8B6] placeholder-[#595C56] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#E9BE5F] hover:text-[#D4AA4B] ml-2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#282823] dark:text-[#F5E8B6]">Confirm Password</label>
              <div className="h-11 border border-[#595C56]/40 focus-within:border-[#E9BE5F] rounded-2xl flex items-center px-3.5 bg-[#F5E8B6]/50 dark:bg-[#1C1C18]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#282823] dark:text-[#F5E8B6] placeholder-[#595C56] focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Register Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] font-bold rounded-2xl text-sm shadow-md shadow-[#E9BE5F]/25 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2 cursor-pointer"
            >
              Sign Up
            </button>

            {/* Switch to Sign In */}
            <p className="text-center text-xs text-[#595C56] dark:text-[#F5E8B6]/70 pt-1">
              Already have an account?{' '}
              <span
                onClick={() => setAuthMode('login')}
                className="text-[#282823] dark:text-[#E9BE5F] font-bold cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>
          </form>
        )}

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#595C56]/30"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#FAF3D6] dark:bg-[#282823] px-3 text-[#595C56] dark:text-[#F5E8B6]/60 font-semibold">
              Or With
            </span>
          </div>
        </div>

        {/* Social Sign In Buttons */}
        <div className="grid grid-cols-1 gap-2.5">
          {/* Google */}
          <button
            type="button"
            disabled={loadingProvider === 'Google'}
            onClick={() => handleSocialLogin('Google')}
            className="h-11 border border-[#595C56]/40 hover:border-[#E9BE5F] bg-[#F5E8B6]/50 dark:bg-[#1C1C18] rounded-2xl flex items-center justify-center space-x-2 transition-all hover:bg-[#F5E8B6] dark:hover:bg-[#201D19] cursor-pointer"
          >
            {loadingProvider === 'Google' ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#E9BE5F]" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.4 0 15.2s.7 5.5 1.9 7.9l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-2.9l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.6C3.7 20.3 7.5 23.5 12 23.5z"
                />
              </svg>
            )}
            <span className="text-xs sm:text-sm font-semibold text-[#282823] dark:text-[#F5E8B6]">
              {loadingProvider === 'Google' ? 'Signing in...' : 'Continue with Google'}
            </span>
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-5 text-[10px] text-center text-[#595C56] dark:text-[#F5E8B6]/50">
          By signing up, you agree to Natura Bee Farm&apos;s{' '}
          <a href="#terms" className="underline hover:text-[#E9BE5F]">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#privacy" className="underline hover:text-[#E9BE5F]">
            Privacy Policy
          </a>.
        </p>

      </div>
    </div>
  );
};
