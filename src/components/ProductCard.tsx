import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct } = useCart();
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white dark:bg-stone-800 rounded-3xl p-4 border border-stone-200/70 dark:border-stone-700/70 shadow-sm hover:shadow-xl hover:border-[#c8674d]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
    >
      {/* Top Image Container Box */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#faf4e8] dark:bg-stone-900/60 p-3 flex items-center justify-center">
        
        {/* Top-Left Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
            {discountPercent}% OFF
          </span>
        )}

        {/* Top-Right Heart Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 dark:bg-stone-800/90 text-stone-600 dark:text-stone-300 shadow-sm hover:text-red-500 hover:scale-110 transition-all"
          aria-label="Add to Wishlist"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-stone-500 dark:text-stone-400'
            }`}
          />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 rounded-xl"
          loading="lazy"
        />

        {/* Bottom-Left Pack Weight Badge */}
        <span className="absolute bottom-3 left-3 z-10 bg-white/95 dark:bg-stone-900/95 text-stone-700 dark:text-stone-300 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs backdrop-blur-xs">
          {product.weight}
        </span>
      </div>

      {/* Product Content Details */}
      <div className="pt-3 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Title */}
        <h3 className="font-serif text-sm sm:text-base font-bold text-[#2d1e18] dark:text-stone-100 line-clamp-1 group-hover:text-[#c8674d] transition-colors">
          {product.name}
        </h3>

        {/* Price & + ADD Button Footer Row */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-sm sm:text-base font-extrabold text-[#2d1e18] dark:text-stone-100">
              ₹{product.price.toFixed(2)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-stone-400 line-through font-normal -mt-0.5">
                ₹{product.originalPrice.toFixed(2)}
              </div>
            )}
          </div>

          {/* + ADD Button */}
          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all shadow-xs ${
              added
                ? 'bg-emerald-600 text-white border border-emerald-600'
                : 'border border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white bg-white dark:bg-stone-800'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
