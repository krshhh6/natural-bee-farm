import React from 'react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section
      onClick={onExploreClick}
      className="relative w-full overflow-hidden bg-transparent dark:bg-[#1A1816] cursor-pointer group animate-fade-in"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="relative w-full rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-xl border border-[#E7DFD3] dark:border-neutral-800 transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:border-[#E9BE5F]/60">
          <img
            src="/J11.png"
            alt="Natura Bee Farm Pure Artisanal Honey & Traditional Foods"
            className="w-full h-auto object-cover transform group-hover:scale-[1.015] transition-transform duration-700 ease-out"
          />
          {/* Subtle warm glow overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E9BE5F]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
