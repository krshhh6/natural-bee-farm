import React, { useState } from 'react';
import { Lock, Mail, Key, ShieldCheck, AlertCircle, Sparkles, X, Check } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { loginAdmin } = useStore();
  const [email, setEmail] = useState('admin@naturabee.com');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const success = loginAdmin(email, password);
      setIsLoading(false);

      if (success) {
        onSuccess();
        onClose();
      } else {
        setErrorMsg('Invalid admin credentials. Use admin@naturabee.com / admin123');
      }
    }, 400);
  };

  const handleQuickFill = () => {
    setEmail('admin@naturabee.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FEFDF5] dark:bg-[#1F1C18] border border-[#E7DFD3] dark:border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#282823] dark:text-[#FEFDF5] overflow-hidden">
        
        {/* Decorative Top Amber Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#9C5B23] via-[#E9BE5F] to-[#9C5B23]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title Header */}
        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#9C5B23]/10 dark:bg-[#E9BE5F]/20 text-[#9C5B23] dark:text-[#E9BE5F] flex items-center justify-center mb-3 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold font-serif tracking-wide text-[#231F1B] dark:text-white">
            Admin Access Portal
          </h2>
          <p className="text-xs text-[#736B60] dark:text-[#A69C8F] mt-1 max-w-xs">
            Authenticate with store manager credentials to manage operations, products, orders & inventory.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email / Username */}
          <div>
            <label className="block text-xs font-bold text-[#595247] dark:text-[#C5BBAE] uppercase tracking-wider mb-1.5">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@naturabee.com"
                className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl px-3.5 py-2.5 pl-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#9C5B23] dark:focus:ring-[#E9BE5F] transition-all"
              />
            </div>
          </div>

          {/* Password / Passcode */}
          <div>
            <label className="block text-xs font-bold text-[#595247] dark:text-[#C5BBAE] uppercase tracking-wider mb-1.5">
              Secure Passcode / Password
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl px-3.5 py-2.5 pl-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#9C5B23] dark:focus:ring-[#E9BE5F] transition-all"
              />
            </div>
          </div>

          {/* Quick Demo Pre-fill helper */}
          <button
            type="button"
            onClick={handleQuickFill}
            className="w-full py-2 px-3 rounded-xl bg-[#E9BE5F]/15 text-[#9C5B23] dark:text-[#E9BE5F] hover:bg-[#E9BE5F]/25 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#E9BE5F]/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E9BE5F]" />
            <span>Fill Demo Admin Credentials (admin / admin123)</span>
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9C5B23] to-[#80481A] hover:from-[#80481A] hover:to-[#663914] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In to Admin Panel</span>
              </>
            )}
          </button>

        </form>

        {/* Footer Security Note */}
        <div className="mt-6 pt-4 border-t border-[#E7DFD3] dark:border-neutral-800 flex items-center justify-between text-[11px] text-[#736B60] dark:text-[#998E80]">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-500" />
            End-to-End SSL Encrypted Session
          </span>
          <span className="font-semibold text-[#9C5B23] dark:text-[#E9BE5F]">
            v2.4 Operations
          </span>
        </div>

      </div>
    </div>
  );
};
