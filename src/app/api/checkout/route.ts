// src/app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/data/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-05-28.basil",
});

export async function POST(request: Request) {
  try {
    const { items }: { items: Array<{ id: number; quantity: number }> } =
      await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // サーバー側で正しい商品データを参照
    const lineItems = items.map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Invalid product ID: ${item.id}`);
      }

      return {
        price_data: {
          currency: "aud", // オーストラリアドル
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.image.url], // 商品画像のURL
            metadata: {
              product_id: product.id.toString(),
              stripe_product_id: product.stripeProductId || "",
            },
          },
          unit_amount: Math.round(product.price * 100), // AUDをセントに変換 ($88.00 -> 8800 cents)
        },
        quantity: item.quantity,
      };
    });

    // Stripe の Checkout セッションを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      shipping_address_collection: {
        allowed_countries: ["AU"], // オーストラリアのみ
      },
      billing_address_collection: "required",
      metadata: {
        order_type: "online_purchase",
        currency: "aud",
      },
    });

    // フロントエンドにCheckout URLを返す
    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET method for retrieving session details
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
  } catch (error) {
    console.error("Stripe session retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    );
  }
}
