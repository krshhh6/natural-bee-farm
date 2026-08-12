import React from 'react';
import { Store, Info } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden bg-[#faf4e8]">
      
      {/* Full Background Image (Hero.png) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Hero.png"
          alt="Meadlight Raw Honey & Traditional Foods"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft gradient overlay for text readability */}
        <div className="absolute inset-0 bg-stone-900/10" />
      </div>

      {/* Main Content Container - Shifted to RIGHT side */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 sm:py-16 flex justify-end">
        <div className="max-w-xl lg:max-w-2xl w-full">
          
          {/* Frosted Glassmorphism Card (Shifted to Right Side) */}
          <div className="bg-[#fffbf5]/95 dark:bg-stone-900/95 backdrop-blur-md rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 shadow-2xl border border-white/80 dark:border-stone-800 space-y-6">
            
            {/* Headline Group */}
            <div className="space-y-1">
              <div className="inline-block font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#c8674d] underline decoration-[#eeb4a4] decoration-4 underline-offset-8">
                Traditional Foods
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#2d1e18] dark:text-stone-50 tracking-tight leading-tight pt-2">
                Preserved at Scale
              </h1>
            </div>

            {/* Description */}
            <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed font-normal pt-2 max-w-lg">
              Preservative-free traditional foods & 100% pure raw honey — from Dal Badis to pickles, heritage in every bite.
            </p>

            {/* Button Actions Group */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              
              {/* Primary Shop Now Button */}
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto bg-[#c8674d] hover:bg-[#b5563d] active:bg-[#a3472e] text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-[#c8674d]/30 flex items-center justify-center gap-2.5 text-base transition-all hover:scale-105 active:scale-95"
              >
                <Store className="w-5 h-5" />
                <span>Shop Now</span>
              </button>

              {/* Secondary Our Story Button */}
              <a
                href="#our-story"
                className="w-full sm:w-auto bg-white hover:bg-stone-50 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 border border-stone-800 dark:border-stone-600 font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2.5 text-base transition-all hover:scale-105"
              >
                <Info className="w-5 h-5" />
                <span>Our Story</span>
              </a>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
