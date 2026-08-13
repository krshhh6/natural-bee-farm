import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryShowcaseProps {
  selectedCategory: string;
  onSelectCategory: (category: any) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    {
      id: 'all',
      name: 'All Delicacies',
      count: '12 Items',
      image: '/Glass_jar_filled_with_honey_202608130958.jpeg',
    },
    {
      id: 'honey',
      name: 'Artisanal Honey',
      count: '8 Varieties',
      image: '/Honey_jar_on_wooden_surface_202608130958.jpeg',
    },
    {
      id: 'pickles',
      name: 'Traditional Pickles',
      count: '1 Variety',
      image: '/Glass_jar_filled_with_mustard_202608131002.jpeg',
    },
    {
      id: 'badis',
      name: 'Ayurvedic Essentials',
      count: '1 Variety',
      image: '/Ashwagandha_honey_jar_on_stone_202608130959.jpeg',
    },
    {
      id: 'spices',
      name: 'Handcrafted Spices',
      count: '2 Varieties',
      image: '/Honey_jar_with_cinnamon_and_202608130958.jpeg',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F5E8B6] dark:bg-[#1C1C18] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Card Wrapper */}
        <div className="bg-[#FAF3D6] dark:bg-[#282823] border-t-4 border-[#E9BE5F] rounded-[32px] p-6 sm:p-10 shadow-md border border-[#595C56]/30">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center space-x-1.5 text-[#282823] dark:text-[#E9BE5F] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#E9BE5F]" />
                <span>Explore Our Heritage</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#282823] dark:text-[#F5E8B6] mt-1">
                Shop By Category
              </h2>
            </div>

            <button
              onClick={() => onSelectCategory('all')}
              className="bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] px-5 py-2 rounded-full text-xs font-bold shadow-md shadow-[#E9BE5F]/20 flex items-center gap-1 transition-all hover:scale-105"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#282823]" />
            </button>
          </div>

          {/* Grid Layout of Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <div
                  key={category.id}
                  onClick={() => onSelectCategory(category.id)}
                  className={`group relative rounded-3xl p-5 cursor-pointer transition-all duration-300 flex flex-col items-center text-center ${
                    isSelected
                      ? 'bg-[#282823] text-[#F5E8B6] shadow-xl scale-105 border-2 border-[#E9BE5F]'
                      : 'bg-[#F5E8B6] dark:bg-[#1C1C18] hover:bg-[#FAF3D6] text-[#282823] dark:text-[#F5E8B6] border border-[#595C56]/30 hover:border-[#E9BE5F]'
                  }`}
                >
                  {/* Category Circle Image with Gradient Ring */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#E9BE5F] via-[#595C56] to-[#E9BE5F] shadow-md group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <h3 className="font-serif text-sm sm:text-base font-bold mt-4 line-clamp-1">
                    {category.name}
                  </h3>
                  <p className="text-[11px] font-medium opacity-80 mt-0.5">
                    {category.count}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
