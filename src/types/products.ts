// types/products.ts
export interface Image {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductDetail {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // Price in AUD (e.g., 88 = $88.00 AUD)
  originalPrice?: number | null;
  category: string;
  label: string;
  image: Image;
  details: {
    alcoholContent?: string;
    riceMilling?: string;
    brewery: string;
    region: string;
    taste: string;
    temperature: string;
    weight?: string; // for matcha
  };
  stock?: number;
  stripeProductId?: string;
  stripePriceId?: string;
  colorClass?: string; // for legacy compatibility
}

export interface HeroData {
  title: string[];
  subtitle: string;
  productName: string;
  heroImage: string;
}

export interface TopicData {
  id: number;
  title: string;
  description: string;
  image: string;
  bgColor?: string;
  productColor?: string;
  hasRings?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
}

// Stripe関連の型定義（オーストラリア向け）
export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  metadata: {
    productId: string;
  };
}

export interface StripePrice {
  id: string;
  product: string;
  unit_amount: number; // AUD cents
  currency: "aud";
  recurring?: {
    interval: string;
  } | null;
}

// フィルター・ソート関連
export type CategoryType = "すべて" | "純米大吟醸" | "抹茶";
export type SortType =
  | "おすすめ順"
  | "価格の安い順"
  | "価格の高い順"
  | "新着順";

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Component Props types
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  showAddToCart?: boolean;
}

export interface ProductListProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export interface FilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOptions: string[];
  selectedSort: string;
  onSortChange: (sort: string) => void;
  productCount: number;
}

// Checkout関連（オーストラリア向け）
export interface CheckoutItem {
  priceId: string;
  quantity: number;
}

export interface CheckoutSession {
  id: string;
  url: string | null;
  status: string;
}

export interface PaymentIntent {
  id: string;
  amount: number; // AUD cents
  currency: "aud";
  status: string;
  client_secret: string;
}

// Legacy compatibility types for existing components
export interface LegacyProductData {
  id: number;
  name: string;
  description?: string;
  price?: string;
  colorClass?: string;
  label?: string;
  image?: string | null;
}
