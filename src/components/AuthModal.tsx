import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle2, ArrowRight, AlertCircle, Check, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login } = useAuth();
  const { showToast } = useCart();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Validation Rules
  const hasSpaceInUsername = /\s/.test(username);
  const isUsernameValid = username.length >= 3 && !hasSpaceInUsername && /^[a-zA-Z0-9_]+$/.test(username);

  const cleanPhone = phone.replace(/\D/g, '');
  const isPhoneValid = /^[6-9]\d{9}$/.test(cleanPhone);

  // Password Strength Rules
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const isPasswordStrong = hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;

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

    if (hasSpaceInUsername) {
      alert('Username cannot contain spaces!');
      return;
    }

    if (!isUsernameValid) {
      alert('Username must be at least 3 characters and contain no spaces.');
      return;
    }

    if (!isPhoneValid) {
      alert('Please enter a valid 10-digit mobile number starting with 6-9.');
      return;
    }

    if (!isPasswordStrong) {
      alert('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character!');
      return;
    }

    if (!doPasswordsMatch) {
      alert('Passwords do not match.');
      return;
    }

    login(email, username);
    showToast(`Account created successfully! Welcome to Meadlight, @${username} 🎉`);
  };

  const handleDemoLogin = () => {
    login('customer@meadlight.in', 'ShitalGupta');
    showToast('Signed in with Demo Account 🎉');
  };

  const handleUsernameChange = (val: string) => {
    // Strip spaces automatically for user convenience
    const noSpaces = val.replace(/\s+/g, '');
    setUsername(noSpaces);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-[32px] shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-slide-up max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Brand Logo */}
        <div className="bg-[#3b2319] p-5 text-center text-white relative shrink-0">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-11 h-11 rounded-2xl bg-[#f4ebd9] mx-auto flex items-center justify-center mb-2 shadow-md">
            <img src="/logo.png" alt="Meadlight Logo" className="w-8 h-8 object-contain" />
          </div>

          <h3 className="font-serif text-2xl font-bold tracking-tight">
            Mead<span className="text-[#e89b7b]">light</span>
          </h3>
          <p className="text-xs text-amber-200/90 mt-0.5 font-medium">
            {authMode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-stone-800/50 shrink-0">
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

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
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
                className="w-full py-3 bg-[#c8674d] hover:bg-[#b5563d] text-white font-bold rounded-2xl text-sm shadow-lg shadow-[#c8674d]/25 transition-all flex items-center justify-center space-x-2"
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
            /* Register Form with Strict Validation Rules */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              
              {/* Username (No Spacing Rule) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Username <span className="text-[#c8674d]">*</span>
                  </label>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                    No spaces allowed
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="ShitalGupta"
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    className={`w-full pl-9 pr-8 py-2 bg-stone-50 dark:bg-stone-800 border rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none ${
                      username.length > 0 && isUsernameValid
                        ? 'border-emerald-500'
                        : username.length > 0
                        ? 'border-red-500'
                        : 'border-stone-200 dark:border-stone-700 focus:border-[#c8674d]'
                    }`}
                  />
                  <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  {username.length > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isUsernameValid ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </span>
                  )}
                </div>
                {username.length > 0 && !isUsernameValid && (
                  <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>No spaces allowed (minimum 3 characters, letters & numbers)</span>
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Email Address <span className="text-[#c8674d]">*</span>
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

              {/* Valid Phone Number Rule */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Mobile Number <span className="text-[#c8674d]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="9835012345 (10 Digits)"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className={`w-full pl-9 pr-8 py-2 bg-stone-50 dark:bg-stone-800 border rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none ${
                      phone.length > 0 && isPhoneValid
                        ? 'border-emerald-500'
                        : phone.length > 0
                        ? 'border-red-500'
                        : 'border-stone-200 dark:border-stone-700 focus:border-[#c8674d]'
                    }`}
                  />
                  <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  {phone.length > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isPhoneValid ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </span>
                  )}
                </div>
                {phone.length > 0 && !isPhoneValid && (
                  <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>Enter a valid 10-digit mobile number (starts with 6-9)</span>
                  </p>
                )}
              </div>

              {/* Strong Password Rule & Strength Checklist */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Strong Password <span className="text-[#c8674d]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-9 pr-9 py-2 bg-stone-50 dark:bg-stone-800 border rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none ${
                      password.length > 0 && isPasswordStrong
                        ? 'border-emerald-500'
                        : password.length > 0
                        ? 'border-amber-500'
                        : 'border-stone-200 dark:border-stone-700 focus:border-[#c8674d]'
                    }`}
                  />
                  <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Password Strength Checklist Badges */}
                <div className="grid grid-cols-2 gap-1 pt-1.5 text-[10px]">
                  <div className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-600 font-bold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 8+ Characters
                  </div>
                  <div className={`flex items-center gap-1 ${hasUpper ? 'text-emerald-600 font-bold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> Uppercase (A-Z)
                  </div>
                  <div className={`flex items-center gap-1 ${hasLower ? 'text-emerald-600 font-bold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> Lowercase (a-z)
                  </div>
                  <div className={`flex items-center gap-1 ${hasNumber && hasSpecial ? 'text-emerald-600 font-bold' : 'text-stone-400'}`}>
                    <Shield className="w-3 h-3" /> Number & Symbol (@#$)
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Confirm Password <span className="text-[#c8674d]">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none ${
                    confirmPassword.length > 0 && doPasswordsMatch
                      ? 'border-emerald-500'
                      : confirmPassword.length > 0
                      ? 'border-red-500'
                      : 'border-stone-200 dark:border-stone-700 focus:border-[#c8674d]'
                  }`}
                />
                {confirmPassword.length > 0 && !doPasswordsMatch && (
                  <p className="text-[10px] text-red-500 mt-0.5">Passwords do not match</p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={!isUsernameValid || !isPhoneValid || !isPasswordStrong || !doPasswordsMatch}
                className={`w-full py-3 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center space-x-2 ${
                  isUsernameValid && isPhoneValid && isPasswordStrong && doPasswordsMatch
                    ? 'bg-[#c8674d] hover:bg-[#b5563d] shadow-[#c8674d]/25 cursor-pointer'
                    : 'bg-stone-300 dark:bg-stone-700 cursor-not-allowed text-stone-500'
                }`}
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
