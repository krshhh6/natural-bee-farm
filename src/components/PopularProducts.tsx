import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

interface PopularProductsProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onExploreClick: () => void;
}

export const PopularProducts: React.FC<PopularProductsProps> = ({
  products,
  onQuickView,
  onExploreClick,
}) => {
  const popular = products.filter((p) => p.isBestSeller || p.rating >= 4.9).slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-[#F5E8B6] dark:bg-[#1C1C18] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Card Wrapper */}
        <div className="bg-[#FAF3D6] dark:bg-[#282823] border-t-4 border-[#E9BE5F] rounded-[32px] p-6 sm:p-10 shadow-md border border-[#595C56]/30">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center space-x-1.5 text-[#282823] dark:text-[#E9BE5F] text-xs font-bold uppercase tracking-widest">
                <Flame className="w-3.5 h-3.5 text-[#E9BE5F] fill-[#E9BE5F]" />
                <span>Customer Favorites</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#282823] dark:text-[#F5E8B6] mt-1">
                Most Popular Batches
              </h2>
            </div>

            <button
              onClick={onExploreClick}
              className="bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] px-5 py-2 rounded-full text-xs font-bold shadow-md shadow-[#E9BE5F]/20 flex items-center gap-1 transition-all hover:scale-105"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#282823]" />
            </button>
          </div>

          {/* Grid of 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popular.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
