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

  // Top 4 featured honey products
  const top4Products = products.slice(0, 4);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const firstCard = container.firstElementChild as HTMLElement;
      const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 280;
      container.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleViewAll = () => {
    if (onSelectCategory) {
      onSelectCategory('all');
    }
    onExploreClick();
  };

  return (
    <section className="py-12 sm:py-16 bg-transparent dark:bg-[#141412] transition-colors border-y border-[#EBE5DB] dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Section Card */}
        <div className="bg-paper-texture dark:bg-[#1E1E1A] border-t-4 border-[#9C5B23] rounded-[28px] p-6 sm:p-10 shadow-sm border border-[#EBE5DB] dark:border-neutral-800 relative overflow-hidden">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-[#9C5B23] dark:text-[#E9BE5F] text-xs font-bold uppercase tracking-widest bg-[#9C5B23]/10 px-3 py-1 rounded-full border border-[#9C5B23]/20 mb-2">
                <Flame className="w-3.5 h-3.5 text-[#9C5B23] fill-[#9C5B23]" />
                <span>TOP BESTSELLERS</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#282823] dark:text-[#F5E8B6]">
                Our Finest Honey Collection
              </h2>
            </div>

            {/* Scroll Navigation & View All Option */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => scroll('left')}
                  className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#282823] text-[#282823] dark:text-[#F5E8B6] hover:bg-[#9C5B23] hover:text-white dark:hover:bg-[#9C5B23] transition-colors border border-[#595C56]/30 shadow-sm active:scale-95"
                  aria-label="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#282823] text-[#282823] dark:text-[#F5E8B6] hover:bg-[#9C5B23] hover:text-white dark:hover:bg-[#9C5B23] transition-colors border border-[#595C56]/30 shadow-sm active:scale-95"
                  aria-label="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleViewAll}
                className="bg-[#9C5B23] hover:bg-[#834917] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold shadow-md shadow-[#9C5B23]/20 flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Swipe Hint & Navigation Pill */}
          <div className="flex sm:hidden items-center justify-between bg-[#FAF5EB] dark:bg-[#2A2620] px-3 py-1 rounded-full border border-[#E8D5B7] dark:border-[#40382C] text-[11px] font-bold text-[#9C5B23] dark:text-[#E9BE5F] mb-4 shadow-xs">
            <button
              onClick={() => scroll('left')}
              className="p-1 rounded-full hover:bg-[#9C5B23]/10 active:scale-90 transition-transform cursor-pointer"
              aria-label="Previous Product"
            >
              <ChevronLeft className="w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
            </button>
            <span>Swipe left &amp; right to browse ({top4Products.length})</span>
            <button
              onClick={() => scroll('right')}
              className="p-1 rounded-full hover:bg-[#9C5B23]/10 active:scale-90 transition-transform cursor-pointer"
              aria-label="Next Product"
            >
              <ChevronRight className="w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
            </button>
          </div>

          {/* Relative Wrapper for Carousel + Side Floating Arrow Buttons */}
          <div className="relative group/carousel">
            
            {/* Left Side Floating Arrow Button */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#9C5B23] text-white dark:bg-[#E9BE5F] dark:text-[#282823] shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white dark:border-[#1E1E1A] focus:outline-none"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Side Floating Arrow Button */}
            <button
              onClick={() => scroll('right')}
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#9C5B23] text-white dark:bg-[#E9BE5F] dark:text-[#282823] shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white dark:border-[#1E1E1A] focus:outline-none"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Horizontally Scrollable List / Grid of Cards */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth px-1"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#9C5B23 #FAF7F0' }}
            >
              {top4Products.map((product) => (
                <div key={product.id} className="min-w-[270px] sm:min-w-[290px] max-w-[310px] shrink-0 snap-start">
                  <ProductCard
                    product={product}
                    onQuickView={onQuickView}
                  />
                </div>
              ))}

              {/* "View All" End Card */}
              <div
                onClick={handleViewAll}
                className="min-w-[240px] sm:min-w-[260px] shrink-0 snap-start bg-white/80 dark:bg-[#1C1C18]/80 rounded-2xl border-2 border-dashed border-[#9C5B23] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#9C5B23]/10 transition-all group hover:scale-[1.02]"
              >
                <div className="w-14 h-14 rounded-full bg-[#9C5B23] text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#282823] dark:text-[#F5E8B6] mb-1">
                  Explore Full Range
                </h3>
                <p className="text-xs text-neutral-600 dark:text-[#F5E8B6]/70 mb-4">
                  Discover all {products.length}+ pure artisanal delicacies & essentials.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#9C5B23] dark:text-[#E9BE5F] group-hover:underline">
                  <span>View All ({products.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
