// src/app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/data/products";

// Stripe初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-05-28.basil",
});

// ベースURL定数
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function POST(request: Request) {
  try {
    const { items }: { items: Array<{ id: number; quantity: number }> } =
      await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // 商品データの検証とライン項目の作成
    const lineItems = items.map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Invalid product ID: ${item.id}`);
      }

      return {
        price_data: {
          currency: "aud",
          product_data: {
            name: product.name,
            description: product.description,
            metadata: {
              product_id: product.id.toString(),
            },
          },
          unit_amount: Math.round(product.price * 100), // AUDをセントに変換
        },
        quantity: item.quantity,
      };
    });

    // Stripe Checkoutセッション作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cancel`,
      locale: "en", // 英語で表示
      billing_address_collection: "auto", // 請求先住所は自動判定
      metadata: {
        order_type: "in_person_purchase", // 対面決済
        currency: "aud",
      },
      custom_text: {
        submit: {
          message: "Complete your purchase", // 英語でのボタンテキスト
        },
      },
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// セッション詳細取得用のGETメソッド
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_details: session.customer_details,
        amount_total: session.amount_total,
        currency: session.currency,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    );
  }
}
