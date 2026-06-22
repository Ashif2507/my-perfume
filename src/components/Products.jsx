import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import floralImg from '../assets/images/perfume_floral.png';
import woodyImg from '../assets/images/perfume_woody.png';
import orientalImg from '../assets/images/perfume_oriental.png';
import freshImg from '../assets/images/perfume_fresh.png';

export default function Products({ onAddToCart, onAddToWishlist }) {
  const [activeTab, setActiveTab] = useState('bestsellers');
  const [favorites, setFavorites] = useState({});
  const [addedItems, setAddedItems] = useState({});

  const productsData = {
    bestsellers: [
      {
        id: 'p1',
        name: "Aura Rose D'Or",
        type: 'Eau de Parfum',
        price: 145,
        rating: 4.9,
        reviews: 124,
        image: floralImg,
        tag: 'Bestseller',
        badgeColor: 'bg-luxury-gold text-luxury-dark'
      },
      {
        id: 'p2',
        name: 'Amber Oud Mystique',
        type: 'Extrait de Parfum',
        price: 195,
        rating: 5.0,
        reviews: 86,
        image: orientalImg,
        tag: 'Premium Scent',
        badgeColor: 'bg-purple-900/80 text-purple-200 border border-purple-500/20'
      },
      {
        id: 'p3',
        name: 'Sandalwood Noir',
        type: 'Eau de Parfum',
        price: 160,
        rating: 4.8,
        reviews: 98,
        image: woodyImg,
        tag: 'Cozy Musk',
        badgeColor: 'bg-amber-950/80 text-amber-200 border border-amber-500/20'
      },
      {
        id: 'p4',
        name: 'Citrus Splash',
        type: 'Eau de Cologne',
        price: 115,
        rating: 4.7,
        reviews: 54,
        image: freshImg,
        tag: 'Fresh Blend',
        badgeColor: 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/20'
      }
    ],
    arrivals: [
      {
        id: 'p5',
        name: 'Bergamot Horizon',
        type: 'Eau de Toilette',
        price: 125,
        rating: 4.6,
        reviews: 12,
        image: freshImg,
        tag: 'New Release',
        badgeColor: 'bg-emerald-500 text-luxury-dark'
      },
      {
        id: 'p6',
        name: 'Vanilla Infusion',
        type: 'Extrait de Parfum',
        price: 185,
        rating: 4.9,
        reviews: 24,
        image: orientalImg,
        tag: 'New Release',
        badgeColor: 'bg-emerald-500 text-luxury-dark'
      }
    ],
    trending: [
      {
        id: 'p7',
        name: 'Imperial Vetiver',
        type: 'Eau de Parfum',
        price: 175,
        rating: 4.9,
        reviews: 62,
        image: woodyImg,
        tag: 'Trending Now',
        badgeColor: 'bg-blue-600 text-white'
      },
      {
        id: 'p8',
        name: 'Peony Velvet',
        type: 'Eau de Parfum',
        price: 150,
        rating: 4.8,
        reviews: 43,
        image: floralImg,
        tag: 'Trending Now',
        badgeColor: 'bg-blue-600 text-white'
      }
    ]
  };

  const handleFavoriteToggle = (productId) => {
    const newFavs = { ...favorites, [productId]: !favorites[productId] };
    setFavorites(newFavs);
    if (newFavs[productId]) {
      onAddToWishlist(1);
    } else {
      onAddToWishlist(-1);
    }
  };

  const handleAddToCartClick = (productId) => {
    onAddToCart();
    setAddedItems(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  return (
    <section id="products" className="py-24 bg-luxury-accent/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-left mb-6 md:mb-0">
            <div className="inline-flex items-center space-x-2 text-luxury-gold mb-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">Exquisite Selection</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-white">
              Curated Fragrances
            </h2>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 border-b border-white/5 pb-1 self-start md:self-end">
            {['bestsellers', 'arrivals', 'trending'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-semibold transition-all duration-300 relative ${
                  activeTab === tab ? 'text-luxury-gold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'bestsellers' && 'Bestsellers'}
                {tab === 'arrivals' && 'New Arrivals'}
                {tab === 'trending' && 'Trending Now'}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-luxury-gold animate-fade-in"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productsData[activeTab].map((product) => (
            <div 
              key={product.id}
              className="group relative rounded-2xl overflow-hidden bg-luxury-card border border-white/5 flex flex-col justify-between p-4 glass-card-hover"
            >
              
              {/* Product Media Area */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-luxury-accent/50 mb-6">
                
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Badge Tag */}
                <span className={`absolute top-3 left-3 z-10 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md font-bold shadow-md ${product.badgeColor}`}>
                  {product.tag}
                </span>

                {/* Wishlist Toggle Button */}
                <button 
                  onClick={() => handleFavoriteToggle(product.id)}
                  className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
                    favorites[product.id] 
                      ? 'bg-rose-600 border-rose-500 text-white' 
                      : 'bg-luxury-dark/60 border-white/10 text-gray-300 hover:text-rose-500 hover:border-rose-500/50'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`h-4.5 w-4.5 ${favorites[product.id] ? 'fill-current' : ''}`} />
                </button>

                {/* Quick Add overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-luxury-dark/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                  <button
                    onClick={() => handleAddToCartClick(product.id)}
                    className="btn-gold flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg text-xs uppercase tracking-widest"
                  >
                    {addedItems[product.id] ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Product Info Area */}
              <div className="flex-grow flex flex-col justify-between">
                
                {/* Meta details */}
                <div className="space-y-1.5 text-left">
                  <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">
                    {product.type}
                  </p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-lg font-medium text-white group-hover:text-luxury-goldlight transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Rating Block */}
                  <div className="flex items-center space-x-1.5 pt-1">
                    <div className="flex text-luxury-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Price and Cart Integration */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
                  <span className="text-xl font-serif font-bold text-white">
                    ${product.price}.00
                  </span>
                  
                  <button
                    onClick={() => handleAddToCartClick(product.id)}
                    className={`p-2 rounded-lg transition-all duration-300 border ${
                      addedItems[product.id]
                        ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-luxury-accent/50 border-white/5 text-gray-300 hover:text-luxury-gold hover:border-luxury-gold/50'
                    }`}
                    aria-label="Add to cart"
                  >
                    {addedItems[product.id] ? <Check className="h-4.5 w-4.5" /> : <ShoppingCart className="h-4.5 w-4.5" />}
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
