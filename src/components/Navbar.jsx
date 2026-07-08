import { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Heart, Search, User, Menu, X, Sparkles, LogOut, Package, UserCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { allProductsData } from '../data/products';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ cartCount = 0, wishlistCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();



  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Account';

  const handleLogout = async () => {
    setShowProfile(false);
    await logout();
    navigate('/');
  };

  const searchRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) setShowSearch(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Gift Sets', href: '/gift-sets' },
    { name: 'Best Sellers', href: '/best-sellers' },
    { name: 'Custom Fragrance', href: '/custom-fragrance' },
    { name: 'Collections', href: '/collection' },
    { name: 'Exclusive Offers', href: '/exclusive-offers' },
    { name: 'Testimonials', href: '/testimonials' },
  ];

  const searchResults = searchQuery
    ? allProductsData.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             (p.notes && p.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
                             (p.type && p.type.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesQuery && matchesCategory;
      }).slice(0, 5)
    : [];

  return (
    <nav className="glass-nav fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="flex items-center justify-between h-20 gap-x-2 xl:gap-x-4 2xl:gap-x-8">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 2xl:h-6 2xl:w-6 text-luxury-gold animate-pulse-subtle" />
              <span className="font-serif text-xl 2xl:text-2xl font-bold tracking-[0.25em] text-white hover:text-luxury-gold transition-colors">
                AURA
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex xl:gap-x-3 2xl:gap-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-[10px] 2xl:text-sm tracking-widest uppercase font-medium transition-colors duration-200 whitespace-nowrap ${
                  location.pathname === link.href
                    ? 'text-luxury-gold'
                    : 'text-gray-300 hover:text-luxury-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Utility Icons */}
          <div className="hidden xl:flex items-center xl:gap-x-4 2xl:gap-x-9">
            
            
            
            {/* Search Dropdown Panel */}
            <div className="relative flex items-center" ref={searchRef}>
              <button 
                onClick={() => setShowSearch(!showSearch)} 
                className={`text-gray-300 hover:text-luxury-gold transition-colors p-1.5 lg:p-2 z-10 ${showSearch ? 'text-luxury-gold' : ''}`}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Floating Search Panel */}
              <div 
                className={`absolute top-10 right-0 w-80 sm:w-96 bg-luxury-card border border-luxury-gold/20 rounded-xl shadow-2xl overflow-hidden mt-2 z-50 transition-all duration-300 origin-top-right ${
                  showSearch ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                }`}
              >
                {/* Search Input Area */}
                <div className="p-3 border-b border-white/5 bg-luxury-dark/50">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search fragrances..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-luxury-accent/50 border border-luxury-gold/20 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-luxury-gold transition-all"
                    />
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Category Filter Chips */}
                <div className="flex gap-1.5 p-3 border-b border-white/5 overflow-x-auto scrollbar-none bg-luxury-accent/30">
                  {['All', 'Floral', 'Oriental', 'Woody', 'Fresh'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full transition-all border whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-luxury-gold text-luxury-dark border-luxury-gold font-bold'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Results */}
                {searchQuery ? (
                  searchResults.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto">
                      {searchResults.map(result => (
                        <Link 
                          key={result.id} 
                          to={`/product/${result.id}`}
                          onClick={() => { setShowSearch(false); setSearchQuery(''); setSelectedCategory('All'); }}
                          className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                        >
                          <img src={result.image} alt="" className="w-10 h-10 rounded object-cover bg-luxury-accent" />
                          <div>
                            <p className="text-sm text-white font-medium">{result.name}</p>
                            <p className="text-[10px] text-gray-400">{result.category} • ${result.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-400">No fragrances found.</div>
                  )
                ) : (
                  <div className="p-4 text-left">
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold mb-2">Popular Collections</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['Floral', 'Oriental', 'Woody', 'Fresh'].map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => { setSelectedCategory(cat); setSearchQuery(cat); }}
                          className="text-left text-xs text-gray-300 hover:text-luxury-gold transition-colors py-1.5 px-2.5 bg-white/5 rounded border border-white/5 cursor-pointer"
                        >
                          ✨ {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Auth: Profile Dropdown (logged in) or Login/Sign Up links (logged out) */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 text-gray-300 hover:text-luxury-gold transition-colors p-1.5 md:p-2"
                  aria-label="Profile menu"
                >
                  <div className="w-7 h-7 rounded-full bg-luxury-gold/20 border border-luxury-gold/40 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-luxury-gold uppercase">
                      {displayName.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs font-medium tracking-wide text-gray-200 max-w-[80px] truncate hidden 2xl:block">
                    {displayName}
                  </span>
                </button>

                <div
                  className={`absolute top-12 right-0 w-52 bg-luxury-card border border-luxury-gold/20 rounded-xl shadow-2xl overflow-hidden mt-1 py-2 transition-all duration-200 origin-top-right ${
                    showProfile ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                  }`}
                >
                  <div className="px-4 py-3 border-b border-white/5 mb-1">
                    <p className="text-[10px] text-luxury-gold font-semibold uppercase tracking-widest">Signed in as</p>
                    <p className="text-sm text-white font-medium truncate mt-0.5">{displayName}</p>
                    <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => setShowProfile(false)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <UserCircle className="h-4 w-4" /> Profile
                  </button>
                  <Link
                    to="/order-history"
                    onClick={() => setShowProfile(false)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Package className="h-4 w-4" /> Order History
                  </Link>
                  <div className="border-t border-white/5 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 2xl:gap-3">
                <Link
                  to="/login"
                  className="text-[10px] 2xl:text-xs tracking-widest uppercase text-gray-300 hover:text-luxury-gold transition-colors font-medium py-1.5"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-gold text-[10px] 2xl:text-xs tracking-widest uppercase px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-lg font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="relative text-gray-300 hover:text-luxury-gold transition-colors p-1.5 md:p-2" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-luxury-gold text-luxury-dark text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-300 hover:text-luxury-gold transition-colors p-1.5 md:p-2" aria-label="Shopping Cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-luxury-gold text-luxury-dark text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center space-x-4">
            
            <Link to="/cart" className="relative text-gray-300 hover:text-luxury-gold transition-colors p-1" aria-label="Shopping Cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-dark text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-luxury-gold transition-colors p-1 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        className={`xl:hidden absolute top-20 left-0 w-full bg-luxury-dark/95 border-b border-luxury-gold/10 backdrop-blur-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-luxury-accent border border-luxury-gold/20 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-luxury-gold"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            {/* Mobile Category Filters */}
            <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-none py-1.5">
              {['All', 'Floral', 'Oriental', 'Woody', 'Fresh'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full transition-all border whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-luxury-gold text-luxury-dark border-luxury-gold font-bold'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Search Results */}
            {searchQuery && (
              <div className="mt-2 bg-luxury-card rounded-lg overflow-hidden border border-white/5 max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map(res => (
                    <Link 
                      key={res.id} 
                      to={`/product/${res.id}`}
                      onClick={() => { setIsOpen(false); setSearchQuery(''); setSelectedCategory('All'); }}
                      className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors border-b border-white/5 text-sm text-white"
                    >
                      <img src={res.image} alt="" className="w-8 h-8 rounded object-cover bg-luxury-accent" />
                      <div>
                        <p className="font-medium text-white">{res.name}</p>
                        <p className="text-[10px] text-gray-400">{res.category} • ${res.price}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-gray-400">No fragrances found.</div>
                )}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`block text-base tracking-widest uppercase font-medium py-2 border-b border-white/5 ${
                location.pathname === link.href
                  ? 'text-luxury-gold'
                  : 'text-gray-300 hover:text-luxury-gold'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex justify-around pt-4 border-t border-white/5">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-luxury-gold/20 border border-luxury-gold/40 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-luxury-gold uppercase">{displayName.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{displayName}</p>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 mt-0.5 transition-colors"
                  >
                    <LogOut className="h-3 w-3" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-luxury-gold"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm">Login</span>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="btn-gold text-xs tracking-widest uppercase px-4 py-2 rounded-lg font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <Link to="/wishlist" className="relative flex items-center space-x-2 text-gray-300 hover:text-luxury-gold">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Wishlist ({wishlistCount})</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
