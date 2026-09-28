"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/store/cart";
import type { Product } from "@/data/types";

export type AddToCartStatus = "idle" | "adding" | "added";

const ADDING_MS = 500;
const ADDED_MS = 2000;

/**
 * カートに入れたことが伝わるよう「追加中 → 追加済み → 元に戻る」を切り替える。
 * 続けて押された時は前のタイマーを止め、最後の操作から数え直す。
 */
export function useAddToCartFeedback() {
  const { addToCart } = useCart();
  const [status, setStatus] = useState<AddToCartStatus>("idle");
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const add = useCallback(
    (product: Product, quantity = 1) => {
      addToCart(product, quantity);
      clearTimers();
      setStatus("adding");
      timers.current = [
        window.setTimeout(() => setStatus("added"), ADDING_MS),
        window.setTimeout(() => setStatus("idle"), ADDING_MS + ADDED_MS),
      ];
    },
    [addToCart, clearTimers],
  );

  return { status, add };
}
