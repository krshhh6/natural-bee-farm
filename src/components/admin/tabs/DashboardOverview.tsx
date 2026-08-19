import React, { useState } from 'react';
import {
  Users,
  IndianRupee,
  PackagePlus,
  TicketPercent,
  Image,
  Star,
  ChevronRight,
  ArrowUpRight,
  Clock,
  LineChart,
  BarChart2,
  AlertCircle,
  PackageCheck,
  ShieldAlert,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { Product } from '@/types';
import type { AdminTabType, Order, RefundRequest } from '@/types/admin';

interface DashboardOverviewProps {
  onNavigateTab: (tab: AdminTabType) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateTab }) => {
  const { products, orders, customers, refunds, updateOrderStatus } = useStore();

  const [timeRange, setTimeRange] = useState<'6M' | '30D' | '7D'>('6M');
  const [chartType, setChartType] = useState<'bar' | 'area'>('area');
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Key Metric Calculations
  const totalRevenue = orders.reduce((sum: number, ord: Order) => sum + (ord.status !== 'Cancelled' ? ord.finalAmount : 0), 0);
  const totalOrders = orders.length;
  const pendingOrdersCount = orders.filter((o: Order) => o.status === 'Pending' || o.status === 'Processing').length;
  const lowStockProducts = products.filter((p: Product) => !p.inStock);
  const totalCustomers = customers.length;
  const pendingRefundsCount = refunds.filter((r: RefundRequest) => r.status === 'Pending Review').length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // Sales Trend Data
  const salesBarData = [
    { month: 'Mar', amount: 45000, orders: 32, pct: 40 },
    { month: 'Apr', amount: 62000, orders: 48, pct: 55 },
    { month: 'May', amount: 58000, orders: 41, pct: 50 },
    { month: 'Jun', amount: 79000, orders: 63, pct: 70 },
    { month: 'Jul', amount: 94000, orders: 75, pct: 85 },
    { month: 'Aug (Active)', amount: 112500, orders: 89, pct: 100 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner Alert for Pending Actions */}
      {(pendingOrdersCount > 0 || lowStockProducts.length > 0 || pendingRefundsCount > 0) && (
        <div className="bg-slate-100/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 shrink-0 shadow-2xs">
              <AlertCircle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Store Operations Notice
                </h4>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-md border border-amber-500/20">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1 leading-relaxed">
                You have <span className="font-bold text-slate-900 dark:text-white">{pendingOrdersCount} pending orders</span> awaiting dispatch,{' '}
                <span className="font-bold text-slate-900 dark:text-white">{lowStockProducts.length} out-of-stock items</span>, and{' '}
                <span className="font-bold text-slate-900 dark:text-white">{pendingRefundsCount} refund requests</span> requiring approval.
              </p>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => onNavigateTab('orders')}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-zinc-100 hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-slate-900 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              Fulfill Orders
            </button>
            <button
              onClick={() => onNavigateTab('refunds')}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-750 text-slate-800 dark:text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Review Refunds
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue Card */}
        <div className="bg-white dark:bg-[#111113] p-5 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Gross Revenue
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200/50 dark:border-emerald-900/50">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+18.4% vs last month</span>
              </div>
            </div>
            {/* Sparkline Visual */}
            <div className="w-16 h-8 opacity-75">
              <svg viewBox="0 0 40 20" className="w-full h-full text-emerald-500">
                <path
                  d="M0 16 L8 12 L16 14 L24 8 L32 10 L40 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white dark:bg-[#111113] p-5 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                {totalOrders}
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-zinc-400 mt-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{pendingOrdersCount} Pending dispatch</span>
              </div>
            </div>
            {/* Mini Bar Sparkline */}
            <div className="w-14 h-7 flex items-end justify-between gap-1 opacity-70">
              <div className="w-2 bg-slate-300 dark:bg-zinc-700 h-3 rounded-t-xs" />
              <div className="w-2 bg-slate-400 dark:bg-zinc-600 h-5 rounded-t-xs" />
              <div className="w-2 bg-slate-500 dark:bg-zinc-500 h-4 rounded-t-xs" />
              <div className="w-2 bg-slate-800 dark:bg-zinc-300 h-7 rounded-t-xs" />
            </div>
          </div>
        </div>

        {/* Active Customers Card */}
        <div className="bg-white dark:bg-[#111113] p-5 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Active Customers
            </span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 border border-blue-200/50 dark:border-blue-900/50">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                {totalCustomers}
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                <span>Avg Order Value: </span>
                <strong className="text-slate-900 dark:text-white font-semibold">₹{avgOrderValue}</strong>
              </div>
            </div>
            {/* User Trend Curve */}
            <div className="w-16 h-8 opacity-75">
              <svg viewBox="0 0 40 20" className="w-full h-full text-blue-500">
                <path
                  d="M0 18 L10 14 L20 15 L30 8 L40 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Catalog Stock & Refunds Card */}
        <div className="bg-white dark:bg-[#111113] p-5 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Catalog & Refunds
            </span>
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-200/50 dark:border-rose-900/50">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                {lowStockProducts.length} Out
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
                {pendingRefundsCount} Refund Req
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              <span>Catalog Size: </span>
              <strong className="text-slate-900 dark:text-white font-semibold">{products.length} Products</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Main Charts & Quick Operations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Performance Analytics (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111113] p-6 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Revenue Performance Analytics</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  +24% YoY
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Gross revenue breakdown & target progression metrics
              </p>
            </div>

            {/* Filter and View Toggles */}
            <div className="flex items-center gap-2">
              
              {/* Range Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-zinc-800/80 p-0.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-600 dark:text-zinc-400">
                <button
                  onClick={() => setTimeRange('6M')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    timeRange === '6M' ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs' : ''
                  }`}
                >
                  6M
                </button>
                <button
                  onClick={() => setTimeRange('30D')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    timeRange === '30D' ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs' : ''
                  }`}
                >
                  30D
                </button>
                <button
                  onClick={() => setTimeRange('7D')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    timeRange === '7D' ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs' : ''
                  }`}
                >
                  7D
                </button>
              </div>

              {/* Chart Mode Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-zinc-800/80 p-0.5 rounded-lg border border-slate-200 dark:border-zinc-700">
                <button
                  onClick={() => setChartType('area')}
                  className={`p-1 rounded-md transition-colors cursor-pointer ${
                    chartType === 'area' ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-400'
                  }`}
                  title="Area Trend View"
                >
                  <LineChart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-1 rounded-md transition-colors cursor-pointer ${
                    chartType === 'bar' ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-400'
                  }`}
                  title="Bar View"
                >
                  <BarChart2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="relative h-64 pt-6 pb-2">
            
            {/* Horizontal Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 dark:text-zinc-600 font-mono">
              <div className="border-b border-slate-100 dark:border-zinc-800/60 pb-1">₹120k</div>
              <div className="border-b border-slate-100 dark:border-zinc-800/60 pb-1">₹90k</div>
              <div className="border-b border-slate-100 dark:border-zinc-800/60 pb-1">₹60k</div>
              <div className="border-b border-slate-100 dark:border-zinc-800/60 pb-1">₹30k</div>
              <div className="border-b border-slate-200 dark:border-zinc-800 pb-1">₹0</div>
            </div>

            {/* SVG Area / Bar Render */}
            <div className="h-full flex items-end justify-between gap-3 sm:gap-6 pt-4 relative z-10 px-6">
              
              {chartType === 'area' ? (
                <div className="w-full h-full relative flex items-end">
                  <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="slateGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#475569" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#475569" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Area Path */}
                    <path
                      d="M 10 140 Q 90 100 170 110 T 330 40 T 490 10 L 490 170 L 10 170 Z"
                      fill="url(#slateGradient)"
                    />
                    
                    {/* Line Path */}
                    <path
                      d="M 10 140 Q 90 100 170 110 T 330 40 T 490 10"
                      fill="none"
                      stroke="#334155"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {[
                      { x: 10, y: 140, val: '₹45k', m: 'Mar' },
                      { x: 106, y: 108, val: '₹62k', m: 'Apr' },
                      { x: 202, y: 114, val: '₹58k', m: 'May' },
                      { x: 298, y: 72, val: '₹79k', m: 'Jun' },
                      { x: 394, y: 40, val: '₹94k', m: 'Jul' },
                      { x: 490, y: 10, val: '₹112.5k', m: 'Aug' },
                    ].map((pt) => (
                      <g key={pt.m} className="group cursor-pointer">
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="5"
                          className="fill-slate-900 dark:fill-zinc-100 stroke-white dark:stroke-[#111113] stroke-2 group-hover:r-7 transition-all"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 12}
                          textAnchor="middle"
                          className="text-[10px] font-bold fill-slate-700 dark:fill-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {pt.val}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              ) : (
                salesBarData.map((item, index) => (
                  <div
                    key={item.month}
                    onMouseEnter={() => setHoveredBarIndex(index)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                  >
                    {/* Tooltip */}
                    {hoveredBarIndex === index && (
                      <div className="absolute -top-12 z-20 bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md pointer-events-none whitespace-nowrap animate-fadeIn">
                        <div>₹{item.amount.toLocaleString()}</div>
                        <div className="text-[9px] text-slate-400 font-normal">{item.orders} Orders fulfilled</div>
                      </div>
                    )}

                    {/* Bar */}
                    <div
                      style={{ height: `${item.pct}%` }}
                      className="w-full max-w-[42px] bg-slate-800 dark:bg-zinc-300 rounded-t-lg transition-all duration-300 group-hover:bg-slate-900 dark:group-hover:bg-white shadow-2xs relative"
                    >
                      <div className="absolute top-0 inset-x-0 h-0.5 bg-white/30 rounded-t-lg" />
                    </div>
                  </div>
                ))
              )}

            </div>

          </div>

          {/* Month Labels */}
          <div className="flex items-center justify-between px-6 pt-2 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 border-t border-slate-100 dark:border-zinc-800">
            {salesBarData.map((d) => (
              <span key={d.month} className="truncate">{d.month}</span>
            ))}
          </div>

          {/* Performance Summary Bar */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 dark:text-zinc-400 gap-2">
            <div className="flex items-center gap-2">
              <span>Peak Month: <strong className="text-slate-900 dark:text-white font-semibold">August (₹1,12,500)</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span>Target Achievement:</span>
              <div className="w-24 h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
              </div>
              <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">112% Goal</strong>
            </div>
          </div>

        </div>

        {/* Quick Operations Panel */}
        <div className="bg-white dark:bg-[#111113] p-6 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Quick Operations
              </h3>
              <span className="text-[10px] font-mono font-semibold text-slate-400">Shortcuts</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mb-5">
              Frequent store control actions
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => onNavigateTab('products')}
                className="w-full p-3 rounded-lg bg-slate-50/70 dark:bg-zinc-900/60 hover:bg-slate-100 dark:hover:bg-zinc-800/70 text-slate-800 dark:text-zinc-200 font-semibold text-xs flex items-center justify-between transition-all border border-slate-200/80 dark:border-zinc-800/80 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-700/80 shadow-2xs">
                    <PackagePlus className="w-4 h-4" />
                  </div>
                  <span>Add New Product & Variants</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => onNavigateTab('coupons')}
                className="w-full p-3 rounded-lg bg-slate-50/70 dark:bg-zinc-900/60 hover:bg-slate-100 dark:hover:bg-zinc-800/70 text-slate-800 dark:text-zinc-200 font-semibold text-xs flex items-center justify-between transition-all border border-slate-200/80 dark:border-zinc-800/80 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-700/80 shadow-2xs">
                    <TicketPercent className="w-4 h-4" />
                  </div>
                  <span>Create Discount Coupon</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => onNavigateTab('content')}
                className="w-full p-3 rounded-lg bg-slate-50/70 dark:bg-zinc-900/60 hover:bg-slate-100 dark:hover:bg-zinc-800/70 text-slate-800 dark:text-zinc-200 font-semibold text-xs flex items-center justify-between transition-all border border-slate-200/80 dark:border-zinc-800/80 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-700/80 shadow-2xs">
                    <Image className="w-4 h-4" />
                  </div>
                  <span>Update Homepage Banners</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => onNavigateTab('reviews')}
                className="w-full p-3 rounded-lg bg-slate-50/70 dark:bg-zinc-900/60 hover:bg-slate-100 dark:hover:bg-zinc-800/70 text-slate-800 dark:text-zinc-200 font-semibold text-xs flex items-center justify-between transition-all border border-slate-200/80 dark:border-zinc-800/80 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-700/80 shadow-2xs">
                    <Star className="w-4 h-4" />
                  </div>
                  <span>Moderate Customer Reviews</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 text-[11px] text-slate-500 dark:text-zinc-500">
            Automated backups synced 5 mins ago. System operational.
          </div>
        </div>

      </div>

      {/* Recent Store Orders Queue Table */}
      <div className="bg-white dark:bg-[#111113] p-6 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs">
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Store Orders
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Live customer order fulfillment queue
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
          >
            View All ({orders.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-zinc-800/80 text-slate-400 dark:text-zinc-500 uppercase font-bold text-[10px] tracking-wider bg-slate-50/50 dark:bg-zinc-900/50">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 font-medium">
              {orders.slice(0, 5).map((order: Order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {order.customerName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">{order.customerName}</div>
                        <div className="text-[11px] text-slate-400 dark:text-zinc-500">{order.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-zinc-300">
                    <span className="font-semibold">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                    <span className="text-slate-400 dark:text-zinc-500 text-[11px] block truncate max-w-[150px]">
                      {order.items[0]?.productName}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    ₹{order.finalAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-zinc-400 text-[11px]">
                    {order.paymentMethod}
                  </td>
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
                  <td className="py-3.5 px-4 text-right">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Processing')}
                        className="px-3 py-1 rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 font-semibold text-xs hover:bg-slate-800 dark:hover:bg-zinc-200 transition-colors border border-slate-900 dark:border-zinc-100 shadow-2xs cursor-pointer"
                      >
                        Process
                      </button>
                    )}
                    {order.status === 'Processing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Shipped', 'BLRD-991823')}
                        className="px-3 py-1 rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 font-semibold text-xs hover:bg-slate-800 dark:hover:bg-zinc-200 transition-colors border border-slate-900 dark:border-zinc-100 shadow-2xs cursor-pointer"
                      >
                        Ship Order
                      </button>
                    )}
                    {order.status === 'Shipped' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Delivered')}
                        className="px-3 py-1 rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 font-semibold text-xs hover:bg-slate-800 dark:hover:bg-zinc-200 transition-colors border border-slate-900 dark:border-zinc-100 shadow-2xs cursor-pointer"
                      >
                        Mark Delivered
                      </button>
                    )}
                    {(order.status === 'Delivered' || order.status === 'Cancelled' || order.status === 'Refunded') && (
                      <span className="text-[11px] text-slate-400 font-medium">Completed</span>
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
