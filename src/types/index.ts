export type CategoryType = 'all' | 'honey' | 'pickles' | 'badis' | 'spices' | 'flours' | 'ghee' | 'oils';

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
