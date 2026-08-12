import React from 'react';
import type { CategoryType } from '../types';
import { SlidersHorizontal, Leaf } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  sortBy: string;
  onSortChange: (sort: 'featured' | 'price-low' | 'price-high' | 'rating') => void;
  organicOnly: boolean;
  onToggleOrganic: () => void;
  productsCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  organicOnly,
  onToggleOrganic,
  productsCount,
}) => {
  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Delicacies' },
    { id: 'honey', label: 'Artisanal Honey' },
    { id: 'pickles', label: 'Traditional Pickles' },
    { id: 'badis', label: 'Sun-Dried Badis' },
    { id: 'spices', label: 'Handcrafted Spices' },
    { id: 'flours', label: 'Organic Flours' },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Category Pills & Filters Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        
        {/* Scrollable Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort & Organic Filter Controls */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs sm:text-sm">
          
          {/* Organic Only Toggle Button */}
          <button
            onClick={onToggleOrganic}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              organicOnly
                ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
            }`}
          >
            <Leaf className={`w-3.5 h-3.5 ${organicOnly ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`} />
            <span>Organic Only</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white dark:bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e: any) => onSortChange(e.target.value)}
              className="bg-transparent text-stone-700 dark:text-stone-200 text-xs sm:text-sm focus:outline-none cursor-pointer"
            >
              <option value="featured" className="dark:bg-stone-800">Sort: Featured</option>
              <option value="price-low" className="dark:bg-stone-800">Price: Low to High</option>
              <option value="price-high" className="dark:bg-stone-800">Price: High to Low</option>
              <option value="rating" className="dark:bg-stone-800">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>

      {/* Result Count Notice */}
      <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
        Showing <span className="font-bold text-stone-900 dark:text-stone-200">{productsCount}</span> authentic items
      </div>
    </div>
  );
};
