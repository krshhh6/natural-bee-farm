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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#282823]/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-[#FAF3D6] dark:bg-[#282823] rounded-3xl shadow-2xl border border-[#595C56]/40 overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#F5E8B6] dark:bg-[#1C1C18] text-[#282823] dark:text-[#F5E8B6] hover:bg-[#E9BE5F] hover:text-[#282823] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side Product Image */}
        <div className="md:w-1/2 relative bg-[#F5E8B6] dark:bg-[#1C1C18] flex items-center justify-center min-h-[260px] md:min-h-[420px]">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
          />
          {quickViewProduct.isOrganic && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-[#E9BE5F] text-[#282823] text-xs font-bold rounded-lg uppercase tracking-wider shadow-sm">
              100% Organic
            </span>
          )}
        </div>

        {/* Right Side Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto custom-scrollbar flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Category & Origin */}
            <div className="flex items-center justify-between text-xs font-semibold text-[#595C56] dark:text-[#E9BE5F]">
              <span>{quickViewProduct.categoryName}</span>
              <span className="flex items-center gap-1 text-[#595C56] dark:text-[#F5E8B6]/60 font-normal">
                <MapPin className="w-3.5 h-3.5" />
                {quickViewProduct.origin}
              </span>
            </div>

            {/* Title & Rating */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#282823] dark:text-[#F5E8B6] leading-tight">
                {quickViewProduct.name}
              </h2>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center text-[#E9BE5F]">
                  <Star className="w-4 h-4 fill-[#E9BE5F] text-[#E9BE5F]" />
                </div>
                <span className="text-sm font-bold text-[#282823] dark:text-[#F5E8B6]">
                  {quickViewProduct.rating}
                </span>
                <span className="text-xs text-[#595C56] dark:text-[#F5E8B6]/60">({quickViewProduct.reviewsCount} customer reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-[#282823] dark:text-[#E9BE5F]">
                ₹{quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-[#595C56] line-through">₹{quickViewProduct.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#282823]/85 dark:text-[#F5E8B6]/90 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Available Weights Selector */}
            {quickViewProduct.weightsAvailable && quickViewProduct.weightsAvailable.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-[#282823] dark:text-[#F5E8B6] uppercase tracking-wider mb-2">
                  Select Pack Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.weightsAvailable.map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        currentWeight === w
                          ? 'bg-[#E9BE5F] border-[#E9BE5F] text-[#282823] font-bold shadow-sm'
                          : 'bg-[#F5E8B6] dark:bg-[#1C1C18] border-[#595C56]/40 text-[#282823] dark:text-[#F5E8B6] hover:border-[#E9BE5F]'
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
                <label className="block text-xs font-bold text-[#282823] dark:text-[#F5E8B6] uppercase tracking-wider mb-1.5">
                  Natural Ingredients
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#F5E8B6] dark:bg-[#1C1C18] text-[#282823] dark:text-[#F5E8B6] rounded-md text-[11px] border border-[#595C56]/30"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantees */}
            <div className="pt-2 border-t border-[#595C56]/30 grid grid-cols-2 gap-2 text-[11px] text-[#595C56] dark:text-[#F5E8B6]/70">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Preservatives</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#E9BE5F]" />
                <span>Fast India Shipping</span>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-6 mt-4 border-t border-[#595C56]/30 flex items-center gap-4">
            
            {/* Quantity Counter */}
            <div className="flex items-center border border-[#595C56]/40 rounded-xl overflow-hidden bg-[#F5E8B6] dark:bg-[#1C1C18]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-[#282823] dark:text-[#F5E8B6] hover:bg-[#E9BE5F]/30 font-bold"
              >
                -
              </button>
              <span className="px-3 py-2 text-xs sm:text-sm font-bold text-[#282823] dark:text-[#F5E8B6]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-[#282823] dark:text-[#F5E8B6] hover:bg-[#E9BE5F]/30 font-bold"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] shadow-[#E9BE5F]/25'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#282823]" />
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
