import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, allProductsData } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-white tracking-wide mb-4">Product Not Found</h2>
        <Link to="/" className="text-luxury-gold underline hover:text-luxury-goldlight">Return to Home</Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  
  // Find related products (same category, different ID)
  const related = allProductsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-20 min-h-screen bg-luxury-dark text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-xs text-gray-400 hover:text-luxury-gold uppercase tracking-widest transition-colors">
            <ArrowLeft className="h-3 w-3 mr-2" />
            Back to Collection
          </Link>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Image Gallery */}
          <div className="relative aspect-square rounded-2xl bg-luxury-accent/50 border border-white/5 overflow-hidden flex items-center justify-center p-8">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain filter drop-shadow-2xl"
            />
            {product.badge && (
              <span className={`absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-md font-bold shadow-md ${product.badgeColor || 'bg-luxury-gold text-luxury-dark'}`}>
                {product.badge}
              </span>
            )}
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
                isLiked ? 'bg-rose-600 border-rose-500 text-white' : 'bg-luxury-dark/60 border-white/10 text-gray-300 hover:text-rose-500'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-4 mb-8">
              <p className="text-xs tracking-widest uppercase text-luxury-gold font-bold">
                {product.type} {product.batch && `• ${product.batch}`}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center text-luxury-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating || 5) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span>{product.rating || '5.0'} ({product.reviews || '0'} reviews)</span>
              </div>

              <p className="text-3xl font-serif text-white font-semibold pt-2">
                ${product.price}.00
              </p>
            </div>

            <p className="text-gray-300 font-light leading-relaxed mb-8">
              {product.desc || product.description}
            </p>

            {product.notes && (
              <div className="bg-luxury-accent/30 border border-white/5 rounded-xl p-4 mb-8">
                <h4 className="text-xs uppercase tracking-widest font-bold text-luxury-gold mb-3">Scent Notes</h4>
                <p className="text-sm text-gray-300">{product.notes}</p>
              </div>
            )}

            {product.contents && (
              <div className="bg-luxury-accent/30 border border-white/5 rounded-xl p-4 mb-8">
                <h4 className="text-xs uppercase tracking-widest font-bold text-luxury-gold mb-3">Set Includes</h4>
                <ul className="space-y-1">
                  {product.contents.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-300">• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 items-end mb-8">
              <div className="w-24">
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Quantity</label>
                <div className="flex items-center justify-between bg-luxury-dark border border-white/10 rounded-lg p-2 text-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 hover:text-luxury-gold">-</button>
                  <span className="text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-2 hover:text-luxury-gold">+</button>
                </div>
              </div>
              
              <button 
                onClick={() => addToCart(product.id, quantity)}
                className="flex-grow btn-gold py-4 rounded-lg flex justify-center items-center gap-2 text-sm uppercase tracking-widest"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-luxury-gold mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Free Shipping</h5>
                  <p className="text-[10px] text-gray-400 mt-1">On all orders over $150</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-luxury-gold mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Authentic</h5>
                  <p className="text-[10px] text-gray-400 mt-1">Direct from Grasse, France</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-32 border-t border-white/5 pt-20">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max mx-auto text-[10px] uppercase tracking-[0.25em] font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Curated For You</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-wide">
                You May Also Like
              </h2>
              <p className="text-gray-400 font-light text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Explore similar fragrances from our exclusive collection.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map(item => (
                <Link to={`/product/${item.id}`} key={item.id} className="group block rounded-2xl overflow-hidden bg-luxury-card border border-white/5 p-4 glass-card-hover">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-luxury-accent/50 mb-5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">{item.type}</p>
                    <h3 className="font-serif text-lg font-medium text-white mt-1 group-hover:text-luxury-goldlight transition-colors">{item.name}</h3>
                    <p className="text-xl font-serif font-bold text-white mt-2">${item.price}.00</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
