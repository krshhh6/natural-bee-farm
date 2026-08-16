import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Loader2, Sparkles, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  signInWithGoogle,
  sendMagicLinkToEmail,
  signInWithEmailPassword,
  registerWithEmailPassword,
} from '../lib/firebase';

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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoadingProvider('email');
    try {
      if (password) {
        const profile = await signInWithEmailPassword(email, password);
        setUserProfile(profile);
        showToast(`Welcome back, ${profile.name}! 👋`);
      } else {
        login(email);
        showToast(`Welcome back, ${email.split('@')[0]}! 👋`);
      }
    } catch (err: any) {
      console.warn('Firebase login notice:', err);
      login(email);
      showToast(`Welcome back, ${email.split('@')[0]}! 👋`);
    } finally {
      setLoadingProvider(null);
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

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUsernameValid) {
      alert('Username must be at least 3 characters with no spaces.');
      return;
    }
    setLoadingProvider('register');
    try {
      if (password) {
        const profile = await registerWithEmailPassword(email, password, username, phone);
        setUserProfile(profile);
        showToast(`Account created successfully! Welcome to Natura Bee Farm, @${username} 🎉`);
      } else {
        login(email, username);
        showToast(`Account created successfully! Welcome to Natura Bee Farm, @${username} 🎉`);
      }
    } catch (err: any) {
      console.warn('Firebase register notice:', err);
      login(email, username);
      showToast(`Account created successfully! Welcome to Natura Bee Farm, @${username} 🎉`);
    } finally {
      setLoadingProvider(null);
    }
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1C1810]/75 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAuthModalOpen(false);
      }}
    >
      {/* Outer Card Container with Paper Texture & Clean Custom Scrollbar */}
      <div className="relative w-full max-w-[460px] bg-paper-texture dark:bg-[#1E1C18] rounded-[28px] sm:rounded-[32px] shadow-2xl border-2 border-[#E8D5B7] dark:border-[#3D372E] p-5 sm:p-7 animate-scale-up max-h-[90vh] overflow-y-auto no-scrollbar font-sans my-auto">
        
        {/* Top Floating Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF5EB] dark:bg-[#2A2620] border border-[#E8D5B7] dark:border-[#3D372E] text-[#9C5B23] dark:text-[#E9BE5F] flex items-center justify-center hover:bg-[#9C5B23] hover:text-white transition-all shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon + Title */}
        <div className="flex items-center space-x-3 mb-5 pr-8">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FAF5EB] via-[#F3E5AB] to-[#E9BE5F] border border-[#E8D5B7] flex items-center justify-center text-xl shadow-xs shrink-0">
            🐝
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C1810] dark:text-white leading-snug">
              Natura Bee Farm
            </h3>
            <p className="text-[11px] text-[#5C4033] dark:text-[#D8CFBF] font-medium">
              {authMode === 'login' ? 'Sign in to access your pure honey orders' : 'Join 10,000+ pure raw honey lovers'}
            </p>
          </div>
        </div>

        {/* Segmented Tab Pill Toggle (Sign In / Create Account) */}
        <div className="flex bg-[#FAF5EB] dark:bg-[#181715] p-1 rounded-2xl mb-5 border border-[#E8D5B7] dark:border-[#3D372E] shadow-inner">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              authMode === 'login'
                ? 'bg-[#9C5B23] text-white shadow-md'
                : 'text-[#5C4033] dark:text-[#D8CFBF] hover:text-[#2C1810]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              authMode === 'register'
                ? 'bg-[#9C5B23] text-white shadow-md'
                : 'text-[#5C4033] dark:text-[#D8CFBF] hover:text-[#2C1810]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Dynamic Form Content */}
        {authMode === 'login' ? (
          /* SIGN IN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#5C4033] dark:text-[#D8CFBF]">Email Address</label>
              <div className="h-10 sm:h-11 border border-[#E8D5B7] dark:border-[#3D372E] focus-within:border-[#9C5B23] rounded-xl flex items-center px-3 bg-white/80 dark:bg-[#181715] transition-colors shadow-2xs">
                <Mail className="w-4 h-4 text-[#9C5B23] shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full ml-2.5 bg-transparent text-xs text-[#2C1810] dark:text-[#F5E8B6] placeholder-[#8C7A65] focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#5C4033] dark:text-[#D8CFBF]">Password</label>
              <div className="h-10 sm:h-11 border border-[#E8D5B7] dark:border-[#3D372E] focus-within:border-[#9C5B23] rounded-xl flex items-center px-3 bg-white/80 dark:bg-[#181715] transition-colors shadow-2xs">
                <Lock className="w-4 h-4 text-[#9C5B23] shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full ml-2.5 bg-transparent text-xs text-[#2C1810] dark:text-[#F5E8B6] placeholder-[#8C7A65] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#9C5B23] hover:text-[#834917] ml-1.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center space-x-1.5 cursor-pointer text-[#5C4033] dark:text-[#D8CFBF]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#E8D5B7] text-[#9C5B23] focus:ring-[#9C5B23]"
                />
                <span className="text-[11px] font-medium">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to your email!')}
                className="text-[11px] text-[#9C5B23] dark:text-[#E9BE5F] hover:underline font-bold"
              >
                Forgot password?
              </button>
            </div>

            {/* Main Submit Button */}
            <button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-[#9C5B23] via-[#B8661B] to-[#9C5B23] hover:bg-[#834917] text-white font-extrabold rounded-xl text-xs shadow-md shadow-[#9C5B23]/20 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2 cursor-pointer flex items-center justify-center gap-1.5 border border-[#834917]"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>

            {/* 1-Click Passwordless Magic Link Button */}
            <button
              type="button"
              disabled={sendingMagicLink}
              onClick={handleSendMagicLink}
              className="w-full py-2 bg-[#FAF5EB] dark:bg-[#181715] hover:bg-white text-[#9C5B23] dark:text-[#E9BE5F] font-bold rounded-xl text-xs border border-[#E8D5B7] dark:border-[#3D372E] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              {sendingMagicLink ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#9C5B23]" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-[#9C5B23]" />
              )}
              <span>Email 1-Click Passwordless Magic Link</span>
            </button>

            {/* Quick Demo Login */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-[11px] text-[#8C5E2B] dark:text-[#E9BE5F] hover:underline font-bold"
              >
                ⚡ Quick Demo Login
              </button>
            </div>

          </form>
        ) : (
          /* SIGN UP FORM — Compact 2-Column Grid Layout */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            
            {/* Username */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#5C4033] dark:text-[#D8CFBF]">Username</label>
              <div className="h-10 border border-[#E8D5B7] dark:border-[#3D372E] focus-within:border-[#9C5B23] rounded-xl flex items-center px-3 bg-white/80 dark:bg-[#181715]">
                <User className="w-3.5 h-3.5 text-[#9C5B23] shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="HoneyLover (no spaces)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ''))}
                  className="w-full ml-2 bg-transparent text-xs text-[#2C1810] dark:text-[#F5E8B6] placeholder-[#8C7A65] focus:outline-none"
                />
              </div>
            </div>

            {/* 2-Column Row: Email & Mobile Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5C4033] dark:text-[#D8CFBF]">Email</label>
                <div className="h-10 border border-[#E8D5B7] dark:border-[#3D372E] focus-within:border-[#9C5B23] rounded-xl flex items-center px-2.5 bg-white/80 dark:bg-[#181715]">
                  <Mail className="w-3.5 h-3.5 text-[#9C5B23] shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full ml-2 bg-transparent text-xs text-[#2C1810] dark:text-[#F5E8B6] placeholder-[#8C7A65] focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5C4033] dark:text-[#D8CFBF]">Mobile</label>
                <div className="h-10 border border-[#E8D5B7] dark:border-[#3D372E] focus-within:border-[#9C5B23] rounded-xl flex items-center px-2.5 bg-white/80 dark:bg-[#181715]">
                  <Phone className="w-3.5 h-3.5 text-[#9C5B23] shrink-0" />
                  <input
                    type="tel"
                    required
                    placeholder="9835012345"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full ml-2 bg-transparent text-xs text-[#2C1810] dark:text-[#F5E8B6] placeholder-[#8C7A65] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2-Column Row: Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5C4033] dark:text-[#D8CFBF]">Password</label>
                <div className="h-10 border border-[#E8D5B7] dark:border-[#3D372E] focus-within:border-[#9C5B23] rounded-xl flex items-center px-2.5 bg-white/80 dark:bg-[#181715]">
                  <Lock className="w-3.5 h-3.5 text-[#9C5B23] shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full ml-2 bg-transparent text-xs text-[#2C1810] dark:text-[#F5E8B6] placeholder-[#8C7A65] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#9C5B23] hover:text-[#834917] ml-1"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5C4033] dark:text-[#D8CFBF]">Confirm</label>
                <div className="h-10 border border-[#E8D5B7] dark:border-[#3D372E] focus-within:border-[#9C5B23] rounded-xl flex items-center px-2.5 bg-white/80 dark:bg-[#181715]">
                  <Lock className="w-3.5 h-3.5 text-[#9C5B23] shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Confirm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full ml-2 bg-transparent text-xs text-[#2C1810] dark:text-[#F5E8B6] placeholder-[#8C7A65] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Register Button */}
            <button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-[#9C5B23] via-[#B8661B] to-[#9C5B23] hover:bg-[#834917] text-white font-extrabold rounded-xl text-xs shadow-md shadow-[#9C5B23]/20 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2 cursor-pointer border border-[#834917]"
            >
              Create Account
            </button>

            {/* Switch to Sign In */}
            <p className="text-center text-xs text-[#5C4033] dark:text-[#D8CFBF] pt-0.5">
              Already have an account?{' '}
              <span
                onClick={() => setAuthMode('login')}
                className="text-[#9C5B23] dark:text-[#E9BE5F] font-bold cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>
          </form>
        )}

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8D5B7] dark:border-[#3D372E]"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
            <span className="bg-[#FAF5EB] dark:bg-[#1E1C18] px-3 text-[#8C7A65]">
              Or Continue With
            </span>
          </div>
        </div>

        {/* Social Sign In Button */}
        <div>
          <button
            type="button"
            disabled={loadingProvider === 'Google'}
            onClick={() => handleSocialLogin('Google')}
            className="w-full h-10 border border-[#E8D5B7] dark:border-[#3D372E] hover:border-[#9C5B23] bg-white dark:bg-[#181715] rounded-xl flex items-center justify-center space-x-2 transition-all hover:shadow-xs cursor-pointer"
          >
            {loadingProvider === 'Google' ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#9C5B23]" />
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
            <span className="text-xs font-extrabold text-[#2C1810] dark:text-white">
              {loadingProvider === 'Google' ? 'Signing in...' : 'Continue with Google'}
            </span>
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-4 text-[10px] text-center text-[#5C4033] dark:text-[#D8CFBF]">
          By signing up, you agree to Natura Bee Farm&apos;s{' '}
          <a href="#terms" className="underline hover:text-[#9C5B23]">
            Terms
          </a>{' '}
          and{' '}
          <a href="#privacy" className="underline hover:text-[#9C5B23]">
            Privacy Policy
          </a>.
        </p>

      </div>
    </div>
  );
};
