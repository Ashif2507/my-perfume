import React, { useState } from 'react';
import { allProductsData } from '../../data/products';
import { Plus, Edit2, Trash2, Search, Filter, X, Check, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

import floralImg from '../../assets/images/perfume_floral.png';
import woodyImg from '../../assets/images/perfume_woody.png';
import orientalImg from '../../assets/images/perfume_oriental.png';
import freshImg from '../../assets/images/perfume_fresh.png';

const categoryImages = {
  Floral: floralImg,
  Woody: woodyImg,
  Oriental: orientalImg,
  Fresh: freshImg
};

export default function AdminProducts() {
  const [products, setProducts] = useState(allProductsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null means "adding new"
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    type: 'Eau de Parfum',
    price: 150,
    category: 'Floral',
    notes: '',
    desc: ''
  });

  const categories = ['Floral', 'Oriental', 'Woody', 'Fresh'];

  // Filtered list
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (product.notes && product.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Open modal for editing
  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      type: product.type || 'Eau de Parfum',
      price: product.price,
      category: product.category || 'Floral',
      notes: product.notes || '',
      desc: product.desc || product.description || ''
    });
    setIsModalOpen(true);
  };

  // Open modal for adding
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      type: 'Eau de Parfum',
      price: 150,
      category: 'Floral',
      notes: '',
      desc: ''
    });
    setIsModalOpen(true);
  };

  // Save/Update handler
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }

    if (editingProduct) {
      // Edit mode
      setProducts(prev => prev.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: formData.name,
            type: formData.type,
            price: Number(formData.price),
            category: formData.category,
            notes: formData.notes,
            desc: formData.desc,
            image: categoryImages[formData.category] || p.image
          };
        }
        return p;
      }));
      toast.success('Product updated successfully', {
        style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' }
      });
    } else {
      // Add mode
      const newProduct = {
        id: `p-${Date.now()}`,
        name: formData.name,
        type: formData.type,
        price: Number(formData.price),
        category: formData.category,
        notes: formData.notes,
        desc: formData.desc,
        rating: 5.0,
        reviews: 0,
        image: categoryImages[formData.category] || floralImg,
        badge: 'New',
        badgeColor: 'bg-emerald-500 text-luxury-dark'
      };
      setProducts(prev => [newProduct, ...prev]);
      toast.success('Product added successfully', {
        style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' }
      });
    }
    setIsModalOpen(false);
  };

  // Delete handler
  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirmId(null);
    toast.error('Product deleted from database', {
      style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' }
    });
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">Manage Products</h1>
          <p className="text-xs text-gray-400 mt-1">Configure your luxury perfume inventory catalog</p>
        </div>
        <button 
          onClick={openAddModal}
          className="btn-gold px-4 py-2 rounded-lg flex items-center gap-2 text-sm cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search catalog..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-luxury-card border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-luxury-gold transition-colors"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div className="relative w-full md:w-auto self-end md:self-auto">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="appearance-none w-full md:w-48 bg-luxury-card border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-luxury-gold transition-colors cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-luxury-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300 whitespace-nowrap">
            <thead className="bg-luxury-accent/50 text-xs uppercase tracking-widest text-gray-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Notes</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-luxury-accent overflow-hidden flex items-center justify-center p-1 border border-white/5">
                          <img src={product.image} alt="" className="w-full h-full object-cover rounded" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{product.name}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">{product.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 text-xs rounded bg-white/5 border border-white/10 text-gray-300">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-serif font-semibold text-white">${product.price}.00</td>
                    <td className="px-6 py-4 text-xs text-gray-400 max-w-xs truncate">{product.notes || '—'}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-bold">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(product)}
                          className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-500 bg-white/5 rounded transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-dark/80 backdrop-blur-md animate-fade-in">
          <div className="bg-luxury-card border border-luxury-gold/30 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
              <h2 className="font-serif text-xl text-white">
                {editingProduct ? 'Edit Fragrance Details' : 'Add New Fragrance'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Fragrance Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold"
                    placeholder="e.g. Aura Gold Oud"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Scent Family</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold cursor-pointer"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Price ($ USD)</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Concentration</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold cursor-pointer"
                  >
                    <option value="Eau de Parfum">Eau de Parfum</option>
                    <option value="Extrait de Parfum">Extrait de Parfum</option>
                    <option value="Eau de Toilette">Eau de Toilette</option>
                    <option value="Eau de Cologne">Eau de Cologne</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Olfactory Notes (Comma Separated)</label>
                  <input 
                    type="text" 
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold"
                    placeholder="e.g. Sicilian Bergamot, Rose Absolute, White Musk"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1.5 font-medium">Description</label>
                  <textarea 
                    value={formData.desc}
                    onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
                    className="w-full bg-luxury-accent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-luxury-gold h-20 resize-none"
                    placeholder="Describe the fragrance narrative and performance..."
                  />
                </div>
              </div>

              {/* Action buttons */}
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
                  Save Fragrance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Alert */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-dark/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-luxury-card border border-rose-500/30 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center animate-scale-up">
            <AlertTriangle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-white mb-2">Delete Product?</h3>
            <p className="text-xs text-gray-400 mb-6">
              This action cannot be undone. The perfume will be permanently removed from the storefront catalog.
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
