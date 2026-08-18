import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Edit,
  Trash2,
  Calendar,
  X,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { Coupon } from '@/types/admin';

export const CouponsManager: React.FC = () => {
  const { coupons, createCoupon, updateCoupon, toggleCoupon, deleteCoupon } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed' | 'free_shipping',
    discountValue: 15,
    minOrderValue: 0,
    maxDiscount: 0,
    usageLimit: 500,
    expiryDate: '2027-12-31',
    isActive: true,
  });

  const handleOpenAddModal = () => {
    setEditingCoupon(null);
    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: 15,
      minOrderValue: 0,
      maxDiscount: 0,
      usageLimit: 500,
      expiryDate: '2027-12-31',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (c: Coupon) => {
    setEditingCoupon(c);
    setFormData({
      code: c.code,
      discountType: c.discountType,
      discountValue: c.discountValue,
      minOrderValue: c.minOrderValue || 0,
      maxDiscount: c.maxDiscount || 0,
      usageLimit: c.usageLimit || 500,
      expiryDate: c.expiryDate || '2027-12-31',
      isActive: c.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      code: formData.code.toUpperCase().trim(),
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue) || 0,
      minOrderValue: Number(formData.minOrderValue) || 0,
      maxDiscount: formData.maxDiscount && Number(formData.maxDiscount) > 0 ? Number(formData.maxDiscount) : undefined,
      usageLimit: Number(formData.usageLimit) || 500,
      expiryDate: formData.expiryDate || '2027-12-31',
      isActive: formData.isActive,
    };

    if (editingCoupon) {
      updateCoupon({
        ...payload,
        id: editingCoupon.id,
        usedCount: editingCoupon.usedCount || 0,
      });
    } else {
      createCoupon(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#231F1B] p-5 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white">
            Promotions & Coupon Code Management
          </h2>
          <p className="text-xs text-[#736B60] dark:text-[#A69C8F] mt-0.5">
            Configure discount vouchers, percentage off deals, free shipping offers, and usage caps
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9C5B23] to-[#80481A] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {coupons.map((coupon: Coupon) => (
          <div
            key={coupon.id}
            className={`p-5 rounded-2xl border transition-all relative overflow-hidden bg-white dark:bg-[#231F1B] ${
              coupon.isActive
                ? 'border-[#9C5B23]/40 shadow-sm'
                : 'border-dashed border-gray-300 dark:border-neutral-800 opacity-60'
            }`}
          >
            
            {/* Top Badge & Code */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#9C5B23]/10 text-[#9C5B23] dark:text-[#E9BE5F]">
                  <Tag className="w-4 h-4" />
                </div>
                <span className="font-mono text-base font-extrabold text-[#231F1B] dark:text-white tracking-widest uppercase">
                  {coupon.code}
                </span>
              </div>
              <button
                onClick={() => toggleCoupon(coupon.id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition-colors ${
                  coupon.isActive
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                }`}
              >
                {coupon.isActive ? 'ACTIVE' : 'INACTIVE'}
              </button>
            </div>

            {/* Discount Summary */}
            <div className="mb-4">
              <div className="text-2xl font-extrabold text-[#9C5B23] dark:text-[#E9BE5F]">
                {coupon.discountType === 'percentage' && `${coupon.discountValue}% OFF`}
                {coupon.discountType === 'fixed' && `₹${coupon.discountValue} OFF`}
                {coupon.discountType === 'free_shipping' && `FREE SHIPPING`}
              </div>
              <div className="text-xs text-[#736B60] dark:text-[#A69C8F] mt-1 font-medium">
                Min Order: ₹{coupon.minOrderValue}
                {coupon.maxDiscount ? ` • Max Cap: ₹${coupon.maxDiscount}` : ''}
              </div>
            </div>

            {/* Usage Progress */}
            <div className="space-y-1 mb-4 text-xs">
              <div className="flex justify-between text-[#736B60] dark:text-[#A69C8F] font-semibold">
                <span>Usage Progress:</span>
                <span>
                  {coupon.usedCount} / {coupon.usageLimit} Redemptions
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#F5EEDD] dark:bg-[#2A2621] overflow-hidden">
                <div
                  style={{ width: `${Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100)}%` }}
                  className="h-full bg-gradient-to-r from-[#9C5B23] to-[#E9BE5F]"
                />
              </div>
            </div>

            {/* Footer Date & Actions */}
            <div className="pt-3 border-t border-[#E7DFD3] dark:border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-[#736B60] dark:text-[#A69C8F] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Expires {coupon.expiryDate}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(coupon)}
                  className="p-1.5 rounded-lg bg-[#F5EEDD] dark:bg-[#2A2621] hover:bg-[#9C5B23] hover:text-white transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete coupon code ${coupon.code}?`)) {
                      deleteCoupon(coupon.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#FEFDF5] dark:bg-[#1F1C18] border border-[#E7DFD3] dark:border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#282823] dark:text-[#FEFDF5]">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white mb-5">
              {editingCoupon ? 'Edit Coupon Parameters' : 'Create Promotional Coupon'}
            </h2>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              
              {/* Code String */}
              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Coupon Code (Uppercase) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. FESTIVE20"
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-mono font-bold text-sm tracking-wider uppercase text-[#231F1B] dark:text-white"
                />
              </div>

              {/* Discount Type */}
              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Discount Type *
                </label>
                <select
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                >
                  <option value="percentage">Percentage OFF (%)</option>
                  <option value="fixed">Flat Amount OFF (₹)</option>
                  <option value="free_shipping">Free Shipping Offer</option>
                </select>
              </div>

              {/* Discount Value */}
              {formData.discountType !== 'free_shipping' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                      Discount Value *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                      className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                      Max Cap (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.maxDiscount}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                      className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* Min Order & Usage Limit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                    Min Order Value (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                    className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                    Usage Limit (Max Uses)
                  </label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                />
              </div>

              {/* Active Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 font-bold text-[#231F1B] dark:text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-[#9C5B23]"
                  />
                  <span>Activate Coupon Code Immediately</span>
                </label>
              </div>

              {/* Submit Footer */}
              <div className="pt-4 flex justify-end gap-3 border-t border-[#E7DFD3] dark:border-neutral-800">
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
                  {editingCoupon ? 'Save Coupon' : 'Create Coupon'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
