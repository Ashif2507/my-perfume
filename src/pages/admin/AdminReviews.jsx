import React, { useState } from 'react';
import { Search, Filter, Star, CheckCircle, XCircle, Trash2, Check } from 'lucide-react';

const initialReviews = [
  { id: 'R-101', customer: 'Emma Watson', product: "Aura Rose D'Or", rating: 5, comment: "Absolutely stunning fragrance! The packaging is just as luxurious as the scent itself. Will buy again.", date: '2023-10-25', status: 'Approved' },
  { id: 'R-102', customer: 'James Bond', product: "Amber Oud Mystique", rating: 4, comment: "Very deep and sophisticated. Doesn't last quite as long on my skin as I hoped, but still excellent.", date: '2023-10-24', status: 'Pending' },
  { id: 'R-103', customer: 'Bruce Wayne', product: "Sandalwood Noir", rating: 5, comment: "My new signature scent. It's bold, dark, and perfectly balanced. The compliments never stop.", date: '2023-10-22', status: 'Approved' },
  { id: 'R-104', customer: 'Lex Luthor', product: "Citrus Splash", rating: 2, comment: "Too bright for my taste. The top notes fade very quickly leaving a very generic base. Disappointing.", date: '2023-10-20', status: 'Rejected' },
  { id: 'R-105', customer: 'Diana Prince', product: "Imperial Vetiver", rating: 5, comment: "Truly regal. A masterpiece of perfumery that makes you feel incredibly powerful when wearing it.", date: '2023-10-18', status: 'Pending' },
];

export default function AdminReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || review.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  };

  const handleReject = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved': return <span className="flex items-center gap-1 w-max px-2 py-1 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-bold"><CheckCircle className="h-3 w-3" /> Approved</span>;
      case 'Pending': return <span className="flex items-center gap-1 w-max px-2 py-1 text-[10px] rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest font-bold"><CheckCircle className="h-3 w-3 opacity-50" /> Pending</span>;
      case 'Rejected': return <span className="flex items-center gap-1 w-max px-2 py-1 text-[10px] rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-widest font-bold"><XCircle className="h-3 w-3" /> Rejected</span>;
      default: return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-serif text-3xl text-white">Review Moderation</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <input 
              type="text" 
              placeholder="Search reviews..." 
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
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-luxury-card border border-white/5 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row gap-6">
              
              {/* Review Info */}
              <div className="flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-medium">{review.customer} <span className="text-gray-500 font-normal text-sm ml-2">on</span> <span className="text-luxury-gold font-serif">{review.product}</span></h3>
                    <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                  </div>
                  {getStatusBadge(review.status)}
                </div>

                <div className="flex items-center gap-1 text-luxury-gold mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-600'}`} />
                  ))}
                </div>

                <p className="text-sm text-gray-300 font-light italic bg-white/5 p-4 rounded-lg border border-white/5">
                  "{review.comment}"
                </p>
              </div>

              {/* Actions */}
              <div className="md:w-32 flex flex-row md:flex-col justify-end md:justify-center gap-2 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                {review.status !== 'Approved' && (
                  <button onClick={() => handleApprove(review.id)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors uppercase tracking-widest font-bold">
                    <Check className="h-3 w-3" /> Approve
                  </button>
                )}
                {review.status !== 'Rejected' && (
                  <button onClick={() => handleReject(review.id)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-colors uppercase tracking-widest font-bold">
                    <XCircle className="h-3 w-3" /> Reject
                  </button>
                )}
                <button onClick={() => handleDelete(review.id)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-colors uppercase tracking-widest font-bold mt-auto">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="bg-luxury-card border border-white/5 rounded-2xl p-12 text-center">
            <p className="text-gray-500">No reviews found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
