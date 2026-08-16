import React, { useState } from 'react';
import {
  Star,
  Pin,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { Testimonial } from '@/types';

export const ReviewsManager: React.FC = () => {
  const { testimonials, rejectReview, toggleFeaturedReview, addReview } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    comment: '',
    productName: 'Wild Forest Honey',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  });

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    addReview(formData);
    setIsModalOpen(false);
    setFormData({
      name: '',
      location: '',
      rating: 5,
      comment: '',
      productName: 'Wild Forest Honey',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#231F1B] p-5 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white">
            Customer Reviews & Testimonials Moderation
          </h2>
          <p className="text-xs text-[#736B60] dark:text-[#A69C8F] mt-0.5">
            Approve verified buyer reviews, pin testimonials to homepage, or moderate submissions
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9C5B23] to-[#80481A] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Review</span>
        </button>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((rev: Testimonial & { isApproved?: boolean; isFeatured?: boolean }) => (
          <div
            key={rev.id}
            className={`p-5 rounded-2xl border bg-white dark:bg-[#231F1B] transition-all space-y-4 ${
              rev.isFeatured
                ? 'border-[#9C5B23] ring-1 ring-[#9C5B23]/30 shadow-md'
                : 'border-[#E7DFD3] dark:border-neutral-800'
            }`}
          >
            
            {/* Top Row: Author & Rating */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E7DFD3]"
                />
                <div>
                  <div className="font-bold text-[#231F1B] dark:text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    {rev.isFeatured && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-bold flex items-center gap-1">
                        <Pin className="w-2.5 h-2.5" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F]">
                    {rev.location} • {rev.date}
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 bg-[#F5EEDD] dark:bg-[#2A2621] px-2 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-[#E9BE5F] text-[#E9BE5F]" />
                <span className="text-xs font-bold text-[#231F1B] dark:text-white">{rev.rating}.0</span>
              </div>
            </div>

            {/* Product Tag */}
            <div className="text-[11px] font-bold text-[#9C5B23] dark:text-[#E9BE5F] bg-[#9C5B23]/10 dark:bg-[#E9BE5F]/10 px-2.5 py-1 rounded-md inline-block">
              Item: {rev.productName}
            </div>

            {/* Comment */}
            <p className="text-xs text-[#3D3730] dark:text-[#E6DBCB] leading-relaxed italic">
              "{rev.comment}"
            </p>

            {/* Moderate Actions */}
            <div className="pt-3 border-t border-[#E7DFD3] dark:border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFeaturedReview(rev.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors ${
                    rev.isFeatured
                      ? 'bg-[#9C5B23] text-white'
                      : 'bg-[#F5EEDD] dark:bg-[#2A2621] text-[#231F1B] dark:text-white hover:bg-[#E9BE5F]/20'
                  }`}
                >
                  <Pin className="w-3 h-3" />
                  <span>{rev.isFeatured ? 'Pinned to Home' : 'Pin to Home'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  if (confirm(`Remove review by ${rev.name}?`)) {
                    rejectReview(rev.id);
                  }
                }}
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Delete Review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#FEFDF5] dark:bg-[#1F1C18] border border-[#E7DFD3] dark:border-neutral-800 rounded-3xl shadow-2xl p-6 text-[#282823] dark:text-[#FEFDF5]">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white mb-4">
              Add Verified Store Review
            </h2>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Location (City) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Product Purchased
                </label>
                <input
                  type="text"
                  required
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Review Comment *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Extremely pure product, delicious flavor..."
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-[#E7DFD3] dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#9C5B23] text-white font-bold shadow-md"
                >
                  Save Review
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
