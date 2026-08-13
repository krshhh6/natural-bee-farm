import React from 'react';
import { LayoutGrid, ChevronRight } from 'lucide-react';
import type { CategoryType } from '../types';

interface CategoryShowcaseProps {
  onSelectCategory: (cat: CategoryType) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const categories: { id: CategoryType; title: string; image: string }[] = [
    {
      id: 'pickles',
      title: 'Homemade Pickles',
      image: '/Glass_jar_filled_with_mustard_202608131002.jpeg',
    },
    {
      id: 'flours',
      title: 'Herbal Infusions',
      image: '/Glass_jar_of_neem_honey_202608130959.jpeg',
    },
    {
      id: 'badis',
      title: 'Ayurvedic Wellness',
      image: '/Ashwagandha_honey_jar_on_stone_202608130959.jpeg',
    },
    {
      id: 'honey',
      title: 'Artisanal Honey',
      image: '/Glass_jar_filled_with_honey_202608130958.jpeg',
    },
    {
      id: 'spices',
      title: 'Spiced Honey & Masalas',
      image: '/Honey_jar_with_cinnamon_and_202608130958.jpeg',
    },
    {
      id: 'honey',
      title: 'Wildflower Honey',
      image: '/Glass_jar_with_wildflower_honey_202608131002.jpeg',
    },
  ];

  return (
    <section className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Container Card with Terracotta Top Border */}
      <div className="bg-[#fffbf5] dark:bg-stone-800/90 border-t-4 border-[#c8674d] rounded-[32px] p-6 sm:p-10 shadow-md border border-stone-200/60 dark:border-stone-700/60">
        
        {/* Card Header Row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-1.5 text-[#c8674d] text-xs font-bold uppercase tracking-widest">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>BROWSE</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d1e18] dark:text-stone-50 mt-1">
              Shop by Category
            </h2>
          </div>

          {/* View All Pill Button */}
          <button
            onClick={() => onSelectCategory('all')}
            className="bg-[#c8674d] hover:bg-[#b5563d] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md shadow-[#c8674d]/20 flex items-center gap-1 transition-all hover:scale-105"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Circular Categories Grid Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(cat.id)}
              className="group flex flex-col items-center cursor-pointer text-center"
            >
              {/* Ring Outer Image Container */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#c8674d] via-emerald-600 to-amber-500 shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-stone-800">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Title Below */}
              <span className="font-serif font-bold text-xs sm:text-sm text-[#2d1e18] dark:text-stone-200 mt-3 group-hover:text-[#c8674d] transition-colors leading-tight max-w-[110px]">
                {cat.title}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
