
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Star, LogOut, Sparkles } from 'lucide-react';

export default function AdminSidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
  ];

  return (
    <aside className="w-64 bg-luxury-card border-r border-white/5 flex flex-col h-screen sticky top-0">
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-luxury-gold" />
          <span className="font-serif text-xl font-bold tracking-[0.2em] text-white">
            AURA <span className="text-luxury-gold text-sm tracking-widest block font-sans font-normal mt-0.5">Admin Portal</span>
          </span>
        </div>
      </div>

      <div className="flex-grow py-8 px-4 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-luxury-gold/10 text-luxury-gold font-medium border border-luxury-gold/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Exit to Store
        </NavLink>
      </div>
    </aside>
  );
}
