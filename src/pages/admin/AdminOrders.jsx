import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Edit2, Trash2, X, Check, Clock, Truck, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../../supabaseClient';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({ status: 'Processing' });

  // ── Fetch orders from Supabase ──
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('AdminOrders: Fetched', data?.length, 'orders from Supabase');
      setOrders(data || []);
    } catch (err) {
      console.error('AdminOrders: Failed to fetch orders:', err.message);
      toast.error('Failed to load orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, [fetchOrders]);

  // ── Helpers ──
  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const filteredOrders = orders.filter(order => {
    const id = (order.id || '').toLowerCase();
    const name = (order.customer_name || '').toLowerCase();
    const email = (order.customer_email || '').toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchesSearch = id.includes(term) || name.includes(term) || email.includes(term);
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':  return <span className="flex items-center gap-1 w-max px-2.5 py-1 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-bold"><CheckCircle className="h-3 w-3" /> Delivered</span>;
      case 'Processing': return <span className="flex items-center gap-1 w-max px-2.5 py-1 text-[10px] rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest font-bold"><Truck className="h-3 w-3" /> Processing</span>;
      case 'Pending':    return <span className="flex items-center gap-1 w-max px-2.5 py-1 text-[10px] rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest font-bold"><Clock className="h-3 w-3" /> Pending</span>;
      case 'Shipped':    return <span className="flex items-center gap-1 w-max px-2.5 py-1 text-[10px] rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-widest font-bold"><Truck className="h-3 w-3" /> Shipped</span>;
      case 'Cancelled':  return <span className="flex items-center gap-1 w-max px-2.5 py-1 text-[10px] rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-widest font-bold"><XCircle className="h-3 w-3" /> Cancelled</span>;
      default: return <span className="text-xs text-gray-400">{status || '—'}</span>;
    }
  };

  // ── Open Edit Modal ──
  const openEditModal = (order) => {
    setEditingOrder(order);
    setFormData({ status: order.status || 'Processing' });
    setIsModalOpen(true);
  };

  // ── Save (update status only) ──
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: formData.status })
        .eq('id', editingOrder.id);

      if (error) throw error;

      setOrders(prev => prev.map(o => o.id === editingOrder.id ? { ...o, status: formData.status } : o));
      toast.success('Order status updated', { style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' } });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error updating order:', err);
      toast.error('Failed to update: ' + err.message);
    }
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('orders').delete().eq('id', id);
      if (error) throw error;
      setOrders(prev => prev.filter(o => o.id !== id));
      setDeleteConfirmId(null);
      toast.success('Order deleted', { style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' } });
    } catch (err) {
      console.error('Error deleting order:', err);
      toast.error('Failed to delete: ' + err.message);
    }
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">Order Management</h1>
          <p className="text-xs text-gray-400 mt-1">
            {loading ? 'Loading...' : `${orders.length} orders from Supabase`}
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-xs uppercase tracking-widest text-gray-400 hover:text-white hover:border-luxury-gold transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 w-full">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-luxury-card border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-luxury-gold transition-colors"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div className="relative w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none w-full sm:w-48 bg-luxury-card border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-luxury-gold transition-colors cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-luxury-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300 whitespace-nowrap">
            <thead className="bg-luxury-accent/50 text-xs uppercase tracking-widest text-gray-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-500">
                      <RefreshCw className="h-8 w-8 animate-spin text-luxury-gold" />
                      <p className="text-sm">Loading orders from Supabase...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-medium text-luxury-gold text-xs tracking-wider">
                      {order.id?.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{order.customer_name || '—'}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{order.customer_email || '—'}</td>
                    <td className="px-6 py-4 text-gray-400">{formatDate(order.created_at)}</td>
                    <td className="px-6 py-4 font-serif font-semibold text-white">
                      ${Number(order.total_amount || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal(order)}
                          className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded transition-colors"
                          title="Update Status"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(order.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-500 bg-white/5 rounded transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-500">
                      <Search className="h-8 w-8" />
                      <p className="text-sm">
                        {orders.length === 0
                          ? 'No orders in Supabase yet. Place an order from the storefront!'
                          : 'No orders match your search.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Status Modal */}
      {isModalOpen && editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-dark/80 backdrop-blur-md animate-fade-in">
          <div className="bg-luxury-card border border-luxury-gold/30 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-scale-up">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
              <div>
                <h2 className="font-serif text-xl text-white">Update Order Status</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {editingOrder.customer_name} · #{editingOrder.id?.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-medium">Order Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ status: e.target.value })}
                  className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="text-xs text-gray-500 bg-luxury-accent/30 rounded-lg p-3">
                <p><span className="text-gray-400">Customer:</span> {editingOrder.customer_name}</p>
                <p><span className="text-gray-400">Email:</span> {editingOrder.customer_email}</p>
                <p><span className="text-gray-400">Total:</span> ${Number(editingOrder.total_amount || 0).toFixed(2)}</p>
                <p><span className="text-gray-400">Placed:</span> {formatDate(editingOrder.created_at)}</p>
              </div>
              <div className="flex gap-3 justify-end pt-2 border-t border-white/5">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-widest font-semibold border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="btn-gold px-5 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-dark/80 backdrop-blur-md animate-fade-in">
          <div className="bg-luxury-card border border-rose-500/30 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center animate-scale-up">
            <AlertTriangle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-white mb-2">Delete Order?</h3>
            <p className="text-xs text-gray-400 mb-6">
              This will permanently remove the order from Supabase. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs uppercase tracking-widest border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs uppercase tracking-widest bg-rose-600 border border-rose-500 text-white rounded-lg hover:bg-rose-700 transition-colors">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
