import React from 'react';
import { ImageStreamHero } from './ui/image-stream-hero';
import { Camera, ArrowRight } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    src: '/Glass_jar_filled_with_honey_202608130958.jpeg',
    alt: 'Pure Raw Honeycomb & Golden Harvest',
  },
  {
    src: '/Honey_jar_on_wood_table_202608130959.jpeg',
    alt: 'Artisanal Honey Drizzle',
  },
  {
    src: '/Honey_jar_with_cinnamon_and_202608130958.jpeg',
    alt: 'Cinnamon & Spice Honey',
  },
  {
    src: '/Jar_of_tulsi_honey_on_202608130958.jpeg',
    alt: 'Organic Tulsi Honey',
  },
  {
    src: '/Glass_jar_with_jamun_honey_202608131002.jpeg',
    alt: 'Wild Jamun Blossom Honey',
  },
  {
    src: '/Karanj_honey_jar_on_stone_202608131002.jpeg',
    alt: 'Karanj Herbal Honey',
  },
  {
    src: '/Honey_jar_on_wooden_surface_202608130958.jpeg',
    alt: 'Raw Comb Honey',
  },
  {
    src: '/Ashwagandha_honey_jar_on_stone_202608130959.jpeg',
    alt: 'Ashwagandha Adaptogenic Honey',
  },
  {
    src: '/Saffron_honey_jar_on_plate_202608130959.jpeg',
    alt: 'Kashmiri Kesar Saffron Honey',
  },
  {
    src: '/Glass_jar_of_neem_honey_202608130959.jpeg',
    alt: 'Pure Neem Blossom Honey',
  },
];

export const GallerySection: React.FC = () => {
  return (
    <section id="gallery" className="py-16 bg-transparent dark:bg-[#1C1C18] text-[#2C1810] dark:text-[#F5E8B6] relative overflow-hidden border-t border-[#E8D5B7] dark:border-[#595C56]/30 transition-colors">
      
      {/* Header above stream */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#9C5B23]/10 dark:bg-[#E9BE5F]/10 border border-[#9C5B23]/30 dark:border-[#E9BE5F]/40 text-[#9C5B23] dark:text-[#E9BE5F] text-xs font-extrabold uppercase tracking-wider shadow-sm">
          <Camera className="w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
          <span>Explore Our Gallery</span>
        </div>
      </div>

      {/* Full Width Edge-to-Edge 3D Image Stream Hero Component */}
      <div className="w-full relative">
        <ImageStreamHero
          images={GALLERY_IMAGES}
          speed={18}
          cards={9}
          path={{
            cardWidth: 32,
            cardHeight: 42,
            cardRadius: 1.2,
            birthHeight: 8,
            exitHeight: 88,
            railBirth: -10,
            railExit: 58,
            turnBirth: 4,
            turnExit: 16,
          }}
          className="h-[560px] sm:h-[780px] w-full bg-transparent dark:bg-[#1C1C18] border-y border-[#E8D5B7] dark:border-[#595C56]/30 transition-colors"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-between py-6 sm:py-10 px-4 sm:px-6 text-center pointer-events-none">
            
            {/* Title & Description Overlay Box in Warm Cream Glassmorphism */}
            <div className="max-w-3xl bg-[#FAF5EB]/95 dark:bg-[#282823]/95 backdrop-blur-md p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8D5B7] dark:border-[#595C56]/40 shadow-2xl pointer-events-auto transition-transform hover:scale-[1.01]">
              <h2 className="font-serif text-2xl sm:text-5xl font-bold text-[#2C1810] dark:text-white tracking-tight">
                Explore Our <span className="text-[#9C5B23] dark:text-[#E9BE5F]">Honey Gallery</span>
              </h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#5C4033] dark:text-[#F5E8B6]/90 leading-relaxed max-w-2xl mx-auto font-medium">
                Immerse yourself in the rich visual story of Natural Bee Farm — raw honeycombs, wild forest apiaries, single-origin blossoms, and the passionate rural artisans preserving India&apos;s honey heritage.
              </p>
            </div>

            {/* Bottom Button */}
            <div className="pointer-events-auto">
              <a
                href="#product-catalog"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('product-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-[#9C5B23] hover:bg-[#834917] text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-xs sm:text-base font-extrabold shadow-2xl shadow-[#9C5B23]/30 transition-all transform hover:scale-105 active:scale-95 border border-[#834917]"
              >
                <span>Click to watch gallery</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            </div>
          </div>
        </ImageStreamHero>
      </div>
    </section>
  );
};
