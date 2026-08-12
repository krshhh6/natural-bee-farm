import React from 'react';
import { Droplet, Gift, Truck, ShieldCheck, Star } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const badges = [
    { icon: Droplet, label: 'Preservative-Free' },
    { icon: Gift, label: 'Free Shipping ₹500+' },
    { icon: Truck, label: 'Fast Delivery' },
    { icon: ShieldCheck, label: 'Secure Razorpay Pay' },
    { icon: Star, label: '50+ Marts Trust Us' },
  ];

  return (
    <section className="py-6 bg-[#FAF8F5] dark:bg-stone-900 border-b border-stone-200/60 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto custom-scrollbar pb-2 pt-1">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80 shadow-sm rounded-full px-5 py-2.5 flex items-center space-x-2.5 whitespace-nowrap shrink-0 hover:shadow-md hover:border-[#c8674d]/50 transition-all cursor-default"
              >
                <div className="w-7 h-7 rounded-full bg-[#FAF8F5] dark:bg-stone-700/80 flex items-center justify-center text-[#c8674d] dark:text-amber-400">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#2d1e18] dark:text-stone-200">
                  {b.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
