import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, ShieldCheck, Ban, Edit2, Trash2, X, Check, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const dummyCustomers = [
  { id: 'C-001', name: 'Emma Watson', email: 'emma.w@example.com', phone: '+1 (555) 123-4567', orders: 12, spent: 2450, status: 'Active', joined: '2022-01-15' },
  { id: 'C-002', name: 'James Bond', email: 'james.b@example.com', phone: '+44 7700 900077', orders: 4, spent: 890, status: 'Active', joined: '2023-03-22' },
  { id: 'C-003', name: 'Bruce Wayne', email: 'b.wayne@wayneent.com', phone: '+1 (555) 000-0001', orders: 45, spent: 12500, status: 'VIP', joined: '2021-11-05' },
  { id: 'C-004', name: 'Tony Stark', email: 'tony@stark.com', phone: '+1 (555) 999-8888', orders: 32, spent: 8400, status: 'VIP', joined: '2021-08-12' },
  { id: 'C-005', name: 'Natasha R.', email: 'natasha@example.com', phone: '+1 (555) 444-5555', orders: 1, spent: 145, status: 'Active', joined: '2023-10-26' },
  { id: 'C-006', name: 'Lex Luthor', email: 'lex@lexcorp.com', phone: '+1 (555) 666-7777', orders: 2, spent: 450, status: 'Suspended', joined: '2022-05-18' },
  { id: 'C-007', name: 'Diana Prince', email: 'diana.p@example.com', phone: '+1 (555) 333-2222', orders: 8, spent: 1680, status: 'Active', joined: '2022-09-30' },
];

export default function AdminCustomers() {
  const [customers, setCustomers] = useState(dummyCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active'
  });

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <span className="px-2 py-1 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-bold">Active</span>;
      case 'VIP': return <span className="flex items-center gap-1 w-max px-2 py-1 text-[10px] rounded bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 uppercase tracking-widest font-bold"><ShieldCheck className="h-3 w-3" /> VIP</span>;
      case 'Suspended': return <span className="flex items-center gap-1 w-max px-2 py-1 text-[10px] rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-widest font-bold"><Ban className="h-3 w-3" /> Suspended</span>;
      default: return null;
    }
  };

  // Edit action
  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status
    });
    setIsModalOpen(true);
  };

  // Save action
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Name and Email are required');
      return;
    }

    setCustomers(prev => prev.map(c => {
      if (c.id === editingCustomer.id) {
        return {
          ...c,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          status: formData.status
        };
      }
      return c;
    }));

    toast.success('Customer profile updated', {
      style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' }
    });
    setIsModalOpen(false);
  };

  // Delete action
  const handleDelete = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    setDeleteConfirmId(null);
    toast.error('Customer removed from database', {
      style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' }
    });
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">Customer Database</h1>
          <p className="text-xs text-gray-400 mt-1">Manage user profiles, activity metrics, and account status</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 w-full">
        <div className="relative w-full sm:w-80">
          <input 
            type="text" 
            placeholder="Search customers..." 
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
            <option value="Active">Active</option>
            <option value="VIP">VIP</option>
            <option value="Suspended">Suspended</option>
          </select>
          <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-luxury-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300 whitespace-nowrap">
            <thead className="bg-luxury-accent/50 text-xs uppercase tracking-widest text-gray-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Contact Info</th>
                <th className="px-6 py-4 font-semibold">Orders</th>
                <th className="px-6 py-4 font-semibold">Total Spent</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-luxury-gold/20 text-luxury-gold flex items-center justify-center font-serif font-bold text-lg border border-luxury-gold/30">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{customer.name}</p>
                          <p className="text-[10px] text-gray-500">{customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Mail className="h-3 w-3" /> {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Phone className="h-3 w-3" /> {customer.phone || '—'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{customer.orders}</td>
                    <td className="px-6 py-4 font-serif font-semibold text-white">${customer.spent.toLocaleString()}.00</td>
                    <td className="px-6 py-4 text-gray-400">{customer.joined}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEditModal(customer)}
                          className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded transition-colors"
                          title="Edit Customer"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirmId(customer.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-500 bg-white/5 rounded transition-colors"
                          title="Delete Customer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-dark/80 backdrop-blur-md animate-fade-in">
          <div className="bg-luxury-card border border-luxury-gold/30 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-scale-up">
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
              <h2 className="font-serif text-xl text-white">Edit Customer Profile</h2>
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
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Membership Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="VIP">VIP</option>
                  <option value="Suspended">Suspended</option>
                </select>
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
            <h3 className="font-serif text-lg text-white mb-2">Remove Customer?</h3>
            <p className="text-xs text-gray-400 mb-6">
              Are you sure you want to permanently delete this customer profile? This will wipe their transaction history.
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
