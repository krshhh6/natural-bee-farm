import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data/products';
import type { Product, Testimonial } from '../types';
import type {
  Order,
  Customer,
  Coupon,
  BannerContent,
  RefundRequest,
  AdminUser,
  OrderStatus,
} from '../types/admin';

// Initial Mock Orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'NBF-8925',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.s@gmail.com',
    customerPhone: '+91 98765 43210',
    shippingAddress: '42, Vasant Vihar, Block C, New Delhi - 110057',
    items: [
      {
        productId: 'gir-cow-a2-ghee',
        productName: 'Gir Cow A2 Ghee - Made From Curd',
        weight: '500 ML',
        price: 1350,
        quantity: 1,
        image: '/Honey_jar_on_wooden_surface_202608130958.jpeg',
      },
      {
        productId: 'wild-forest-honey',
        productName: 'Wild Forest Honey',
        weight: '500g',
        price: 589,
        quantity: 2,
        image: '/Glass_jar_filled_with_honey_202608130958.jpeg',
      },
    ],
    totalAmount: 2528,
    discountAmount: 200,
    shippingFee: 0,
    finalAmount: 2328,
    status: 'Pending',
    paymentMethod: 'UPI / Razorpay',
    paymentStatus: 'Paid',
    createdAt: '2026-08-16 18:45',
    notes: 'Please double box the glass jars for courier protection.',
  },
  {
    id: 'NBF-8924',
    customerName: 'Dr. Rajiv Mukherji',
    customerEmail: 'rajiv.mukherji@aims.edu',
    customerPhone: '+91 91234 56789',
    shippingAddress: '15/B Park Street, Flat 4A, Kolkata - 700016',
    items: [
      {
        productId: 'natura-acacia-honey-500g',
        productName: 'Himalayan Acacia & Sidr Honey',
        weight: '500g',
        price: 599,
        quantity: 1,
        image: '/Honey_jar_on_wood_table_202608130959.jpeg',
      },
      {
        productId: 'natura-saffron-honey-250g',
        productName: 'Kashmiri Kesar (Saffron) Honey',
        weight: '250g',
        price: 650,
        quantity: 1,
        image: '/Saffron_honey_jar_on_plate_202608130959.jpeg',
      },
    ],
    totalAmount: 1249,
    discountAmount: 100,
    shippingFee: 0,
    finalAmount: 1149,
    status: 'Processing',
    paymentMethod: 'Credit / Debit Card',
    paymentStatus: 'Paid',
    createdAt: '2026-08-16 14:12',
    trackingNumber: 'DEL-88391029',
  },
  {
    id: 'NBF-8923',
    customerName: 'Meera & Rajesh Verma',
    customerEmail: 'meera.verma@yahoo.in',
    customerPhone: '+91 94321 87654',
    shippingAddress: '78, Boring Road, Near High Court, Patna - 800001',
    items: [
      {
        productId: 'stone-pressed-mustard-oil',
        productName: 'Stone Pressed Black Mustard Oil',
        weight: '1000 ML (PET Bottle)',
        price: 390,
        quantity: 3,
        image: '/Glass_jar_filled_with_mustard_202608131002.jpeg',
      },
      {
        productId: 'khapli-wheat-atta',
        productName: 'Khapli (Emmer) Wheat Atta',
        weight: '2 kg',
        price: 499,
        quantity: 2,
        image: '/Ashwagandha_honey_jar_on_stone_202608130959.jpeg',
      },
    ],
    totalAmount: 2168,
    discountAmount: 150,
    shippingFee: 0,
    finalAmount: 2018,
    status: 'Shipped',
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    createdAt: '2026-08-15 11:30',
    trackingNumber: 'BLRD-99481726',
  },
  {
    id: 'NBF-8922',
    customerName: 'Vikramaditya Sen',
    customerEmail: 'vikram.sen@techinnovate.com',
    customerPhone: '+91 98111 22334',
    shippingAddress: 'Tower 4, Apt 1202, Cyber City Phase 2, Gurugram - 122002',
    items: [
      {
        productId: 'gir-cow-a2-ghee',
        productName: 'Gir Cow A2 Ghee - Made From Curd',
        weight: '1000 ML',
        price: 2500,
        quantity: 1,
        image: '/Honey_jar_on_wooden_surface_202608130958.jpeg',
      },
    ],
    totalAmount: 2500,
    discountAmount: 250,
    shippingFee: 0,
    finalAmount: 2250,
    status: 'Delivered',
    paymentMethod: 'UPI / Razorpay',
    paymentStatus: 'Paid',
    createdAt: '2026-08-14 09:20',
    trackingNumber: 'FEDEX-7729103',
  },
  {
    id: 'NBF-8921',
    customerName: 'Sunita Roy',
    customerEmail: 'sunita.roy@gmail.com',
    customerPhone: '+91 97788 55443',
    shippingAddress: '12, Salt Lake Sector 5, Kolkata - 700091',
    items: [
      {
        productId: 'natura-tulsi-honey-500g',
        productName: 'Organic Tulsi (Holy Basil) Honey',
        weight: '500g',
        price: 480,
        quantity: 1,
        image: '/Jar_of_tulsi_honey_on_202608130958.jpeg',
      },
    ],
    totalAmount: 480,
    discountAmount: 0,
    shippingFee: 60,
    finalAmount: 540,
    status: 'Cancelled',
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    createdAt: '2026-08-13 16:05',
    notes: 'Customer requested cancellation due to wrong delivery address provided.',
  },
];

