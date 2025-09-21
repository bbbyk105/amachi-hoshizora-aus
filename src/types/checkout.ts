// src/types/checkout.ts

export type PaymentMethod = "in-store" | "online";

export interface CheckoutRequest {
  items: {
    id: number;
    quantity: number;
  }[];
  paymentMethod: PaymentMethod;
  shippingCost: number;
}

export interface CheckoutResponse {
  url: string;
}
