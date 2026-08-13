import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    clearCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 500;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const finalTotal = discountApplied ? Math.round(cartSubtotal * 0.9) : cartSubtotal;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toLowerCase() === 'honey10' || promoCode.trim().toLowerCase() === 'gomati10') {
      setDiscountApplied(true);
    } else {
      alert('Invalid promo code. Try "HONEY10" for 10% off!');
    }
  };

  const handleCheckout = () => {
    setOrderComplete(true);
    setTimeout(() => {
      clearCart();
      setOrderComplete(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#282823]/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF3D6] dark:bg-[#282823] border-l border-[#595C56]/40 shadow-2xl flex flex-col justify-between animate-slide-up">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-[#595C56]/30 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-[#E9BE5F]" />
              <h2 className="font-serif text-xl font-bold text-[#282823] dark:text-[#F5E8B6]">Your Basket</h2>
              <span className="text-xs bg-[#F5E8B6] text-[#282823] font-bold px-2.5 py-0.5 rounded-full border border-[#595C56]/30">
                {cart.length} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-[#595C56] dark:text-[#F5E8B6]/70 hover:bg-[#F5E8B6] dark:hover:bg-[#1C1C18] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F5E8B6] dark:bg-[#1C1C18] p-4 border-b border-[#595C56]/40 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-[#282823] dark:text-[#F5E8B6] font-medium mb-1.5">
                Add <span className="font-bold text-[#282823] dark:text-[#E9BE5F]">₹{amountNeededForFreeShipping}</span> more for <span className="font-bold">FREE Express Delivery</span>
              </p>
            ) : (
              <p className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 mb-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>You have unlocked FREE Shipping!</span>
              </p>
            )}
            <div className="w-full bg-[#FAF3D6] dark:bg-[#363630] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#E9BE5F] h-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Order Success Overlay */}
          {orderComplete ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#282823] dark:text-[#F5E8B6]">Order Placed Successfully!</h3>
              <p className="text-sm text-[#595C56] dark:text-[#F5E8B6]/70 max-w-xs">
                Thank you for supporting traditional Indian artisans. Your package is being packed with care!
              </p>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart View */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-[#F5E8B6] dark:bg-[#1C1C18] rounded-full flex items-center justify-center text-[#E9BE5F]">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#282823] dark:text-[#F5E8B6]">Your basket is empty</h3>
              <p className="text-xs text-[#595C56] dark:text-[#F5E8B6]/70 max-w-xs">
                Explore our artisanal wild forest honey, handcrafted pickles, and sun-dried badis to fill your cart.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            /* Cart Items List */
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedWeight}-${idx}`}
                  className="flex items-center space-x-4 p-3 bg-[#F5E8B6]/60 dark:bg-[#1C1C18] rounded-2xl border border-[#595C56]/40"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-[#282823] dark:text-[#F5E8B6] truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-xs text-[#595C56] dark:text-[#F5E8B6]/70 font-medium mt-0.5">
                      Size: {item.selectedWeight} • ₹{item.product.price}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-[#595C56]/40 rounded-lg overflow-hidden bg-[#FAF3D6] dark:bg-[#282823] text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedWeight, -1)}
                          className="px-2 py-0.5 text-[#282823] dark:text-[#F5E8B6] hover:bg-[#E9BE5F]/30 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-bold text-[#282823] dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedWeight, 1)}
                          className="px-2 py-0.5 text-[#282823] dark:text-[#F5E8B6] hover:bg-[#E9BE5F]/30 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-sm text-[#282823] dark:text-[#E9BE5F]">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                    className="p-1.5 text-[#595C56] hover:text-red-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Cart Summary & Checkout Footer */}
          {!orderComplete && cart.length > 0 && (
            <div className="p-6 border-t border-[#595C56]/30 bg-[#F5E8B6]/40 dark:bg-[#1C1C18] space-y-4">
              
              {/* Promo Code Input Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. HONEY10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#FAF3D6] dark:bg-[#282823] border border-[#595C56]/40 rounded-xl text-xs text-[#282823] dark:text-[#F5E8B6] focus:outline-none focus:border-[#E9BE5F]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#282823] text-[#E9BE5F] hover:bg-[#1C1C18] font-bold rounded-xl text-xs transition-colors"
                >
                  Apply
                </button>
              </form>

              {discountApplied && (
                <div className="text-xs text-emerald-700 font-bold flex items-center justify-between">
                  <span>10% Promo Discount Applied</span>
                  <span>-₹{Math.round(cartSubtotal * 0.1)}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#595C56] dark:text-[#F5E8B6]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#282823] dark:text-white">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{cartSubtotal >= freeShippingThreshold ? 'FREE' : '₹50'}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#282823] dark:text-white pt-2 border-t border-[#595C56]/30">
                  <span>Total Amount</span>
                  <span className="text-[#282823] dark:text-[#E9BE5F]">
                    ₹{finalTotal + (cartSubtotal >= freeShippingThreshold ? 0 : 50)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] font-bold rounded-2xl shadow-xl shadow-[#E9BE5F]/30 flex items-center justify-center space-x-2 text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-5 h-5 text-[#282823]" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[#595C56] dark:text-[#F5E8B6]/70">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted Payments • UPI, Cards & NetBanking</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
