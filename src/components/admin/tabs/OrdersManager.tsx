import React, { useState } from 'react';
import {
  Search,
  Eye,
  Truck,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  User,
  Package,
  Calendar,
  X,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { Order, OrderStatus } from '@/types/admin';

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#111113] p-5 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Order Fulfillment & Dispatch Control
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Process customer purchases, assign courier tracking IDs, and manage status transitions
          </p>
        </div>
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, customer, tracking..."
            className="w-full bg-slate-100/80 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-lg px-3 py-1.5 pl-9 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/40"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {statusTabItems.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveStatusTab(tab.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeStatusTab === tab.value
                ? 'bg-slate-900 text-white dark:bg-zinc-100 dark:text-slate-900 shadow-2xs'
                : 'bg-white dark:bg-[#111113] border border-slate-200/80 dark:border-zinc-800/80 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                activeStatusTab === tab.value
                  ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#111113] rounded-xl border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-zinc-800/80 text-slate-400 dark:text-zinc-500 uppercase font-bold text-[10px] tracking-wider bg-slate-50/50 dark:bg-zinc-900/50">
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer Info</th>
                <th className="py-3.5 px-4">Items Summary</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 dark:text-zinc-400">
                    No orders found matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order: Order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                    
                    {/* Order ID & Date */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-slate-900 dark:text-white">
                        {order.id}
                      </div>
                      <div className="text-[11px] text-slate-400 dark:text-zinc-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{order.createdAt}</span>
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{order.customerName}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 dark:text-zinc-500 truncate max-w-[180px]">
                        {order.customerEmail}
                      </div>
                    </td>

                    {/* Items Summary */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </div>
                      <div className="text-[11px] text-slate-400 dark:text-zinc-500 truncate max-w-[160px]">
                        {order.items[0]?.productName}
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      ₹{order.finalAmount.toLocaleString()}
                    </td>

                    {/* Payment Mode */}
                    <td className="py-3.5 px-4 text-slate-500 dark:text-zinc-400">
                      <div>{order.paymentMethod}</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400'
                            : order.status === 'Shipped'
                            ? 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20 dark:text-indigo-400'
                            : order.status === 'Processing'
                            ? 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400'
                            : order.status === 'Cancelled'
                            ? 'bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400'
                            : order.status === 'Refunded'
                            ? 'bg-purple-500/10 text-purple-700 border-purple-500/20 dark:text-purple-400'
                            : 'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          order.status === 'Delivered' ? 'bg-emerald-500' :
                          order.status === 'Shipped' ? 'bg-indigo-500' :
                          order.status === 'Processing' ? 'bg-blue-500' :
                          order.status === 'Cancelled' ? 'bg-slate-400' :
                          order.status === 'Refunded' ? 'bg-purple-500' : 'bg-amber-500'
                        }`} />
                        <span>{order.status}</span>
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenDetailModal(order)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-xs font-semibold transition-colors flex items-center justify-end gap-1.5 ml-auto border border-slate-200/80 dark:border-zinc-700/80 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail & Status Transition Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#111113] border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl p-6 sm:p-8 text-slate-900 dark:text-white">
            
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Order Details #{selectedOrder.id}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Placed on {selectedOrder.createdAt} • Payment via {selectedOrder.paymentMethod}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs mb-6">
              
              {/* Customer & Address */}
              <div className="space-y-2 bg-slate-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Shipping Address
                </h4>
                <div className="space-y-1 text-slate-600 dark:text-zinc-300">
                  <div className="font-semibold text-slate-900 dark:text-white">{selectedOrder.customerName}</div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-500 pt-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>
                      {selectedOrder.shippingAddress.addressLine}, {selectedOrder.shippingAddress.city},{' '}
                      {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update Control */}
              <div className="space-y-3 bg-slate-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Fulfillment Status & Tracking
                </h4>
                
                <div>
                  <label className="block text-slate-600 dark:text-zinc-400 font-semibold mb-1">
                    Update Order Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                    className="w-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg p-2 font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-zinc-400 font-semibold mb-1 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    Courier Tracking Number
                  </label>
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="e.g. BLRD-991823"
                    className="w-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg p-2 font-mono font-semibold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

            </div>

            {/* Items Table */}
            <div className="mb-6">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">
                Order Items ({selectedOrder.items.length})
              </h4>
              <div className="border border-slate-200/80 dark:border-zinc-800 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-zinc-900 text-slate-400 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Item</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 font-medium">
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 px-3 text-slate-900 dark:text-white font-semibold">
                          {item.productName} ({item.weight})
                        </td>
                        <td className="py-2.5 px-3 text-center text-slate-600 dark:text-zinc-300">
                          {item.quantity}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white">
                          ₹{item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 dark:border-zinc-800">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-xs hover:bg-slate-200 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleSaveStatusChange}
                className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 font-semibold text-xs hover:bg-slate-800 dark:hover:bg-zinc-200 cursor-pointer shadow-2xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Status Update</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
