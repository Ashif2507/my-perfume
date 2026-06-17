import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, User, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ cartCount = 0, wishlistCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navLinks = [
    { name: 'Collections', href: '#categories' },
    { name: 'Bestsellers', href: '#products' },
    { name: 'Exclusive Offers', href: '#offers' },
    { name: 'Testimonials', href: '#reviews' },
  ];

  return (
    <nav className="glass-nav fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-luxury-gold animate-pulse-subtle" />
              <span className="font-serif text-2xl font-bold tracking-[0.25em] text-white hover:text-luxury-gold transition-colors">
                AURA
              </span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm tracking-widest text-gray-300 hover:text-luxury-gold uppercase font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Utility Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar Toggle */}
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search fragrances..."
                className={`bg-luxury-accent/60 border border-luxury-gold/20 rounded-full px-4 py-1.5 text-xs text-white focus:outline-none focus:border-luxury-gold transition-all duration-300 ${
                  showSearch ? 'w-48 opacity-100' : 'w-0 opacity-0 pointer-events-none'
                }`}
              />
              <button 
                onClick={() => setShowSearch(!showSearch)} 
                className="text-gray-300 hover:text-luxury-gold transition-colors p-1"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Profile */}
            <button className="text-gray-300 hover:text-luxury-gold transition-colors p-1" aria-label="Profile">
              <User className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <button className="relative text-gray-300 hover:text-luxury-gold transition-colors p-1" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-dark text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button className="relative text-gray-300 hover:text-luxury-gold transition-colors p-1" aria-label="Shopping Cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-dark text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Shopping Cart Indicator */}
            <button className="relative text-gray-300 hover:text-luxury-gold transition-colors p-1" aria-label="Shopping Cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-dark text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

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
              className="w-full bg-luxury-accent border border-luxury-gold/20 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-luxury-gold"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base tracking-widest text-gray-300 hover:text-luxury-gold uppercase font-medium py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}

          <div className="flex justify-around pt-4 border-t border-white/5">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-luxury-gold">
              <User className="h-5 w-5" />
              <span className="text-sm">Account</span>
            </button>
            <button className="relative flex items-center space-x-2 text-gray-300 hover:text-luxury-gold">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Wishlist ({wishlistCount})</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
