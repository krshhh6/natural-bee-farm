import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';
import { getWeightMultiplier } from '../utils/price';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedWeight?: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedWeight: string) => void;
  updateQuantity: (productId: string, selectedWeight: string, delta: number) => void;
  updateItemWeight: (productId: string, oldWeight: string, newWeight: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('honey_designs_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('honey_designs_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const addToCart = (product: Product, selectedWeight?: string, quantity: number = 1) => {
    const weight = selectedWeight || product.weight;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weight
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedWeight: weight }];
      }
    });
    showToast(`Added ${quantity}x "${product.name}" (${weight}) to cart`);
  };

  const removeFromCart = (productId: string, selectedWeight: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedWeight === selectedWeight)));
  };

  const updateQuantity = (productId: string, selectedWeight: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedWeight === selectedWeight) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const updateItemWeight = (productId: string, oldWeight: string, newWeight: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedWeight === oldWeight) {
          return { ...item, selectedWeight: newWeight };
        }
        return item;
      })
    );
    showToast(`Updated weight to ${newWeight}`);
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => {
    const multiplier = getWeightMultiplier(item.product.weight, item.selectedWeight);
    const unitPrice = Math.round(item.product.price * multiplier);
    return acc + unitPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemWeight,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
