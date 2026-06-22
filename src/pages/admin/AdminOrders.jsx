import React, { useState } from 'react';
import { Search, Filter, Eye, MoreHorizontal, CheckCircle, XCircle, Clock, Truck } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = dummyOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Delivered': return <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-bold"><CheckCircle className="h-3 w-3" /> Delivered</span>;
      case 'Processing': return <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest font-bold"><Truck className="h-3 w-3" /> Processing</span>;
      case 'Pending': return <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest font-bold"><Clock className="h-3 w-3" /> Pending</span>;
      case 'Cancelled': return <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-widest font-bold"><XCircle className="h-3 w-3" /> Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-serif text-3xl text-white">Order Management</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-luxury-card border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-luxury-gold transition-colors"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-luxury-card border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-luxury-gold transition-colors cursor-pointer"
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
      </div>

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
                        <button className="p-1.5 text-gray-400 hover:text-luxury-gold bg-white/5 rounded transition-colors" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded transition-colors" title="More Options">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
