import React from 'react';
import type { Product, CategoryType } from '../types';
import { ProductCard } from './ProductCard';
import { SearchX, Star, ChevronRight, ArrowUp } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: CategoryType;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  organicOnly: boolean;
  onSelectCategory?: (cat: CategoryType) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  searchQuery,
  sortBy,
  organicOnly,
  onSelectCategory,
}) => {
  // Filter products
  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOrganic = !organicOnly || item.isOrganic;
    return matchesCategory && matchesSearch && matchesOrganic;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // 'featured'
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Featured Products Container Card with Terracotta Top Border */}
      <div className="bg-[#fffbf5] dark:bg-stone-800/90 border-t-4 border-[#c8674d] rounded-[32px] p-6 sm:p-10 shadow-md border border-stone-200/60 dark:border-stone-700/60">
        
        {/* Card Header Row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-1.5 text-[#c8674d] text-xs font-bold uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 fill-[#c8674d]" />
              <span>BESTSELLERS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d1e18] dark:text-stone-50 mt-1">
              Featured Products
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

        {/* Product Items Grid */}
        {sortedProducts.length === 0 ? (
          <div className="py-16 text-center bg-white dark:bg-stone-800/50 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 my-4">
            <SearchX className="w-12 h-12 text-stone-400 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">No delicacies found</h3>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 max-w-md mx-auto">
              We couldn't find any products matching "{searchQuery}". Try clearing search filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>

      {/* Floating Back to Top Button (matching screenshot bottom right) */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 bg-[#3b2319] hover:bg-[#2d1b13] text-white p-3.5 rounded-full shadow-2xl border border-amber-600/30 flex items-center justify-center transition-transform hover:scale-110"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-[#e89b7b]" />
      </button>
    </div>
  );
};
