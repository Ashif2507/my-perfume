import React, { useState } from 'react';
import { Sparkles, Star, Heart, ShoppingCart, Check, ShieldCheck, TrendingUp, Award, Users, Filter, Search, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import floralImg from '../assets/images/perfume_floral.png';
import woodyImg from '../assets/images/perfume_woody.png';
import orientalImg from '../assets/images/perfume_oriental.png';
import freshImg from '../assets/images/perfume_fresh.png';

export default function BestSellers() {
  const [addedItems, setAddedItems] = useState({});
  const [activeSection, setActiveSection] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // ── 1. Top Rated Perfumes ──────────────────────────────────────────────────
  const topRated = [
    {
      id: 'tr1',
      name: 'Amber Oud Mystique',
      type: 'Extrait de Parfum',
      price: 195,
      rating: 5.0,
      reviews: 312,
      image: orientalImg,
      badge: '★ 5.0 Perfect Score',
      badgeColor: 'bg-luxury-gold text-luxury-dark',
      notes: 'Ambergris, Aged Oud, Saffron, Rose Absolute',
      desc: 'The rarest oriental treasure in our vault. Skin-hugging, hypnotic, and universally adored.',
      section: 'Top Rated'
    },
    {
      id: 'tr2',
      name: "Aura Rose D'Or",
      type: 'Eau de Parfum',
      price: 145,
      rating: 4.9,
      reviews: 268,
      image: floralImg,
      badge: '★ 4.9 Editor Award',
      badgeColor: 'bg-purple-950/80 text-purple-200 border border-purple-500/20',
      notes: 'Centifolia Rose, Bulgarian Iris, Warm Musk',
      desc: 'Our signature rose accord — rich, powdery-clean, and utterly timeless.',
      section: 'Top Rated'
    },
    {
      id: 'tr3',
      name: 'Imperial Vetiver',
      type: 'Eau de Parfum',
      price: 175,
      rating: 4.9,
      reviews: 196,
      image: woodyImg,
      badge: '★ 4.9 Masterwork',
      badgeColor: 'bg-amber-950/80 text-amber-200 border border-amber-500/20',
      notes: 'Haitian Vetiver, Oakmoss, Smoked Birch, Cedar',
      desc: 'A bold, rooty masterwork for those who appreciate the raw poetry of the earth.',
      section: 'Top Rated'
    },
    {
      id: 'tr4',
      name: 'Vanilla Infusion',
      type: 'Extrait de Parfum',
      price: 185,
      rating: 4.9,
      reviews: 224,
      image: orientalImg,
      badge: '★ 4.9 Crowd Darling',
      badgeColor: 'bg-rose-950/80 text-rose-200 border border-rose-500/20',
      notes: 'Tahitian Vanilla, Labdanum, Tonka Bean, Sandalwood',
      desc: 'Irresistibly warm and gourmand — the scent equivalent of a cashmere embrace.',
      section: 'Top Rated'
    }
  ];

  // ── 2. Most Popular Fragrances ─────────────────────────────────────────────
  const mostPopular = [
    {
      id: 'mp1',
      name: 'Sandalwood Noir',
      type: 'Eau de Parfum',
      price: 160,
      rating: 4.8,
      reviews: 184,
      sold: '2,800+ sold',
      image: woodyImg,
      badge: '🔥 Trending #1',
      badgeColor: 'bg-orange-950/80 text-orange-200 border border-orange-500/20',
      notes: 'Mysore Sandalwood, Black Pepper, Dark Leather, Amber',
      desc: 'Consistently our fastest-selling Eau de Parfum. Rich, approachable, and endlessly wearable.',
      section: 'Most Popular'
    },
    {
      id: 'mp2',
      name: 'Citrus Splash',
      type: 'Eau de Cologne',
      price: 115,
      rating: 4.7,
      reviews: 141,
      sold: '2,200+ sold',
      image: freshImg,
      badge: '🔥 Trending #2',
      badgeColor: 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/20',
      notes: 'Italian Bergamot, Green Lime, Sea Accord, White Musk',
      desc: 'The ultimate crowd-pleaser — a sparkling, effortless scent loved by over two thousand happy customers.',
      section: 'Most Popular'
    },
    {
      id: 'mp3',
      name: 'Bergamot Horizon',
      type: 'Eau de Toilette',
      price: 125,
      rating: 4.6,
      reviews: 99,
      sold: '1,600+ sold',
      image: freshImg,
      badge: '🔥 Trending #3',
      badgeColor: 'bg-blue-950/80 text-blue-200 border border-blue-500/20',
      notes: 'Bergamot, Cardamom, Driftwood, Vetiver',
      desc: 'Clean, adventurous, and endlessly wearable — made for those who want to leave a lasting impression.',
      section: 'Most Popular'
    }
  ];

  // ── 3. Customer Favorites ──────────────────────────────────────────────────
  const customerFavorites = [
    {
      id: 'cf1',
      name: 'Peony Velvet',
      type: 'Eau de Parfum',
      price: 150,
      rating: 4.8,
      reviews: 203,
      repurchaseRate: '74% repurchase rate',
      image: floralImg,
      badge: '❤ Customer #1 Pick',
      badgeColor: 'bg-rose-600 text-white',
      notes: 'Pink Peony, Fresh Violet, White Amber, Skin Musk',
      desc: 'Voted #1 in our annual customer survey — soft, romantic, and perfect for all day wear.',
      quote: '"I\'ve bought this four times. It\'s simply my life scent." — Priya R.',
      section: 'Customer Favorites'
    },
    {
      id: 'cf2',
      name: 'Saffron Dusk',
      type: 'Eau de Parfum',
      price: 185,
      rating: 4.8,
      reviews: 178,
      repurchaseRate: '68% repurchase rate',
      image: orientalImg,
      badge: '❤ Most Gifted',
      badgeColor: 'bg-luxury-gold text-luxury-dark',
      notes: 'Saffron, Cedarwood, Warm Amber, Cashmere',
      desc: 'Our single most-gifted fragrance. Rich, warm, and perfect for making someone feel truly special.',
      quote: '"Gifted this to my mother. She cried. Enough said." — James T.',
      section: 'Customer Favorites'
    },
    {
      id: 'cf3',
      name: 'Jasmine Sauvage',
      type: 'Eau de Parfum',
      price: 190,
      rating: 4.9,
      reviews: 159,
      repurchaseRate: '71% repurchase rate',
      image: floralImg,
      badge: '❤ Most Reviewed',
      badgeColor: 'bg-purple-600 text-white',
      notes: 'Night Jasmine, Clementine, Neroli, White Oud',
      desc: 'The most written-about fragrance on our platform. Complex, feminine-forward, utterly captivating.',
      quote: '"Smells expensive in the best possible way. Heads turn constantly." — Sofia M.',
      section: 'Customer Favorites'
    }
  ];

  const allProducts = [...topRated, ...mostPopular, ...customerFavorites];

  const handleFavoriteToggle = (id) => {
    toggleWishlist(id);
  };

  const handleAddToCartClick = (id) => {
    addToCart(id);
    setAddedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [id]: false })), 2000);
  };

  const filteredProducts = allProducts.filter(item => {
    const matchSection = activeSection === 'All' || item.section === activeSection;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      || item.notes.toLowerCase().includes(searchQuery.toLowerCase())
      || item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSection && matchSearch;
  });

  // Helper to render a product card (shared across all sections)
  const ProductCard = ({ item }) => (
    <div className="group relative rounded-2xl overflow-hidden bg-luxury-card border border-white/5 flex flex-col p-4 glass-card-hover">
      {/* Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-luxury-accent/50 mb-5">
        <Link to={`/product/${item.id}`} className="block w-full h-full">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <span className={`absolute top-3 left-3 z-10 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md font-bold shadow-md ${item.badgeColor}`}>
          {item.badge}
        </span>
        <button
          onClick={() => handleFavoriteToggle(item.id)}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isInWishlist(item.id)
              ? 'bg-rose-600 border-rose-500 text-white'
              : 'bg-luxury-dark/60 border-white/10 text-gray-300 hover:text-rose-500 hover:border-rose-500/50'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`h-4 w-4 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
        </button>
        {/* Quick Add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-luxury-dark/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => handleAddToCartClick(item.id)}
            className="btn-gold flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg text-xs uppercase tracking-widest cursor-pointer"
          >
            {addedItems[item.id] ? <><Check className="h-4 w-4" /><span>Added to Bag</span></> : <><ShoppingCart className="h-4 w-4" /><span>Quick Add</span></>}
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex-grow flex flex-col justify-between text-left">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">{item.type}</p>
          <Link to={`/product/${item.id}`}>
            <h3 className="font-serif text-lg font-semibold text-white group-hover:text-luxury-goldlight transition-colors">{item.name}</h3>
          </Link>
          <p className="text-[11px] text-gray-400 font-light leading-relaxed line-clamp-2">{item.desc}</p>
          <div className="bg-luxury-dark/50 border border-white/5 rounded-lg px-2.5 py-2 text-[10px] text-gray-300">
            <span className="text-luxury-gold font-medium">Notes:</span> {item.notes}
          </div>
          {/* Extra info badges */}
          {item.sold && (
            <span className="inline-block text-[9px] bg-orange-500/10 border border-orange-500/20 text-orange-300 px-2 py-0.5 rounded font-medium">
              🔥 {item.sold}
            </span>
          )}
          {item.repurchaseRate && (
            <span className="inline-block text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-medium">
              ♻ {item.repurchaseRate}
            </span>
          )}
          {item.quote && (
            <p className="text-[10px] italic text-gray-500 border-l-2 border-luxury-gold/40 pl-2 leading-relaxed">
              {item.quote}
            </p>
          )}
          {/* Stars */}
          <div className="flex items-center space-x-1.5 pt-1">
            <div className="flex text-luxury-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < Math.floor(item.rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">{item.rating} ({item.reviews} reviews)</span>
          </div>
        </div>

        {/* Price & cart */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
          <span className="text-xl font-serif font-bold text-white">${item.price}.00</span>
          <button
            onClick={() => handleAddToCartClick(item.id)}
            className={`p-2 rounded-lg transition-all duration-300 border ${
              addedItems[item.id]
                ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400'
                : 'bg-luxury-accent/50 border-white/5 text-gray-300 hover:text-luxury-gold hover:border-luxury-gold/50'
            }`}
            aria-label="Add to cart"
          >
            {addedItems[item.id] ? <Check className="h-4.5 w-4.5" /> : <ShoppingCart className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen bg-luxury-dark text-gray-100 font-sans selection:bg-luxury-gold selection:text-luxury-dark">

      {/* ── Hero Header ── */}
      <section className="relative py-20 overflow-hidden border-b border-luxury-gold/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max mx-auto text-[10px] uppercase tracking-[0.25em] font-semibold animate-fade-in-up">
            <Flame className="h-3.5 w-3.5 animate-pulse" />
            <span>Community-Loved Scents</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white tracking-wide animate-fade-in-up">
            AURA <span className="text-luxury-gold">Best Sellers</span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm sm:text-base leading-relaxed animate-fade-in-up">
            Hand-picked by thousands of discerning customers. Our best sellers are rated, re-purchased, and gifted more than any other fragrances in our collection.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-6 pt-4 animate-fade-in-up">
            {[
              { icon: Star, label: 'Avg. Rating', value: '4.87 / 5' },
              { icon: Users, label: 'Happy Customers', value: '14,000+' },
              { icon: TrendingUp, label: 'Repeat Purchases', value: '71% rate' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center space-x-2 bg-luxury-accent/40 border border-white/5 rounded-full px-4 py-2">
                <Icon className="h-4 w-4 text-luxury-gold" />
                <div className="text-left">
                  <p className="text-[8px] uppercase tracking-wider text-gray-500">{label}</p>
                  <p className="text-xs font-semibold text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Search & filter */}
          <div className="max-w-4xl mx-auto pt-6 flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in-up">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search best sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-luxury-accent/60 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {['All', 'Top Rated', 'Most Popular', 'Customer Favorites'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveSection(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300 ${
                    activeSection === cat
                      ? 'bg-luxury-gold text-luxury-dark font-medium shadow-md shadow-luxury-gold/10'
                      : 'bg-luxury-accent/40 border border-white/5 text-gray-400 hover:text-white hover:bg-luxury-accent/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-luxury-card/30 my-20">
            <p className="text-gray-400 font-light text-sm">No fragrances match your current filters.</p>
            <button
              onClick={() => { setActiveSection('All'); setSearchQuery(''); }}
              className="mt-4 text-xs text-luxury-gold hover:text-luxury-goldlight tracking-widest uppercase font-medium underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* ── Section 1: Top Rated ── */}
            {(activeSection === 'All' || activeSection === 'Top Rated') && (
              <section className="py-20 border-b border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div className="text-left">
                    <div className="inline-flex items-center space-x-2 text-luxury-gold mb-2">
                      <Award className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-widest font-semibold">Highest Rated</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white">Top Rated Perfumes</h2>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm font-light max-w-sm text-left md:text-right mt-2 md:mt-0">
                    Fragrances that earned a near-perfect score from our most discerning customers.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {topRated
                    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.notes.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '')
                    .map(item => <ProductCard key={item.id} item={item} />)}
                </div>
              </section>
            )}

            {/* ── Section 2: Most Popular ── */}
            {(activeSection === 'All' || activeSection === 'Most Popular') && (
              <section className="py-20 border-b border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div className="text-left">
                    <div className="inline-flex items-center space-x-2 text-luxury-gold mb-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-widest font-semibold">By Units Sold</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white">Most Popular Fragrances</h2>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm font-light max-w-sm text-left md:text-right mt-2 md:mt-0">
                    Our highest-volume sellers — fragrances that thousands of customers reach for again and again.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {mostPopular
                    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.notes.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '')
                    .map(item => <ProductCard key={item.id} item={item} />)}
                </div>
              </section>
            )}

            {/* ── Section 3: Customer Favorites ── */}
            {(activeSection === 'All' || activeSection === 'Customer Favorites') && (
              <section className="py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div className="text-left">
                    <div className="inline-flex items-center space-x-2 text-luxury-gold mb-2">
                      <Users className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-widest font-semibold">Voted by Community</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white">Customer Favorites</h2>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm font-light max-w-sm text-left md:text-right mt-2 md:mt-0">
                    Real customer reviews, repurchase data, and gifting trends reveal these unanimous community darlings.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {customerFavorites
                    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.notes.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '')
                    .map(item => <ProductCard key={item.id} item={item} />)}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* ── Trust Footer Strip ── */}
      <section className="bg-luxury-accent/25 border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Award className="h-6 w-6 text-luxury-gold" />
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Independently Reviewed</h4>
            <p className="text-[11px] text-gray-400 font-light">All ratings are from verified purchasers only. No sponsored reviews.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <ShieldCheck className="h-6 w-6 text-luxury-gold" />
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Satisfaction Guarantee</h4>
            <p className="text-[11px] text-gray-400 font-light">Not in love with your fragrance? Return it within 30 days, no questions asked.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Sparkles className="h-6 w-6 text-luxury-gold" />
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Free Sample with Order</h4>
            <p className="text-[11px] text-gray-400 font-light">Every order includes a complimentary 2ml vial of our current bestseller.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
