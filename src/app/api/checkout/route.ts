// src/app/api/checkout/route.ts - English version
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProducts } from "@/data";

// Stripe初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-05-28.basil",
});

// ベースURL定数 - 本番環境では必ずHTTPS URLを使用
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

export async function POST(request: Request) {
  try {
    const {
      items,
      locale = "ja",
    }: {
      items: Array<{ id: number; quantity: number }>;
      locale?: string;
    } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // ロケール別の商品データを取得
    const products = getProducts(locale);

    // 商品データの検証とライン項目の作成
    const lineItems = items.map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Invalid product ID: ${item.id}`);
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
    });

    // Stripe Checkoutセッション作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cancel`,
      locale: "en", // 英語固定に変更
      // 領収書自動送信を有効化
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: "Purchase from Amachi-Hoshisora",
          metadata: {
            order_type: "in_person_purchase",
          },
          footer: "Thank you for your purchase!",
        },
      },
      // 顧客メール収集を必須にして領収書送信先を確保
      customer_email: undefined, // フォームで入力してもらう
      metadata: {
        order_type: "in_person_purchase", // 対面決済
        currency: "aud",
        locale: locale, // ロケール情報をmetadataに保存
      },
      custom_text: {
        submit: {
          message: "Complete your purchase", // 英語固定に変更
        },
      },
      // 自動的な税金計算（必要に応じて）
      automatic_tax: {
        enabled: false, // 必要に応じてtrueに変更
      },
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error); // エラーログ追加

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

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["invoice"], // 領収書情報も取得
    });

    return NextResponse.json({
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_details: session.customer_details,
        amount_total: session.amount_total,
        currency: session.currency,
        invoice: session.invoice, // 領収書情報を含める
      },
    });
  } catch (error) {
    console.error("Session retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    );
  }
}
