// src/app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProducts } from "@/data";
import type { CheckoutRequest } from "@/types/checkout";

// Stripe初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-01-28.clover",
});

// ベースURL定数
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";

// Product data type for Stripe
interface StripeProductData {
  name: string;
  description: string;
  metadata: {
    product_id: string;
  };
  images?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest & { locale?: string } = await request.json();
    const { items, paymentMethod, shippingCost, locale = "ja" } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // ロケール別の商品データを取得
    const products = getProducts(locale);

    // 商品データの検証とライン項目の作成
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => {
        const product = products.find((p) => p.id === item.id);

        if (!product) {
          throw new Error(`Product with id ${item.id} not found`);
        }

        // 本番環境または ngrok 使用時のみ画像を含める
        const isProduction = process.env.NODE_ENV === "production";
        const isNgrok =
          BASE_URL.includes("ngrok") || BASE_URL.includes("https://");
        const shouldIncludeImages = isProduction || isNgrok;

        const productData: StripeProductData = {
          name: product.name,
          description: product.description,
          metadata: {
            product_id: product.id.toString(),
          },
        };

        // HTTPS の場合のみ画像を追加
        if (shouldIncludeImages) {
          const imageUrl = product.image.url.startsWith("http")
            ? product.image.url
            : `${BASE_URL}${product.image.url}`;
          productData.images = [imageUrl];
          console.log(`Including image: ${imageUrl}`);
        } else {
          console.log(`Skipping images for localhost development`);
        }

        return {
          price_data: {
            currency: "aud",
            product_data: productData,
            unit_amount: Math.round(product.price * 100), // AUDをセントに変換
          },
          quantity: item.quantity,
        };
      },
    );

    // 送料をラインアイテムに追加（オンライン決済で送料がかかる場合）
    if (paymentMethod === "online" && shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "aud",
          product_data: {
            name: "Shipping Fee", // 英語固定
            description: "Standard shipping", // 英語固定
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Stripe Checkoutセッションのオプション
    const sessionOptions: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cancel`,
      locale: "en", // 常に英語で表示
      metadata: {
        paymentMethod,
        order_type:
          paymentMethod === "in-store"
            ? "in_person_purchase"
            : "online_delivery",
        currency: "aud",
        locale: locale,
        shipping_cost: shippingCost.toString(),
      },
      // 領収書自動送信を有効化
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: "Purchase from Amachi-Hoshisora", // 英語固定
          metadata: {
            order_type:
              paymentMethod === "in-store"
                ? "in_person_purchase"
                : "online_delivery",
          },
          footer: "Thank you for your purchase!", // 英語固定
        },
      },
      custom_text: {
        submit: {
          message: "Complete your purchase", // 英語固定
        },
      },
      automatic_tax: {
        enabled: false,
      },
    };

    // 対面決済 vs オンライン決済で異なる設定
    if (paymentMethod === "online") {
      // オンライン決済の場合は配送先住所を要求
      sessionOptions.shipping_address_collection = {
        allowed_countries: ["AU"], // オーストラリアのみ
      };
      sessionOptions.phone_number_collection = {
        enabled: true,
      };
    } else {
      // 対面決済の場合はメールのみ収集（オプション）
      sessionOptions.customer_email = undefined; // フォームで入力してもらう
    }

    // Stripeセッションを作成
    const session = await stripe.checkout.sessions.create(sessionOptions);

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
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
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["invoice"],
    });

    return NextResponse.json({
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_details: session.customer_details,
        amount_total: session.amount_total,
        currency: session.currency,
        invoice: session.invoice,
      },
    });
  } catch (error) {
    console.error("Session retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 },
    );
  }
}
