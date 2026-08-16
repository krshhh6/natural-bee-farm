export type AdminTabType =
  | 'overview'
  | 'products'
  | 'orders'
  | 'customers'
  | 'coupons'
  | 'content'
  | 'reviews'
  | 'refunds';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Store Manager' | 'Support Specialist';
  avatar?: string;
  lastLogin: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
  status: OrderStatus;
  paymentMethod: 'COD' | 'UPI / Razorpay' | 'Credit / Debit Card';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  createdAt: string;
  trackingNumber?: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  totalOrders: number;
  lifetimeValue: number;
  joinedDate: string;
  status: 'VIP' | 'Active' | 'Inactive';
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  expiryDate: string;
  isActive: boolean;
}

export interface AnnouncementContent {
  text: string;
  badge: string;
  highlightText: string;
  isActive: boolean;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  tagline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  bgImageUrl: string;
}

export interface BannerContent {
  announcement: AnnouncementContent;
  hero: HeroContent;
}

export interface RefundRequest {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  reason: 'Damaged Jar / Broken Seal' | 'Wrong Item Delivered' | 'Quality Displeasure' | 'Order Cancelled Before Dispatch' | 'Late Delivery';
  description: string;
  refundAmount: number;
  requestedDate: string;
  status: 'Pending Review' | 'Approved' | 'Rejected';
  refundMethod?: 'Original Source' | 'Store Credit';
  adminNotes?: string;
}
