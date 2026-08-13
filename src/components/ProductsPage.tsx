import React, { useState } from 'react';
import type { Product, CategoryType } from '../types';
import { ProductGrid } from './ProductGrid';
import { CategoryFilter } from './CategoryFilter';
import { PromoBanners } from './PromoBanners';
import { Testimonials } from './Testimonials';
import { Search, Home, ChevronRight, Sparkles } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onQuickView?: (product: Product) => void;
  onNavigateHome: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView,
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [organicOnly, setOrganicOnly] = useState(false);

  return (
    <div className="min-h-screen bg-[#FEFDF5] dark:bg-[#1C1C18] text-[#282823] dark:text-[#FEFDF5] pb-16 transition-colors">
      
      {/* Page Header & Breadcrumb Banner */}
      <div className="bg-[#282823] text-[#F5E8B6] py-10 sm:py-14 border-b border-[#595C56]/40 relative overflow-hidden">
        
        {/* Subtle Ambient Light Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E9BE5F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#E9BE5F] mb-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center space-x-1 hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#595C56]" />
            <span className="text-[#F5E8B6]">Products & Catalog</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9BE5F]/10 border border-[#E9BE5F]/30 text-[#E9BE5F] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E9BE5F]" />
                <span>100% Preservative-Free</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Our <span className="text-[#E9BE5F]">Products Catalog</span>
              </h1>
              <p className="text-xs sm:text-base text-[#F5E8B6]/80 mt-2 max-w-xl">
                Browse our complete collection of raw artisanal honey, traditional pickles, sun-dried badis, and handcrafted spices.
              </p>
            </div>

            {/* Live Search Input Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E9BE5F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search delicacies, ingredients..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#1C1C18] border border-[#595C56]/50 text-[#F5E8B6] placeholder-[#F5E8B6]/50 text-xs sm:text-sm focus:outline-none focus:border-[#E9BE5F] transition-colors"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Category Filters Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          organicOnly={organicOnly}
          onToggleOrganic={() => setOrganicOnly((prev) => !prev)}
          productsCount={products.length}
        />

        {/* Full Product Grid Container */}
        <ProductGrid
          products={products}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          organicOnly={organicOnly}
          onSelectCategory={onSelectCategory}
          onQuickView={onQuickView}
        />

      </main>

      {/* Promotional Banners & Customer Testimonials */}
      <div className="space-y-12 mt-12">
        <PromoBanners onShopClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        <Testimonials />
      </div>

    </div>
  );
};
