import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Categories from './components/Categories';
import Products from './components/Products';
import OfferBanner from './components/OfferBanner';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import NewArrivals from './components/NewArrivals';
import GiftSets from './components/GiftSets';
import BestSellers from './components/BestSellers';
import CollectionsPage from './components/CollectionsPage';
import OffersPage from './components/OffersPage';
import TestimonialsPage from './components/TestimonialsPage';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Expose client-side navigation handler on window
    window.navigateTo = (to) => {
      window.history.pushState({}, '', to);
      window.dispatchEvent(new Event('pushstate-changed'));
    };

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate-changed', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate-changed', handleLocationChange);
    };
  }, []);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleAddToWishlist = (val) => {
    setWishlistCount((prev) => Math.max(0, prev + val));
  };

  const isNewArrivals = currentPath === '/new-arrivals';
  const isGiftSets = currentPath === '/gift-sets';
  const isBestSellers = currentPath === '/best-sellers';
  const isCollection = currentPath === '/collection';
  const isOffers = currentPath === '/exclusive-offers';
  const isTestimonials = currentPath === '/testimonials';

  return (
    <div className="min-h-screen bg-luxury-dark text-gray-100 font-sans selection:bg-luxury-gold selection:text-luxury-dark">
      {/* Navigation Header */}
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />

      {/* Main Content Sections */}
      <main>
        {isNewArrivals ? (
          <NewArrivals 
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        ) : isGiftSets ? (
          <GiftSets 
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        ) : isBestSellers ? (
          <BestSellers
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        ) : isCollection ? (
          <CollectionsPage />
        ) : isOffers ? (
          <OffersPage />
        ) : isTestimonials ? (
          <TestimonialsPage />
        ) : (
          <>
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
          </>
        )}
      </main>

      {/* Footer Directory */}
      <Footer />
    </div>
  );
}

export default App;

