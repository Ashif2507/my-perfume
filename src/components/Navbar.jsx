import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Heart, Search, User, Menu, X, Sparkles, LogOut, Package, UserCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { allProductsData } from '../data/products';

export default function Navbar({ cartCount = 0, wishlistCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Gift Sets', href: '/gift-sets' },
    { name: 'Best Sellers', href: '/best-sellers' },
    { name: 'Collections', href: '/collection' },
    { name: 'Exclusive Offers', href: '/exclusive-offers' },
    { name: 'Testimonials', href: '/testimonials' },
  ];

  const searchResults = searchQuery
    ? allProductsData.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  return (
    <nav className="glass-nav fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-luxury-gold animate-pulse-subtle" />
              <span className="font-serif text-2xl font-bold tracking-[0.25em] text-white hover:text-luxury-gold transition-colors">
                AURA
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm tracking-widest uppercase font-medium transition-colors duration-200 ${
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
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Search Bar Dropdown */}
            <div className="relative flex items-center" ref={searchRef}>
              <div className={`flex items-center transition-all duration-300 ${showSearch ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}>
                <input
                  type="text"
                  placeholder="Search fragrances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-luxury-accent/80 border border-luxury-gold/20 rounded-full px-4 py-1.5 text-xs text-white focus:outline-none focus:border-luxury-gold transition-all"
                />
              </div>
              <button 
                onClick={() => setShowSearch(!showSearch)} 
                className="text-gray-300 hover:text-luxury-gold transition-colors p-1 z-10 ml-1"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Search Results Dropdown */}
              {showSearch && searchQuery && (
                <div className="absolute top-10 right-0 w-72 bg-luxury-card border border-luxury-gold/20 rounded-xl shadow-2xl overflow-hidden mt-2">
                  {searchResults.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto">
                      {searchResults.map(result => (
                        <Link 
                          key={result.id} 
                          to={`/product/${result.id}`}
                          onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                          className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors border-b border-white/5"
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
                  )}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="text-gray-300 hover:text-luxury-gold transition-colors p-1" 
                aria-label="Profile"
              >
                <User className="h-5 w-5" />
              </button>
              
              {showProfile && (
                <div className="absolute top-10 right-0 w-48 bg-luxury-card border border-luxury-gold/20 rounded-xl shadow-2xl overflow-hidden mt-2 py-2">
                  <div className="px-4 py-2 border-b border-white/5 mb-2">
                    <p className="text-xs text-luxury-gold font-medium uppercase tracking-widest">Welcome</p>
                    <p className="text-sm text-white truncate">Guest User</p>
                  </div>
                  <button onClick={() => setShowProfile(false)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                    <UserCircle className="h-4 w-4" /> My Profile
                  </button>
                  <button onClick={() => setShowProfile(false)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                    <Package className="h-4 w-4" /> Order History
                  </button>
                  <Link to="/admin" onClick={() => setShowProfile(false)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-luxury-gold hover:bg-white/5 transition-colors">
                    <LogOut className="h-4 w-4" /> Admin Panel
                  </Link>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative text-gray-300 hover:text-luxury-gold transition-colors p-1" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-dark text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-300 hover:text-luxury-gold transition-colors p-1" aria-label="Shopping Cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-dark text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
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
        className={`md:hidden absolute top-20 left-0 w-full bg-luxury-dark/95 border-b border-luxury-gold/10 backdrop-blur-lg transition-all duration-300 ease-in-out ${
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
            {/* Mobile Search Results */}
            {searchQuery && searchResults.length > 0 && (
              <div className="mt-2 bg-luxury-card rounded-lg overflow-hidden border border-white/5">
                {searchResults.map(res => (
                  <Link key={res.id} to={`/product/${res.id}`} className="block p-3 border-b border-white/5 text-sm text-white">
                    {res.name}
                  </Link>
                ))}
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
            <Link to="/admin" className="flex items-center space-x-2 text-gray-300 hover:text-luxury-gold">
              <User className="h-5 w-5" />
              <span className="text-sm">Account</span>
            </Link>
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
