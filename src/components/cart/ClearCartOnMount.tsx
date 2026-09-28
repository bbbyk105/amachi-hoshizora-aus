"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";

// 決済完了ページを開いたらカートを空にする（表示は何もしない）
export function ClearCartOnMount() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
