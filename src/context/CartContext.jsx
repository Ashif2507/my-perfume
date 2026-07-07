import { createContext, useContext, useState, useEffect } from 'react';
import { getProductById } from '../data/products';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('aura_cart');
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

  // Fetch initial cart from Supabase
  useEffect(() => {
    async function fetchCart() {
      console.log('CartContext: Fetching initial cart for session', sessionId);
      try {
        const { data: cart } = await supabase.from('carts').select('id').eq('session_id', sessionId).single();
        if (cart) {
          const { data: items } = await supabase.from('cart_items').select('*').eq('cart_id', cart.id);
          if (items && items.length > 0) {
            console.log('CartContext: Fetched cart items from Supabase', items);
            setCartItems(items.map(i => ({ id: i.product_id, quantity: i.quantity })));
          } else {
            console.log('CartContext: Cart exists but is empty');
          }
        } else {
          console.log('CartContext: No cart found for session');
        }
      } catch (e) {
        console.error('CartContext: Error fetching cart from supabase, using local fallback', e);
      }
    }
    fetchCart();
  }, [sessionId]);

  // Sync to Supabase whenever cartItems change
  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cartItems));
    
    async function syncCart() {
      console.log('CartContext: Syncing cart to Supabase...', cartItems);
      try {
        // Find or create cart
        let { data: cart } = await supabase.from('carts').select('id').eq('session_id', sessionId).single();
        if (!cart) {
          console.log('CartContext: Creating new cart for session');
          const { data: { user } } = await supabase.auth.getUser();
          const { data: newCart } = await supabase.from('carts').insert({ session_id: sessionId, user_id: user?.id || null }).select('id').single();
          cart = newCart;
        }
        if (cart) {
          // Simplest sync: delete all and re-insert (for small carts)
          await supabase.from('cart_items').delete().eq('cart_id', cart.id);
          if (cartItems.length > 0) {
            const itemsToInsert = cartItems.map(item => ({
              cart_id: cart.id,
              product_id: item.id,
              quantity: item.quantity
            }));
            await supabase.from('cart_items').insert(itemsToInsert);
            console.log('CartContext: Synced', itemsToInsert.length, 'items');
          } else {
            console.log('CartContext: Cart synced (empty)');
          }
        }
      } catch (e) {
        console.error('CartContext: Error syncing cart to supabase', e);
      }
    }
    
    // Only sync if there are changes, we can debounce this in a real app
    const timeoutId = setTimeout(syncCart, 1000);
    return () => clearTimeout(timeoutId);
  }, [cartItems, sessionId]);

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

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}
