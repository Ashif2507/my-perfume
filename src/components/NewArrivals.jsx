import { useState } from 'react';
import { Star, Heart, ShoppingCart, Sparkles, Check, Gift, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useSupabaseData } from '../hooks/useSupabaseData';
import floralImg from '../assets/images/perfume_floral.png';
import woodyImg from '../assets/images/perfume_woody.png';
import orientalImg from '../assets/images/perfume_oriental.png';
import freshImg from '../assets/images/perfume_fresh.png';

export default function NewArrivals() {
  const [addedItems, setAddedItems] = useState({});
  const [filterFamily, setFilterFamily] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // 1. Trending Perfumes Data
  const trendingPerfumes = [
    {
      id: 't1',
      name: "L'Élixir Rare",
      type: 'Extrait de Parfum',
      family: 'Woody',
      price: 210,
      rating: 4.9,
      reviews: 48,
      image: woodyImg,
      tag: 'Trending Scent',
      badgeColor: 'bg-luxury-gold text-luxury-dark',
      notes: 'Oud, Aged Patchouli, Sweet Saffron'
    },
    {
      id: 't2',
      name: 'Saffron Dusk',
      type: 'Eau de Parfum',
      family: 'Oriental',
      price: 185,
      rating: 4.8,
      reviews: 32,
      image: orientalImg,
      tag: 'Most Popular',
      badgeColor: 'bg-amber-950/80 text-amber-200 border border-amber-500/20',
      notes: 'Black Saffron, Cashmere Wood, Vetiver'
    },
    {
      id: 't3',
      name: 'Valkyrie Mist',
      type: 'Eau de Parfum',
      family: 'Fresh',
      price: 165,
      rating: 4.7,
      reviews: 21,
      image: freshImg,
      tag: 'Editor Choice',
      badgeColor: 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/20',
      notes: 'Salted Sage, Juniper Berry, Sea Moss'
    },
    {
      id: 't4',
      name: 'Jasmine Sauvage',
      type: 'Eau de Parfum',
      family: 'Floral',
      price: 190,
      rating: 4.9,
      reviews: 29,
      image: floralImg,
      tag: 'New Release',
      badgeColor: 'bg-purple-950/80 text-purple-200 border border-purple-500/20',
      notes: 'Night-blooming Jasmine, Neroli, Warm Amber'
    }
  ];

  // 2. Latest Collections Data
  const latestCollections = [
    {
      id: 'c1',
      title: 'The Obsidian Trilogy',
      subtitle: 'Premium Oud & Wood Cask Trio',
      description: 'A dark, complex journey exploring the rich, resinous undertones of aged agarwood, leather, and smoked cedar. Features three 30ml extraits.',
      price: 380,
      image: woodyImg,
      items: ['Oud Absolute', 'Smoked Cedar', 'Leather Accord'],
      badge: 'Signature Box'
    },
    {
      id: 'c2',
      title: 'Summer in Grasse Trio',
      subtitle: 'Sun-drenched Florals & Citrus',
      description: 'Capturing the vibrant energy of the French Riviera. Bright bergamot combined with fresh hand-picked centifolia roses and clean lavender.',
      price: 290,
      image: freshImg,
      items: ['Centifolia Rose', 'Riviera Bergamot', 'Wild Lavender'],
      badge: 'Limited Run'
    },
    {
      id: 'c3',
      title: 'Niche Discovery Set',
      subtitle: 'Curated Scent Explorers Kit',
      description: 'Unveil your signature scent. An interactive sample suite containing five 2ml glass vials of our most popular new releases, plus a $30 credit.',
      price: 85,
      image: floralImg,
      items: ['5 Mini Vials', 'Scent Profile Card', '$30 Store Voucher'],
      badge: 'Best Value'
    }
  ];

  // 3. Limited Edition Fragrances (High luxury, serialized)
  const limitedEditions = [
    {
      id: 'le1',
      name: 'Aura Absolue Imperial',
      type: 'Grand Extrait',
      price: 450,
      batch: 'Batch No. 08 / 150',
      description: 'Matured for 36 months, featuring pure edible gold leaf flakes floating in rich jasmine sambac absolute and rare white truffle oil. Housed in a hand-cut lead crystal decanter.',
      image: orientalImg,
      rarity: 'Only 150 bottles worldwide',
      notes: 'White Truffle, Gold Jasmine, Aged Mysore Sandalwood'
    },
    {
      id: 'le2',
      name: 'Nuit Étoilée Extrait',
      type: 'Concentrated Nectar',
      price: 520,
      batch: 'Batch No. 42 / 200',
      description: 'An ethereal nocturnal blend utilizing night-blooming cereus flowers that only open once a year, blended with dark frankincense and rich Madagascar vanilla beans.',
      image: floralImg,
      rarity: 'Only 200 bottles worldwide',
      notes: 'Queen of the Night, Royal Frankincense, Pure Vanilla Pod'
    }
  ];

  const handleFavoriteToggle = (productId) => {
    toggleWishlist(productId);
  };

  const handleAddToCartClick = (productId) => {
    addToCart(productId);
    setAddedItems(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  const allNewArrivalsFallback = [...trendingPerfumes, ...latestCollections, ...limitedEditions];
  const { data: fetchedProducts } = useSupabaseData('products', allNewArrivalsFallback);

  const displayTrending = fetchedProducts.filter(p => 
    ['t1', 't2', 't3', 't4', 'p9', 'p10', 'p11', 'p12'].includes(p.id) || 
    ['Trending Scent', 'Most Popular', 'Editor Choice', 'New Release'].includes(p.tag) || 
    ['Trending Scent', 'Editor Choice', '❤ Most Gifted', '❤ Most Reviewed'].includes(p.badge)
  );
  const displayCollections = fetchedProducts.filter(p => ['c1', 'c2', 'c3'].includes(p.id) || p.badge === 'Signature Box' || p.badge === 'Limited Run' || p.badge === 'Best Value');
  const displayLimited = fetchedProducts.filter(p => ['le1', 'le2'].includes(p.id) || p.type === 'Grand Extrait' || p.type === 'Concentrated Nectar');

  // Filtering logic
  const filteredTrending = displayTrending.filter(item => {
    const matchesFamily = filterFamily === 'All' || item.family === filterFamily;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFamily && matchesSearch;
  });

  return (
    <div className="pt-20 min-h-screen bg-luxury-dark text-gray-100 font-sans selection:bg-luxury-gold selection:text-luxury-dark">
      {/* 1. Header Banner */}
      <section className="relative py-20 overflow-hidden border-b border-luxury-gold/10 bg-radial-gradient">
        {/* Subtle gold radial background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max mx-auto text-[10px] uppercase tracking-[0.25em] font-semibold animate-fade-in-up">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>Seasonal Releases</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white tracking-wide animate-fade-in-up">
            The New <span className="text-luxury-gold">Arrivals</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm sm:text-base leading-relaxed animate-fade-in-up">
            Unveiling our newest olfactory masterpieces. Handcrafted in Grasse, aged to perfection, and designed to define your personal sensory identity.
          </p>

          {/* Interactive Search & Scent Family Filter */}
          <div className="max-w-4xl mx-auto pt-8 flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in-up">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search new arrivals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-luxury-accent/60 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
            </div>

            {/* Scent Family Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {['All', 'Floral', 'Woody', 'Fresh', 'Oriental'].map((family) => (
                <button
                  key={family}
                  onClick={() => setFilterFamily(family)}
                  className={`px-4 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300 ${
                    filterFamily === family
                      ? 'bg-luxury-gold text-luxury-dark font-medium shadow-md shadow-luxury-gold/10'
                      : 'bg-luxury-accent/40 border border-white/5 text-gray-400 hover:text-white hover:bg-luxury-accent/80'
                  }`}
                >
                  {family}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trending Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 text-luxury-gold mb-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">Capturing Attention</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white">
              Trending Perfumes
            </h2>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-light max-w-xs md:max-w-md text-left md:text-right mt-2 md:mt-0">
            Highly requested fragrances capturing hearts this season with signature scent profiles.
          </p>
        </div>

        {filteredTrending.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredTrending.map((product) => (
              <div 
                key={product.id}
                className="group relative rounded-2xl overflow-hidden bg-luxury-card border border-white/5 flex flex-col justify-between p-4 glass-card-hover"
              >
                {/* Media Section */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-luxury-accent/50 mb-6">
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Badge */}
                  {(product.tag || product.badge) && (
                    <span className={`absolute top-3 left-3 z-10 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md font-bold shadow-md ${product.badgeColor || 'bg-luxury-gold text-luxury-dark'}`}>
                      {product.tag || product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button 
                    onClick={() => handleFavoriteToggle(product.id)}
                    className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
                      isInWishlist(product.id) 
                        ? 'bg-rose-600 border-rose-500 text-white' 
                        : 'bg-luxury-dark/60 border-white/10 text-gray-300 hover:text-rose-500 hover:border-rose-500/50'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`h-4.5 w-4.5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Hover Overlay Quick Add */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-luxury-dark/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                    <button
                      onClick={() => handleAddToCartClick(product.id)}
                      className="btn-gold flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg text-xs uppercase tracking-widest cursor-pointer"
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

                {/* Details Section */}
                <div className="flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-start">
                      <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">
                        {product.type}
                      </p>
                      <span className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400">
                        {product.family}
                      </span>
                    </div>

                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-serif text-lg font-medium text-white group-hover:text-luxury-goldlight transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-xs text-gray-400 font-light line-clamp-1 italic">
                      Notes: {product.notes}
                    </p>

                    {/* Rating */}
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

                  {/* Pricing and Action */}
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
        ) : (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-luxury-card/30">
            <p className="text-gray-400 font-light text-sm">No new arrivals match your current filters.</p>
            <button 
              onClick={() => { setFilterFamily('All'); setSearchQuery(''); }}
              className="mt-4 text-xs text-luxury-gold hover:text-luxury-goldlight tracking-widest uppercase font-medium underline font-sans"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 3. Latest Collections Section */}
      <section className="py-20 bg-luxury-accent/10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="text-left">
              <div className="inline-flex items-center space-x-2 text-luxury-gold mb-2">
                <Gift className="h-4 w-4" />
                <span className="text-xs uppercase tracking-widest font-semibold">Curation Series</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white">
                Latest Collections
              </h2>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm font-light max-w-xs md:max-w-md text-left md:text-right mt-2 md:mt-0">
              Immerse yourself in thematic scent experiences, packaged as premium sets perfect for signature collections or bespoke gifts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayCollections.map((collection) => (
              <div 
                key={collection.id}
                className="group flex flex-col justify-between rounded-2xl bg-luxury-card border border-white/5 overflow-hidden transition-all duration-300 hover:border-luxury-gold/25"
              >
                {/* Media cover */}
                <div className="relative h-56 overflow-hidden bg-luxury-accent">
                  <Link to={`/product/${collection.id}`} className="block w-full h-full">
                    <img 
                      src={collection.image} 
                      alt={collection.title}
                      className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500 opacity-60 group-hover:opacity-85"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-card via-luxury-card/30 to-transparent pointer-events-none" />
                  
                  <span className="absolute top-4 left-4 z-10 text-[9px] uppercase tracking-widest font-bold bg-luxury-gold text-luxury-dark px-2.5 py-1 rounded shadow-md">
                    {collection.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <span className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold">
                      {collection.subtitle}
                    </span>
                    <Link to={`/product/${collection.id}`}>
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-luxury-goldlight transition-colors">
                        {collection.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {collection.description}
                    </p>

                    {/* Includes List */}
                    <div className="pt-3">
                      <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-2">Collection Includes:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {collection.items.map((item, idx) => (
                          <span 
                            key={idx} 
                            className="text-[10px] bg-luxury-accent/80 border border-white/5 rounded-md px-2.5 py-1 text-gray-300 font-light"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                    <div className="text-left">
                      <p className="text-[9px] uppercase text-gray-500">Suite Value Price</p>
                      <span className="text-2xl font-serif font-bold text-white">${collection.price}.00</span>
                    </div>

                    <button 
                      onClick={() => handleAddToCartClick(collection.id)}
                      className="btn-gold flex items-center space-x-2 text-xs uppercase tracking-widest px-4 py-2.5 rounded-lg cursor-pointer"
                    >
                      {addedItems[collection.id] ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <span>Add Collection</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Limited Edition Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 text-luxury-gold mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">Exclusivity Defined</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white">
              Limited Edition Fragrances
            </h2>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-light max-w-xs md:max-w-md text-left md:text-right mt-2 md:mt-0">
            Rare extraits in handcrafted bottles. Individually serialized and strictly restricted in quantity. Once sold out, they will not be re-released.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {displayLimited.map((edition) => (
            <div 
              key={edition.id}
              className="group relative rounded-3xl p-1 bg-gradient-to-br from-luxury-gold/20 via-transparent to-white/5 transition-all duration-500 hover:from-luxury-gold/50"
            >
              <div className="rounded-[22px] bg-luxury-accent/90 backdrop-blur-md p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center">
                {/* Media area */}
                <div className="relative w-40 h-40 flex-shrink-0 bg-luxury-dark/40 border border-white/5 rounded-2xl overflow-hidden p-2 flex items-center justify-center">
                  <Link to={`/product/${edition.id}`} className="block w-full h-full">
                    <img 
                      src={edition.image} 
                      alt={edition.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="absolute top-2 left-2 bg-rose-600/90 text-white text-[8px] uppercase tracking-wider font-bold px-2 py-0.5 rounded pointer-events-none">
                    Rare
                  </div>
                </div>

                {/* Details */}
                <div className="flex-grow text-left space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <span className="text-[10px] text-luxury-gold font-bold tracking-widest uppercase">
                      {edition.type}
                    </span>
                    <span className="text-xs font-mono bg-luxury-gold/10 border border-luxury-gold/25 px-2 py-0.5 rounded text-luxury-gold">
                      {edition.batch}
                    </span>
                  </div>

                  <Link to={`/product/${edition.id}`}>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-luxury-goldlight transition-colors">
                      {edition.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {edition.description}
                  </p>

                  <div className="bg-luxury-dark/50 border border-white/5 rounded-lg p-2.5 text-[10px] text-gray-300">
                    <span className="text-luxury-gold font-medium">Notes:</span> {edition.notes}
                  </div>

                  <div className="text-[10px] font-medium text-emerald-400 flex items-center space-x-1">
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping mr-1" />
                    <span>{edition.rarity}</span>
                  </div>

                  {/* Price & Cart button */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-2xl font-serif font-bold text-white">
                      ${edition.price}.00
                    </span>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleFavoriteToggle(edition.id)}
                        className={`p-2.5 rounded-lg border transition-all duration-300 ${
                          isInWishlist(edition.id) 
                            ? 'bg-rose-600 border-rose-500 text-white' 
                            : 'bg-luxury-dark/40 border-white/5 text-gray-300 hover:text-rose-500'
                        }`}
                        aria-label="Add to wishlist"
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(edition.id) ? 'fill-current text-white' : ''}`} />
                      </button>

                      <button
                        onClick={() => handleAddToCartClick(edition.id)}
                        className="btn-gold flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-widest cursor-pointer"
                      >
                        {addedItems[edition.id] ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4" />
                            <span>Secure Bottle</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Safe Checkout Info Banner */}
      <section className="bg-luxury-accent/25 border-y border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <ShieldCheck className="h-6 w-6 text-luxury-gold" />
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">256-Bit SSL Encryption</h4>
            <p className="text-[11px] text-gray-400 font-light">Your private transactions and checkout details are fully secured.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Sparkles className="h-6 w-6 text-luxury-gold" />
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">100% Authenticity Guaranteed</h4>
            <p className="text-[11px] text-gray-400 font-light">All fragrances are certified authentic directly from the house of Grasse.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Gift className="h-6 w-6 text-luxury-gold" />
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Bespoke Gifting Wrap</h4>
            <p className="text-[11px] text-gray-400 font-light">Every order is shipped in our signature wax-sealed luxury box.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
