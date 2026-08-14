import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryShowcaseProps {
  selectedCategory: string;
  onSelectCategory: (category: any) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 'wildforest',
      name: 'Wild Forest',
      subtitle: '100% Raw & Unfiltered',
      image: '/Glass_jar_filled_with_honey_202608130958.jpeg',
    },
    {
      id: 'himalayan',
      name: 'Himalayan Acacia',
      subtitle: 'High-Altitude Nectars',
      image: '/Honey_jar_on_wood_table_202608130959.jpeg',
    },
    {
      id: 'spiced',
      name: 'Spice Infused',
      subtitle: 'Cinnamon & Saffron',
      image: '/Honey_jar_with_cinnamon_and_202608130958.jpeg',
    },
    {
      id: 'ayurvedic',
      name: 'Ayurvedic Blends',
      subtitle: 'Tulsi, Neem & More',
      image: '/Jar_of_tulsi_honey_on_202608130958.jpeg',
    },
    {
      id: 'monofloral',
      name: 'Monofloral',
      subtitle: 'Single Blossom Nectars',
      image: '/Glass_jar_with_jamun_honey_202608131002.jpeg',
    },
    {
      id: 'herbal',
      name: 'Herbal Honey',
      subtitle: 'Karanj & Forest Herbs',
      image: '/Karanj_honey_jar_on_stone_202608131002.jpeg',
    },
    {
      id: 'rawcomb',
      name: 'Raw Honeycomb',
      subtitle: 'Straight From The Hive',
      image: '/Honey_jar_on_wooden_surface_202608130958.jpeg',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    const catalogEl = document.getElementById('product-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-transparent dark:bg-[#1A1816] transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Categories Row with Navigation Arrows */}
        <div className="relative flex items-center gap-3">
          
          {/* Scroll Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex p-2.5 rounded-full bg-white dark:bg-[#25221D] text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#9C5B23] hover:text-white dark:hover:bg-[#9C5B23] transition-all border border-[#E7DFD3] dark:border-neutral-800 shadow-sm shrink-0 z-10"
            aria-label="Previous Category"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Horizontally Scrollable Category Squircle Cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth flex-1 custom-scrollbar"
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`min-w-[130px] sm:min-w-[150px] shrink-0 snap-start flex flex-col items-center text-center cursor-pointer group transition-all duration-300 ${
                    isSelected ? 'scale-105' : 'hover:-translate-y-1'
                  }`}
                >
                  {/* Rounded Squircle Image Box */}
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] sm:rounded-[28px] overflow-hidden p-2 flex items-center justify-center transition-all duration-300 shadow-sm ${
                      isSelected
                        ? 'bg-[#F5EEDD] dark:bg-[#2F2923] border-2 border-[#9C5B23] shadow-md'
                        : 'bg-[#F9F5EC] dark:bg-[#24201B] border border-[#E7DFD3] dark:border-neutral-800 group-hover:border-[#9C5B23] group-hover:shadow-md'
                    }`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Category Name */}
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#231F1B] dark:text-[#FEFDF5] mt-2.5 group-hover:text-[#9C5B23] dark:group-hover:text-[#E9BE5F] transition-colors leading-tight">
                    {category.name}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Scroll Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex p-2.5 rounded-full bg-white dark:bg-[#25221D] text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#9C5B23] hover:text-white dark:hover:bg-[#9C5B23] transition-all border border-[#E7DFD3] dark:border-neutral-800 shadow-sm shrink-0 z-10"
            aria-label="Next Category"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

        {/* "Loved Across Generations" Section Header matching Rosier Foods */}
        <div className="mt-16 sm:mt-20 text-center relative py-6">
          
          {/* Subtle Watermark Graphic Illustration Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 dark:opacity-5">
            <svg className="w-full h-48 text-[#8C5E2B]" viewBox="0 0 800 200" fill="currentColor">
              <path d="M100 150 C 200 100, 300 180, 400 120 C 500 60, 600 150, 700 130 L 700 200 L 100 200 Z" opacity="0.3"/>
            </svg>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#8C5E2B] dark:text-[#E9BE5F] tracking-tight relative z-10">
            Loved Across Generations
          </h2>
          
          <p className="text-xs sm:text-base text-[#6B5A47] dark:text-[#FEFDF5]/70 max-w-xl mx-auto mt-3 font-medium relative z-10">
            Pure Raw Honey in every variety — Wild Forest, Monofloral Blossoms, Spice Infused, and Ayurvedic Blends, crafted with care.
          </p>

        </div>

      </div>
    </section>
  );
};
