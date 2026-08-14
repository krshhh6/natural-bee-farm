import React from 'react';
import { Droplet, Package, Truck, ShieldCheck, Star } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const highlights = [
    { icon: Droplet, title: 'Preservative-Free' },
    { icon: Package, title: 'Free Shipping ₹500+' },
    { icon: Truck, title: 'Fast Delivery' },
    { icon: ShieldCheck, title: 'Secure Razorpay Pay' },
    { icon: Star, title: '50+ Marts Trust Us' },
  ];

  return (
    <section className="py-4 bg-[#FAF5EB] dark:bg-[#181715] transition-colors border-y border-[#E8D5B7] dark:border-[#3D372E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal Scroll Pill Strip */}
        <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-1">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/90 dark:bg-[#201D19] border border-[#E8D5B7] dark:border-[#3D372E] shadow-xs rounded-full px-4 py-2 sm:px-5 sm:py-2.5 flex items-center space-x-2.5 whitespace-nowrap shrink-0 hover:shadow-md hover:border-[#9C5B23] transition-all hover-lift cursor-default"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF5EB] dark:bg-[#2A241D] flex items-center justify-center text-[#9C5B23] dark:text-[#E9BE5F] shrink-0 border border-[#E8D5B7]/60">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-[#2C1810] dark:text-[#F5E8B6] tracking-tight">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
