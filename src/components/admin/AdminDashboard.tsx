import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Sparkles,
  MessageSquare,
  RotateCcw,
  Store,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ExternalLink,
  Sun,
  Moon,
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

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onReturnToStore,
  isDarkMode,
  toggleDarkMode,
}) => {
  const { adminUser, logoutAdmin, orders, products, refunds } = useStore();
  const [activeTab, setActiveTab] = useState<AdminTabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingOrdersCount = orders.filter((o: Order) => o.status === 'Pending' || o.status === 'Processing').length;
  const pendingRefundsCount = refunds.filter((r: RefundRequest) => r.status === 'Pending Review').length;

  const navMenuItems: {
    id: AdminTabType;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'products',
      label: 'Products & Variants',
      icon: <Package className="w-4 h-4" />,
      badge: products.filter((p: Product) => !p.inStock).length > 0 ? products.filter((p: Product) => !p.inStock).length : undefined,
    },
    {
      id: 'orders',
      label: 'Orders & Fulfillment',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
    },
    {
      id: 'customers',
      label: 'Customer Directory',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'coupons',
      label: 'Coupons & Offers',
      icon: <Tag className="w-4 h-4" />,
    },
    {
      id: 'content',
      label: 'Homepage Banners / CMS',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'reviews',
      label: 'Reviews & Feedback',
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      id: 'refunds',
      label: 'Refunds & Returns',
      icon: <RotateCcw className="w-4 h-4" />,
      badge: pendingRefundsCount > 0 ? pendingRefundsCount : undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FEFDF5] dark:bg-[#1A1816] text-[#282823] dark:text-[#FEFDF5] flex flex-col lg:flex-row transition-colors duration-200">
      
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[#E7DFD3] dark:border-neutral-800 bg-white dark:bg-[#1F1C18] p-5 shrink-0 justify-between sticky top-0 h-screen">
        
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-[#9C5B23] text-white flex items-center justify-center font-bold text-sm shadow-md">
              NBF
            </div>
            <div>
              <div className="font-serif font-extrabold text-sm tracking-wider text-[#231F1B] dark:text-white uppercase leading-none">
                NATURA <span className="text-[#9C5B23] dark:text-[#E9BE5F]">BEE</span>
              </div>
              <div className="text-[10px] tracking-widest font-bold text-[#9C5B23] dark:text-[#E9BE5F] mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                ADMIN OPERATIONS
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-bold">
            {navMenuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#9C5B23] text-white shadow-md'
                      : 'text-[#595247] dark:text-[#C5BBAE] hover:bg-[#F5EEDD] dark:hover:bg-[#2A2621] hover:text-[#9C5B23] dark:hover:text-[#E9BE5F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isActive
                          ? 'bg-white text-[#9C5B23]'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Bottom Sidebar User Info & Store Action */}
        <div className="pt-4 border-t border-[#E7DFD3] dark:border-neutral-800 space-y-3">
          
          <button
            onClick={onReturnToStore}
            className="w-full py-2.5 px-3 rounded-xl bg-[#F5EEDD] dark:bg-[#2A2621] hover:bg-[#E9BE5F]/20 text-[#9C5B23] dark:text-[#E9BE5F] text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-[#E0D0B6] dark:border-[#40372B]"
          >
            <Store className="w-4 h-4" />
            <span>Return to Storefront</span>
          </button>

          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#9C5B23] text-white flex items-center justify-center font-bold text-xs">
                {adminUser?.name.charAt(0) || 'A'}
              </div>
              <div className="truncate max-w-[100px]">
                <div className="font-bold text-xs text-[#231F1B] dark:text-white truncate">
                  {adminUser?.name || 'Admin'}
                </div>
                <div className="text-[10px] text-[#9C5B23] dark:text-[#E9BE5F] font-semibold">
                  {adminUser?.role || 'Super Admin'}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                logoutAdmin();
                onReturnToStore();
              }}
              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
              title="Logout Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </aside>

      {/* MOBILE SIDEBAR MODAL */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden flex">
          <div className="w-72 bg-white dark:bg-[#1F1C18] p-5 h-full flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="font-serif font-bold text-base text-[#231F1B] dark:text-white">
                  Admin Navigation
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-gray-500">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-1 text-xs font-bold">
                {navMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-[#9C5B23] text-white'
                        : 'text-[#595247] dark:text-[#C5BBAE] hover:bg-[#F5EEDD]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#E7DFD3]">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  onReturnToStore();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#F5EEDD] text-[#9C5B23] text-xs font-bold flex items-center justify-center gap-2"
              >
                <Store className="w-4 h-4" />
                <span>Return to Storefront</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP DASHBOARD BAR */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#1F1C18]/95 backdrop-blur-md border-b border-[#E7DFD3] dark:border-neutral-800 px-4 sm:px-8 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#F5EEDD] dark:hover:bg-[#2A2621]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold font-serif text-[#231F1B] dark:text-white capitalize">
                {navMenuItems.find((m) => m.id === activeTab)?.label}
              </h1>
              <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F]">
                Natura Bee Farm Business Operations & Admin Panel
              </div>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-3">
            
            {/* Store Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Store Live & Active</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-[#231F1B] dark:text-[#FEFDF5] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-[#E9BE5F]" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Store Front Switcher */}
            <button
              onClick={onReturnToStore}
              className="px-3.5 py-1.5 rounded-xl bg-[#F5EEDD] dark:bg-[#2A2621] hover:bg-[#9C5B23] hover:text-white text-[#9C5B23] dark:text-[#E9BE5F] font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storefront View</span>
            </button>

          </div>

        </header>

        {/* TAB BODY RENDER */}
        <div className="p-4 sm:p-8 flex-1">
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
