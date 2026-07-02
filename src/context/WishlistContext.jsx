import { createContext, useContext, useState, useEffect } from 'react';
import { getProductById } from '../data/products';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('aura_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [sessionId] = useState(() => {
    let sid = localStorage.getItem('aura_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('aura_session_id', sid);
    }
    return sid;
  });

  // Fetch initial wishlist from Supabase
  useEffect(() => {
    async function fetchWishlist() {
      console.log('WishlistContext: Fetching initial wishlist for session', sessionId);
      try {
        const { data: wishlist } = await supabase.from('wishlists').select('id').eq('session_id', sessionId).single();
        if (wishlist) {
          const { data: items } = await supabase.from('wishlist_items').select('*').eq('wishlist_id', wishlist.id);
          if (items && items.length > 0) {
            console.log('WishlistContext: Fetched items from Supabase', items);
            setWishlistItems(items.map(i => i.product_id));
          } else {
            console.log('WishlistContext: Wishlist exists but is empty');
          }
        } else {
          console.log('WishlistContext: No wishlist found for session');
        }
      } catch (e) {
        console.error('WishlistContext: Error fetching wishlist from supabase', e);
      }
    }
    fetchWishlist();
  }, [sessionId]);

  // Sync to Supabase whenever wishlistItems change
  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlistItems));
    
    async function syncWishlist() {
      console.log('WishlistContext: Syncing wishlist to Supabase...', wishlistItems);
      try {
        let { data: wishlist } = await supabase.from('wishlists').select('id').eq('session_id', sessionId).single();
        if (!wishlist) {
          console.log('WishlistContext: Creating new wishlist for session');
          const { data: newWishlist } = await supabase.from('wishlists').insert({ session_id: sessionId }).select('id').single();
          wishlist = newWishlist;
        }
        if (wishlist) {
          await supabase.from('wishlist_items').delete().eq('wishlist_id', wishlist.id);
          if (wishlistItems.length > 0) {
            const itemsToInsert = wishlistItems.map(id => ({
              wishlist_id: wishlist.id,
              product_id: id
            }));
            await supabase.from('wishlist_items').insert(itemsToInsert);
            console.log('WishlistContext: Synced', itemsToInsert.length, 'items');
          } else {
            console.log('WishlistContext: Wishlist synced (empty)');
          }
        }
      } catch (e) {
        console.error('WishlistContext: Error syncing wishlist to supabase', e);
      }
    }
    
    const timeoutId = setTimeout(syncWishlist, 1000);
    return () => clearTimeout(timeoutId);
  }, [wishlistItems, sessionId]);

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

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  return useContext(WishlistContext);
}
