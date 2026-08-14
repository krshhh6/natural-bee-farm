import React, { useRef } from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, CheckCircle, Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -280 : 280,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="testimonials" className="py-10 sm:py-20 lg:py-24 bg-transparent dark:bg-[#1C1C18] transition-colors border-t border-[#E8D5B7] dark:border-[#3D372E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-8 sm:mb-16">
          <div className="flex items-center justify-center space-x-1 text-[#E9BE5F]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#E9BE5F] text-[#E9BE5F]" />
            ))}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#282823] dark:text-[#F5E8B6] tracking-tight">
            Loved by Thousands Across India
          </h2>
          <p className="text-[#595C56] dark:text-[#F5E8B6]/80 text-xs sm:text-base font-medium">
            Read what our verified buyers say about our raw honey and artisanal blends.
          </p>
        </div>

        {/* Mobile Swipe Navigation Controls (Visible on mobile only) */}
        <div className="flex sm:hidden items-center justify-between bg-[#FAF3D6] dark:bg-[#282823] px-3.5 py-1.5 rounded-full border border-[#595C56]/30 text-[11px] font-bold text-[#8C5E2B] dark:text-[#E9BE5F] mb-4 shadow-xs">
          <button
            onClick={() => scroll('left')}
            className="p-1 rounded-full hover:bg-[#E9BE5F]/20 active:scale-95 transition-transform"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-4 h-4 text-[#8C5E2B] dark:text-[#E9BE5F]" />
          </button>
          <span className="flex items-center gap-1">
            <span>Swipe to read verified reviews ({TESTIMONIALS.length})</span>
          </span>
          <button
            onClick={() => scroll('right')}
            className="p-1 rounded-full hover:bg-[#E9BE5F]/20 active:scale-95 transition-transform"
            aria-label="Next Review"
          >
            <ChevronRight className="w-4 h-4 text-[#8C5E2B] dark:text-[#E9BE5F]" />
          </button>
        </div>

        {/* Testimonials Layout: Mobile Horizontal Scroll Carousel / Desktop 3-Col Grid */}
        <div
          ref={scrollRef}
          className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="min-w-[270px] sm:min-w-0 max-w-[310px] sm:max-w-none shrink-0 snap-center bg-paper-texture dark:bg-[#282823] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#E8D5B7] dark:border-[#595C56]/40 shadow-sm sm:shadow-md relative flex flex-col justify-between hover:shadow-2xl hover:border-[#9C5B23] transition-all duration-300 ease-out hover-lift cursor-pointer"
            >
              <Quote className="w-7 h-7 sm:w-10 sm:h-10 text-[#E9BE5F]/30 absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none" />
              
              <div className="space-y-3 sm:space-y-4 relative z-10">
                {/* Rating */}
                <div className="flex items-center space-x-1 text-[#E9BE5F]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#E9BE5F] text-[#E9BE5F]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-[#282823] dark:text-[#F5E8B6] text-xs sm:text-sm leading-relaxed italic">
                  &quot;{item.comment}&quot;
                </p>

                <div className="text-[10px] sm:text-xs font-bold text-[#282823] bg-[#E9BE5F] px-2.5 py-1 rounded-md sm:rounded-lg w-max shadow-xs">
                  Item: {item.productName}
                </div>
              </div>

              {/* Author Profile */}
              <div className="flex items-center space-x-3 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-[#595C56]/30">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#E9BE5F] shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-serif font-bold text-xs sm:text-sm text-[#282823] dark:text-[#F5E8B6] flex items-center gap-1.5 truncate">
                    <span className="truncate">{item.name}</span>
                    <span title="Verified Buyer" className="shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#595C56] dark:text-[#F5E8B6]/60 truncate">
                    {item.location} • {item.date}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Google Business Rating CTA Strip */}
        <div className="mt-8 sm:mt-16 bg-[#FAF3D6] dark:bg-[#282823] rounded-2xl p-4 sm:p-6 border border-[#595C56]/40 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-sm">
          <div>
            <div className="font-serif font-bold text-base sm:text-lg text-[#282823] dark:text-[#F5E8B6] flex items-center justify-center sm:justify-start gap-1.5">
              <span>Natural Honey on Google Maps</span>
              <span className="text-xs bg-[#E9BE5F] text-[#282823] font-black px-2 py-0.5 rounded-full">4.8 ★</span>
            </div>
            <div className="text-[11px] sm:text-xs text-[#595C56] dark:text-[#F5E8B6]/70 mt-0.5">Rated 4.8/5 stars based on 143+ verified Google buyer reviews in Patna, Bihar</div>
          </div>
          <a
            href="https://maps.app.goo.gl/wJPC1YirTNqkTF136"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#9C5B23] hover:bg-[#834917] text-white text-xs font-extrabold rounded-xl whitespace-nowrap transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer transform hover:scale-105"
          >
            <span>View Google Maps Live</span>
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </a>
        </div>

      </div>
    </section>
  );
};
