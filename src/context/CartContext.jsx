import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProductById } from '../data/products';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) return;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        toast.success(`Updated ${product.name} quantity in cart`, {
          style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' },
          iconTheme: { primary: '#D4AF37', secondary: '#111' },
        });
        return prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      toast.success(`Added ${product.name} to cart`, {
        style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' },
        iconTheme: { primary: '#D4AF37', secondary: '#111' },
      });
      return [...prev, { id: productId, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.error('Item removed from cart', {
      style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' },
      iconTheme: { primary: '#ef4444', secondary: '#111' },
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cartItems.reduce((acc, item) => {
    const product = getProductById(item.id);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
