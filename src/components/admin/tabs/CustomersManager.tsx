import React, { useState } from 'react';
import {
  Search,
  Mail,
  Phone,
  Award,
  X,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { Customer, Order } from '@/types/admin';

export const CustomersManager: React.FC = () => {
  const { customers, orders } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((cust: Customer) => {
    const q = searchQuery.toLowerCase();
    return (
      cust.name.toLowerCase().includes(q) ||
      cust.email.toLowerCase().includes(q) ||
      cust.phone.toLowerCase().includes(q) ||
      cust.city.toLowerCase().includes(q)
    );
  });

  const getCustomerOrders = (customerEmail: string) => {
    return orders.filter((o: Order) => o.customerEmail.toLowerCase() === customerEmail.toLowerCase());
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#231F1B] p-5 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white">
            Customer Directory & LTV Insights
          </h2>
          <p className="text-xs text-[#736B60] dark:text-[#A69C8F] mt-0.5">
            Manage store buyers, track lifetime order spend, and review customer order history
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers by name, phone, city..."
            className="w-full bg-[#FEFDF5] dark:bg-[#1C1C18] border border-[#E7DFD3] dark:border-neutral-800 rounded-xl px-3.5 py-2 pl-10 text-xs font-medium text-[#231F1B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9C5B23]"
          />
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white dark:bg-[#231F1B] rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E7DFD3] dark:border-neutral-800 text-[#736B60] dark:text-[#A69C8F] uppercase font-bold text-[10px] tracking-wider bg-[#FEFDF5] dark:bg-[#1C1C18]">
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Lifetime Spend (LTV)</th>
                <th className="py-3.5 px-4">Tier Status</th>
                <th className="py-3.5 px-4 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD3] dark:divide-neutral-800 font-medium">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#736B60] dark:text-[#A69C8F]">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer: Customer) => (
                  <tr key={customer.id} className="hover:bg-[#FEFDF5] dark:hover:bg-[#2A2621] transition-colors">
                    
                    {/* Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#9C5B23] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-[#231F1B] dark:text-white">{customer.name}</div>
                          <div className="text-[10px] text-[#736B60] dark:text-[#A69C8F]">
                            Joined {customer.joinedDate}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4">
                      <div className="text-[#231F1B] dark:text-white font-semibold">{customer.email}</div>
                      <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F]">{customer.phone}</div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 text-[#231F1B] dark:text-white font-medium">
                      {customer.city}, {customer.state}
                    </td>

                    {/* Orders */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#231F1B] dark:text-white">
                        {customer.totalOrders} order{customer.totalOrders > 1 ? 's' : ''}
                      </span>
                    </td>

                    {/* LTV */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-[#9C5B23] dark:text-[#E9BE5F]">
                        ₹{customer.lifetimeValue.toLocaleString()}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          customer.status === 'VIP'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                            : customer.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-neutral-300'
                        }`}
                      >
                        {customer.status === 'VIP' && <Award className="w-3 h-3 mr-1 text-amber-600" />}
                        {customer.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="px-3 py-1.5 rounded-xl bg-[#F5EEDD] dark:bg-[#2A2621] hover:bg-[#9C5B23] hover:text-white transition-colors text-[#231F1B] dark:text-white font-bold flex items-center gap-1 ml-auto"
                      >
                        <span>History</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile & Purchase History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#FEFDF5] dark:bg-[#1F1C18] border border-[#E7DFD3] dark:border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#282823] dark:text-[#FEFDF5]">
            
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 border-b border-[#E7DFD3] dark:border-neutral-800 pb-5 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9C5B23] to-[#80481A] text-white flex items-center justify-center font-bold text-xl shadow-md">
                {selectedCustomer.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white flex items-center gap-2">
                  <span>{selectedCustomer.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#E9BE5F]/20 text-[#9C5B23] dark:text-[#E9BE5F] font-bold">
                    {selectedCustomer.status} Customer
                  </span>
                </h2>
                <div className="text-xs text-[#736B60] dark:text-[#A69C8F] flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{selectedCustomer.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{selectedCustomer.phone}</span>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#25221D] border border-[#E7DFD3] dark:border-neutral-800">
                <div className="text-xs font-bold text-[#736B60] dark:text-[#A69C8F]">Total Purchases</div>
                <div className="text-2xl font-extrabold text-[#231F1B] dark:text-white mt-1">
                  {selectedCustomer.totalOrders} Orders
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#25221D] border border-[#E7DFD3] dark:border-neutral-800">
                <div className="text-xs font-bold text-[#736B60] dark:text-[#A69C8F]">Lifetime Value (LTV)</div>
                <div className="text-2xl font-extrabold text-[#9C5B23] dark:text-[#E9BE5F] mt-1">
                  ₹{selectedCustomer.lifetimeValue.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Past Orders List */}
            <div>
              <h4 className="font-bold text-[#231F1B] dark:text-white font-serif text-sm mb-3">
                Customer Purchase History
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {getCustomerOrders(selectedCustomer.email).length === 0 ? (
                  <div className="p-4 rounded-xl bg-white dark:bg-[#25221D] text-xs text-[#736B60] text-center">
                    No order history found for this account.
                  </div>
                ) : (
                  getCustomerOrders(selectedCustomer.email).map((ord: Order) => (
                    <div
                      key={ord.id}
                      className="p-3 rounded-xl bg-white dark:bg-[#25221D] border border-[#E7DFD3] dark:border-neutral-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-[#9C5B23] dark:text-[#E9BE5F]">{ord.id}</div>
                        <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F]">
                          {ord.createdAt} • {ord.items.length} items
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#231F1B] dark:text-white">₹{ord.finalAmount}</div>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 pt-4 border-t border-[#E7DFD3] dark:border-neutral-800 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl bg-[#9C5B23] text-white font-bold text-xs"
              >
                Close Customer Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
