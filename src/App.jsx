import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Categories from './components/Categories';
import Products from './components/Products';
import OfferBanner from './components/OfferBanner';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleAddToWishlist = (val) => {
    setWishlistCount((prev) => Math.max(0, prev + val));
  };

  return (
    <div className="min-h-screen bg-luxury-dark text-gray-100 font-sans selection:bg-luxury-gold selection:text-luxury-dark">
      {/* Navigation Header */}
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Banner Area */}
        <Hero />

        {/* Featured Luxury Partner Brand Marquee */}
        <Brands />

        {/* Categories Directory */}
        <Categories />

        {/* Product Catalog Grid Showcase */}
        <Products 
          onAddToCart={handleAddToCart} 
          onAddToWishlist={handleAddToWishlist} 
        />

        {/* Promotional Campaign Banner with live timer */}
        <OfferBanner />

        {/* User Testimonials Grid */}
        <Reviews />
      </main>

      {/* Footer Directory */}
      <Footer />
    </div>
  );
}

export default App;
