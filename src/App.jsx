import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './layouts/AdminLayout';

// Customer Pages
import Hero from './components/Hero';
import Brands from './components/Brands';
import Categories from './components/Categories';
import Products from './components/Products';
import OfferBanner from './components/OfferBanner';
import Reviews from './components/Reviews';
import NewArrivals from './components/NewArrivals';
import GiftSets from './components/GiftSets';
import BestSellers from './components/BestSellers';
import CollectionsPage from './components/CollectionsPage';
import OffersPage from './components/OffersPage';
import TestimonialsPage from './components/TestimonialsPage';
import ProductDetails from './pages/ProductDetails';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CustomFragrance from './pages/CustomFragrance';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminReviews from './pages/admin/AdminReviews';

// Context
import { useCart } from './context/CartContext';
import { useWishlist } from './context/WishlistContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <Categories />
      <Products />
      <OfferBanner />
      <Reviews />
    </>
  );
}

function CustomerLayout() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="min-h-screen bg-luxury-dark text-gray-100 font-sans selection:bg-luxury-gold selection:text-luxury-dark">
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/gift-sets" element={<GiftSets />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/collection" element={<CollectionsPage />} />
          <Route path="/exclusive-offers" element={<OffersPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/custom-fragrance" element={<CustomFragrance />} />
          
          {/* Catch-all customer route */}
          <Route path="*" element={
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
              <h1 className="font-serif text-4xl text-white mb-4">Page Not Found</h1>
              <p className="text-gray-400 mb-8">The page you are looking for does not exist.</p>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          
          <Route path="products" element={<AdminProducts />} />
          <Route path="product" element={<AdminProducts />} />
          
          <Route path="orders" element={<AdminOrders />} />
          <Route path="order" element={<AdminOrders />} />
          
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="customer" element={<AdminCustomers />} />
          
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="review" element={<AdminReviews />} />
          
          <Route index element={<AdminDashboard />} />
          <Route path="*" element={<AdminDashboard />} />
        </Route>
        
        <Route path="/*" element={<CustomerLayout />} />
      </Routes>
    </>
  );
}

export default App;