// Initial Customers
const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-101',
    name: 'Ananya Sharma',
    email: 'ananya.s@gmail.com',
    phone: '+91 98765 43210',
    city: 'New Delhi',
    state: 'Delhi',
    totalOrders: 4,
    lifetimeValue: 8940,
    joinedDate: '2025-11-12',
    status: 'VIP',
  },
  {
    id: 'cust-102',
    name: 'Dr. Rajiv Mukherji',
    email: 'rajiv.mukherji@aims.edu',
    phone: '+91 91234 56789',
    city: 'Kolkata',
    state: 'West Bengal',
    totalOrders: 6,
    lifetimeValue: 14200,
    joinedDate: '2025-09-04',
    status: 'VIP',
  },
  {
    id: 'cust-103',
    name: 'Meera & Rajesh Verma',
    email: 'meera.verma@yahoo.in',
    phone: '+91 94321 87654',
    city: 'Patna',
    state: 'Bihar',
    totalOrders: 3,
    lifetimeValue: 5600,
    joinedDate: '2026-01-18',
    status: 'Active',
  },
  {
    id: 'cust-104',
    name: 'Vikramaditya Sen',
    email: 'vikram.sen@techinnovate.com',
    phone: '+91 98111 22334',
    city: 'Gurugram',
    state: 'Haryana',
    totalOrders: 2,
    lifetimeValue: 4750,
    joinedDate: '2026-03-22',
    status: 'Active',
  },
  {
    id: 'cust-105',
    name: 'Sunita Roy',
    email: 'sunita.roy@gmail.com',
    phone: '+91 97788 55443',
    city: 'Kolkata',
    state: 'West Bengal',
    totalOrders: 1,
    lifetimeValue: 540,
    joinedDate: '2026-07-10',
    status: 'Inactive',
  },
];

// Initial Coupons
const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'HONEY15',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 799,
    maxDiscount: 300,
    usageLimit: 500,
    usedCount: 142,
    expiryDate: '2026-12-31',
    isActive: true,
  },
  {
    id: 'coup-2',
    code: 'PUREFLAVOR200',
    discountType: 'fixed',
    discountValue: 200,
    minOrderValue: 1499,
    usageLimit: 200,
    usedCount: 88,
    expiryDate: '2026-10-15',
    isActive: true,
  },
  {
    id: 'coup-3',
    code: 'FREESHIP',
    discountType: 'free_shipping',
    discountValue: 0,
    minOrderValue: 499,
    usageLimit: 1000,
    usedCount: 420,
    expiryDate: '2026-11-30',
    isActive: true,
  },
  {
    id: 'coup-4',
    code: 'FESTIVE10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 0,
    maxDiscount: 150,
    usageLimit: 300,
    usedCount: 19,
    expiryDate: '2026-09-01',
    isActive: false,
  },
];

