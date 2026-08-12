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
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col justify-between animate-slide-up">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-amber-500" />
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">Your Basket</h2>
              <span className="text-xs bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold px-2.5 py-0.5 rounded-full">
                {cart.length} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-amber-50 dark:bg-amber-950/40 p-4 border-b border-amber-200/50 dark:border-amber-900/40 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-stone-700 dark:text-amber-200 font-medium mb-1.5">
                Add <span className="font-bold text-amber-600 dark:text-amber-400">₹{amountNeededForFreeShipping}</span> more for <span className="font-bold">FREE Express Delivery</span>
              </p>
            ) : (
              <p className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 mb-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>You have unlocked FREE Shipping!</span>
              </p>
            )}
            <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-500"
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
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">Order Placed Successfully!</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 max-w-xs">
                Thank you for supporting traditional Indian artisans. Your package is being packed with care!
              </p>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart View */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">Your basket is empty</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs">
                Explore our artisanal wild forest honey, handcrafted pickles, and sun-dried badis to fill your cart.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
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
                  className="flex items-center space-x-4 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/60 dark:border-stone-700/60"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                      Size: {item.selectedWeight} • ₹{item.product.price}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-stone-300 dark:border-stone-600 rounded-lg overflow-hidden bg-white dark:bg-stone-900 text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedWeight, -1)}
                          className="px-2 py-0.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-bold text-stone-900 dark:text-stone-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedWeight, 1)}
                          className="px-2 py-0.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-sm text-stone-900 dark:text-amber-400">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                    className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
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
            <div className="p-6 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 space-y-4">
              
              {/* Promo Code Input Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. HONEY10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 dark:bg-stone-800 text-amber-400 hover:bg-stone-800 font-bold rounded-xl text-xs transition-colors"
                >
                  Apply
                </button>
              </form>

              {discountApplied && (
                <div className="text-xs text-emerald-600 font-bold flex items-center justify-between">
                  <span>10% Promo Discount Applied</span>
                  <span>-₹{Math.round(cartSubtotal * 0.1)}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{cartSubtotal >= freeShippingThreshold ? 'FREE' : '₹50'}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 dark:text-stone-50 pt-2 border-t border-stone-200 dark:border-stone-700">
                  <span>Total Amount</span>
                  <span className="text-amber-600 dark:text-amber-400">
                    ₹{finalTotal + (cartSubtotal >= freeShippingThreshold ? 0 : 50)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center space-x-2 text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Encrypted Payments • UPI, Cards & NetBanking</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
