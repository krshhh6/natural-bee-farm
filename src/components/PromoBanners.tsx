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
        <div className="relative overflow-hidden rounded-[28px] p-8 sm:p-10 bg-gradient-to-r from-[#282823] via-[#1C1C18] to-[#282823] text-[#F5E8B6] shadow-xl border border-[#595C56]/40 flex flex-col justify-between group">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
            <img
              src="/J1.png"
              alt="Promo background"
              className="w-full h-full object-cover object-right"
            />
          </div>

          {/* Top Row: Tag & Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-[#E9BE5F] text-xs font-bold uppercase tracking-wider">
              <Truck className="w-4 h-4 text-[#E9BE5F]" />
              <span>PATNA DELIVERY</span>
            </div>
            <div className="bg-[#E9BE5F] text-[#282823] font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md">
              ₹500+
            </div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 space-y-2 mt-6 mb-8">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Zero Delivery Fee
            </h3>
            <p className="text-[#F5E8B6] text-sm font-medium">
              On cart value ₹500 & above
            </p>

            <div className="pt-3 space-y-1.5 text-xs text-[#F5E8B6]/90 font-medium">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#E9BE5F]" />
                <span>Doorstep across Patna</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E9BE5F]" />
                <span>Safe Razorpay checkout</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="relative z-10">
            <button
              onClick={onShopClick}
              className="bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] font-bold px-6 py-2.5 rounded-full text-sm shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <span>Start Shopping</span>
              <ChevronRight className="w-4 h-4 text-[#282823]" />
            </button>
          </div>
        </div>

        {/* Right Promo Card: Taste of Tradition */}
        <div className="relative overflow-hidden rounded-[28px] p-8 sm:p-10 bg-gradient-to-r from-[#1C1C18] via-[#282823] to-[#1C1C18] text-[#F5E8B6] shadow-xl border border-[#595C56]/40 flex flex-col justify-between group">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
            <img
              src="/J1.png"
              alt="Promo background"
              className="w-full h-full object-cover object-left"
            />
          </div>

          {/* Top Row: Tag & Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-[#E9BE5F] text-xs font-bold uppercase tracking-wider">
              <Tag className="w-4 h-4 text-[#E9BE5F]" />
              <span>LIMITED OFFER</span>
            </div>
            <div className="bg-[#E9BE5F] text-[#282823] font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md">
              15% OFF
            </div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 space-y-2 mt-6 mb-8">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Taste of Tradition
            </h3>
            <p className="text-[#F5E8B6] text-sm font-medium">
              Save up to 15% on bestsellers
            </p>

            <div className="pt-3 space-y-1.5 text-xs text-[#F5E8B6]/90 font-medium">
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
              className="bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] font-bold px-6 py-2.5 rounded-full text-sm shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <span>Explore Products</span>
              <ChevronRight className="w-4 h-4 text-[#282823]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
