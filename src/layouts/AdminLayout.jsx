import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-luxury-dark text-gray-100 flex font-sans selection:bg-luxury-gold selection:text-luxury-dark">
      <AdminSidebar />
      <main className="flex-grow p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
