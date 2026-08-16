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
    { id: 'all', label: 'All Raw Honey' },
    { id: 'honey', label: 'Artisanal Honey' },
    { id: 'wildforest', label: 'Wild Forest' },
    { id: 'monofloral', label: 'Monofloral Single-Origin' },
    { id: 'spiced', label: 'Spice Infused' },
    { id: 'ayurvedic', label: 'Ayurvedic Blends' },
    { id: 'rawcomb', label: 'Raw Honeycomb' },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Category Pills & Filters Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#595C56]/30 pb-4">
        
        {/* Scrollable Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#E9BE5F] text-[#282823] font-bold shadow-md shadow-[#E9BE5F]/25 scale-105'
                  : 'bg-[#FAF3D6] dark:bg-[#282823] text-[#282823] dark:text-[#F5E8B6] hover:bg-[#F5E8B6] border border-[#595C56]/40'
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
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : 'bg-[#FAF3D6] dark:bg-[#282823] border-[#595C56]/40 text-[#282823] dark:text-[#F5E8B6]'
            }`}
          >
            <Leaf className={`w-3.5 h-3.5 ${organicOnly ? 'text-emerald-400' : 'text-[#E9BE5F]'}`} />
            <span>Organic Only</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#FAF3D6] dark:bg-[#282823] px-3 py-1.5 rounded-xl border border-[#595C56]/40">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#E9BE5F]" />
            <select
              value={sortBy}
              onChange={(e: any) => onSortChange(e.target.value)}
              className="bg-transparent text-[#282823] dark:text-[#F5E8B6] text-xs sm:text-sm focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#FAF3D6] dark:bg-[#282823] text-[#282823] dark:text-[#F5E8B6]">Sort: Featured</option>
              <option value="price-low" className="bg-[#FAF3D6] dark:bg-[#282823] text-[#282823] dark:text-[#F5E8B6]">Price: Low to High</option>
              <option value="price-high" className="bg-[#FAF3D6] dark:bg-[#282823] text-[#282823] dark:text-[#F5E8B6]">Price: High to Low</option>
              <option value="rating" className="bg-[#FAF3D6] dark:bg-[#282823] text-[#282823] dark:text-[#F5E8B6]">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>

      {/* Result Count Notice */}
      <div className="text-xs text-[#595C56] dark:text-[#F5E8B6]/70 font-medium">
        Showing <span className="font-bold text-[#282823] dark:text-[#E9BE5F]">{productsCount}</span> authentic items
      </div>
    </div>
  );
};
