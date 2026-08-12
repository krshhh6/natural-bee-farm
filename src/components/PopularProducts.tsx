import React from 'react';
import { TrendingUp, ChevronRight } from 'lucide-react';
import type { Product, CategoryType } from '../types';
import { ProductCard } from './ProductCard';

interface PopularProductsProps {
  products: Product[];
  onSelectCategory?: (cat: CategoryType) => void;
}

export const PopularProducts: React.FC<PopularProductsProps> = ({ products, onSelectCategory }) => {
  // Show popular products (slice 4 items starting after featured or top popular items)
  const popularList = products.slice(4, 8).concat(products.slice(0, 4)).slice(0, 4);

  return (
    <section className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#fffbf5] dark:bg-stone-800/90 border-t-4 border-[#c8674d] rounded-[32px] p-6 sm:p-10 shadow-md border border-stone-200/60 dark:border-stone-700/60">
        
        {/* Card Header Row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-1.5 text-[#c8674d] text-xs font-bold uppercase tracking-widest">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>TRENDING</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d1e18] dark:text-stone-50 mt-1">
              Popular Products
            </h2>
          </div>

          {/* View All Pill Button */}
          {onSelectCategory && (
            <button
              onClick={() => onSelectCategory('all')}
              className="bg-[#c8674d] hover:bg-[#b5563d] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md shadow-[#c8674d]/20 flex items-center gap-1 transition-all hover:scale-105"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 4-Column Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularList.map((product) => (
            <ProductCard key={`popular-${product.id}`} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
