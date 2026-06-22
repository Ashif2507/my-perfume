import React, { useState } from 'react';
import { Sparkles, Gift, Star, Heart, ShoppingCart, Check, ShieldCheck, Search, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import floralImg from '../assets/images/perfume_floral.png';
import woodyImg from '../assets/images/perfume_woody.png';
import orientalImg from '../assets/images/perfume_oriental.png';
import freshImg from '../assets/images/perfume_fresh.png';

export default function GiftSets({ onAddToCart, onAddToWishlist }) {
  const [favorites, setFavorites] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Gift Sets data
  const giftSetsData = [
    {
      id: 'g1',
      name: "The Obsidian Gentleman's Suite",
      category: "Men's",
      price: 220,
      valuePrice: 285,
      rating: 4.9,
      reviews: 36,
      image: woodyImg,
      badge: 'Bestseller',
      badgeColor: 'bg-luxury-gold text-luxury-dark',
      contents: ['100ml Sandalwood Noir Extrait', '75ml Scented Aftershave Balm', '10ml Travel Atomizer'],
      notes: 'Oud, Leather, Smoked Cedar, Patchouli',
      description: 'A deeply masculine, resinous exploration of luxury. Packaged in a velvet-lined matte black lacquer box with gold embossed accents.'
    },
    {
      id: 'g2',
      name: 'Riviera Citrus Voyage Set',
      category: "Men's",
      price: 145,
      valuePrice: 190,
      rating: 4.7,
      reviews: 18,
      image: freshImg,
      badge: 'Fresh Choice',
      badgeColor: 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/20',
      contents: ['100ml Citrus Splash Eau de Cologne', '150ml Hydrating Body Wash', 'Vegan Leather Travel Pouch'],
      notes: 'Bergamot, Lime Leaf, Vetiver, White Amber',
      description: 'Capturing the vibrant salt air and citrus groves of the French Riviera. A lightweight, refreshing scent layer set perfect for summer.'
    },
    {
      id: 'g3',
      name: 'Jasmine & Rose Velvet Duet',
      category: "Women's",
      price: 240,
      valuePrice: 310,
      rating: 5.0,
      reviews: 42,
      image: floralImg,
      badge: 'Highly Coveted',
      badgeColor: 'bg-purple-950/80 text-purple-200 border border-purple-500/20',
      contents: ['100ml Aura Rose D\'Or Eau de Parfum', '200ml Night-Blooming Jasmine Body Cream', 'Wax-Sealed Scented Candle'],
      notes: 'Centifolia Rose, Neroli, Night Jasmine, Warm Amber',
      description: 'A romantic floral symphony. Housed in a circular, gold-wrapped hatbox lined with heavy premium silk lining.'
    },
    {
      id: 'g4',
      name: 'Ambre Mystique Luxury Treasure',
      category: "Women's",
      price: 195,
      valuePrice: 250,
      rating: 4.8,
      reviews: 25,
      image: orientalImg,
      badge: 'Limited Run',
      badgeColor: 'bg-amber-950/80 text-amber-200 border border-amber-500/20',
      contents: ['100ml Amber Oud Mystique', '30ml Nourishing Silk Body Oil', 'Collectible Crystal Scent Dipper'],
      notes: 'Black Saffron, Cashmere Wood, Warm Amber, Vetiver',
      description: 'An opulent, oriental treasure box. Rich, lingering textures designed to leave a sophisticated, velvet trail.'
    },
    {
      id: 'g5',
      name: 'The Sovereign Masterpiece Chest',
      category: 'Luxury',
      price: 550,
      valuePrice: 720,
      rating: 5.0,
      reviews: 14,
      image: orientalImg,
      badge: 'VVIP Exclusive',
      badgeColor: 'bg-rose-950 text-rose-200 border border-rose-500/20',
      contents: ['100ml Aura Absolue Imperial (Gold Flakes)', '100ml Nuit Étoilée Grand Extrait', 'Heavy Crystal Decanter Stopper', 'VIP Boutique Consultation Pass'],
      notes: 'Jasmine Absolute, White Truffle, Mysore Sandalwood, Frankincense',
      description: 'The pinnacle of olfactory luxury. Hand-assembled walnut wood chest with antique brass hinges. Strictly limited production.'
    },
    {
      id: 'g6',
      name: 'Niche Scent Discovery Vault',
      category: 'Luxury',
      price: 180,
      valuePrice: 220,
      rating: 4.9,
      reviews: 58,
      image: floralImg,
      badge: 'Perfect Gift',
      badgeColor: 'bg-blue-950/85 text-blue-200 border border-blue-500/20',
      contents: ['10 x 3ml Miniature Extrait Vials', 'Handmade Scent Profile Journal', 'Gilded Custom Monogram Pen', '$50 Full-Bottle Credit Card'],
      notes: 'An exhaustive library of all AURA fragrance profiles',
      description: 'The ultimate interactive gift. Sample ten signature creations at leisure, with a voucher included to purchase their full-size favorite.'
    }
  ];

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

  // Filter logic
  const filteredSets = giftSetsData.filter(set => {
    const matchesCategory = activeCategory === 'All' || set.category === activeCategory;
    const matchesSearch = set.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          set.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          set.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          set.contents.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20 min-h-screen bg-luxury-dark text-gray-100 font-sans selection:bg-luxury-gold selection:text-luxury-dark">
      
      {/* 1. Header Banner */}
      <section className="relative py-20 overflow-hidden border-b border-luxury-gold/10 bg-radial-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 text-luxury-gold border border-luxury-gold/30 px-3 py-1 rounded-full bg-luxury-gold/5 animate-fade-in-up">
            <Gift className="h-4.5 w-4.5 animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Wax-Sealed Packaging</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight animate-fade-in-up">
            Exquisite <span className="text-luxury-gold">Gift Sets</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm sm:text-base leading-relaxed animate-fade-in-up">
            Celebrate life’s finest moments with our curated pairing suites. Indulge loved ones in layers of our finest extraits, rich body creams, and bespoke accessories.
          </p>

          {/* Interactive Search & Category Filter */}
          <div className="max-w-4xl mx-auto pt-8 flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in-up">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search contents or scent notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-luxury-accent/60 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {['All', "Men's", "Women's", 'Luxury'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-luxury-gold text-luxury-dark font-medium shadow-md shadow-luxury-gold/10'
                      : 'bg-luxury-accent/40 border border-white/5 text-gray-400 hover:text-white hover:bg-luxury-accent/80'
                  }`}
                >
                  {cat === 'All' ? 'All Gift Sets' : `${cat} Sets`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Gift Sets Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredSets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredSets.map((set) => (
              <div 
                key={set.id}
                className="group relative rounded-3xl overflow-hidden bg-luxury-card border border-white/5 flex flex-col justify-between p-5 glass-card-hover"
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-luxury-accent/50 mb-6">
                  <Link to={`/product/${set.id}`} className="block w-full h-full">
                    <img 
                      src={set.image} 
                      alt={set.name} 
                      className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500 opacity-70 group-hover:opacity-90"
                    />
                  </Link>

                  {/* Badge */}
                  <span className={`absolute top-4 left-4 z-10 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md font-bold shadow-md ${set.badgeColor}`}>
                    {set.badge}
                  </span>

                  {/* Wishlist Button */}
                  <button 
                    onClick={() => handleFavoriteToggle(set.id)}
                    className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
                      favorites[set.id] 
                        ? 'bg-rose-600 border-rose-500 text-white' 
                        : 'bg-luxury-dark/60 border-white/10 text-gray-300 hover:text-rose-500 hover:border-rose-500/50'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`h-4.5 w-4.5 ${favorites[set.id] ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Details Section */}
                <div className="flex-grow flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    {/* Header info */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
                        {set.category} Fragrance Suite
                      </span>
                      {set.valuePrice && (
                        <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                          Save ${set.valuePrice - set.price} (Worth ${set.valuePrice})
                        </span>
                      )}
                    </div>

                    <Link to={`/product/${set.id}`}>
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-luxury-goldlight transition-colors">
                        {set.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {set.description}
                    </p>

                    {/* Scent notes */}
                    <div className="bg-luxury-dark/60 border border-white/5 rounded-lg p-2.5 text-[10px] text-gray-300">
                      <span className="text-luxury-gold font-semibold">Scent Notes:</span> {set.notes}
                    </div>

                    {/* Contents list */}
                    <div className="pt-2">
                      <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-2">Set Includes:</p>
                      <ul className="space-y-1.5">
                        {set.contents.map((item, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-[11px] text-gray-300 font-light">
                            <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center space-x-1.5 pt-2">
                      <div className="flex text-luxury-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(set.rating) ? 'fill-current' : ''}`} 
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {set.rating} ({set.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                    <span className="text-2xl font-serif font-bold text-white">
                      ${set.price}.00
                    </span>

                    <button
                      onClick={() => handleAddToCartClick(set.id)}
                      className="btn-gold flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest cursor-pointer"
                    >
                      {addedItems[set.id] ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          <span>Gift This Set</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-luxury-card/30">
            <p className="text-gray-400 font-light text-sm">No curated gift sets match your current filters.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 text-xs text-luxury-gold hover:text-luxury-goldlight tracking-widest uppercase font-medium underline font-sans"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 3. Gifting Guarantee Banner */}
      <section className="bg-luxury-accent/25 border-y border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Gift className="h-6 w-6 text-luxury-gold" />
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Complimentary Wax Wrapping</h4>
            <p className="text-[11px] text-gray-400 font-light">Every gift suite is sent in our signature textured boxes, wax-sealed by hand.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Sparkles className="h-6 w-6 text-luxury-gold" />
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Custom Monogram Cards</h4>
            <p className="text-[11px] text-gray-400 font-light">Include a bespoke calligraphy note. Enter details during premium checkout.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <ShieldCheck className="h-6 w-6 text-luxury-gold" />
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Fragrance Exchange Guarantee</h4>
            <p className="text-[11px] text-gray-400 font-light">Includes an unopened 2ml sample vial of each fragrance so they can test it first.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
