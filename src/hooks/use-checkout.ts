"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import type { CartItem } from "@/types/products";
import type { CheckoutRequest, PaymentMethod } from "@/types/checkout";

interface CheckoutInput {
  items: CartItem[];
  paymentMethod: PaymentMethod;
}

/**
 * Stripe Checkout のセッションを作り、決済ページへ移動する。
 * 金額はサーバーが計算するので、送るのは商品 ID・数量・受け取り方法・言語だけ。
 */
export function useCheckout(fallbackError: string) {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  // Stripe からブラウザの「戻る」で帰ってきた時（bfcache から復元）にボタンを戻す
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setLoading(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const checkout = useCallback(
    async ({ items, paymentMethod }: CheckoutInput) => {
      setLoading(true);
      try {
        const body: CheckoutRequest = {
          items: items.map((item) => ({
            id: item.product.id,
            quantity: item.quantity,
          })),
          paymentMethod,
          locale,
        };
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (!response.ok || !data.url) {
          throw new Error(data.error || fallbackError);
        }
        // 移動が終わるまでボタンは「処理中」のまま（二重送信を防ぐ）
        window.location.href = data.url;
      } catch (error) {
        console.error("Checkout error:", error);
        alert(error instanceof Error ? error.message : fallbackError);
        setLoading(false);
      }
    },
    [fallbackError, locale],
  );

  return { checkout, loading };
}
