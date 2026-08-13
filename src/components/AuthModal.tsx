import React, { useState } from 'react';
import { X, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { signInWithGoogle, sendMagicLinkToEmail } from '../lib/firebase';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, setUserProfile } = useAuth();
  const { showToast } = useCart();

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
    showToast(`Account created successfully! Welcome to Meadlight, @${username} 🎉`);
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
    login('customer@meadlight.in', 'ShitalGupta');
    showToast('Signed in with Demo Account 🎉');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md animate-fadeIn">
      {/* Outer Card Container */}
      <div className="relative w-full max-w-[460px] bg-white dark:bg-stone-900 rounded-[28px] shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 animate-slide-up max-h-[92vh] overflow-y-auto font-sans">
        
        {/* Top Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center space-x-3 mb-6">
          <img src="/logo.png" alt="Meadlight Logo" className="w-10 h-10 object-contain" />
          <div>
            <div className="font-serif text-2xl font-bold tracking-tight text-[#2d1e18] dark:text-stone-50 leading-none">
              Mead<span className="text-[#c8674d]">light</span>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium mt-0.5">
              {authMode === 'login' ? 'Sign in to access your orders' : 'Create your account to start shopping'}
            </div>
          </div>
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div className="flex bg-[#f4ebd9]/60 dark:bg-stone-800 p-1 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              authMode === 'login'
                ? 'bg-white dark:bg-stone-900 text-[#c8674d] shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              authMode === 'register'
                ? 'bg-white dark:bg-stone-900 text-[#c8674d] shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Section */}
        {authMode === 'login' ? (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-900 dark:text-stone-200">Email</label>
              <div className="h-12 border border-stone-200 dark:border-stone-700 focus-within:border-[#c8674d] dark:focus-within:border-[#c8674d] rounded-2xl flex items-center px-3.5 bg-stone-50/60 dark:bg-stone-800/60 transition-colors">
                <svg className="w-5 h-5 text-stone-400 shrink-0" viewBox="0 0 32 32" fill="currentColor">
                  <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                </svg>
                <input
                  type="email"
                  required
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full ml-3 bg-transparent text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-900 dark:text-stone-200">Password</label>
              <div className="h-12 border border-stone-200 dark:border-stone-700 focus-within:border-[#c8674d] dark:focus-within:border-[#c8674d] rounded-2xl flex items-center px-3.5 bg-stone-50/60 dark:bg-stone-800/60 transition-colors">
                <svg className="w-5 h-5 text-stone-400 shrink-0" viewBox="-64 0 512 512" fill="currentColor">
                  <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                  <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full ml-3 bg-transparent text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 ml-2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-stone-700 dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 text-[#c8674d] focus:ring-[#c8674d]"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to your email!')}
                className="text-[#c8674d] hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>

            {/* Main Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#2d1e18] hover:bg-[#3e2921] dark:bg-[#c8674d] dark:hover:bg-[#b5563d] text-white font-bold rounded-2xl text-sm shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] mt-3"
            >
              Sign In
            </button>

            {/* 1-Click Passwordless Magic Link Button */}
            <button
              type="button"
              disabled={sendingMagicLink}
              onClick={handleSendMagicLink}
              className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 dark:bg-stone-800 dark:hover:bg-stone-750 text-[#c8674d] font-bold rounded-2xl text-xs border border-amber-200/80 dark:border-stone-700 flex items-center justify-center gap-2 transition-all"
            >
              {sendingMagicLink ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>Email 1-Click Magic Link (Passwordless)</span>
            </button>

            {/* Switch to Sign Up */}
            <p className="text-center text-xs text-stone-600 dark:text-stone-400 pt-1">
              Don't have an account?{' '}
              <span
                onClick={() => setAuthMode('register')}
                className="text-[#c8674d] font-bold cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>

            {/* Quick Demo Login */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-xs text-stone-500 dark:text-stone-400 hover:text-[#c8674d] font-medium underline"
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
              <label className="text-xs font-semibold text-stone-900 dark:text-stone-200">Username</label>
              <div className="h-11 border border-stone-200 dark:border-stone-700 focus-within:border-[#c8674d] rounded-2xl flex items-center px-3.5 bg-stone-50/60 dark:bg-stone-800/60">
                <input
                  type="text"
                  required
                  placeholder="ShitalGupta (no spaces)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ''))}
                  className="w-full bg-transparent text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-900 dark:text-stone-200">Email</label>
              <div className="h-11 border border-stone-200 dark:border-stone-700 focus-within:border-[#c8674d] rounded-2xl flex items-center px-3.5 bg-stone-50/60 dark:bg-stone-800/60">
                <input
                  type="email"
                  required
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-900 dark:text-stone-200">Mobile Number</label>
              <div className="h-11 border border-stone-200 dark:border-stone-700 focus-within:border-[#c8674d] rounded-2xl flex items-center px-3.5 bg-stone-50/60 dark:bg-stone-800/60">
                <input
                  type="tel"
                  required
                  placeholder="9835012345 (10 Digits)"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-transparent text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-900 dark:text-stone-200">Password</label>
              <div className="h-11 border border-stone-200 dark:border-stone-700 focus-within:border-[#c8674d] rounded-2xl flex items-center px-3.5 bg-stone-50/60 dark:bg-stone-800/60">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-900 dark:text-stone-200">Confirm Password</label>
              <div className="h-11 border border-stone-200 dark:border-stone-700 focus-within:border-[#c8674d] rounded-2xl flex items-center px-3.5 bg-stone-50/60 dark:bg-stone-800/60">
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Register Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#c8674d] hover:bg-[#b5563d] text-white font-bold rounded-2xl text-sm shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] mt-3"
            >
              Sign Up
            </button>

            {/* Switch to Sign In */}
            <p className="text-center text-xs text-stone-600 dark:text-stone-400 pt-1">
              Already have an account?{' '}
              <span
                onClick={() => setAuthMode('login')}
                className="text-[#c8674d] font-bold cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>

          </form>
        )}

        {/* Divider: Or With */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200 dark:border-stone-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white dark:bg-stone-900 px-3 text-stone-400 font-medium">Or With</span>
          </div>
        </div>

        {/* Social Login Button (Full Width Google) */}
        <div>
          <button
            type="button"
            disabled={loadingProvider !== null}
            onClick={() => handleSocialLogin('Google')}
            className="w-full h-12 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-[#c8674d] text-stone-800 dark:text-stone-100 font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-sm transition-all hover:scale-[1.01] disabled:opacity-60"
          >
            {loadingProvider === 'Google' ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#c8674d]" />
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 512 512">
                <path fill="#FBBB00" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z" />
                <path fill="#518EF8" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" />
                <path fill="#28B446" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" />
                <path fill="#F14336" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z" />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>
        </div>

      </div>
    </div>
  );
};
