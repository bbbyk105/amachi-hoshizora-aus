// types/products.ts - カートまわりの型。商品データの型は src/data/types.ts が唯一の定義
import type { Product } from "@/data/types";

export type { Image, Product, HeroData, TopicData, TopicFact } from "@/data/types";

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
