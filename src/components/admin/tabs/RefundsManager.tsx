import React, { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { RefundRequest } from '@/types/admin';

export const RefundsManager: React.FC = () => {
  const { refunds, processRefund } = useStore();
  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null);
  const [refundMethod, setRefundMethod] = useState<'Original Source' | 'Store Credit'>('Original Source');
  const [adminNotes, setAdminNotes] = useState('');

  const pendingRefunds = refunds.filter((r: RefundRequest) => r.status === 'Pending Review');
  const processedRefunds = refunds.filter((r: RefundRequest) => r.status !== 'Pending Review');

  const handleApprove = (r: RefundRequest) => {
    setSelectedRefund(r);
    setRefundMethod('Original Source');
    setAdminNotes(`Approved refund of ₹${r.refundAmount} via payment gateway.`);
  };

  const handleConfirmApproval = () => {
    if (!selectedRefund) return;
    processRefund(selectedRefund.id, 'Approved', refundMethod, adminNotes);
    setSelectedRefund(null);
  };

  const handleReject = (r: RefundRequest) => {
    const reason = prompt('Enter rejection reason note for customer record:', 'Item returned past 7-day policy window');
    if (reason !== null) {
      processRefund(r.id, 'Rejected', undefined, reason);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#231F1B] p-5 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white">
            Refunds & Order Cancellation Queue
          </h2>
          <p className="text-xs text-[#736B60] dark:text-[#A69C8F] mt-0.5">
            Audit return requests, approve store credits, and resolve customer refund claims
          </p>
        </div>
        <div className="px-3.5 py-2 rounded-xl bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>{pendingRefunds.length} Requests Pending Review</span>
        </div>
      </div>

      {/* Pending Queue Section */}
      <div className="bg-white dark:bg-[#231F1B] p-6 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-[#231F1B] dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" />
          Pending Refund Approvals ({pendingRefunds.length})
        </h3>

        {pendingRefunds.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#736B60] dark:text-[#A69C8F] bg-[#FEFDF5] dark:bg-[#1C1C18] rounded-xl border border-dashed border-[#E7DFD3]">
            🎉 Great news! There are no pending refund claims in queue.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingRefunds.map((ref: RefundRequest) => (
              <div
                key={ref.id}
                className="p-4 rounded-xl bg-[#FEFDF5] dark:bg-[#25221D] border border-red-200 dark:border-red-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-600 dark:text-red-400 font-mono">{ref.id}</span>
                    <span className="font-bold text-[#9C5B23] dark:text-[#E9BE5F]">Order #{ref.orderId}</span>
                    <span className="text-[#736B60] dark:text-[#A69C8F]">• Requested on {ref.requestedDate}</span>
                  </div>
                  <div className="font-bold text-[#231F1B] dark:text-white text-sm">
                    {ref.customerName} ({ref.customerEmail})
                  </div>
                  <div className="text-[#736B60] dark:text-[#A69C8F]">
                    <strong className="text-red-700 dark:text-red-400">Reason:</strong> {ref.reason} — "{ref.description}"
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E7DFD3]">
                  <div className="text-right">
                    <div className="text-[10px] text-[#736B60] dark:text-[#A69C8F] uppercase font-bold">Claim Amount</div>
                    <div className="text-base font-extrabold text-[#231F1B] dark:text-white">
                      ₹{ref.refundAmount.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReject(ref)}
                      className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 font-bold hover:bg-red-600 hover:text-white transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(ref)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      Approve Refund
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Historical Processed Refunds Table */}
      <div className="bg-white dark:bg-[#231F1B] rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E7DFD3] dark:border-neutral-800 font-serif font-bold text-base text-[#231F1B] dark:text-white">
          Processed Refund History & Audit Log
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E7DFD3] dark:border-neutral-800 text-[#736B60] dark:text-[#A69C8F] uppercase font-bold text-[10px] tracking-wider bg-[#FEFDF5] dark:bg-[#1C1C18]">
                <th className="py-3.5 px-4">Refund ID</th>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Refund Method</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Admin Audit Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD3] dark:divide-neutral-800 font-medium">
              {processedRefunds.map((ref: RefundRequest) => (
                <tr key={ref.id} className="hover:bg-[#FEFDF5] dark:hover:bg-[#2A2621] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#9C5B23] dark:text-[#E9BE5F]">
                    {ref.id}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#231F1B] dark:text-white">
                    {ref.orderId}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#231F1B] dark:text-white">{ref.customerName}</div>
                    <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F]">{ref.customerEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#231F1B] dark:text-white">
                    ₹{ref.refundAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-[#736B60] dark:text-[#A69C8F]">
                    {ref.refundMethod || 'N/A'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        ref.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}
                    >
                      {ref.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#736B60] dark:text-[#A69C8F] max-w-xs truncate">
                    {ref.adminNotes || 'Processed by admin.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval Modal */}
      {selectedRefund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#FEFDF5] dark:bg-[#1F1C18] border border-[#E7DFD3] dark:border-neutral-800 rounded-3xl shadow-2xl p-6 text-[#282823] dark:text-[#FEFDF5]">
            
            <button
              onClick={() => setSelectedRefund(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white mb-4">
              Approve Refund #{selectedRefund.id}
            </h2>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-[#F5EEDD] dark:bg-[#2A2621] font-semibold text-[#231F1B] dark:text-white">
                <div>Refunding <strong className="text-[#9C5B23] dark:text-[#E9BE5F]">₹{selectedRefund.refundAmount}</strong> to {selectedRefund.customerName}</div>
                <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F] mt-1">Order #{selectedRefund.orderId} • Reason: {selectedRefund.reason}</div>
              </div>

              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Refund Method
                </label>
                <select
                  value={refundMethod}
                  onChange={(e) => setRefundMethod(e.target.value as any)}
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                >
                  <option value="Original Source">Original Payment Source (Razorpay / Bank)</option>
                  <option value="Store Credit">Natura Bee Farm Store Credit Voucher</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Admin Audit Note
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-[#E7DFD3] dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setSelectedRefund(null)}
                  className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-neutral-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmApproval}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow-md"
                >
                  Process Refund
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
