import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Phone, ShieldCheck, Ban } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredCustomers = dummyCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-serif text-3xl text-white">Customer Database</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <input 
              type="text" 
              placeholder="Search customers..." 
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
              <option value="Active">Active</option>
              <option value="VIP">VIP</option>
              <option value="Suspended">Suspended</option>
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
                          <Phone className="h-3 w-3" /> {customer.phone}
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
                      <button className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No customers found matching your criteria.
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
