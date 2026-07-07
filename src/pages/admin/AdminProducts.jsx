import { useState, useEffect } from 'react';
import { allProductsData } from '../../data/products';
import { Plus, Edit2, Trash2, Search, Filter, X, Check, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useSupabaseData } from '../../hooks/useSupabaseData';
import { supabase } from '../../supabaseClient';

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
  const { data: fetchedProducts } = useSupabaseData('products', allProductsData);
  const [products, setProducts] = useState(allProductsData);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

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
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }

    try {
      if (editingProduct) {
        // Edit mode — never overwrite the existing image
        const updatedObj = {
          name:        formData.name,
          type:        formData.type,
          price:       Number(formData.price),
          category:    formData.category,
          notes:       formData.notes,
          description: formData.desc,
        };
        const { error } = await supabase
          .from('products')
          .update(updatedObj)
          .eq('id', editingProduct.id);
        if (error) throw error;

        setProducts(prev =>
          prev.map(p => p.id === editingProduct.id ? { ...p, ...updatedObj } : p)
        );
        toast.success('Product updated successfully', {
          style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' }
        });
      } else {
        // Add mode
        const { data: { user } } = await supabase.auth.getUser();
        const newProduct = {
          id:          `p-${Date.now()}`,
          user_id:     user?.id || null,
          name:        formData.name,
          type:        formData.type,
          price:       Number(formData.price),
          category:    formData.category,
          notes:       formData.notes,
          description: formData.desc,
          rating:      5.0,
          reviews:     0,
          badge:       'New',
          badge_color: 'bg-emerald-500 text-luxury-dark',
        };
        const { error } = await supabase.from('products').insert([newProduct]);
        if (error) throw error;
        setProducts(prev => [newProduct, ...prev]);
        toast.success('Product added successfully', {
          style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' }
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save: ' + (error.message || 'Unknown error'));
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await supabase.from('products').delete().eq('id', id);
      setProducts(prev => prev.filter(p => p.id !== id));
      setDeleteConfirmId(null);
      toast.error('Product deleted from database', { style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' } });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
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

      {/* Catalog — Column header */}
      <div className="hidden lg:grid grid-cols-[2fr_1fr_0.8fr_2fr_0.8fr_1fr] gap-4 items-center px-5 py-2 text-[10px] uppercase tracking-widest text-gray-500 font-semibold border-b border-white/5">
        <span>Product</span>
        <span>Category</span>
        <span>Price</span>
        <span>Notes</span>
        <span>Status</span>
        <span className="text-center">Actions</span>
      </div>

      {/* Catalog — rows */}
      <div className="space-y-2">
        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
          <div key={product.id} className="bg-luxury-card border border-white/5 rounded-2xl px-5 py-4 hover:border-luxury-gold/20 transition-all group">

            {/* Desktop layout */}
            <div className="hidden lg:grid grid-cols-[2fr_1fr_0.8fr_2fr_0.8fr_1fr] gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-luxury-accent overflow-hidden border border-white/5 shrink-0">
                  <img src={product.image || categoryImages[product.category] || floralImg} alt={product.name} className="w-full h-full object-cover" onError={e => { e.target.src = categoryImages[product.category] || floralImg; }} />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{product.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{product.type}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-300 w-max">{product.category}</span>
              <span className="font-serif font-semibold text-white text-sm">${product.price}.00</span>
              <span className="text-xs text-gray-400 truncate">{product.notes || '—'}</span>
              <span className="px-2.5 py-1 text-[10px] rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-bold w-max">Active</span>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => openEditModal(product)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/30 hover:bg-luxury-gold/20 rounded-lg transition-all whitespace-nowrap">
                  <Edit2 className="h-3 w-3 shrink-0" /> Edit
                </button>
                <button onClick={() => setDeleteConfirmId(product.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 rounded-lg transition-all whitespace-nowrap">
                  <Trash2 className="h-3 w-3 shrink-0" /> Delete
                </button>
              </div>
            </div>

            {/* Mobile / tablet layout */}
            <div className="flex lg:hidden items-start gap-3">
              <div className="w-14 h-14 rounded-xl bg-luxury-accent overflow-hidden border border-white/5 shrink-0">
                <img src={product.image || categoryImages[product.category] || floralImg} alt={product.name} className="w-full h-full object-cover" onError={e => { e.target.src = categoryImages[product.category] || floralImg; }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">{product.name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{product.type}</p>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-luxury-gold font-serif font-semibold">${product.price}.00</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">{product.category}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-bold text-[10px]">Active</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{product.notes || '—'}</p>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <button onClick={() => openEditModal(product)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/30 rounded-lg whitespace-nowrap">
                  <Edit2 className="h-3 w-3" /> Edit
                </button>
                <button onClick={() => setDeleteConfirmId(product.id)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg whitespace-nowrap">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>

          </div>
        )) : (
          <div className="bg-luxury-card border border-white/5 rounded-2xl px-6 py-12 text-center text-gray-500">
            No products found.
          </div>
        )}
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
