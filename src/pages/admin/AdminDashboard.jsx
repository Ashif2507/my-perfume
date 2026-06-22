import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Revenue', value: '$124,500', icon: DollarSign, trend: '+12.5%' },
    { title: 'Total Orders', value: '1,245', icon: ShoppingBag, trend: '+8.2%' },
    { title: 'Active Customers', value: '8,520', icon: Users, trend: '+15.3%' },
    { title: 'Conversion Rate', value: '4.6%', icon: TrendingUp, trend: '+1.1%' },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white tracking-wide mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-luxury-card border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-luxury-accent/50 rounded-lg">
                  <Icon className="h-6 w-6 text-luxury-gold" />
                </div>
                <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-1 rounded">
                  {stat.trend}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
              <h3 className="text-2xl font-serif text-white">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="bg-luxury-card border border-white/5 rounded-2xl p-6 h-96 flex items-center justify-center">
        <p className="text-gray-500 font-light">Sales Chart Visualization Placeholder</p>
      </div>
    </div>
  );
}