// Initial Banners
const INITIAL_BANNERS: BannerContent = {
  announcement: {
    text: '✨ FESTIVE OFFER: Enjoy Extra 15% OFF + Free Shipping across India on orders above ₹799!',
    badge: '100% Pure & Raw',
    highlightText: 'Use Code: HONEY15',
    isActive: true,
  },
  hero: {
    headline: 'Preserving India’s Purest Traditional Food Heritage',
    subheadline: 'Hand-extracted raw forest honey, stone-pressed unrefined oils, and authentic A2 Bilona Ghee crafted with ancient wisdom.',
    tagline: 'DIRECT FROM FOREST APICULTURISTS & TRADITIONAL FARMERS',
    primaryCtaText: 'Explore Artisanal Harvest',
    secondaryCtaText: 'Our Heritage & Purity Standard',
    bgImageUrl: '/Honey_jar_on_wooden_surface_202608130958.jpeg',
  },
};

// Initial Refund Requests
const INITIAL_REFUNDS: RefundRequest[] = [
  {
    id: 'ref-501',
    orderId: 'NBF-8919',
    customerName: 'Kavita Sundaram',
    customerEmail: 'kavita.s@gmail.com',
    reason: 'Damaged Jar / Broken Seal',
    description: 'The glass jar of Saffron Honey arrived cracked during delivery parcel handling.',
    refundAmount: 650,
    requestedDate: '2026-08-12',
    status: 'Pending Review',
  },
  {
    id: 'ref-500',
    orderId: 'NBF-8915',
    customerName: 'Amitabh Sen',
    customerEmail: 'amitabh.sen@rediffmail.com',
    reason: 'Order Cancelled Before Dispatch',
    description: 'Cancelled due to double order placed by mistake on website.',
    refundAmount: 1350,
    requestedDate: '2026-08-08',
    status: 'Approved',
    refundMethod: 'Original Source',
    adminNotes: 'Refunded via Razorpay transaction TXN_8829104',
  },
];

