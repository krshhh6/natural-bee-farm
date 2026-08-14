import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BenefitClubBannerProps {
  onShopClick: () => void;
}

export const BenefitClubBanner: React.FC<BenefitClubBannerProps> = ({ onShopClick }) => {
  return (
    <section
      className="w-full py-14 sm:py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2C1810 0%, #4A2C1A 40%, #2C1810 100%)',
      }}
    >
      {/* Decorative honeycomb pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-4l24-14V18L28 4 4 18v30l24 14z' fill='%23C4A04A'/%3E%3C/svg%3E")`,
            backgroundSize: '56px 100px',
          }}
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#C4A04A]/20 border border-[#C4A04A]/40 text-[#E9BE5F] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          style={{ fontFamily: "'RosierBodyFont', sans-serif" }}>
          🍯 Exclusive Membership
        </div>

        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: "'RosierHeadingFont', 'Playfair Display', serif" }}
        >
          Natura Bee Club
        </h2>
        <p
          className="text-[#E9BE5F]/80 text-base sm:text-lg mb-3 max-w-2xl mx-auto"
          style={{ fontFamily: "'RosierBodyFont', sans-serif" }}
        >
          Join our artisanal honey community — exclusive early access, members-only discounts, and seasonal harvest notifications.
        </p>

        {/* Perks */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-[#FAF5EB]/70 mb-10 mt-6"
          style={{ fontFamily: "'RosierBodyFont', sans-serif" }}>
          {['Free Delivery on Every Order', '10% Member Discount', 'Early Access to Harvests', 'Exclusive Seasonal Varieties'].map((perk) => (
            <span key={perk} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4A04A] flex-shrink-0" />
              {perk}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onShopClick}
            className="flex items-center gap-2 px-8 py-3.5 bg-[#C4A04A] hover:bg-[#B08A3A] text-white font-semibold rounded-full text-sm transition-all duration-200 hover:scale-105"
            style={{ fontFamily: "'RosierBodyFont', sans-serif" }}
          >
            Shop Our Collection <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2 px-8 py-3.5 border-2 border-[#C4A04A]/60 text-[#E9BE5F] font-semibold rounded-full text-sm hover:bg-[#C4A04A]/10 transition-all duration-200"
            style={{ fontFamily: "'RosierBodyFont', sans-serif" }}
          >
            Join Free — No Cost
          </button>
        </div>
      </div>
    </section>
  );
};
