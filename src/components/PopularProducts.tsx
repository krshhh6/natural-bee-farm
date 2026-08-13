import React, { useRef } from 'react';
import { ArrowRight, Flame, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product, CategoryType } from '../types';

interface PopularProductsProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onExploreClick: () => void;
  onSelectCategory?: (category: CategoryType) => void;
}

export const PopularProducts: React.FC<PopularProductsProps> = ({
  products,
  onQuickView,
  onExploreClick,
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter for top honey items
  const honeyProducts = products.filter((p) => p.category === 'honey');
  const top4Honey = honeyProducts.slice(0, 4);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleViewAll = () => {
    if (onSelectCategory) {
      onSelectCategory('honey');
    }
    const catalogEl = document.getElementById('product-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onExploreClick();
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F5E8B6] dark:bg-[#1C1C18] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Card Wrapper */}
        <div className="bg-[#FAF3D6] dark:bg-[#282823] border-t-4 border-[#E9BE5F] rounded-[32px] p-6 sm:p-10 shadow-xl border border-[#595C56]/30 relative overflow-hidden">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-[#282823] dark:text-[#E9BE5F] text-xs font-bold uppercase tracking-widest bg-[#E9BE5F]/15 px-3 py-1 rounded-full border border-[#E9BE5F]/30 mb-2">
                <Flame className="w-3.5 h-3.5 text-[#E9BE5F] fill-[#E9BE5F]" />
                <span>Top Artisanal Honey</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#282823] dark:text-[#F5E8B6]">
                Top 4 Raw Apiary Honey
              </h2>
            </div>

            {/* Scroll Navigation & View All Option */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scroll('left')}
                  className="p-2.5 rounded-full bg-[#F5E8B6] dark:bg-[#1C1C18] text-[#282823] dark:text-[#F5E8B6] hover:bg-[#E9BE5F] dark:hover:bg-[#E9BE5F] dark:hover:text-[#282823] transition-colors border border-[#595C56]/30 shadow-sm"
                  aria-label="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="p-2.5 rounded-full bg-[#F5E8B6] dark:bg-[#1C1C18] text-[#282823] dark:text-[#F5E8B6] hover:bg-[#E9BE5F] dark:hover:bg-[#E9BE5F] dark:hover:text-[#282823] transition-colors border border-[#595C56]/30 shadow-sm"
                  aria-label="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleViewAll}
                className="bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold shadow-md shadow-[#E9BE5F]/20 flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95 border border-[#282823]"
              >
                <span>View All Honey</span>
                <ArrowRight className="w-4 h-4 text-[#282823]" />
              </button>
            </div>
          </div>

          {/* Horizontally Scrollable List of Top 4 Honey Cards + View All Card */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#E9BE5F #282823' }}
          >
            {top4Honey.map((product) => (
              <div key={product.id} className="min-w-[280px] sm:min-w-[300px] max-w-[320px] shrink-0 snap-start">
                <ProductCard
                  product={product}
                  onQuickView={onQuickView}
                />
              </div>
            ))}

            {/* "View All" End Card in Horizontal Stream */}
            <div
              onClick={handleViewAll}
              className="min-w-[240px] sm:min-w-[260px] shrink-0 snap-start bg-[#F5E8B6]/60 dark:bg-[#1C1C18]/80 rounded-3xl border-2 border-dashed border-[#E9BE5F] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#E9BE5F]/15 transition-all group hover:scale-[1.02]"
            >
              <div className="w-14 h-14 rounded-full bg-[#E9BE5F] text-[#282823] flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#282823] dark:text-[#F5E8B6] mb-1">
                Explore Full Honey Range
              </h3>
              <p className="text-xs text-[#282823]/70 dark:text-[#F5E8B6]/70 mb-4">
                Discover all {honeyProducts.length}+ raw, unheated wild forest varieties.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#E9BE5F] group-hover:underline">
                <span>View All Honey ({honeyProducts.length})</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
