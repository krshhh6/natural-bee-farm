import React from 'react';
import { ArrowRight, Sparkles, CheckCircle, Flame } from 'lucide-react';

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
      subtitle: 'Complete Pantry',
      count: '20+ Items',
      image: '/Glass_jar_filled_with_honey_202608130958.jpeg',
      badge: 'Popular',
    },
    {
      id: 'honey',
      name: 'Artisanal Honey',
      subtitle: '100% Raw Apiary',
      count: '8 Varieties',
      image: '/Honey_jar_on_wooden_surface_202608130958.jpeg',
      badge: 'Best Seller',
    },
    {
      id: 'pickles',
      name: 'Traditional Pickles',
      subtitle: 'Sun-Dried & Cold Pressed',
      count: '5 Varieties',
      image: '/Glass_jar_filled_with_mustard_202608131002.jpeg',
      badge: 'Authentic',
    },
    {
      id: 'badis',
      name: 'Sun-Dried Badis',
      subtitle: 'Hand-Rolled Lentils',
      count: '4 Varieties',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400',
      badge: 'Heritage',
    },
    {
      id: 'spices',
      name: 'Handcrafted Spices',
      subtitle: 'Hand-Pounded Whole',
      count: '6 Varieties',
      image: '/Honey_jar_with_cinnamon_and_202608130958.jpeg',
      badge: 'Aromatic',
    },
    {
      id: 'flours',
      name: 'Organic Flours',
      subtitle: 'Stone Ground Chakki',
      count: '4 Varieties',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
      badge: 'Pure',
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    const catalogEl = document.getElementById('product-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FEFDF5] dark:bg-[#1C1C18] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Card Wrapper with Rich Gradient Accent & Glow */}
        <div className="bg-[#FEFDF5] dark:bg-[#282823] rounded-[36px] p-6 sm:p-10 shadow-xl border border-[#E9BE5F]/30 relative overflow-hidden">
          
          {/* Subtle Golden Glow Overlay */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#E9BE5F]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#282823] dark:text-[#E9BE5F] text-xs font-extrabold uppercase tracking-widest bg-[#E9BE5F]/15 px-3 py-1 rounded-full border border-[#E9BE5F]/30 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E9BE5F]" />
                <span>Explore Our Heritage Collection</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#282823] dark:text-[#F5E8B6] tracking-tight">
                Shop By Category
              </h2>
            </div>

            <button
              onClick={() => handleCategoryClick('all')}
              className="bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold shadow-lg shadow-[#E9BE5F]/25 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 border border-[#282823]"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 text-[#282823]" />
            </button>
          </div>

          {/* Grid Layout of Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 relative z-10">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`group relative rounded-3xl p-4 sm:p-5 cursor-pointer transition-all duration-300 flex flex-col items-center text-center transform ${
                    isSelected
                      ? 'bg-[#282823] text-[#F5E8B6] shadow-2xl scale-105 border-2 border-[#E9BE5F] ring-4 ring-[#E9BE5F]/20'
                      : 'bg-[#F5E8B6] dark:bg-[#1C1C18] hover:bg-white dark:hover:bg-[#20201C] text-[#282823] dark:text-[#F5E8B6] border border-[#595C56]/30 hover:border-[#E9BE5F] hover:-translate-y-1.5 shadow-md hover:shadow-xl'
                  }`}
                >
                  {/* Category Pill Tag */}
                  <span
                    className={`absolute top-3 right-3 text-[9px] font-extrabold px-2 py-0.5 rounded-full transition-colors ${
                      isSelected
                        ? 'bg-[#E9BE5F] text-[#282823]'
                        : 'bg-[#282823]/10 dark:bg-[#595C56]/30 text-[#282823] dark:text-[#E9BE5F]'
                    }`}
                  >
                    {category.badge}
                  </span>

                  {/* Active Indicator Checkmark */}
                  {isSelected && (
                    <div className="absolute top-3 left-3 text-[#E9BE5F]">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}

                  {/* Category Circle Image with Pulsing Gradient Ring */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#E9BE5F] via-[#D4AA4B] to-[#E9BE5F] shadow-lg group-hover:scale-110 transition-transform duration-300 mt-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        // Fallback in case of local asset load error
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=400';
                      }}
                    />
                  </div>

                  <h3 className="font-serif text-sm sm:text-base font-bold mt-3.5 leading-snug line-clamp-1">
                    {category.name}
                  </h3>
                  
                  <p className="text-[10px] sm:text-[11px] font-medium opacity-75 mt-0.5 line-clamp-1">
                    {category.subtitle}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-[#595C56]/20 w-full flex items-center justify-center gap-1">
                    <Flame className="w-3 h-3 text-[#E9BE5F]" />
                    <span className="text-[11px] font-extrabold text-[#E9BE5F]">
                      {category.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
