// src/store/cart.tsx - カートの状態（中身は cart-store.ts が localStorage と同期して持つ）
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Product, CartContextType } from "@/types/products";
import { cartStore } from "./cart-store";

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalPrice: () => 0,
  getTotalQuantity: () => 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const cartItems = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );

  // 関数は作り直さない（useEffect の依存に入れても毎回走らないように）
  const addToCart = useCallback((product: Product, quantity = 1) => {
    cartStore.update((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        // すでにある商品は数量を加算
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    cartStore.update((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    cartStore.update((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.product.id !== productId)
        : prev.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
    );
  }, []);

  const clearCart = useCallback(() => {
    // 空のカートをもう一度空にしても再描画しない
    cartStore.update((prev) => (prev.length === 0 ? prev : []));
  }, []);

  const value = useMemo<CartContextType>(() => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return {
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice: () => totalPrice,
      getTotalQuantity: () => totalQuantity,
    };
  }, [cartItems, addToCart, removeFromCart, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Contextを呼び出すためのカスタムフック
export function useCart() {
  return useContext(CartContext);
}
