import React from 'react';
import { Truck, Tag, MapPin, ShieldCheck, ArrowRight, Sparkles, Heart } from 'lucide-react';

interface PromoBannersProps {
  onShopClick: () => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onShopClick }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-14 space-y-8 sm:space-y-12">
      
      {/* 2 Side-by-Side Editorial Promo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Banner 1: Zero Delivery Fee */}
        <div
          onClick={onShopClick}
          className="relative overflow-hidden rounded-3xl min-h-[220px] sm:min-h-[250px] p-6 sm:p-8 flex flex-col justify-between cursor-pointer group shadow-xl border border-[#E8D5B7] dark:border-[#3D372E] transition-transform duration-300 hover-lift bg-[#2C1810]"
        >
          {/* Background Image with Dark Warm Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700 opacity-45"
            style={{ backgroundImage: `url('/Honey_jar_on_wood_table_202608130959.jpeg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810] via-[#3E2316]/90 to-transparent pointer-events-none" />

          {/* Top Row: Tag + Circular Badge */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E9BE5F] text-[10px] sm:text-xs font-black uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 text-[#E9BE5F]" />
              <span>PATNA DELIVERY</span>
            </div>

            {/* Circular ₹500+ White Pill Badge */}
            <div className="w-12 h-12 rounded-full bg-white text-[#2C1810] font-black text-xs sm:text-sm flex items-center justify-center shadow-xl border-2 border-[#E9BE5F] shrink-0 group-hover:scale-110 transition-transform">
              ₹500+
            </div>
          </div>

          {/* Middle Content */}
          <div className="relative z-10 my-3">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Zero Delivery Fee
            </h3>
            <p className="text-xs sm:text-sm text-[#F3E5AB] font-medium mt-1">
              On cart value ₹500 &amp; above
            </p>

            {/* Checklist */}
            <div className="mt-3 space-y-1.5 text-[11px] sm:text-xs text-[#D8CFBF] font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E9BE5F]" />
                <span>Doorstep delivery across Patna</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E9BE5F]" />
                <span>Safe Razorpay checkout</span>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="relative z-10">
            <button className="inline-flex items-center gap-2 bg-white hover:bg-[#F3E5AB] text-[#2C1810] px-5 py-2.5 rounded-full text-xs font-extrabold shadow-lg transition-all transform group-hover:translate-x-1">
              <span>Start Shopping</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2C1810]" />
            </button>
          </div>
        </div>

        {/* Banner 2: Taste of Tradition / Limited Offer */}
        <div
          onClick={onShopClick}
          className="relative overflow-hidden rounded-3xl min-h-[220px] sm:min-h-[250px] p-6 sm:p-8 flex flex-col justify-between cursor-pointer group shadow-xl border border-[#E8D5B7] dark:border-[#3D372E] transition-transform duration-300 hover-lift bg-[#251A13]"
        >
          {/* Background Image with Dark Warm Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700 opacity-45"
            style={{ backgroundImage: `url('/Glass_jar_filled_with_honey_202608130958.jpeg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#251A13] via-[#3B2519]/90 to-transparent pointer-events-none" />

          {/* Top Row: Tag + Circular 15% OFF Badge */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E9BE5F] text-[10px] sm:text-xs font-black uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[#E9BE5F]" />
              <span>LIMITED OFFER</span>
            </div>

            {/* Circular 15% OFF Gold Badge */}
            <div className="w-12 h-12 rounded-full bg-[#E9BE5F] text-[#2C1810] font-black text-[10px] sm:text-[11px] flex flex-col items-center justify-center leading-none shadow-xl border-2 border-white shrink-0 group-hover:scale-110 transition-transform">
              <span>15%</span>
              <span className="text-[8px] font-bold">OFF</span>
            </div>
          </div>

          {/* Middle Content */}
          <div className="relative z-10 my-3">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Taste of Pure Raw Honey
            </h3>
            <p className="text-xs sm:text-sm text-[#F3E5AB] font-medium mt-1">
              Save up to 15% on bestsellers
            </p>

            {/* Checklist */}
            <div className="mt-3 space-y-1.5 text-[11px] sm:text-xs text-[#D8CFBF] font-medium">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E9BE5F]" />
                <span>100% Single-origin wild honey</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#E9BE5F]" />
                <span>Raw honeycomb &amp; floral infusions</span>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="relative z-10">
            <button className="inline-flex items-center gap-2 bg-white hover:bg-[#F3E5AB] text-[#2C1810] px-5 py-2.5 rounded-full text-xs font-extrabold shadow-lg transition-all transform group-hover:translate-x-1">
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2C1810]" />
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
