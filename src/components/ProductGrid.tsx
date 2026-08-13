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
  onQuickView?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  searchQuery,
  sortBy,
  organicOnly,
  onSelectCategory,
  onQuickView = () => {},
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
      {/* Product Section Container */}
      <div className="bg-[#FEFDF5] dark:bg-[#181816] border-t-4 border-[#9C5B23] rounded-[28px] p-6 sm:p-10 shadow-sm border border-[#EBE5DB] dark:border-neutral-800">
        
        {/* Card Header Row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-1.5 text-[#9C5B23] dark:text-[#E9BE5F] text-xs font-bold uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 text-[#9C5B23] fill-[#9C5B23] dark:fill-[#E9BE5F]" />
              <span>COLLECTIONS & PRODUCTS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#282823] dark:text-[#F5E8B6] mt-1">
              All Products & Collections
            </h2>
          </div>

          {/* View All Pill Button */}
          {onSelectCategory && (
            <button
              onClick={() => onSelectCategory('all')}
              className="bg-[#9C5B23] hover:bg-[#834917] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md shadow-[#9C5B23]/20 flex items-center gap-1 transition-all hover:scale-105"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>

        {/* Product Items Grid */}
        {sortedProducts.length === 0 ? (
          <div className="py-16 text-center bg-white dark:bg-[#1E1E1A] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 my-4">
            <SearchX className="w-12 h-12 text-[#9C5B23] mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-[#282823] dark:text-[#F5E8B6]">No products found</h3>
            <p className="text-neutral-500 dark:text-[#F5E8B6]/70 text-sm mt-1 max-w-md mx-auto">
              We couldn't find any products matching "{searchQuery}". Try clearing search filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
            ))}
          </div>
        )}

      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 bg-[#282823] hover:bg-[#1C1C18] text-[#E9BE5F] p-3.5 rounded-full shadow-2xl border border-[#595C56]/40 flex items-center justify-center transition-transform hover:scale-110"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-[#E9BE5F]" />
      </button>
    </div>
  );
};
