// カート金額の計算（Client / Server どちらからも使える純粋関数）
import type { PaymentMethod } from "@/types/checkout";

export const SHIPPING_COST = 50; // AUD
export const FREE_SHIPPING_THRESHOLD = 600; // AUD

/** 対面受け取りは送料無料。配送は一定額以上で無料 */
export function calculateShipping(subtotal: number, method: PaymentMethod) {
  if (method === "in-store") return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}
