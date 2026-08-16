import React from 'react';
import {
  ShoppingBag,
  Users,
  AlertTriangle,
  DollarSign,
  ArrowUpRight,
  Plus,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Tag,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { Product } from '@/types';
import type { AdminTabType, Order, RefundRequest } from '@/types/admin';

interface DashboardOverviewProps {
  onNavigateTab: (tab: AdminTabType) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateTab }) => {
  const { products, orders, customers, refunds, updateOrderStatus } = useStore();

  // Calculations
  const totalRevenue = orders.reduce((sum: number, ord: Order) => sum + (ord.status !== 'Cancelled' ? ord.finalAmount : 0), 0);
  const totalOrders = orders.length;
  const pendingOrdersCount = orders.filter((o: Order) => o.status === 'Pending' || o.status === 'Processing').length;
  const lowStockProducts = products.filter((p: Product) => !p.inStock);
  const totalCustomers = customers.length;
  const pendingRefundsCount = refunds.filter((r: RefundRequest) => r.status === 'Pending Review').length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // Monthly Sales Visualization Mock Bar Height Calculator
  const salesBarData = [
    { month: 'Mar', amount: 45000, heightPct: 45 },
    { month: 'Apr', amount: 62000, heightPct: 62 },
    { month: 'May', amount: 58000, heightPct: 58 },
    { month: 'Jun', amount: 79000, heightPct: 79 },
    { month: 'Jul', amount: 94000, heightPct: 94 },
    { month: 'Aug (Current)', amount: 112500, heightPct: 100 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner Alert for Pending Items */}
      {(pendingOrdersCount > 0 || lowStockProducts.length > 0 || pendingRefundsCount > 0) && (
        <div className="bg-gradient-to-r from-[#9C5B23]/10 via-[#E9BE5F]/15 to-[#9C5B23]/10 border border-[#E9BE5F]/40 dark:border-[#E9BE5F]/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#9C5B23] text-white shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-[#F5E8B6]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#231F1B] dark:text-white">
                Store Operations Notice & Urgent Tasks
              </h4>
              <p className="text-xs text-[#6B6153] dark:text-[#B5A998] mt-0.5">
                You have <span className="font-bold text-[#9C5B23] dark:text-[#E9BE5F]">{pendingOrdersCount} pending orders</span> awaiting dispatch,{' '}
                <span className="font-bold text-amber-600">{lowStockProducts.length} low/out-of-stock items</span>, and{' '}
                <span className="font-bold text-red-600">{pendingRefundsCount} refund requests</span> needing approval.
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => onNavigateTab('orders')}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#9C5B23] hover:bg-[#80481A] text-white text-xs font-bold transition-colors shadow-sm"
            >
              Fulfill Orders
            </button>
            <button
              onClick={() => onNavigateTab('refunds')}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] hover:bg-[#F5EEDD] text-[#231F1B] dark:text-white text-xs font-bold transition-colors"
            >
              Review Refunds
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="bg-white dark:bg-[#231F1B] p-5 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm relative overflow-hidden group hover:border-[#9C5B23]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#736B60] dark:text-[#A69C8F] uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-[#231F1B] dark:text-white tracking-tight">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-[#231F1B] p-5 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm relative overflow-hidden group hover:border-[#9C5B23]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#736B60] dark:text-[#A69C8F] uppercase tracking-wider">
              Total Orders
            </span>
            <div className="p-2.5 rounded-xl bg-[#9C5B23]/10 text-[#9C5B23] dark:text-[#E9BE5F]">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-[#231F1B] dark:text-white tracking-tight">
              {totalOrders}
            </div>
            <div className="flex items-center justify-between mt-1.5 text-xs text-[#736B60] dark:text-[#A69C8F]">
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {pendingOrdersCount} Pending fulfillment
              </span>
            </div>
          </div>
        </div>

        {/* Customers & AOV */}
        <div className="bg-white dark:bg-[#231F1B] p-5 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm relative overflow-hidden group hover:border-[#9C5B23]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#736B60] dark:text-[#A69C8F] uppercase tracking-wider">
              Active Customers
            </span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-[#231F1B] dark:text-white tracking-tight">
              {totalCustomers}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#736B60] dark:text-[#A69C8F] mt-1.5">
              <span>Avg Order Value:</span>
              <span className="font-bold text-[#231F1B] dark:text-white">₹{avgOrderValue}</span>
            </div>
          </div>
        </div>

        {/* Stock & Refunds */}
        <div className="bg-white dark:bg-[#231F1B] p-5 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm relative overflow-hidden group hover:border-[#9C5B23]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#736B60] dark:text-[#A69C8F] uppercase tracking-wider">
              Stock & Refunds
            </span>
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-[#231F1B] dark:text-white tracking-tight flex items-center gap-3">
              <span>{lowStockProducts.length} Out</span>
              <span className="text-xs font-sans font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                {pendingRefundsCount} Refunds
              </span>
            </div>
            <div className="text-xs text-[#736B60] dark:text-[#A69C8F] mt-1.5">
              <span>Catalog size: </span>
              <span className="font-bold text-[#231F1B] dark:text-white">{products.length} Products</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Performance Bar Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#231F1B] p-6 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#231F1B] dark:text-white font-serif">
                Monthly Store Revenue Performance
              </h3>
              <p className="text-xs text-[#736B60] dark:text-[#A69C8F]">
                Gross revenue metrics breakdown across last 6 months
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#9C5B23]" />
              <span className="text-xs font-semibold text-[#736B60] dark:text-[#A69C8F]">Sales ₹</span>
            </div>
          </div>

          {/* Bar Chart Graphics */}
          <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-2 px-2 border-b border-[#E7DFD3] dark:border-neutral-800">
            {salesBarData.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                
                {/* Hover Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-[#231F1B] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-lg pointer-events-none whitespace-nowrap z-10">
                  ₹{item.amount.toLocaleString()}
                </div>

                {/* Vertical Bar */}
                <div
                  style={{ height: `${item.heightPct}%` }}
                  className="w-full max-w-[48px] bg-gradient-to-t from-[#80481A] via-[#9C5B23] to-[#E9BE5F] rounded-t-xl transition-all duration-500 group-hover:brightness-110 shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/40" />
                </div>

                {/* Label */}
                <span className="text-[11px] font-bold text-[#736B60] dark:text-[#A69C8F] text-center truncate">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#736B60] dark:text-[#A69C8F]">
            <span>Highest Revenue Month: <strong className="text-[#231F1B] dark:text-white">August (Current)</strong></span>
            <span>Target Achievement: <strong className="text-emerald-600 dark:text-emerald-400">112% of Goal</strong></span>
          </div>
        </div>

        {/* Quick Operational Shortcuts */}
        <div className="bg-white dark:bg-[#231F1B] p-6 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#231F1B] dark:text-white font-serif mb-1">
              Quick Operations
            </h3>
            <p className="text-xs text-[#736B60] dark:text-[#A69C8F] mb-5">
              Shortcuts for store managers
            </p>

            <div className="space-y-3">
              <button
                onClick={() => onNavigateTab('products')}
                className="w-full p-3.5 rounded-xl bg-[#F5EEDD] dark:bg-[#2A2621] hover:bg-[#E9BE5F]/20 text-[#231F1B] dark:text-white font-bold text-xs flex items-center justify-between transition-colors border border-[#E0D0B6] dark:border-[#40372B]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#9C5B23] text-white">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span>Add New Product & Variants</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
              </button>

              <button
                onClick={() => onNavigateTab('coupons')}
                className="w-full p-3.5 rounded-xl bg-[#F5EEDD] dark:bg-[#2A2621] hover:bg-[#E9BE5F]/20 text-[#231F1B] dark:text-white font-bold text-xs flex items-center justify-between transition-colors border border-[#E0D0B6] dark:border-[#40372B]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-600 text-white">
                    <Tag className="w-4 h-4" />
                  </div>
                  <span>Create Promotional Discount</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
              </button>

              <button
                onClick={() => onNavigateTab('content')}
                className="w-full p-3.5 rounded-xl bg-[#F5EEDD] dark:bg-[#2A2621] hover:bg-[#E9BE5F]/20 text-[#231F1B] dark:text-white font-bold text-xs flex items-center justify-between transition-colors border border-[#E0D0B6] dark:border-[#40372B]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-600 text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>Update Homepage Banners</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
              </button>

              <button
                onClick={() => onNavigateTab('reviews')}
                className="w-full p-3.5 rounded-xl bg-[#F5EEDD] dark:bg-[#2A2621] hover:bg-[#E9BE5F]/20 text-[#231F1B] dark:text-white font-bold text-xs flex items-center justify-between transition-colors border border-[#E0D0B6] dark:border-[#40372B]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-600 text-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Moderate Customer Reviews</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E7DFD3] dark:border-neutral-800 text-[11px] text-[#736B60] dark:text-[#A69C8F]">
            Need help? Contact system developer or check store analytics logs.
          </div>
        </div>

      </div>

      {/* Recent Orders Queue */}
      <div className="bg-white dark:bg-[#231F1B] p-6 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-[#231F1B] dark:text-white font-serif">
              Recent Store Orders
            </h3>
            <p className="text-xs text-[#736B60] dark:text-[#A69C8F]">
              Live queue of customer orders requiring processing and fulfillment
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-bold text-[#9C5B23] dark:text-[#E9BE5F] hover:underline flex items-center gap-1"
          >
            View All Orders ({orders.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E7DFD3] dark:border-neutral-800 text-[#736B60] dark:text-[#A69C8F] uppercase font-bold text-[10px] tracking-wider">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Mode</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD3] dark:divide-neutral-800 font-medium">
              {orders.slice(0, 5).map((order: Order) => (
                <tr key={order.id} className="hover:bg-[#FEFDF5] dark:hover:bg-[#2A2621] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#9C5B23] dark:text-[#E9BE5F]">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#231F1B] dark:text-white">{order.customerName}</div>
                    <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F]">{order.customerEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#231F1B] dark:text-white">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''} ({order.items[0]?.productName})
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#231F1B] dark:text-white">
                    ₹{order.finalAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-[#736B60] dark:text-[#A69C8F]">
                    {order.paymentMethod}
                  </td>
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
                  <td className="py-3.5 px-4 text-right">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Processing')}
                        className="px-2.5 py-1 rounded-lg bg-[#9C5B23] text-white font-bold hover:bg-[#80481A] transition-colors"
                      >
                        Process
                      </button>
                    )}
                    {order.status === 'Processing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Shipped', 'BLRD-991823')}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                      >
                        Mark Shipped
                      </button>
                    )}
                    {order.status === 'Shipped' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Delivered')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
                      >
                        Mark Delivered
                      </button>
                    )}
                    {(order.status === 'Delivered' || order.status === 'Cancelled' || order.status === 'Refunded') && (
                      <span className="text-[11px] text-[#736B60] dark:text-[#A69C8F]">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