export interface StoreContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  coupons: Coupon[];
  banners: BannerContent;
  testimonials: (Testimonial & { isApproved?: boolean; isFeatured?: boolean })[];
  refunds: RefundRequest[];
  
  // Admin Authentication State
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Product Operations
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  toggleProductStatus: (id: string) => void;
  deleteProduct: (id: string) => void;

  // Order Operations
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;

  // Coupon Operations
  createCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => void;
  updateCoupon: (coupon: Coupon) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;

  // Banner Content Operations
  updateBanners: (content: BannerContent) => void;

  // Review / Testimonial Operations
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  toggleFeaturedReview: (id: string) => void;
  addReview: (testimonial: Omit<Testimonial, 'id' | 'date'>) => void;

  // Refund Operations
  processRefund: (
    refundId: string,
    status: 'Approved' | 'Rejected',
    refundMethod?: 'Original Source' | 'Store Credit',
    adminNotes?: string
  ) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nbf_store_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nbf_store_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Customers
  const [customers, _setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('nbf_store_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('nbf_store_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  // Banner Content
  const [banners, setBanners] = useState<BannerContent>(() => {
    const saved = localStorage.getItem('nbf_store_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  // Testimonials / Reviews
  const [testimonials, setTestimonials] = useState<(Testimonial & { isApproved?: boolean; isFeatured?: boolean })[]>(() => {
    const saved = localStorage.getItem('nbf_store_testimonials');
    if (saved) return JSON.parse(saved);
    return INITIAL_TESTIMONIALS.map((t) => ({ ...t, isApproved: true, isFeatured: true }));
  });

  // Refund Requests
  const [refunds, setRefunds] = useState<RefundRequest[]>(() => {
    const saved = localStorage.getItem('nbf_store_refunds');
    return saved ? JSON.parse(saved) : INITIAL_REFUNDS;
  });

  // Admin Session
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('nbf_admin_auth') === 'true';
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('nbf_admin_user');
    if (saved) return JSON.parse(saved);
    if (localStorage.getItem('nbf_admin_auth') === 'true') {
      return {
        id: 'adm-101',
        name: 'Operation Admin',
        email: 'admin@naturabee.com',
        role: 'Super Admin',
        lastLogin: new Date().toISOString(),
      };
    }
    return null;
  });

  // Save to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('nbf_store_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nbf_store_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nbf_store_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('nbf_store_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('nbf_store_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('nbf_store_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('nbf_store_refunds', JSON.stringify(refunds));
  }, [refunds]);

  useEffect(() => {
    localStorage.setItem('nbf_admin_auth', String(isAdminLoggedIn));
    if (adminUser) {
      localStorage.setItem('nbf_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('nbf_admin_user');
    }
  }, [isAdminLoggedIn, adminUser]);

  // Admin Auth Handler
  const loginAdmin = (email: string, pass: string): boolean => {
    if ((email === 'admin@naturabee.com' || email === 'admin') && (pass === 'admin123' || pass === 'admin')) {
      const user: AdminUser = {
        id: 'adm-101',
        name: 'Master Business Admin',
        email: 'admin@naturabee.com',
        role: 'Super Admin',
        lastLogin: new Date().toLocaleString(),
      };
      setAdminUser(user);
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
  };

  // Product Actions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newId = `product-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const toggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Order Actions
  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updated: Order = {
            ...ord,
            status,
            trackingNumber: trackingNumber ?? ord.trackingNumber,
          };
          if (status === 'Delivered' || status === 'Shipped') {
            updated.paymentStatus = 'Paid';
          } else if (status === 'Refunded') {
            updated.paymentStatus = 'Refunded';
          }
          return updated;
        }
        return ord;
      })
    );
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newId = `NBF-${Math.floor(8926 + Math.random() * 1000)}`;
    const newOrder: Order = {
      ...orderData,
      id: newId,
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Coupon Actions
  const createCoupon = (couponData: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      usedCount: 0,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const updateCoupon = (updatedCoupon: Coupon) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === updatedCoupon.id ? updatedCoupon : c))
    );
  };

  const toggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  // Banner Operations
  const updateBanners = (content: BannerContent) => {
    setBanners(content);
  };

  // Review Operations
  const approveReview = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isApproved: true } : t))
    );
  };

  const rejectReview = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFeaturedReview = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFeatured: !t.isFeatured } : t))
    );
  };

  const addReview = (reviewData: Omit<Testimonial, 'id' | 'date'>) => {
    const newReview = {
      ...reviewData,
      id: `test-${Date.now()}`,
      date: 'Verified Buyer • Just now',
      isApproved: true,
      isFeatured: false,
    };
    setTestimonials((prev) => [newReview, ...prev]);
  };

  // Refund Operations
  const processRefund = (
    refundId: string,
    status: 'Approved' | 'Rejected',
    refundMethod?: 'Original Source' | 'Store Credit',
    adminNotes?: string
  ) => {
    setRefunds((prev) =>
      prev.map((r) => {
        if (r.id === refundId) {
          const updated: RefundRequest = {
            ...r,
            status,
            refundMethod: refundMethod ?? r.refundMethod,
            adminNotes: adminNotes ?? r.adminNotes,
          };
          
          if (status === 'Approved') {
            updateOrderStatus(r.orderId, 'Refunded');
          }
          return updated;
        }
        return r;
      })
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        customers,
        coupons,
        banners,
        testimonials,
        refunds,
        isAdminLoggedIn,
        adminUser,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        toggleProductStatus,
        deleteProduct,
        updateOrderStatus,
        addOrder,
        createCoupon,
        updateCoupon,
        toggleCoupon,
        deleteCoupon,
        updateBanners,
        approveReview,
        rejectReview,
        toggleFeaturedReview,
        addReview,
        processRefund,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
