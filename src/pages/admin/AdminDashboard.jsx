import { useState, useEffect, useCallback } from 'react';
import {
  TrendingUp, Users, ShoppingBag, DollarSign,
  Calendar, RefreshCw, ArrowUpRight, ArrowDownRight,
  Package
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { supabase } from '../../supabaseClient';

// ─── Theme Tokens ────────────────────────────────────────────────────────────
const GOLD = '#D4AF37';
const GOLD_LIGHT = '#F0D060';
const COLORS = {
  Floral:   '#F472B6',
  Woody:    '#D97706',
  Fresh:    '#34D399',
  Oriental: '#A78BFA',
  Other:    '#94A3B8',
};
const BAR_COLORS = ['#D4AF37', '#F0D060', '#B8960C', '#E8C547', '#C9A227'];

// ─── Custom Tooltip Styles ────────────────────────────────────────────────────
const tooltipStyle = {
  contentStyle: {
    backgroundColor: '#111',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '12px',
  },
  labelStyle: { color: GOLD, fontWeight: 700, marginBottom: 4 },
  cursor: { fill: 'rgba(212,175,55,0.05)' },
};

// ─── Date Filter Options ──────────────────────────────────────────────────────
const FILTER_OPTIONS = [
  { label: 'Today',       value: 'today' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days',value: '30d' },
  { label: 'This Month',  value: 'month' },
  { label: 'This Year',   value: 'year' },
  { label: 'Custom',      value: 'custom' },
];

function getDateRange(filter, customStart, customEnd) {
  const now = new Date();
  let from, to;
  switch (filter) {
    case 'today':
      from = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      to   = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();
      break;
    case '7d':
      from = new Date(Date.now() - 7 * 86400000).toISOString();
      to   = new Date(Date.now() + 86400000).toISOString();
      break;
    case '30d':
      from = new Date(Date.now() - 30 * 86400000).toISOString();
      to   = new Date(Date.now() + 86400000).toISOString();
      break;
    case 'month':
      from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      to   = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
      break;
    case 'year':
      from = new Date(now.getFullYear(), 0, 1).toISOString();
      to   = new Date(now.getFullYear() + 1, 0, 1).toISOString();
      break;
    case 'custom':
      from = customStart ? new Date(customStart).toISOString() : new Date(Date.now() - 30 * 86400000).toISOString();
      to   = customEnd   ? new Date(new Date(customEnd).getTime() + 86400000).toISOString() : new Date(Date.now() + 86400000).toISOString();
      break;
    default:
      from = new Date(Date.now() - 30 * 86400000).toISOString();
      to   = new Date(Date.now() + 86400000).toISOString();
  }
  return { from, to };
}

// ─── Helper: format date label ─────────────────────────────────────────────
function fmtDate(iso, filter) {
  const d = new Date(iso);
  if (filter === 'today') return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  if (filter === 'year')  return d.toLocaleDateString('en-IN', { month: 'short' });
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Delivered:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Shipped:    'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Cancelled:  'bg-rose-500/10 text-rose-400 border-rose-500/20',
    Pending:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };
  const cls = map[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  return (
    <span className={`px-2 py-0.5 text-[10px] rounded border uppercase tracking-widest font-bold ${cls}`}>
      {status}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, sub, icon: Icon, up }) {
  return (
    <div className="bg-luxury-card border border-white/5 rounded-2xl p-6 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-luxury-accent/50 rounded-xl">
          <Icon className="h-5 w-5 text-luxury-gold" />
        </div>
        {sub !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {sub}
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-2xl font-serif text-white">{value}</h3>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="bg-luxury-card border border-white/5 rounded-2xl p-6">
      <h2 className="font-serif text-lg text-white mb-5 flex items-center gap-2">
        <span className="w-1 h-5 rounded bg-luxury-gold inline-block" />
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Custom Donut label ────────────────────────────────────────────────────────
function DonutLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function AdminDashboard() {
  const [filter, setFilter]         = useState('30d');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd]   = useState('');
  const [loading, setLoading]       = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);

  // Data states
  const [stats, setStats]           = useState({ revenue: 0, orders: 0, customers: 0, avgOrder: 0 });
  const [salesTrend, setSalesTrend] = useState([]);
  const [ordersBar, setOrdersBar]   = useState([]);
  const [categoryPie, setCategoryPie] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { from, to } = getDateRange(filter, customStart, customEnd);

      // ── 1. All orders in range (joined with customers) ─────────────────────
      const { data: orders } = await supabase
        .from('orders')
        .select('id, order_number, total, status, created_at, customers(name, email)')
        .gte('created_at', from)
        .lte('created_at', to)
        .order('created_at', { ascending: true });

      const safeOrders = orders || [];

      // ── 2. All order_items in range (joined with products) ─────────────────
      const orderIds = safeOrders.map(o => o.id);
      let items = [];
      if (orderIds.length > 0) {
        const { data } = await supabase
          .from('order_items')
          .select('order_id, quantity, price, products(name, category)')
          .in('order_id', orderIds);
        items = data || [];
      }

      // ── 3. All customers (for count) ───────────────────────────────────────
      const { count: custCount } = await supabase
        .from('customers')
        .select('id', { count: 'exact', head: true });

      // ── Stats ─────────────────────────────────────────────────────────────
      const totalRevenue = safeOrders.reduce((s, o) => s + Number(o.total || 0), 0);
      const avgOrder     = safeOrders.length ? totalRevenue / safeOrders.length : 0;
      setStats({
        revenue:   totalRevenue,
        orders:    safeOrders.length,
        customers: custCount || 0,
        avgOrder:  avgOrder,
      });

      // ── Sales Trend (line chart) ───────────────────────────────────────────
      // Group by date/hour depending on filter
      const trendMap = {};
      safeOrders.forEach(o => {
        const key = fmtDate(o.created_at, filter);
        if (!trendMap[key]) trendMap[key] = { date: key, Revenue: 0, Orders: 0 };
        trendMap[key].Revenue += Number(o.total || 0);
        trendMap[key].Orders  += 1;
      });
      setSalesTrend(Object.values(trendMap));

      // ── Orders Bar (same data, different display) ──────────────────────────
      setOrdersBar(Object.values(trendMap));

      // ── Category Pie ───────────────────────────────────────────────────────
      const catMap = {};
      items.forEach(item => {
        const cat = item.products?.category || 'Other';
        if (!catMap[cat]) catMap[cat] = { name: cat, value: 0 };
        catMap[cat].value += Number(item.price || 0) * Number(item.quantity || 1);
      });
      setCategoryPie(Object.values(catMap));

      // ── Top Products ────────────────────────────────────────────────────────
      const prodMap = {};
      items.forEach(item => {
        const name = item.products?.name || item.product_id;
        if (!prodMap[name]) prodMap[name] = { name, sales: 0, revenue: 0 };
        prodMap[name].sales   += Number(item.quantity || 1);
        prodMap[name].revenue += Number(item.price || 0) * Number(item.quantity || 1);
      });
      const sorted = Object.values(prodMap).sort((a, b) => b.revenue - a.revenue).slice(0, 10);
      setTopProducts(sorted);

      // ── Recent Orders (table, last 10) ─────────────────────────────────────
      const recent = [...safeOrders].reverse().slice(0, 10).map(o => ({
        id:       o.order_number || o.id?.slice(0, 8).toUpperCase(),
        customer: o.customers?.name || 'Guest',
        amount:   o.total,
        status:   o.status,
        date:     new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      }));
      setRecentOrders(recent);

      setLastRefresh(new Date());
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filter, customStart, customEnd]);

  // Initial + filter-driven fetch
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchAll();
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [fetchAll]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">Dashboard Overview</h1>
          {lastRefresh && (
            <p className="text-gray-500 text-xs mt-1">
              Last updated: {lastRefresh.toLocaleTimeString('en-IN')}
            </p>
          )}
        </div>
        <button
          onClick={fetchAll}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-luxury-gold/30 rounded-xl text-luxury-gold text-xs uppercase tracking-widest hover:bg-luxury-gold/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* ── Date Filters ── */}
      <div className="flex flex-wrap items-center gap-2">
        <Calendar className="h-4 w-4 text-gray-400" />
        {FILTER_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all ${
              filter === opt.value
                ? 'bg-luxury-gold text-luxury-dark'
                : 'border border-white/10 text-gray-400 hover:border-luxury-gold/30 hover:text-luxury-gold'
            }`}
          >
            {opt.label}
          </button>
        ))}
        {filter === 'custom' && (
          <div className="flex items-center gap-2 ml-2">
            <input
              type="date"
              value={customStart}
              onChange={e => setCustomStart(e.target.value)}
              className="bg-luxury-dark border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-luxury-gold"
            />
            <span className="text-gray-500 text-xs">to</span>
            <input
              type="date"
              value={customEnd}
              onChange={e => setCustomEnd(e.target.value)}
              className="bg-luxury-dark border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-luxury-gold"
            />
          </div>
        )}
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue"   value={`$${stats.revenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}  icon={DollarSign}   sub="vs prev period" up={true} />
        <StatCard title="Total Orders"    value={stats.orders}    icon={ShoppingBag}  sub="in range"       up={stats.orders > 0} />
        <StatCard title="Total Customers" value={stats.customers} icon={Users} />
        <StatCard title="Avg Order Value" value={`$${stats.avgOrder.toFixed(2)}`}     icon={TrendingUp}    sub="per order"      up={stats.avgOrder > 100} />
      </div>

      {/* ── Sales Trend + Orders Bar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Line Chart — Revenue Trend */}
        <Section title="Sales Revenue Trend">
          {loading ? (
            <div className="h-56 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : salesTrend.length === 0 ? (
            <div className="h-56 flex items-center justify-center text-gray-500 text-sm">No data for selected period</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={salesTrend} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip {...tooltipStyle} formatter={v => [`$${v}`, 'Revenue']} />
                <Line type="monotone" dataKey="Revenue" stroke={GOLD} strokeWidth={2.5} dot={{ fill: GOLD, r: 3 }} activeDot={{ r: 6, fill: GOLD_LIGHT }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Section>

        {/* Bar Chart — Orders Per Period */}
        <Section title="Orders Overview">
          {loading ? (
            <div className="h-56 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : ordersBar.length === 0 ? (
            <div className="h-56 flex items-center justify-center text-gray-500 text-sm">No data for selected period</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ordersBar} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip {...tooltipStyle} formatter={v => [v, 'Orders']} />
                <Bar dataKey="Orders" radius={[6, 6, 0, 0]}>
                  {ordersBar.map((_, idx) => (
                    <Cell key={idx} fill={BAR_COLORS[idx % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Section>
      </div>

      {/* ── Category Pie + Top Products ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Donut Chart — Revenue by Category */}
        <Section title="Revenue by Category">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : categoryPie.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-500 text-sm">No order item data yet</div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={categoryPie}
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={90}
                    dataKey="value"
                    labelLine={false}
                    label={DonutLabel}
                    paddingAngle={3}
                  >
                    {categoryPie.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[entry.name] || COLORS.Other} />
                    ))}
                  </Pie>
                  <Tooltip {...tooltipStyle} formatter={v => [`$${Number(v).toFixed(2)}`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 min-w-max">
                {categoryPie.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ background: COLORS[entry.name] || COLORS.Other }} />
                    <span className="text-gray-300">{entry.name}</span>
                    <span className="text-gray-500 ml-auto pl-4">${Number(entry.value).toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* Horizontal Bar Chart — Top Products */}
        <Section title="Top Selling Products">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : topProducts.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-500 text-sm">No order item data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={Math.max(220, topProducts.length * 36)}>
              <BarChart data={topProducts} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#D1D5DB', fontSize: 11 }} axisLine={false} tickLine={false} width={110} />
                <Tooltip {...tooltipStyle} formatter={v => [`$${v}`, 'Revenue']} />
                <Bar dataKey="revenue" radius={[0, 6, 6, 0]}>
                  {topProducts.map((_, idx) => (
                    <Cell key={idx} fill={idx === 0 ? GOLD : `rgba(212,175,55,${0.7 - idx * 0.06})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Section>
      </div>

      {/* ── Recent Orders Table ── */}
      <Section title="Recent Orders">
        {loading ? (
          <div className="h-32 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-3 text-gray-500">
            <Package className="h-10 w-10 opacity-30" />
            <span className="text-sm">No orders in this period</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Order ID', 'Customer', 'Amount', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left text-[10px] uppercase tracking-widest text-gray-500 pb-3 pr-6 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 pr-6 font-mono text-luxury-gold text-xs">{order.id}</td>
                    <td className="py-3 pr-6 text-white">{order.customer}</td>
                    <td className="py-3 pr-6 text-white font-semibold">${Number(order.amount || 0).toFixed(2)}</td>
                    <td className="py-3 pr-6"><StatusBadge status={order.status} /></td>
                    <td className="py-3 text-gray-400 text-xs">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

    </div>
  );
}
