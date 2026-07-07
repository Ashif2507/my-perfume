import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

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
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import CustomFragrance from './pages/CustomFragrance';
import Login from './pages/Login';
import Signup from './pages/Signup';

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
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />
            <Route path="/profile" element={<OrderHistoryPage />} /> {/* Added for Profile request */}
          </Route>

          {/* Public Routes */}
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/gift-sets" element={<GiftSets />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/collection" element={<CollectionsPage />} />
          <Route path="/exclusive-offers" element={<OffersPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/custom-fragrance" element={<CustomFragrance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

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
  useEffect(() => {
    const fetchAllTables = async () => {
      const tables = [
        'collections', 'testimonials', 'custom_fragrance_notes', 
        'custom_fragrances', 'reviews', 'order_items', 'orders', 
        'wishlist_items', 'wishlists', 'cart_items', 'carts', 
        'addresses', 'customers', 'offers', 'brands', 'categories', 'products'
      ];
      
      console.log('Fetching Supabase tables to populate browser console...');
      
      const results = {};
      
      await Promise.all(tables.map(async (table) => {
        try {
          const { data, error } = await supabase.from(table).select('*').limit(1);
          if (error) throw error;
          results[table] = data;
          console.log(`Successfully fetched from ${table}`);
        } catch (err) {
          console.warn(`Could not fetch from ${table}:`, err.message);
        }
      }));
      
      console.log('Supabase Fetches Complete:', results);
    };
    
    fetchAllTables();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
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
