import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Clock, CheckCircle, Truck, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../supabaseClient';

const STATUS_CONFIG = {
  Processing: { color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30', Icon: Clock },
  Shipped:    { color: 'text-blue-400',   bg: 'bg-blue-400/10 border-blue-400/30',   Icon: Truck },
  Delivered:  { color: 'text-emerald-400',bg: 'bg-emerald-400/10 border-emerald-400/30', Icon: CheckCircle },
  Cancelled:  { color: 'text-rose-400',   bg: 'bg-rose-400/10 border-rose-400/30',   Icon: XCircle },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Processing;
  const { Icon } = cfg;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${cfg.bg} ${cfg.color}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const myOrdersStr = localStorage.getItem('aura_my_orders');
        const myOrders = myOrdersStr ? JSON.parse(myOrdersStr) : [];
        
        if (myOrders.length === 0) {
          console.log('OrderHistory: No order IDs found in local storage.');
          setOrders([]);
          setLoading(false);
          return;
        }

        console.log('OrderHistory: Fetching orders for IDs', myOrders);
        const { data, error: fetchErr } = await supabase
          .from('orders')
          .select('*, customers(*), addresses(*), order_items(*, products(*))')
          .in('id', myOrders)
          .order('created_at', { ascending: false });

        if (fetchErr) throw fetchErr;

        console.log('OrderHistory: Fetched', data?.length, 'orders', data);
        setOrders(data || []);
      } catch (err) {
        console.error('OrderHistory: Error fetching orders:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-dark pt-20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm uppercase tracking-widest">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-dark pt-20 text-center px-4">
        <XCircle className="h-16 w-16 text-rose-500 mb-4" />
        <h2 className="font-serif text-2xl text-white mb-2">Could Not Load Orders</h2>
        <p className="text-gray-400 text-sm mb-2">{error}</p>
        <p className="text-gray-500 text-xs mb-8">Make sure your Supabase tables are set up correctly.</p>
        <Link to="/" className="btn-gold px-8 py-3 rounded-xl text-sm uppercase tracking-widest">
          Back to Store
        </Link>
      </div>
    );
  }

  // ── Empty ──
  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-dark pt-20 text-center px-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-luxury-gold/10 rounded-full filter blur-2xl" />
          <Package className="relative h-24 w-24 text-gray-600" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-white mb-3">No Orders Yet</h2>
        <p className="text-gray-400 mb-8 max-w-sm">
          You haven't placed any orders yet. Explore our curated collection and find your signature scent.
        </p>
        <Link to="/" className="btn-gold px-8 py-3 rounded-xl text-sm uppercase tracking-widest">
          Shop Now
        </Link>
      </div>
    );
  }

  // ── Orders List ──
  return (
    <div className="min-h-screen bg-luxury-dark pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-white">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 text-[10px] uppercase tracking-[0.25em] font-semibold mb-4">
          <Package className="h-3.5 w-3.5" />
          <span>Your Account</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide">Order History</h1>
        <p className="text-gray-400 mt-2">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {orders.map(order => {
          const isExpanded = expandedId === order.id;
          const addr = order.addresses || {};
          const customer = order.customers || {};
          const date = order.created_at
            ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
            : '—';

          return (
            <div key={order.id} className="bg-luxury-card border border-white/5 rounded-2xl overflow-hidden">
              {/* Order Header Row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-luxury-gold/10 rounded-xl p-2.5 mt-0.5">
                    <ShoppingBag className="h-5 w-5 text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-luxury-gold text-xs uppercase tracking-widest font-semibold mb-0.5">
                      {order.order_number || ('Order · ' + order.id?.slice(0, 8).toUpperCase())}
                    </p>
                    <p className="text-white font-medium">{customer.name || 'Guest'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                  <StatusBadge status={order.status} />
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl text-luxury-gold font-bold">
                      ${Number(order.total || 0).toFixed(2)}
                    </span>
                    {isExpanded
                      ? <ChevronUp className="h-4 w-4 text-gray-400" />
                      : <ChevronDown className="h-4 w-4 text-gray-400" />
                    }
                  </div>
                </div>
              </button>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="border-t border-white/5 p-5 space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Customer Info */}
                    <div>
                      <p className="text-xs text-luxury-gold uppercase tracking-widest mb-2 font-semibold">Contact</p>
                      <p className="text-white">{customer.name || 'Guest'}</p>
                      <p className="text-gray-400">{customer.email || '—'}</p>
                    </div>

                    {/* Shipping Address */}
                    {addr.address && (
                      <div>
                        <p className="text-xs text-luxury-gold uppercase tracking-widest mb-2 font-semibold">Shipping Address</p>
                        <p className="text-white">{addr.address}</p>
                        <p className="text-gray-400">
                          {[addr.city, addr.state, addr.postal_code].filter(Boolean).join(', ')}
                        </p>
                        <p className="text-gray-400">{addr.country}</p>
                      </div>
                    )}
                  </div>

                  {order.order_items?.length > 0 && (
                    <div className="border-t border-white/5 pt-4">
                      <p className="text-xs text-luxury-gold uppercase tracking-widest mb-3 font-semibold">Items Ordered</p>
                      <div className="space-y-2">
                        {order.order_items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-300">{item.products?.name || item.product_id} × {item.quantity}</span>
                            <span className="text-white font-medium">${Number(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-gray-400 uppercase tracking-widest text-xs">Order Total</span>
                    <span className="font-serif text-xl text-luxury-gold font-bold">
                      ${Number(order.total || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link to="/" className="text-xs text-gray-400 hover:text-luxury-gold uppercase tracking-widest underline underline-offset-4 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
