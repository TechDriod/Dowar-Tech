import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

const CART_KEY = 'dowar_tech_cart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  const addToCart = useCallback((product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        const newQty = Math.min(existing.qty + qty, product.stockCount || 99);
        toast.success(`Updated ${product.name} quantity`);
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: newQty } : item
        );
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, { ...product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i._id === productId);
      if (item) toast.success(`${item.name} removed from cart`);
      return prev.filter((item) => item._id !== productId);
    });
  }, []);

  const updateQuantity = useCallback((productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item._id === productId ? { ...item, qty } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem(CART_KEY);
  }, []);

  const isInCart = useCallback((productId) => {
    return cartItems.some((item) => item._id === productId);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems, cartCount, cartTotal,
      addToCart, removeFromCart, updateQuantity, clearCart, isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export default CartContext;
