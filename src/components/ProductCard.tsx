import React from 'react';
import { Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, showToast } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.weight);
    showToast(`Added ${product.name} (${product.weight}) to your cart! 🍯`);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group bg-[#F5E8B6] dark:bg-[#1C1C18] rounded-3xl p-4 border border-[#595C56]/30 dark:border-[#595C56]/40 shadow-sm hover:shadow-xl hover:border-[#E9BE5F] transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF3D6] dark:bg-[#282823] p-3 flex items-center justify-center">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="bg-[#E9BE5F] text-[#282823] font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Best Seller
            </span>
          )}
          {product.isOrganic && (
            <span className="bg-[#282823] text-[#E9BE5F] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm border border-[#E9BE5F]/30">
              100% Pure
            </span>
          )}
        </div>

        {/* Quick View & Heart Overlay Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 rounded-full bg-[#282823]/90 text-[#F5E8B6] hover:bg-[#E9BE5F] hover:text-[#282823] shadow-md transition-colors"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`Added ${product.name} to Wishlist!`);
            }}
            className="p-2 rounded-full bg-[#282823]/90 text-[#F5E8B6] hover:bg-[#E9BE5F] hover:text-[#282823] shadow-md transition-colors"
            title="Save to Wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Content Details */}
      <div className="mt-4 space-y-2 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Category & Weight */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#595C56] dark:text-[#E9BE5F]">
            <span>{product.categoryName}</span>
            <span className="bg-[#FAF3D6] dark:bg-[#282823] text-[#282823] dark:text-[#F5E8B6] px-2 py-0.5 rounded-md text-[10px] border border-[#595C56]/30">
              {product.weight}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-sm sm:text-base font-bold text-[#282823] dark:text-[#F5E8B6] line-clamp-1 group-hover:text-[#E9BE5F] transition-colors mt-1">
            {product.name}
          </h3>
        </div>

        {/* Price & Rating Row */}
        <div className="pt-2 flex items-center justify-between">
          <div>
            <div className="text-sm sm:text-base font-extrabold text-[#282823] dark:text-[#F5E8B6]">
              ₹{product.price}
              {product.originalPrice && (
                <span className="ml-1.5 text-xs text-[#595C56] line-through font-normal">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center space-x-1 bg-[#FAF3D6] dark:bg-[#282823] px-2 py-1 rounded-lg text-xs font-bold text-[#282823] dark:text-[#F5E8B6] border border-[#595C56]/30">
            <Star className="w-3.5 h-3.5 fill-[#E9BE5F] text-[#E9BE5F]" />
            <span>{product.rating}</span>
            <span className="text-[10px] text-[#595C56]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] font-bold py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-[#E9BE5F]/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <ShoppingBag className="w-4 h-4 text-[#282823]" />
          <span>Add to Cart</span>
        </button>

      </div>
    </div>
  );
};
