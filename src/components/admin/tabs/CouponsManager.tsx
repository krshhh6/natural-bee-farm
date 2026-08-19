import React, { useState } from 'react';
import {
  TicketPercent,
  Plus,
  Edit,
  Trash2,
  Calendar,
  X,
  CheckCircle2,
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
    minOrderValue: 799,
    maxDiscount: 300,
    usageLimit: 500,
    expiryDate: '2026-12-31',
    isActive: true,
  });

  const handleOpenAddModal = () => {
    setEditingCoupon(null);
    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: 15,
      minOrderValue: 799,
      maxDiscount: 300,
      usageLimit: 500,
      expiryDate: '2026-12-31',
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
      minOrderValue: c.minOrderValue,
      maxDiscount: c.maxDiscount || 0,
      usageLimit: c.usageLimit,
      expiryDate: c.expiryDate,
      isActive: c.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      code: formData.code.toUpperCase().trim(),
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue),
      minOrderValue: Number(formData.minOrderValue),
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
      usageLimit: Number(formData.usageLimit),
      expiryDate: formData.expiryDate,
      isActive: formData.isActive,
    };

    if (editingCoupon) {
      updateCoupon({
        ...payload,
        id: editingCoupon.id,
        usedCount: editingCoupon.usedCount,
      });
    } else {
      createCoupon(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#111113] p-5 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Promotions & Coupon Code Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Configure discount vouchers, percentage off deals, free shipping offers, and usage caps
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-slate-900 text-xs font-semibold shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-900 dark:border-zinc-100"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon: Coupon) => (
          <div
            key={coupon.id}
            className={`p-5 rounded-xl border transition-all relative overflow-hidden bg-white dark:bg-[#111113] ${
              coupon.isActive
                ? 'border-slate-200/80 dark:border-zinc-800/80 shadow-2xs'
                : 'border-dashed border-slate-300 dark:border-zinc-800 opacity-60'
            }`}
          >
            
            {/* Top Badge & Code */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                  <TicketPercent className="w-4 h-4" />
                </div>
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-white tracking-wider uppercase">
                  {coupon.code}
                </span>
              </div>
              <button
                onClick={() => toggleCoupon(coupon.id)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold cursor-pointer transition-colors border ${
                  coupon.isActive
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40'
                    : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
                }`}
              >
                {coupon.isActive ? 'ACTIVE' : 'INACTIVE'}
              </button>
            </div>

            {/* Discount Summary */}
            <div className="mb-4">
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {coupon.discountType === 'percentage' && `${coupon.discountValue}% OFF`}
                {coupon.discountType === 'fixed' && `₹${coupon.discountValue} OFF`}
                {coupon.discountType === 'free_shipping' && `FREE SHIPPING`}
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1 font-medium">
                Min Order: ₹{coupon.minOrderValue}
                {coupon.maxDiscount ? ` • Max Cap: ₹${coupon.maxDiscount}` : ''}
              </div>
            </div>

            {/* Usage Progress */}
            <div className="space-y-1 mb-4 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-zinc-400 font-medium">
                <span>Usage Progress:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {coupon.usedCount} / {coupon.usageLimit} Uses
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  style={{ width: `${Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100)}%` }}
                  className="h-full bg-slate-800 dark:bg-zinc-300 rounded-full"
                />
              </div>
            </div>

            {/* Footer Date & Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 dark:text-zinc-500 flex items-center gap-1.5 text-[11px]">
                <Calendar className="w-3.5 h-3.5" />
                Expires {coupon.expiryDate}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEditModal(coupon)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
                  title="Edit Coupon"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete coupon code ${coupon.code}?`)) {
                      deleteCoupon(coupon.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 text-slate-400 transition-colors cursor-pointer"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-[#111113] border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl p-6 text-slate-900 dark:text-white">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              {editingCoupon ? 'Edit Coupon Parameters' : 'Create Promotional Coupon'}
            </h2>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              
              {/* Code String */}
              <div>
                <label className="block font-semibold text-slate-600 dark:text-zinc-400 uppercase mb-1 text-[11px]">
                  Coupon Code (Uppercase) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. FESTIVE20"
                  className="w-full bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-lg p-2.5 font-mono font-bold text-sm tracking-wider uppercase text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                />
              </div>

              {/* Discount Type */}
              <div>
                <label className="block font-semibold text-slate-600 dark:text-zinc-400 uppercase mb-1 text-[11px]">
                  Discount Type *
                </label>
                <select
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                  className="w-full bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-lg p-2.5 font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                >
                  <option value="percentage">Percentage OFF (%)</option>
                  <option value="fixed">Flat Amount OFF (₹)</option>
                  <option value="free_shipping">Free Shipping Offer</option>
                </select>
              </div>

              {/* Discount Value */}
              {formData.discountType !== 'free_shipping' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-600 dark:text-zinc-400 uppercase mb-1 text-[11px]">
                      Discount Value *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-lg p-2.5 font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 dark:text-zinc-400 uppercase mb-1 text-[11px]">
                      Max Cap (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.maxDiscount}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-lg p-2.5 font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                    />
                  </div>
                </div>
              )}

              {/* Min Order & Usage Limit */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-600 dark:text-zinc-400 uppercase mb-1 text-[11px]">
                    Min Order Value (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-lg p-2.5 font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 dark:text-zinc-400 uppercase mb-1 text-[11px]">
                    Usage Limit (Max Uses)
                  </label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-lg p-2.5 font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block font-semibold text-slate-600 dark:text-zinc-400 uppercase mb-1 text-[11px]">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-lg p-2.5 font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                />
              </div>

              {/* Active Toggle */}
              <div className="pt-1">
                <label className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                  />
                  <span>Activate Coupon Code Immediately</span>
                </label>
              </div>

              {/* Submit Footer */}
              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-xs hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 font-semibold text-xs hover:bg-slate-800 dark:hover:bg-zinc-200 cursor-pointer shadow-2xs"
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
