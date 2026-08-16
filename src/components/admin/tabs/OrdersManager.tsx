import React, { useState } from 'react';
import {
  Search,
  Eye,
  Truck,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  User,
  Package,
  Calendar,
  X,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { Order, OrderStatus, OrderItem } from '@/types/admin';

export const OrdersManager: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();

  const [activeStatusTab, setActiveStatusTab] = useState<OrderStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [newStatus, setNewStatus] = useState<OrderStatus>('Pending');

  // Filtered Orders
  const filteredOrders = orders.filter((ord: Order) => {
    const matchesTab = activeStatusTab === 'All' || ord.status === activeStatusTab;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      ord.id.toLowerCase().includes(query) ||
      ord.customerName.toLowerCase().includes(query) ||
      ord.customerEmail.toLowerCase().includes(query) ||
      (ord.trackingNumber && ord.trackingNumber.toLowerCase().includes(query));

    return matchesTab && matchesSearch;
  });

  const handleOpenDetailModal = (order: Order) => {
    setSelectedOrder(order);
    setTrackingInput(order.trackingNumber || '');
    setNewStatus(order.status);
  };

  const handleSaveStatusChange = () => {
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, newStatus, trackingInput);
    setSelectedOrder(null);
  };

  const statusTabItems: { label: string; value: OrderStatus | 'All'; count: number }[] = [
    { label: 'All Orders', value: 'All', count: orders.length },
    { label: 'Pending', value: 'Pending', count: orders.filter((o: Order) => o.status === 'Pending').length },
    { label: 'Processing', value: 'Processing', count: orders.filter((o: Order) => o.status === 'Processing').length },
    { label: 'Shipped', value: 'Shipped', count: orders.filter((o: Order) => o.status === 'Shipped').length },
    { label: 'Delivered', value: 'Delivered', count: orders.filter((o: Order) => o.status === 'Delivered').length },
    { label: 'Cancelled', value: 'Cancelled', count: orders.filter((o: Order) => o.status === 'Cancelled').length },
    { label: 'Refunded', value: 'Refunded', count: orders.filter((o: Order) => o.status === 'Refunded').length },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#231F1B] p-5 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white">
            Order Fulfillment & Operations
          </h2>
          <p className="text-xs text-[#736B60] dark:text-[#A69C8F] mt-0.5">
            Process customer purchases, assign courier tracking IDs, and manage status transitions
          </p>
        </div>
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, customer, tracking..."
            className="w-full bg-[#FEFDF5] dark:bg-[#1C1C18] border border-[#E7DFD3] dark:border-neutral-800 rounded-xl px-3.5 py-2 pl-10 text-xs font-medium text-[#231F1B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9C5B23]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {statusTabItems.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveStatusTab(tab.value)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeStatusTab === tab.value
                ? 'bg-[#9C5B23] text-white shadow-md'
                : 'bg-white dark:bg-[#231F1B] border border-[#E7DFD3] dark:border-neutral-800 text-[#736B60] dark:text-[#A69C8F] hover:bg-[#F5EEDD] dark:hover:bg-[#2A2621]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeStatusTab === tab.value
                  ? 'bg-white/20 text-white'
                  : 'bg-[#F5EEDD] dark:bg-[#2A2621] text-[#9C5B23] dark:text-[#E9BE5F]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#231F1B] rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E7DFD3] dark:border-neutral-800 text-[#736B60] dark:text-[#A69C8F] uppercase font-bold text-[10px] tracking-wider bg-[#FEFDF5] dark:bg-[#1C1C18]">
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer Info</th>
                <th className="py-3.5 px-4">Items Summary</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD3] dark:divide-neutral-800 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#736B60] dark:text-[#A69C8F]">
                    No orders found matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order: Order) => (
                  <tr key={order.id} className="hover:bg-[#FEFDF5] dark:hover:bg-[#2A2621] transition-colors">
                    
                    {/* Order ID & Date */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#9C5B23] dark:text-[#E9BE5F]">
                        {order.id}
                      </div>
                      <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F] flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{order.createdAt}</span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#231F1B] dark:text-white">{order.customerName}</div>
                      <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F]">{order.customerPhone}</div>
                    </td>

                    {/* Items */}
                    <td className="py-3.5 px-4 text-[#231F1B] dark:text-white">
                      <div className="font-bold">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </div>
                      <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F] truncate max-w-xs">
                        {order.items.map((i: OrderItem) => `${i.productName} (${i.weight})`).join(', ')}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#231F1B] dark:text-white">
                        ₹{order.finalAmount.toLocaleString()}
                      </div>
                      {order.discountAmount > 0 && (
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                          -₹{order.discountAmount} promo off
                        </div>
                      )}
                    </td>

                    {/* Payment */}
                    <td className="py-3.5 px-4">
                      <div className="text-[#231F1B] dark:text-white font-semibold">{order.paymentMethod}</div>
                      <span
                        className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : order.paymentStatus === 'Refunded'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : order.status === 'Processing'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                            : order.status === 'Cancelled'
                            ? 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
                            : order.status === 'Refunded'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* View Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenDetailModal(order)}
                        className="px-3 py-1.5 rounded-xl bg-[#F5EEDD] dark:bg-[#2A2621] hover:bg-[#9C5B23] hover:text-white transition-colors text-[#231F1B] dark:text-white font-bold flex items-center gap-1.5 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail & Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#FEFDF5] dark:bg-[#1F1C18] border border-[#E7DFD3] dark:border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#282823] dark:text-[#FEFDF5] max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-[#E7DFD3] dark:border-neutral-800 pb-4 mb-5">
              <div className="p-3 rounded-2xl bg-[#9C5B23]/10 text-[#9C5B23] dark:text-[#E9BE5F]">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white">
                  Order Details #{selectedOrder.id}
                </h2>
                <div className="text-xs text-[#736B60] dark:text-[#A69C8F] flex items-center gap-2 mt-0.5">
                  <span>Placed on {selectedOrder.createdAt}</span>
                  <span>•</span>
                  <span className="font-bold text-[#9C5B23] dark:text-[#E9BE5F]">{selectedOrder.status}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-xs">
              
              {/* Customer & Delivery Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F5EEDD]/50 dark:bg-[#25211C] p-4 rounded-2xl border border-[#E0D0B6]/50 dark:border-neutral-800">
                <div>
                  <h4 className="font-bold text-[#9C5B23] dark:text-[#E9BE5F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    Customer Details
                  </h4>
                  <div className="space-y-1 text-[#231F1B] dark:text-white">
                    <div className="font-bold text-sm">{selectedOrder.customerName}</div>
                    <div className="flex items-center gap-1.5 text-[#736B60] dark:text-[#A69C8F]">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedOrder.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#736B60] dark:text-[#A69C8F]">
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedOrder.customerPhone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#9C5B23] dark:text-[#E9BE5F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    Shipping Address
                  </h4>
                  <div className="text-[#231F1B] dark:text-white font-medium leading-relaxed">
                    {selectedOrder.shippingAddress}
                  </div>
                </div>
              </div>

              {/* Items Ordered List */}
              <div>
                <h4 className="font-bold text-[#231F1B] dark:text-white font-serif text-sm mb-3">
                  Purchased Items ({selectedOrder.items.length})
                </h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#25221D] border border-[#E7DFD3] dark:border-neutral-800"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-10 h-10 rounded-lg object-cover border border-[#E7DFD3] dark:border-neutral-800"
                        />
                        <div>
                          <div className="font-bold text-[#231F1B] dark:text-white">{item.productName}</div>
                          <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F]">
                            Variant: {item.weight} • Qty: {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-[#231F1B] dark:text-white">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#25221D] border border-[#E7DFD3] dark:border-neutral-800 space-y-1.5 font-medium">
                <div className="flex justify-between text-[#736B60] dark:text-[#A69C8F]">
                  <span>Items Subtotal:</span>
                  <span>₹{selectedOrder.totalAmount}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Discount Applied:</span>
                    <span>-₹{selectedOrder.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#736B60] dark:text-[#A69C8F]">
                  <span>Shipping Fee:</span>
                  <span>{selectedOrder.shippingFee === 0 ? 'FREE' : `₹${selectedOrder.shippingFee}`}</span>
                </div>
                <div className="pt-2 border-t border-[#E7DFD3] dark:border-neutral-800 flex justify-between text-sm font-extrabold text-[#231F1B] dark:text-white">
                  <span>Grand Total Paid:</span>
                  <span className="text-[#9C5B23] dark:text-[#E9BE5F]">₹{selectedOrder.finalAmount}</span>
                </div>
              </div>

              {/* Order Status & Courier Management */}
              <div className="p-4 rounded-2xl bg-[#E9BE5F]/10 border border-[#E9BE5F]/30 space-y-4">
                <h4 className="font-bold text-[#9C5B23] dark:text-[#E9BE5F] uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  Order Status & Logistics Controls
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Status Dropdown */}
                  <div>
                    <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                      Update Order Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                      className="w-full bg-white dark:bg-[#1C1C18] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white focus:outline-none"
                    >
                      <option value="Pending">Pending Fulfillment</option>
                      <option value="Processing">Processing / Packed</option>
                      <option value="Shipped">Shipped / Dispatched</option>
                      <option value="Delivered">Delivered Successfully</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>

                  {/* Courier Tracking Number */}
                  <div>
                    <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                      Courier AWB / Tracking Code
                    </label>
                    <input
                      type="text"
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                      placeholder="e.g. BLRD-8829104"
                      className="w-full bg-white dark:bg-[#1C1C18] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-[#231F1B] dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-2 flex justify-end gap-3 border-t border-[#E7DFD3] dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 font-bold"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveStatusChange}
                  className="px-5 py-2 rounded-xl bg-[#9C5B23] hover:bg-[#80481A] text-white font-bold shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Update Order Record</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
