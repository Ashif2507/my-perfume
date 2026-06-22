import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProductById } from '../data/products';
import { toast } from 'react-hot-toast';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('aura_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (productId) => {
    const product = getProductById(productId);
    if (!product) return;

    setWishlistItems(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        toast('Removed from Wishlist', {
          icon: '🤍',
          style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' }
        });
        return prev.filter(id => id !== productId);
      } else {
        toast.success(`Added ${product.name} to Wishlist`, {
          icon: '❤️',
          style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' },
          iconTheme: { primary: '#D4AF37', secondary: '#111' },
        });
        return [...prev, productId];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(id => id !== productId));
    toast('Removed from Wishlist', {
      icon: '🤍',
      style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' }
    });
  };

  const isInWishlist = (productId) => wishlistItems.includes(productId);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
