import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login } = useAuth();
  const { showToast } = useCart();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      login(email);
      showToast(`Welcome back, ${email.split('@')[0]}! 👋`);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (name.trim() && email.trim() && password.trim()) {
      login(email, name);
      showToast(`Account created successfully! Welcome to Meadlight, ${name} 🎉`);
    }
  };

  const handleDemoLogin = () => {
    login('customer@meadlight.in', 'Shital Gupta');
    showToast('Signed in with Demo Account 🎉');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-[32px] shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Brand Logo */}
        <div className="bg-[#3b2319] p-6 text-center text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-[#f4ebd9] mx-auto flex items-center justify-center mb-3 shadow-md">
            <img src="/logo.png" alt="Meadlight Logo" className="w-9 h-9 object-contain" />
          </div>

          <h3 className="font-serif text-2xl font-bold tracking-tight">
            Mead<span className="text-[#e89b7b]">light</span>
          </h3>
          <p className="text-xs text-amber-200/90 mt-1 font-medium">
            {authMode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-stone-800/50">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold transition-all border-b-2 ${
              authMode === 'login'
                ? 'border-[#c8674d] text-[#c8674d] bg-white dark:bg-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold transition-all border-b-2 ${
              authMode === 'register'
                ? 'border-[#c8674d] text-[#c8674d] bg-white dark:bg-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8 space-y-4">
          
          {authMode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#c8674d]"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#c8674d]"
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 cursor-pointer text-stone-600 dark:text-stone-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-stone-300 text-[#c8674d] focus:ring-[#c8674d]"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-[#c8674d] hover:underline font-bold">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#c8674d] hover:bg-[#b5563d] text-white font-bold rounded-2xl text-sm shadow-lg shadow-[#c8674d]/25 transition-all flex items-center justify-center space-x-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Demo Account Action */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="text-xs text-stone-500 dark:text-stone-400 hover:text-[#c8674d] font-semibold underline"
                >
                  ⚡ Quick Login with Demo Account
                </button>
              </div>

            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Shital Gupta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#c8674d]"
                  />
                  <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#c8674d]"
                  />
                  <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+91 98350 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#c8674d]"
                  />
                  <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#c8674d]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                    Confirm
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#c8674d]"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="text-[11px] text-stone-600 dark:text-stone-400 pt-1">
                By registering, you agree to our{' '}
                <a href="#" className="text-[#c8674d] underline font-semibold">Terms of Service</a> &{' '}
                <a href="#" className="text-[#c8674d] underline font-semibold">Privacy Policy</a>.
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#c8674d] hover:bg-[#b5563d] text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg shadow-[#c8674d]/25 transition-all flex items-center justify-center space-x-2"
              >
                <span>Create Account</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
