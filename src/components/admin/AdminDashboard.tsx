import React, { useState } from 'react';
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  TicketPercent,
  Image,
  Star,
  RotateCcw,
  Store,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Sun,
  Moon,
  Search,
  Bell,
  Building2,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { Product } from '@/types';
import type { AdminTabType, Order, RefundRequest } from '@/types/admin';

// Tab Component Imports
import { DashboardOverview } from './tabs/DashboardOverview';
import { ProductsManager } from './tabs/ProductsManager';
import { OrdersManager } from './tabs/OrdersManager';
import { CustomersManager } from './tabs/CustomersManager';
import { CouponsManager } from './tabs/CouponsManager';
import { ContentManager } from './tabs/ContentManager';
import { ReviewsManager } from './tabs/ReviewsManager';
import { RefundsManager } from './tabs/RefundsManager';

interface AdminDashboardProps {
  onReturnToStore: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface NavSection {
  title: string;
  items: {
    id: AdminTabType;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    badgeColor?: string;
  }[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onReturnToStore,
  isDarkMode,
  toggleDarkMode,
}) => {
  const { adminUser, logoutAdmin, orders, products, refunds } = useStore();
  const [activeTab, setActiveTab] = useState<AdminTabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const pendingOrdersCount = orders.filter((o: Order) => o.status === 'Pending' || o.status === 'Processing').length;
  const pendingRefundsCount = refunds.filter((r: RefundRequest) => r.status === 'Pending Review').length;
  const outOfStockCount = products.filter((p: Product) => !p.inStock).length;

  const navSections: NavSection[] = [
    {
      title: 'ANALYTICS & OVERVIEW',
      items: [
        {
          id: 'overview',
          label: 'Dashboard Overview',
          icon: <BarChart3 className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'STORE MANAGEMENT',
      items: [
        {
          id: 'products',
          label: 'Products Catalog',
          icon: <Package className="w-4 h-4" />,
          badge: outOfStockCount > 0 ? outOfStockCount : undefined,
          badgeColor: 'bg-amber-600 text-white',
        },
        {
          id: 'orders',
          label: 'Orders & Dispatch',
          icon: <ShoppingBag className="w-4 h-4" />,
          badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
          badgeColor: 'bg-amber-600 text-white',
        },
        {
          id: 'customers',
          label: 'Customer Directory',
          icon: <Users className="w-4 h-4" />,
        },
        {
          id: 'coupons',
          label: 'Coupons & Offers',
          icon: <TicketPercent className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'CONTENT & SUPPORT',
      items: [
        {
          id: 'content',
          label: 'Homepage Banners',
          icon: <Image className="w-4 h-4" />,
        },
        {
          id: 'reviews',
          label: 'Customer Reviews',
          icon: <Star className="w-4 h-4" />,
        },
        {
          id: 'refunds',
          label: 'Refunds & Returns',
          icon: <RotateCcw className="w-4 h-4" />,
          badge: pendingRefundsCount > 0 ? pendingRefundsCount : undefined,
          badgeColor: 'bg-rose-600 text-white',
        },
      ],
    },
  ];

  const getTabTitle = (tabId: AdminTabType) => {
    for (const section of navSections) {
      const match = section.items.find((item) => item.id === tabId);
      if (match) return match.label;
    }
    return 'Admin Panel';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#09090B] text-slate-800 dark:text-slate-100 flex flex-col lg:flex-row font-sans transition-colors duration-200 antialiased selection:bg-amber-500 selection:text-white">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111113] p-4 shrink-0 justify-between sticky top-0 h-screen z-40">
        
        <div className="space-y-6 overflow-y-auto pr-1">
          
          {/* Enterprise Logo Header */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs shadow-2xs">
                <Building2 className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>NATURA BEE</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500 tracking-wider">
                  ENTERPRISE ADMIN
                </div>
              </div>
            </div>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
              v2.4
            </span>
          </div>

          {/* Grouped Navigation */}
          <div className="space-y-5 pt-2">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                <div className="px-3 text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white dark:bg-zinc-800 dark:text-white font-semibold shadow-2xs'
                            : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100/80 dark:hover:bg-zinc-800/60 hover:text-slate-900 dark:hover:text-zinc-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={isActive ? 'text-amber-400' : 'text-slate-400 dark:text-zinc-500'}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                              item.badgeColor || 'bg-amber-600 text-white'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Sidebar User Info & Quick Switcher */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-zinc-800/80 space-y-3">
          
          <button
            onClick={onReturnToStore}
            className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-zinc-800/70 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-200/80 dark:border-zinc-700/60 cursor-pointer"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </button>

          <div className="flex items-center justify-between px-1 pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-slate-200 dark:ring-zinc-700">
                {adminUser?.name.charAt(0) || 'A'}
              </div>
              <div className="truncate min-w-0">
                <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {adminUser?.name || 'Master Admin'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium truncate">
                  {adminUser?.role || 'Super Admin'}
                </div>
              </div>
            </div>

            <button
              onClick={logoutAdmin}
              className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs lg:hidden flex">
          <div className="w-72 bg-white dark:bg-[#111113] p-5 h-full flex flex-col justify-between overflow-y-auto border-r border-slate-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-zinc-800">
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    <Building2 className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <span>Admin Menu</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {navSections.map((section) => (
                  <div key={section.title} className="space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {section.title}
                    </div>
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          activeTab === item.id
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  onReturnToStore();
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>Return to Storefront</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT CANVAS */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* ENTERPRISE TOP HEADER BAR */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#111113]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800/80 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Left Title & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {getTabTitle(activeTab)}
              </h1>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium hidden sm:block">
                Natura Bee Farm • Operations & Control Hub
              </div>
            </div>
          </div>

          {/* Middle Search Input */}
          <div className="hidden md:flex items-center flex-1 max-w-sm relative">
            <Search className="w-4 h-4 absolute left-3 text-slate-400 dark:text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog, orders, customers... (⌘K)"
              className="w-full pl-9 pr-12 py-1.5 text-xs bg-slate-100/80 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/40 focus:border-slate-500 transition-all"
            />
            <kbd className="absolute right-2.5 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-slate-400 bg-white dark:bg-zinc-700 rounded border border-slate-200 dark:border-zinc-600 shadow-2xs pointer-events-none">
              ⌘K
            </kbd>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            
            {/* Live Store Pill */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Store</span>
            </div>

            {/* Notification Bell */}
            <button
              className="p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors relative cursor-pointer"
              title="System Alerts"
            >
              <Bell className="w-4 h-4" />
              {(pendingOrdersCount > 0 || pendingRefundsCount > 0) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-[#111113]" />
              )}
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Storefront View Button */}
            <button
              onClick={onReturnToStore}
              className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-zinc-100 hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-slate-900 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storefront</span>
            </button>

          </div>

        </header>

        {/* TAB BODY CONTAINER */}
        <div className="p-4 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && <DashboardOverview onNavigateTab={setActiveTab} />}
          {activeTab === 'products' && <ProductsManager />}
          {activeTab === 'orders' && <OrdersManager />}
          {activeTab === 'customers' && <CustomersManager />}
          {activeTab === 'coupons' && <CouponsManager />}
          {activeTab === 'content' && <ContentManager />}
          {activeTab === 'reviews' && <ReviewsManager />}
          {activeTab === 'refunds' && <RefundsManager />}
        </div>

      </main>

    </div>
  );
};
