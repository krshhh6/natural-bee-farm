import React from 'react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section
      onClick={onExploreClick}
      className="relative w-full overflow-hidden bg-[#FEFDF5] dark:bg-[#1A1816] cursor-pointer group"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="relative w-full rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-xl border border-[#E7DFD3] dark:border-neutral-800 transition-all duration-300 group-hover:shadow-2xl">
          <img
            src="/J1.png"
            alt="Natura Bee Farm Pure Artisanal Honey & Traditional Foods"
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};
