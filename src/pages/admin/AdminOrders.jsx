import React, { useState } from 'react';
import { Search, Filter, Eye, Edit2, Trash2, X, Check, Clock, Truck, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const dummyOrders = [
  { id: 'ORD-1029', customer: 'Emma Watson', items: 3, total: 485, date: '2023-10-24', status: 'Delivered', payment: 'Paid' },
  { id: 'ORD-1030', customer: 'James Bond', items: 1, total: 195, date: '2023-10-25', status: 'Processing', payment: 'Paid' },
  { id: 'ORD-1031', customer: 'Bruce Wayne', items: 5, total: 820, date: '2023-10-25', status: 'Pending', payment: 'Unpaid' },
  { id: 'ORD-1032', customer: 'Tony Stark', items: 2, total: 320, date: '2023-10-26', status: 'Cancelled', payment: 'Refunded' },
  { id: 'ORD-1033', customer: 'Natasha R.', items: 1, total: 145, date: '2023-10-26', status: 'Delivered', payment: 'Paid' },
  { id: 'ORD-1034', customer: 'Clark Kent', items: 4, total: 610, date: '2023-10-27', status: 'Processing', payment: 'Paid' },
  { id: 'ORD-1035', customer: 'Diana Prince', items: 2, total: 290, date: '2023-10-27', status: 'Delivered', payment: 'Paid' },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(dummyOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    customer: '',
    items: 1,
    total: 100,
    status: 'Pending',
    payment: 'Unpaid'
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Delivered': return <span className="flex items-center gap-1 w-max px-2.5 py-1 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-bold"><CheckCircle className="h-3 w-3" /> Delivered</span>;
      case 'Processing': return <span className="flex items-center gap-1 w-max px-2.5 py-1 text-[10px] rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest font-bold"><Truck className="h-3 w-3" /> Processing</span>;
      case 'Pending': return <span className="flex items-center gap-1 w-max px-2.5 py-1 text-[10px] rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest font-bold"><Clock className="h-3 w-3" /> Pending</span>;
      case 'Cancelled': return <span className="flex items-center gap-1 w-max px-2.5 py-1 text-[10px] rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-widest font-bold"><XCircle className="h-3 w-3" /> Cancelled</span>;
      default: return null;
    }
  };

  // Edit action
  const openEditModal = (order) => {
    setEditingOrder(order);
    setFormData({
      customer: order.customer,
      items: order.items,
      total: order.total,
      status: order.status,
      payment: order.payment
    });
    setIsModalOpen(true);
  };

  // Save action
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.customer.trim()) {
      toast.error('Customer name is required');
      return;
    }

    setOrders(prev => prev.map(o => {
      if (o.id === editingOrder.id) {
        return {
          ...o,
          customer: formData.customer,
          items: Number(formData.items),
          total: Number(formData.total),
          status: formData.status,
          payment: formData.payment
        };
      }
      return o;
    }));

    toast.success('Order status updated successfully', {
      style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' }
    });
    setIsModalOpen(false);
  };

  // Delete action
  const handleDelete = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    setDeleteConfirmId(null);
    toast.error('Order deleted from database', {
      style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' }
    });
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">Order Management</h1>
          <p className="text-xs text-gray-400 mt-1">Fulfill packaging requests, update payment files, and track logs</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 w-full">
        <div className="relative w-full sm:w-80">
          <input 
            type="text" 
            placeholder="Search orders..." 
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
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-luxury-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300 whitespace-nowrap">
            <thead className="bg-luxury-accent/50 text-xs uppercase tracking-widest text-gray-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Items</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-400">{order.date}</td>
                    <td className="px-6 py-4">{order.items} items</td>
                    <td className="px-6 py-4 font-serif font-semibold text-white">${order.total}.00</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] uppercase tracking-wider font-bold ${order.payment === 'Paid' ? 'text-emerald-400' : order.payment === 'Refunded' ? 'text-gray-400' : 'text-amber-400'}`}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEditModal(order)}
                          className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded transition-colors"
                          title="Edit Order"
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
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-dark/80 backdrop-blur-md animate-fade-in">
          <div className="bg-luxury-card border border-luxury-gold/30 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-scale-up">
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
              <h2 className="font-serif text-xl text-white">Edit Order Details ({editingOrder.id})</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Customer Name</label>
                <input 
                  type="text" 
                  value={formData.customer}
                  onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                  className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Total Items</label>
                  <input 
                    type="number" 
                    value={formData.items}
                    onChange={(e) => setFormData(prev => ({ ...prev, items: e.target.value }))}
                    className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Total Price ($)</label>
                  <input 
                    type="number" 
                    value={formData.total}
                    onChange={(e) => setFormData(prev => ({ ...prev, total: e.target.value }))}
                    className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Payment Status</label>
                  <select 
                    value={formData.payment}
                    onChange={(e) => setFormData(prev => ({ ...prev, payment: e.target.value }))}
                    className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold cursor-pointer"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Order Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-widest font-semibold border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-gold px-5 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-dark/80 backdrop-blur-md animate-fade-in">
          <div className="bg-luxury-card border border-rose-500/30 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center animate-scale-up">
            <AlertTriangle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-white mb-2">Delete Order Archive?</h3>
            <p className="text-xs text-gray-400 mb-6">
              Are you sure you want to permanently delete this order record? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs uppercase tracking-widest border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs uppercase tracking-widest bg-rose-600 border border-rose-500 text-white rounded-lg hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
