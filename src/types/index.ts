export type CategorySlug =
  | 'cables'
  | 'switches'
  | 'lighting'
  | 'breakers'
  | 'sockets'
  | 'meters';

export type StockStatus = 'available' | 'limited' | 'out';
export type SortOption = 'newest' | 'price-low' | 'best-selling';
export type ViewMode = 'grid' | 'list';
export type ProductTab = 'details' | 'specs' | 'reviews';

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  description: string;
  iconKey: string;
  accent: string;
}

export interface ProductReview {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: CategorySlug;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stockStatus: StockStatus;
  stockQuantity: number;
  soldCount: number;
  description: string;
  specs: ProductSpec[];
  reviews: ProductReview[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ToastState {
  message: string;
  visible: boolean;
}
