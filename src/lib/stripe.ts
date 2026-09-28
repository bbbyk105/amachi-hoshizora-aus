// Stripe のサーバー用クライアント。秘密鍵を使うので Client から import されたらビルドで止める
import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

/**
 * 初回呼び出し時に作る（import しただけでは作らない）。
 * 秘密鍵が未設定ならここで例外になり、呼び出し側の try/catch で扱える。
 */
export function getStripe(): Stripe {
  if (!client) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) throw new Error("STRIPE_SECRET_KEY is not set");
    client = new Stripe(apiKey, { apiVersion: "2026-01-28.clover" });
  }
  return client;
}

export interface CheckoutSessionSummary {
  id: string;
  paymentStatus: string;
  amountTotal: number | null;
  currency: string | null;
  email: string | null;
}

/** 決済完了ページ用に、必要な項目だけを取り出す。取得できなければ null */
export async function getCheckoutSessionSummary(
  sessionId: string,
): Promise<CheckoutSessionSummary | null> {
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return {
      id: session.id,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
      email: session.customer_details?.email ?? null,
    };
  } catch (error) {
    console.error("Session retrieval error:", error);
    return null;
  }
}
