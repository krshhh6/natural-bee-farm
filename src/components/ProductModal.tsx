import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, ShoppingBag, MapPin, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const currentWeight = selectedWeight || quickViewProduct.weight;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentWeight, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1810]/75 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setQuickViewProduct(null);
      }}
    >
      <div
        className="relative w-full max-w-3xl bg-paper-texture dark:bg-[#1E1C18] rounded-[28px] sm:rounded-[32px] shadow-2xl border-2 border-[#E8D5B7] dark:border-[#3D372E] overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-scale-up font-sans my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FAF5EB] dark:bg-[#2A2620] border border-[#E8D5B7] dark:border-[#3D372E] text-[#9C5B23] dark:text-[#E9BE5F] flex items-center justify-center hover:bg-[#9C5B23] hover:text-white transition-colors shadow-xs"
          aria-label="Close Quick View"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side Product Image Container */}
        <div className="md:w-1/2 relative bg-[#FAF5EB] dark:bg-[#181715] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#E8D5B7] dark:border-[#3D372E] min-h-[240px] md:min-h-[420px]">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full h-full max-h-[340px] object-contain transform hover:scale-105 transition-transform duration-500"
          />
          {quickViewProduct.isOrganic && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-[#E9BE5F] text-[#2C1810] text-[10px] sm:text-xs font-black rounded-full uppercase tracking-wider shadow-md border border-amber-300">
              100% ORGANIC
            </span>
          )}
        </div>

        {/* Right Side Product Details */}
        <div className="md:w-1/2 p-5 sm:p-8 overflow-y-auto custom-scrollbar flex flex-col justify-between bg-paper-texture dark:bg-[#1E1C18]">
          <div className="space-y-4">
            
            {/* Category & Origin */}
            <div className="flex items-center justify-between text-xs font-bold text-[#9C5B23] dark:text-[#E9BE5F]">
              <span className="uppercase tracking-wider text-[11px]">{quickViewProduct.categoryName}</span>
              <span className="flex items-center gap-1 text-[#5C4033] dark:text-[#D8CFBF] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#9C5B23]" />
                {quickViewProduct.origin}
              </span>
            </div>

            {/* Title & Rating */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white leading-snug">
                {quickViewProduct.name}
              </h2>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center text-[#E9BE5F]">
                  <Star className="w-4 h-4 fill-[#E9BE5F] text-[#E9BE5F]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#2C1810] dark:text-white">
                  {quickViewProduct.rating}
                </span>
                <span className="text-xs text-[#5C4033] dark:text-[#D8CFBF]">({quickViewProduct.reviewsCount} customer reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold text-[#2C1810] dark:text-white">
                ₹{quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-[#8C7A65] line-through font-normal">₹{quickViewProduct.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#5C4033] dark:text-[#D8CFBF] leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Available Weights Selector */}
            {quickViewProduct.weightsAvailable && quickViewProduct.weightsAvailable.length > 0 && (
              <div>
                <label className="block text-[11px] font-extrabold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider mb-2">
                  SELECT PACK SIZE
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.weightsAvailable.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSelectedWeight(w)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        currentWeight === w
                          ? 'bg-[#9C5B23] border-[#834917] text-white shadow-md'
                          : 'bg-[#FAF5EB] dark:bg-[#181715] border-[#E8D5B7] dark:border-[#3D372E] text-[#2C1810] dark:text-[#D8CFBF] hover:border-[#9C5B23]'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients List */}
            {quickViewProduct.ingredients && quickViewProduct.ingredients.length > 0 && (
              <div>
                <label className="block text-[11px] font-extrabold text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider mb-1.5">
                  NATURAL INGREDIENTS
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#FAF5EB] dark:bg-[#181715] text-[#5C4033] dark:text-[#D8CFBF] rounded-lg text-[11px] font-medium border border-[#E8D5B7] dark:border-[#3D372E]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantees */}
            <div className="pt-3 border-t border-[#E8D5B7] dark:border-[#3D372E] grid grid-cols-2 gap-2 text-[11px] font-bold text-[#5C4033] dark:text-[#D8CFBF]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Preservatives</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#9C5B23] shrink-0" />
                <span>Fast India Shipping</span>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-5 mt-4 border-t border-[#E8D5B7] dark:border-[#3D372E] flex items-center gap-3">
            
            {/* Quantity Counter */}
            <div className="flex items-center border border-[#E8D5B7] dark:border-[#3D372E] rounded-xl overflow-hidden bg-[#FAF5EB] dark:bg-[#181715]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-[#2C1810] dark:text-white hover:bg-[#9C5B23]/10 font-bold cursor-pointer"
              >
                -
              </button>
              <span className="px-3 py-2 text-xs sm:text-sm font-extrabold text-[#2C1810] dark:text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-[#2C1810] dark:text-white hover:bg-[#9C5B23]/10 font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                added
                  ? 'bg-emerald-600 text-white border border-emerald-700'
                  : 'bg-gradient-to-r from-[#9C5B23] via-[#B8661B] to-[#9C5B23] hover:from-[#834917] hover:to-[#834917] text-white shadow-[#9C5B23]/20 border border-[#834917]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Add to Cart • ₹{quickViewProduct.price * quantity}</span>
                </>
              )}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};
