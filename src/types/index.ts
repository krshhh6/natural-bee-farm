export type CategoryType = 'all' | 'honey' | 'wildforest' | 'monofloral' | 'spiced' | 'ayurvedic' | 'rawcomb' | 'ghee' | 'oils' | 'spices' | 'flours';

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  weight: string;
  weightsAvailable?: string[];
  image: string;
  description: string;
  ingredients: string[];
  isOrganic?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isMustTry?: boolean;
  isTrending?: boolean;
  badgeText?: string;
  badgeEmoji?: string;
  discountTag?: string;
  inStock: boolean;
  origin: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  type: 'home' | 'work' | 'other';
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  weight: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Cancelled';
  paymentMethod: string;
  shippingAddress: string;
  trackingNumber?: string;
  deliveryDate?: string;
}

export interface UserProfile {
  uid?: string;
  name: string;
  email: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other' | '';
  dob?: string;
  avatar?: string;
  honeyPoints?: number;
  membershipTier?: 'Standard' | 'Silver Bee Keeper' | 'Artisanal Gold';
  addresses?: Address[];
  orders?: Order[];
  wishlist?: string[];
  notifications?: {
    whatsapp: boolean;
    email: boolean;
    sms: boolean;
    promotions: boolean;
  };
}

export type ProfileTab = 'profile' | 'addresses' | 'orders' | 'wishlist' | 'rewards' | 'settings';
export type AppPage = 'home' | 'products' | 'account';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  productName: string;
  avatar: string;
  date: string;
}

export interface FilterState {
  category: CategoryType;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  organicOnly: boolean;
}
