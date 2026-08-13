import React from 'react';

interface PromoBannersProps {
  onShopClick: () => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onShopClick }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-items-center">
        
        {/* Left Banner Illustration: J2.png */}
        <div
          onClick={onShopClick}
          className="relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group bg-transparent flex items-center justify-center w-full"
        >
          <img
            src="/J2.png"
            alt="Traditional Bilona Artisans"
            className="max-h-[140px] sm:max-h-[165px] lg:max-h-[185px] w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 mx-auto"
          />
        </div>

        {/* Right Banner Illustration: j3.png (Sized to match J2.png height) */}
        <div
          onClick={onShopClick}
          className="relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group bg-transparent flex items-center justify-center w-full"
        >
          <img
            src="/j3.png"
            alt="Traditional Churning Cow & Artisan"
            className="max-h-[140px] sm:max-h-[165px] lg:max-h-[185px] w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 mx-auto"
          />
        </div>

      </div>
    </section>
  );
};
