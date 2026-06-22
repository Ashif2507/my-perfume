import React from 'react';
import { allProductsData } from '../../data/products';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminProducts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl text-white">Manage Products</h1>
        <button className="btn-gold px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="bg-luxury-card border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-luxury-accent/50 text-xs uppercase text-gray-400 border-b border-white/5">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {allProductsData.slice(0, 8).map((product) => (
              <tr key={product.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-luxury-accent overflow-hidden">
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-[10px] text-gray-500">{product.type}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}.00</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-rose-500 bg-white/5 rounded transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
