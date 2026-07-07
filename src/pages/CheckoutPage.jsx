import { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '', email: '', street: '', zip: ''
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const countryOptions = useMemo(() => 
    Country.getAllCountries().map(c => ({ value: c.isoCode, label: c.name })), 
  []);
  
  const stateOptions = useMemo(() => 
    selectedCountry ? State.getStatesOfCountry(selectedCountry.value).map(s => ({ value: s.isoCode, label: s.name })) : [], 
  [selectedCountry]);

  const cityOptions = useMemo(() => 
    selectedCountry && selectedState ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(c => ({ value: c.name, label: c.name })) : [], 
  [selectedCountry, selectedState]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: '#0a0a0a', 
      borderColor: state.isFocused ? '#D4AF37' : 'rgba(255, 255, 255, 0.1)',
      padding: '0.15rem', 
      borderRadius: '0.75rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'rgba(255, 255, 255, 0.2)'
      },
      cursor: 'pointer'
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#111',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '0.75rem',
      zIndex: 50,
      marginTop: '4px'
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '200px'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? 'rgba(212, 175, 55, 0.2)' 
        : state.isFocused 
          ? 'rgba(255, 255, 255, 0.05)'
          : 'transparent',
      color: state.isSelected ? '#D4AF37' : '#e5e7eb',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: 'rgba(212, 175, 55, 0.3)'
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: '#ffffff',
      fontSize: '0.875rem'
    }),
    input: (base) => ({
      ...base,
      color: '#ffffff'
    }),
    placeholder: (base) => ({
      ...base,
      color: '#4b5563',
      fontSize: '0.875rem'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#9ca3af',
      '&:hover': {
        color: '#D4AF37'
      }
    })
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);

  const handleInputChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty. Add items before checking out.');
      return;
    }

    if (!selectedCountry || !selectedState || !selectedCity) {
      toast.error('Please complete your full shipping address (Country, State, City).');
      return;
    }

    setIsProcessing(true);
    console.log('--- CHECKOUT START ---');
    console.log('Cart Items:', cartItems);
    console.log('Cart Total:', cartTotal);

    const sessionId = localStorage.getItem('aura_session_id') || ('guest_' + Date.now());
    const fallbackOrderId = 'ORD-' + Date.now();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Step 0: Ensure customer exists
      console.log('Step 0: Getting/Creating Customer...');
      let customerId = null;
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', formData.email)
        .maybeSingle();

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const newCustId = 'c_' + Date.now();
        const { data: newCustomer, error: custError } = await supabase
          .from('customers')
          .insert([{ id: newCustId, name: formData.name, email: formData.email, user_id: user?.id || null }])
          .select()
          .single();
        if (!custError && newCustomer) {
          customerId = newCustomer.id;
        } else if (custError) {
          console.error('Customer insert failed:', custError);
        }
      }

      // Step 0.5 — Insert address FIRST so we have an address_id for the order
      console.log('Step 0.5: Inserting Address...');
      const newAddressId = 'a_' + Date.now();
      let addressId = null;
      
      const { data: newAddress, error: addrError } = await supabase.from('addresses').insert([{
        id: newAddressId,
        address: formData.street,
        city: selectedCity.label,
        state: selectedState.label,
        postal_code: formData.zip,
        country: selectedCountry.label,
        customer_id: customerId
      }]).select().single();
      
      if (!addrError && newAddress) {
        addressId = newAddress.id;
        console.log('Step 0.5 ✅ Address saved');
      } else {
        console.warn('Step 0.5 ⚠️ Address save failed:', addrError);
      }

      // Step 1 — Insert order
      console.log('Step 1: Inserting order...');
      const newOrderId = 'o_' + Date.now();
      const { data: insertedOrders, error: orderError } = await supabase
        .from('orders')
        .insert([{
          id: newOrderId,
          customer_id: customerId,
          address_id: addressId,
          user_id: user?.id || null,
          order_number: fallbackOrderId,
          total: Number(cartTotal) || 0,
          status: 'Processing',
          payment_method: 'Credit Card',
          payment_status: 'Paid'
        }])
        .select();

      if (orderError) {
        // Table might not exist — log clearly and use local fallback
        console.warn('Supabase order failed (run the SQL schema first!):', orderError.message);
      } else {
        const dbOrderId = insertedOrders?.[0]?.id;
        console.log('Step 1 ✅ Order inserted with ID:', dbOrderId);
        
        if (dbOrderId) {
          const myOrders = JSON.parse(localStorage.getItem('aura_my_orders') || '[]');
          localStorage.setItem('aura_my_orders', JSON.stringify([...myOrders, dbOrderId]));
        }

        // Step 2 — Insert order items
        if (dbOrderId) {
          const itemsPayload = cartItems.map(item => ({
            id: 'oi_' + Math.random().toString(36).substr(2, 9),
            order_id: dbOrderId,
            product_id: String(item.id),
            quantity: Number(item.quantity) || 1,
            price: Number(item.price) || 0
          }));
          const { error: itemsError } = await supabase.from('order_items').insert(itemsPayload);
          if (itemsError) console.warn('Step 2 ⚠️ Order items failed:', itemsError.message);
          else console.log('Step 2 ✅ Order items inserted:', itemsPayload.length);
        }
      }

      // Always succeed — clear cart and show success screen
      clearCart();
      setConfirmedOrderId(fallbackOrderId);
      setOrderSuccess(true);
      toast.success('Order placed successfully!', {
        style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' }
      });
      console.log('--- CHECKOUT SUCCESS ---', fallbackOrderId);

    } catch (err) {
      console.error('--- CHECKOUT FATAL ERROR ---', err);
      toast.error('Something went wrong: ' + (err?.message || 'Unknown error'), {
        style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' },
        duration: 6000
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Success Screen ──
  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-dark text-white px-4 pt-32 pb-20 text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full filter blur-2xl animate-pulse" />
          <CheckCircle className="relative h-24 w-24 text-emerald-400" />
        </div>
        <div className="text-luxury-gold text-xs uppercase tracking-widest mb-3 font-semibold">{confirmedOrderId}</div>
        <h1 className="font-serif text-4xl sm:text-5xl mb-4">Order Confirmed</h1>
        <p className="text-gray-400 mb-10 max-w-md leading-relaxed">
          Thank you, <span className="text-white font-medium">{formData.name}</span>. Your bespoke fragrances are being prepared with care and will be shipped to you shortly.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link to="/" className="btn-gold px-8 py-3 rounded-xl text-sm uppercase tracking-widest">
            Return to Atelier
          </Link>
          <Link to="/collection" className="border border-luxury-gold/30 text-luxury-gold px-8 py-3 rounded-xl text-sm uppercase tracking-widest hover:bg-luxury-gold/10 transition-colors">
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  // ── Checkout Form ──
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-white">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 text-[10px] uppercase tracking-[0.25em] font-semibold mb-4">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Secure Checkout</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide">Complete Your Order</h1>
        <p className="text-gray-400 mt-2 text-sm">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} · Total:{' '}
          <span className="text-luxury-gold font-semibold">${(cartTotal || 0).toFixed(2)}</span>
        </p>
      </div>

      <div className="bg-luxury-card border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <form onSubmit={handleCheckout} className="space-y-10">

          {/* Contact Info */}
          <section>
            <h2 className="font-serif text-xl mb-5 text-luxury-gold border-b border-luxury-gold/20 pb-3">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Full Name *</label>
                <input required name="name" value={formData.name} onChange={handleInputChange}
                  placeholder="Jane Doe"
                  className="w-full bg-luxury-dark border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange}
                  placeholder="jane@example.com"
                  className="w-full bg-luxury-dark border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold transition-colors" />
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section>
            <h2 className="font-serif text-xl mb-5 text-luxury-gold border-b border-luxury-gold/20 pb-3">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Street Address *</label>
                <input required name="street" value={formData.street} onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className="w-full bg-luxury-dark border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Country *</label>
                  <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={(option) => {
                      setSelectedCountry(option);
                      setSelectedState(null);
                      setSelectedCity(null);
                    }}
                    styles={customStyles}
                    placeholder="Search Country"
                    isSearchable
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">State *</label>
                  <Select
                    options={stateOptions}
                    value={selectedState}
                    onChange={(option) => {
                      setSelectedState(option);
                      setSelectedCity(null);
                    }}
                    styles={customStyles}
                    placeholder="Search State"
                    isDisabled={!selectedCountry}
                    isSearchable
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">City *</label>
                  <Select
                    options={cityOptions}
                    value={selectedCity}
                    onChange={(option) => setSelectedCity(option)}
                    styles={customStyles}
                    placeholder="Search City"
                    isDisabled={!selectedState}
                    isSearchable
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">ZIP Code *</label>
                  <input required name="zip" value={formData.zip} onChange={handleInputChange} placeholder="400001"
                    className="w-full bg-luxury-dark border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold transition-colors" />
                </div>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="font-serif text-xl mb-5 text-luxury-gold border-b border-luxury-gold/20 pb-3">
              Payment Details
            </h2>
            <div className="bg-luxury-dark/60 border border-luxury-gold/20 rounded-2xl p-6 text-center space-y-3">
              <ShieldCheck className="h-10 w-10 text-luxury-gold mx-auto" />
              <p className="text-white font-medium">Payment simulated in demo mode</p>
              <p className="text-gray-400 text-sm">Your order will be recorded and confirmed instantly upon submission.</p>
              <div className="flex justify-center gap-3 pt-2 text-gray-600 text-xs uppercase tracking-wider">
                <span>Visa</span><span>·</span><span>Mastercard</span><span>·</span><span>UPI</span><span>·</span><span>Net Banking</span>
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Order Total</p>
              <p className="text-3xl font-serif text-luxury-gold font-bold">${(cartTotal || 0).toFixed(2)}</p>
            </div>

            <button
              type="submit"
              id="checkout-submit-btn"
              disabled={isProcessing}
              className="btn-gold w-full sm:w-auto px-12 py-4 rounded-xl text-sm uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Purchase
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
