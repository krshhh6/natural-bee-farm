import React from 'react';
import { Store, Info } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden bg-[#F5E8B6]">
      
      {/* Full Background Image (Hero.png) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Hero.png"
          alt="Natura Bee Farm Raw Honey & Traditional Foods"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft gradient overlay for text readability */}
        <div className="absolute inset-0 bg-[#282823]/20" />
      </div>

      {/* Main Content Container - Shifted to RIGHT side */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 sm:py-16 flex justify-end">
        <div className="max-w-xl lg:max-w-2xl w-full">
          
          {/* Frosted Glassmorphism Card (Shifted to Right Side) */}
          <div className="bg-[#F5E8B6]/95 dark:bg-[#282823]/95 backdrop-blur-md rounded-[24px] sm:rounded-[40px] p-5 sm:p-12 lg:p-14 shadow-2xl border border-[#E9BE5F]/50 dark:border-[#595C56]/40 space-y-4 sm:space-y-6">
            
            {/* Headline Group */}
            <div className="space-y-1">
              <div className="inline-block font-serif text-2xl sm:text-5xl lg:text-6xl font-bold text-[#282823] dark:text-white underline decoration-[#E9BE5F] decoration-4 underline-offset-8">
                Traditional Foods
              </div>
              <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-bold text-[#282823] dark:text-[#F5E8B6] tracking-tight leading-tight pt-2">
                Preserved at Scale
              </h1>
            </div>

            {/* Description */}
            <p className="text-[#595C56] dark:text-[#F5E8B6]/90 text-base sm:text-lg leading-relaxed font-normal pt-2 max-w-lg">
              Preservative-free traditional foods & 100% pure raw honey — from Dal Badis to pickles, heritage in every bite.
            </p>

            {/* Button Actions Group */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              
              {/* Primary Shop Now Button */}
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] font-bold px-8 py-4 rounded-full shadow-lg shadow-[#E9BE5F]/30 flex items-center justify-center gap-2.5 text-base transition-all hover:scale-105 active:scale-95"
              >
                <Store className="w-5 h-5 text-[#282823]" />
                <span>Shop Now</span>
              </button>

              {/* Secondary Our Story Button */}
              <a
                href="#our-story"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('our-story');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-[#282823] hover:bg-[#1C1C18] text-[#F5E8B6] border border-[#595C56]/40 font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2.5 text-base transition-all hover:scale-105"
              >
                <Info className="w-5 h-5 text-[#E9BE5F]" />
                <span>Our Story</span>
              </a>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
