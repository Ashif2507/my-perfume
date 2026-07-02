
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { getProductById } from '../data/products';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 text-center">
        <Heart className="h-16 w-16 mx-auto text-gray-600 mb-6" />
        <h2 className="font-serif text-3xl font-bold text-white tracking-wide mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-400 mb-8">Save your favorite fragrances to review later.</p>
        <Link to="/" className="btn-gold px-8 py-3 rounded-lg text-sm uppercase tracking-widest">
          Discover Fragrances
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10 space-y-3 text-left">
        <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 text-[10px] uppercase tracking-[0.25em] font-semibold">
          <Heart className="h-3.5 w-3.5" />
          <span>Saved Fragrances</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-wide">My Wishlist</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlistItems.map((id) => {
          const product = getProductById(id);
          if (!product) return null;

          return (
            <div key={id} className="group relative rounded-2xl overflow-hidden bg-luxury-card border border-white/5 flex flex-col p-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-luxury-accent/50 mb-5">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                
                <button
                  onClick={() => removeFromWishlist(id)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-luxury-dark/60 border border-white/10 text-gray-300 hover:text-rose-500 hover:border-rose-500/50 backdrop-blur-md transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">{product.type}</p>
                  <h3 className="font-serif text-lg font-semibold text-white">{product.name}</h3>
                  <p className="text-xl font-serif font-bold text-white mt-2">${product.price}.00</p>
                </div>

                <button
                  onClick={() => addToCart(id)}
                  className="w-full mt-4 bg-luxury-accent/50 border border-white/5 text-white hover:text-luxury-dark hover:bg-luxury-gold py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Move to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
