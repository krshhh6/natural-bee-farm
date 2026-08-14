import React from 'react';

interface PromoBannersProps {
  onShopClick: () => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onShopClick }) => {
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 my-4 sm:my-6">
      <div
        onClick={onShopClick}
        className="relative overflow-hidden rounded-2xl bg-white border border-[#E7DFD3] dark:border-neutral-800 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group flex items-center justify-center"
      >
        <img
          src="/flower-to-honey.png"
          alt="From Flower to Honey - Artisanal Honey Making Process"
          className="w-full max-w-lg max-h-[220px] sm:max-h-[260px] object-contain transform group-hover:scale-[1.01] transition-transform duration-500 mx-auto"
        />
      </div>
    </section>
  );
};
