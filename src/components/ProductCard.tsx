import React, { useState } from 'react';
import { Star, Sparkles, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, showToast } = useCart();
  
  const weights = product.weightsAvailable || [product.weight];
  const [selectedWeight, setSelectedWeight] = useState<string>(product.weight);

  // Dynamic price calculation based on selected weight ratio
  const getWeightMultiplier = (weightStr: string) => {
    if (weightStr.includes('1kg') || weightStr.includes('1 kg') || weightStr.includes('1000 ML') || weightStr.includes('5 kg')) {
      if (product.weight.includes('250')) return 3.5;
      if (product.weight.includes('500') || product.weight.includes('2 kg')) return 1.8;
      if (weightStr.includes('5 kg')) return 2.2;
    }
    if (weightStr.includes('250g') || weightStr.includes('250 ML') || weightStr.includes('1 kg')) {
      if (product.weight.includes('500')) return 0.55;
      if (product.weight.includes('2 kg')) return 0.55;
    }
    if (weightStr.includes('5000 ML')) return 4.5;
    return 1;
  };

  const multiplier = getWeightMultiplier(selectedWeight);
  const currentPrice = Math.round(product.price * multiplier);
  const currentOriginalPrice = product.originalPrice ? Math.round(product.originalPrice * multiplier) : undefined;
  const emiPrice = Math.round(currentPrice / 4);

  // Badge Text & Emoji
  const badgeText = product.badgeText || (product.isBestSeller ? 'Best Seller' : product.isMustTry ? 'Must Try' : 'Trending');
  const badgeEmoji = product.badgeEmoji || (product.isBestSeller ? '🔥' : product.isMustTry ? '😋' : '🚀');
  const discountText = product.discountTag || (product.originalPrice ? `Upto ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF` : 'Flat 12% OFF');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const itemToAdd = {
      ...product,
      price: currentPrice,
    };
    addToCart(itemToAdd, selectedWeight);
    showToast(`Added ${product.name} (${selectedWeight}) to cart! 🛒`);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group bg-paper-texture dark:bg-[#1E1C18] rounded-2xl p-3 sm:p-5 border border-[#E7DFD3] dark:border-[#3D372E] shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/70 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer relative h-full transform hover:-translate-y-1 hover-lift"
    >
      {/* Top Left Deep Red Discount Badge */}
      <div className="absolute top-2.5 sm:top-3.5 left-0 z-10 bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#B91C1C] text-white font-bold text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-r-full rounded-tl-xl shadow-md flex items-center gap-1 tracking-wide border-r border-t border-red-300/30 transition-transform duration-300 group-hover:scale-105">
        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white animate-pulse" />
        <span>{discountText}</span>
      </div>

      <div>
        {/* Product Image Container (Sleek Compact Mobile Height) */}
        <div className="relative w-full h-36 sm:h-48 rounded-xl bg-[#FAF8F5] dark:bg-[#25221D] p-2 sm:p-3 flex items-center justify-center overflow-hidden mb-2.5 sm:mb-3.5 border border-[#F0EADF] dark:border-[#332E27] group-hover:border-[#D4AF37]/50 transition-colors duration-400">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-sm sm:text-lg font-bold text-[#3D2716] dark:text-[#F3E5AB] leading-tight line-clamp-2 mb-1.5 sm:mb-2 group-hover:text-[#B8661B] dark:group-hover:text-[#D4AF37] transition-colors">
          {product.name}
        </h3>

        {/* Highlight Tag (Forest Green Pill) */}
        <div className="mb-2">
          <span className="bg-[#165B2F] dark:bg-[#1B5E33] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs border border-green-400/20">
            <span>{badgeEmoji}</span>
            <span>{badgeText}</span>
          </span>
        </div>

        {/* Rating Stars Row */}
        <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#231F1B] dark:text-[#E6DBCB] mb-2 sm:mb-3.5">
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#231F1B] text-[#231F1B] dark:fill-[#D4AF37] dark:text-[#D4AF37]" />
          <span>{product.rating} Star</span>
        </div>

        {/* Weight / Variant Dropdown Selector */}
        <div className="relative mb-2.5 sm:mb-3.5" onClick={(e) => e.stopPropagation()}>
          <select
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(e.target.value)}
            className="w-full appearance-none bg-[#FDF8F0] dark:bg-[#28241E] border border-[#E2D4C0] dark:border-[#473E32] text-[#3B2818] dark:text-[#F3E5AB] font-semibold text-xs rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 pr-7 sm:pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B8661B]/30 transition-all shadow-inner"
          >
            {weights.map((w) => (
              <option key={w} value={w} className="bg-white dark:bg-[#1C1A17] text-[#231F1B] dark:text-[#F3E5AB]">
                {w}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8C4B13] dark:text-[#D4AF37] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Price & EMI Section */}
        <div className="space-y-0.5 sm:space-y-1 mb-2 sm:mb-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-xl font-extrabold text-[#231F1B] dark:text-white tracking-tight">
              ₹{currentPrice}.00
            </span>
            {currentOriginalPrice && (
              <span className="text-[11px] sm:text-xs text-neutral-400 line-through font-normal">
                ₹{currentOriginalPrice}.00
              </span>
            )}
          </div>

          {/* EMI Subtext */}
          <div className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 flex items-center flex-wrap gap-1">
            <span>or</span>
            <span className="text-[#15803D] dark:text-[#4ADE80] font-extrabold">₹{emiPrice}</span>
            <span>/Mo</span>
            <span className="bg-gradient-to-r from-[#8C4B13] to-[#A85B18] text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-xs ml-0.5">
              EMI
            </span>
          </div>
        </div>
      </div>

      {/* Add To Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full mt-2 sm:mt-3.5 bg-gradient-to-r from-[#9C5B23] via-[#8C4B13] to-[#733B0D] hover:from-[#8C4B13] hover:to-[#5A2C08] active:scale-[0.98] text-white font-extrabold py-2 sm:py-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-[#8C4B13]/25 flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer border border-[#B8661B]/30"
      >
        <span>ADD TO CART</span>
      </button>
    </div>
  );
};
