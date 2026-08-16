import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Tag, Sparkles, Plus, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '@/context/StoreContext';
import type { CartItem } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    clearCart,
    addToCart,
    showToast,
  } = useCart();

  const { products, addOrder } = useStore();

  const [couponCode, setCouponCode] = useState('NEW15');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('NEW15');
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const discountPercent = appliedCoupon === 'NEW15' ? 15 : appliedCoupon === 'GOMATI10' ? 10 : 0;
  const savingsAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const estimatedTotal = cartSubtotal - savingsAmount;

  const freeShippingThreshold = 500;

  const handleApplyCoupon = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'NEW15') {
      setAppliedCoupon('NEW15');
      showToast('Applied coupon NEW15 (15% OFF)! 🎉');
    } else if (cleanCode === 'GOMATI10' || cleanCode === 'HONEY10') {
      setAppliedCoupon('GOMATI10');
      showToast('Applied coupon GOMATI10 (10% OFF)! 🎉');
    } else {
      alert('Invalid coupon code. Try "NEW15" or "GOMATI10"');
    }
  };

  const handleCheckout = () => {
    // Add real customer order to StoreContext
    if (cart.length > 0) {
      addOrder({
        customerName: 'Guest Customer',
        customerEmail: 'customer@naturabee.in',
        customerPhone: '+91 98765 00000',
        shippingAddress: 'Direct Online Order - Customer Portal',
        items: cart.map((item: CartItem) => ({
          productId: item.product.id,
          productName: item.product.name,
          weight: item.selectedWeight,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
        totalAmount: cartSubtotal,
        discountAmount: savingsAmount,
        shippingFee: cartSubtotal >= freeShippingThreshold ? 0 : 50,
        finalAmount: estimatedTotal,
        status: 'Pending',
        paymentMethod: 'UPI / Razorpay',
        paymentStatus: 'Paid',
      });
    }

    setOrderComplete(true);
    setTimeout(() => {
      clearCart();
      setOrderComplete(false);
      setIsCartOpen(false);
    }, 2500);
  };

  // Must-try upsell products (products not currently in cart)
  const cartProductIds = new Set(cart.map((i: CartItem) => i.product.id));
  const upsellProducts = products.filter((p) => p.inStock && !cartProductIds.has(p.id)).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-[#1A1816] text-[#231F1B] dark:text-[#FEFDF5] shadow-2xl flex flex-col justify-between animate-slide-up border-l border-[#E7DFD3] dark:border-neutral-800">
          
          {/* Cart Header */}
          <div className="p-4 sm:p-5 border-b border-[#E7DFD3] dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-[#1A1816]">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#231F1B] dark:text-white">
              Your Cart ({cart.length} items)
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Success Overlay */}
          {orderComplete ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#231F1B] dark:text-white">Order Placed Successfully!</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
                Thank you for your order! Your artisanal traditional delicacies are on their way.
              </p>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart View */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-[#F5EEDD] dark:bg-[#28241E] rounded-full flex items-center justify-center text-[#9C5B23]">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#231F1B] dark:text-white">Your cart is empty</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed">
                Add Gir Cow A2 Ghee, Wild Forest Honey, Khapli Wheat Atta or handcrafted spices to get started!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#9C5B23] hover:bg-[#834917] text-white font-bold rounded-xl text-xs tracking-wider uppercase shadow-md transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            /* Main Cart Body (Scrollable) */
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 custom-scrollbar bg-[#FAF8F5] dark:bg-[#161513]">
              
              {/* Cart Items List */}
              <div className="space-y-3.5">
                {cart.map((item, idx) => {
                  const originalItemPrice = item.product.originalPrice ? Math.round(item.product.originalPrice * item.quantity) : Math.round(item.product.price * 1.18 * item.quantity);
                  const itemPrice = Math.round(item.product.price * item.quantity);
                  const itemDiscountPercent = discountPercent > 0 ? discountPercent : 15;

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedWeight}-${idx}`}
                      className="p-3.5 bg-white dark:bg-[#211E1A] rounded-xl border border-[#E7DFD3] dark:border-neutral-800 shadow-xs flex items-start gap-3 relative"
                    >
                      {/* Product Image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain rounded-lg border border-neutral-100 dark:border-neutral-800 p-1 bg-white shrink-0"
                      />

                      {/* Content Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-[#231F1B] dark:text-white truncate">
                          {item.product.name}
                        </h4>

                        {/* Weight Dropdown Pill */}
                        <div className="mt-1 inline-flex items-center gap-1 bg-[#F5EEDD] dark:bg-[#2C2720] px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#3B2818] dark:text-[#F3E5AB] border border-[#E2D4C0] dark:border-[#42392C]">
                          <span>{item.selectedWeight}</span>
                          <ChevronDown className="w-3 h-3 text-[#8C4B13]" />
                        </div>

                        {/* Quantity Stepper & Delete Row */}
                        <div className="flex items-center justify-between mt-3">
                          {/* Stepper */}
                          <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-[#1A1816] text-xs font-bold">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedWeight, -1)}
                              className="px-2.5 py-0.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-neutral-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedWeight, 1)}
                              className="px-2.5 py-0.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                            >
                              +
                            </button>
                          </div>

                          {/* Trash Icon */}
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                            className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Right Price & Coupon Tag */}
                      <div className="text-right shrink-0">
                        <div className="text-xs text-neutral-400 line-through">
                          ₹{originalItemPrice}.00
                        </div>
                        <div className="text-sm font-extrabold text-[#231F1B] dark:text-white">
                          ₹{itemPrice}.00
                        </div>
                        <div className="text-[10px] font-extrabold text-[#15803D] dark:text-[#4ADE80]">
                          ({itemDiscountPercent}% OFF)
                        </div>
                        {appliedCoupon && (
                          <div className="mt-1 inline-flex items-center gap-0.5 bg-[#E8F5E9] text-[#1B5E20] font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-xs">
                            <Tag className="w-2.5 h-2.5" />
                            <span>{appliedCoupon}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Code Section */}
              <div className="bg-white dark:bg-[#211E1A] rounded-xl border border-[#E7DFD3] dark:border-neutral-800 p-3.5 space-y-3">
                {/* Applied Green Coupon Bar */}
                {appliedCoupon ? (
                  <div className="bg-[#E8F5E9] border border-[#A5D6A7] text-[#1B5E20] rounded-lg p-2.5 flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-[#1B5E20]" />
                      <span>{appliedCoupon} applied</span>
                    </div>
                    <span className="bg-[#C8E6C9] text-[#1B5E20] px-2 py-0.5 rounded text-[11px]">
                      Saved ₹{savingsAmount}.00
                    </span>
                  </div>
                ) : null}

                {/* Coupon Form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-[#FAF8F5] dark:bg-[#1A1816] border border-[#E0D0B6] dark:border-[#3D372E] rounded-lg text-xs font-semibold text-[#231F1B] dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#9C5B23]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#9C5B23] hover:bg-[#834917] text-white font-bold rounded-lg text-xs transition-colors"
                  >
                    Apply
                  </button>
                </form>

                <div className="flex items-center justify-between text-xs font-bold">
                  <button
                    onClick={() => {
                      setCouponCode('NEW15');
                      setAppliedCoupon('NEW15');
                      showToast('Applied coupon NEW15!');
                    }}
                    className="text-[#0066CC] hover:underline flex items-center gap-1"
                  >
                    <span>View All Offers</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* "Something you must-try!!" Upsell Section */}
              {upsellProducts.length > 0 && (
                <div className="pt-2">
                  <h3 className="font-bold text-sm text-[#231F1B] dark:text-white mb-2.5">
                    Something you must-try!!
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {upsellProducts.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white dark:bg-[#211E1A] border border-[#E7DFD3] dark:border-neutral-800 rounded-xl p-3 flex flex-col justify-between text-center"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-14 object-contain mx-auto mb-2"
                        />
                        <div className="font-serif text-xs font-bold text-[#231F1B] dark:text-white truncate">
                          {p.name}
                        </div>
                        <div className="text-xs font-extrabold text-[#231F1B] dark:text-white mt-1">
                          ₹{p.price}.00
                        </div>
                        <button
                          onClick={() => addToCart(p, p.weight)}
                          className="mt-2 w-full py-1 bg-[#F5EEDD] hover:bg-[#9C5B23] hover:text-white dark:bg-[#2C2720] text-[#8C4B13] dark:text-[#F3E5AB] font-bold rounded-md text-[11px] flex items-center justify-center gap-1 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Fixed Footer & Checkout Panel */}
          {!orderComplete && cart.length > 0 && (
            <div className="border-t border-[#E7DFD3] dark:border-neutral-800 bg-white dark:bg-[#1A1816]">
              
              {/* Vibrant Green Savings Banner */}
              {savingsAmount > 0 && (
                <div className="bg-[#00A884] text-white text-xs font-extrabold py-2 px-4 text-center tracking-wide shadow-xs flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                  <span>₹{savingsAmount}.00 Saved so far!</span>
                </div>
              )}

              <div className="p-4 sm:p-5 space-y-3">
                {/* Estimated Total Row */}
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm sm:text-base text-[#231F1B] dark:text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
                    <span>Estimated Total</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-neutral-400 line-through mr-1.5">
                      ₹{cartSubtotal}.00
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-[#231F1B] dark:text-white">
                      ₹{estimatedTotal}.00
                    </span>
                    <span className="text-xs font-bold text-[#15803D] dark:text-[#4ADE80] ml-1.5">
                      ({discountPercent}% OFF)
                    </span>
                  </div>
                </div>

                {/* Main Orange Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#E06D3B] hover:bg-[#D45E2D] active:scale-[0.99] text-white rounded-xl p-3.5 shadow-lg shadow-[#E06D3B]/25 flex items-center justify-between transition-all cursor-pointer"
                >
                  <div className="text-left">
                    <div className="font-extrabold text-base leading-tight">Checkout</div>
                    <div className="text-[10px] font-semibold text-white/90">
                      Free Shipping on Orders Above ₹{freeShippingThreshold}
                    </div>
                  </div>

                  {/* Payment Methods Badges */}
                  <div className="bg-white text-[#231F1B] px-2.5 py-1 rounded-md text-[10px] font-extrabold flex items-center gap-1 shadow-xs">
                    <span>UPI</span>
                    <span>•</span>
                    <span>Cards</span>
                    <span>•</span>
                    <span>GPay</span>
                  </div>
                </button>

                {/* Security Tagline */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Powered by 100% Encrypted & Safe Checkout</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
