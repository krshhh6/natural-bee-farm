import React from 'react';
import { Truck, Tag, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';

interface PromoBannersProps {
  onShopClick: () => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onShopClick }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Promo Card: Zero Delivery Fee */}
        <div className="relative overflow-hidden rounded-[28px] p-8 sm:p-10 bg-gradient-to-r from-[#4a2a1b] via-[#5c3522] to-[#3d2215] text-white shadow-xl border border-amber-900/30 flex flex-col justify-between group">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <img
              src="/Hero.png"
              alt="Promo background"
              className="w-full h-full object-cover object-right"
            />
          </div>

          {/* Top Row: Tag & Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-4 h-4 text-[#e89b7b]" />
              <span>PATNA DELIVERY</span>
            </div>
            <div className="bg-white text-[#4a2a1b] font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md">
              ₹500+
            </div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 space-y-2 mt-6 mb-8">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Zero Delivery Fee
            </h3>
            <p className="text-amber-100 text-sm font-medium">
              On cart value ₹500 & above
            </p>

            <div className="pt-3 space-y-1.5 text-xs text-amber-200/90 font-medium">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#e89b7b]" />
                <span>Doorstep across Patna</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e89b7b]" />
                <span>Safe Razorpay checkout</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="relative z-10">
            <button
              onClick={onShopClick}
              className="bg-white hover:bg-stone-100 text-[#4a2a1b] font-bold px-6 py-2.5 rounded-full text-sm shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <span>Start Shopping</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Promo Card: Taste of Tradition */}
        <div className="relative overflow-hidden rounded-[28px] p-8 sm:p-10 bg-gradient-to-r from-[#3e2417] via-[#52301f] to-[#361e12] text-white shadow-xl border border-amber-900/30 flex flex-col justify-between group">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <img
              src="/Hero.png"
              alt="Promo background"
              className="w-full h-full object-cover object-left"
            />
          </div>

          {/* Top Row: Tag & Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Tag className="w-4 h-4 text-[#e89b7b]" />
              <span>LIMITED OFFER</span>
            </div>
            <div className="bg-[#e89b7b] text-stone-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md">
              15% OFF
            </div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 space-y-2 mt-6 mb-8">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Taste of Tradition
            </h3>
            <p className="text-amber-100 text-sm font-medium">
              Save up to 15% on bestsellers
            </p>

            <div className="pt-3 space-y-1.5 text-xs text-amber-200/90 font-medium">
              <div className="flex items-center space-x-2">
                <span>🏺</span>
                <span>Pickles & achaars</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🌾</span>
                <span>Badis, papads & more</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="relative z-10">
            <button
              onClick={onShopClick}
              className="bg-white hover:bg-stone-100 text-[#3e2417] font-bold px-6 py-2.5 rounded-full text-sm shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <span>Explore Products</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
