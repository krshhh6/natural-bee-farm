import React from 'react';
import { ImageStreamHero } from './ui/image-stream-hero';
import { Camera, ArrowRight } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    alt: 'Pure Raw Honeycomb & Golden Harvest',
  },
  {
    src: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=800',
    alt: 'Artisanal Honey Drizzle',
  },
  {
    src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    alt: 'Handcrafted Spices & Mortar Pestle',
  },
  {
    src: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
    alt: 'Sun-Dried Badis & Traditional Heritage',
  },
  {
    src: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800',
    alt: 'Organic Apiary & Sustainable Beekeeping',
  },
  {
    src: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=800',
    alt: 'Artisanal Pickles & Preserves',
  },
  {
    src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
    alt: 'Women Artisan Farmers in Bihar',
  },
  {
    src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    alt: 'Fresh Organic Farm Produce',
  },
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
    alt: 'Flora & Wildflower Fields',
  },
];

export const GallerySection: React.FC = () => {
  return (
    <section id="gallery" className="py-16 bg-[#1C1C18] text-[#F5E8B6] relative overflow-hidden border-t border-[#595C56]/30">
      
      {/* Header above stream - Pill Badge moved up as per annotation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E9BE5F]/10 border border-[#E9BE5F]/40 text-[#E9BE5F] text-xs font-extrabold uppercase tracking-wider shadow-md">
          <Camera className="w-4 h-4 text-[#E9BE5F]" />
          <span>Explore Our Gallery</span>
        </div>
      </div>

      {/* Full Width Edge-to-Edge Image Stream Hero Component */}
      <div className="w-full relative">
        <ImageStreamHero
          images={GALLERY_IMAGES}
          speed={20}
          cards={11}
          path={{
            railExit: 52,
            exitHeight: 52,
          }}
          className="h-[460px] sm:h-[680px] w-full bg-[#1C1C18] border-y border-[#595C56]/30"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-between py-6 sm:py-10 px-4 sm:px-6 text-center pointer-events-none">
            
            {/* Title & Description moved down into top of stream overlay as per annotation */}
            <div className="max-w-3xl bg-[#282823]/90 backdrop-blur-md p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#595C56]/40 shadow-2xl pointer-events-auto transition-transform hover:scale-[1.01]">
              <h2 className="font-serif text-xl sm:text-5xl font-bold text-white tracking-tight">
                Explore Our <span className="text-[#E9BE5F]">Gallery</span>
              </h2>
              <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm text-[#F5E8B6]/90 leading-relaxed max-w-2xl mx-auto">
                Immerse yourself in the rich visual story of Natura Bee Farm — raw honeycombs, sun-dried badis, hand-pounded spices, and the passionate rural artisans preserving India&apos;s culinary soul.
              </p>
            </div>

            {/* Bottom Button Only */}
            <div className="pointer-events-auto">
              <a
                href="#product-catalog"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('product-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full text-xs sm:text-base font-extrabold shadow-2xl shadow-[#E9BE5F]/30 transition-all transform hover:scale-105 active:scale-95 border border-[#282823]"
              >
                <span>Click to watch gallery</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </ImageStreamHero>
      </div>
    </section>
  );
};

