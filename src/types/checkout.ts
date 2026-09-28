// src/types/checkout.ts

export const PAYMENT_METHODS = ["in-store", "online"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

/**
 * ブラウザから送る決済リクエスト。
 * 金額（商品価格・送料）は送らない。サーバーが商品データから計算する。
 */
export interface CheckoutRequest {
  items: {
    id: number;
    quantity: number;
  }[];
  paymentMethod: PaymentMethod;
  locale: string;
}

export interface CheckoutResponse {
  url: string;
}
