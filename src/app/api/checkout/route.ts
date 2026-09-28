// src/app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { hasLocale } from "next-intl";
import { getProducts } from "@/data";
import type { Product } from "@/data/types";
import { routing } from "@/i18n/routing";
import { calculateShipping } from "@/lib/cart";
import { siteUrl } from "@/lib/site";
import { getStripe } from "@/lib/stripe";
import { PAYMENT_METHODS, type PaymentMethod } from "@/types/checkout";

// ベースURL定数
const BASE_URL = siteUrl;

// 1 商品あたりの上限（誤入力や改ざんされたリクエストを弾く）
const MAX_QUANTITY = 99;

// Product data type for Stripe
interface StripeProductData {
  name: string;
  description: string;
  metadata: {
    product_id: string;
  };
  images?: string[];
}

interface ValidOrder {
  lines: { product: Product; quantity: number }[];
  paymentMethod: PaymentMethod;
  locale: (typeof routing.locales)[number];
}

// ブラウザから来た値は信用せず、商品・数量・受け取り方法・言語をここで確かめる
function parseOrder(body: unknown): ValidOrder | string {
  if (typeof body !== "object" || body === null) return "Invalid request";
  const { items, paymentMethod, locale } = body as Record<string, unknown>;

  if (
    typeof paymentMethod !== "string" ||
    !(PAYMENT_METHODS as readonly string[]).includes(paymentMethod)
  ) {
    return "Invalid payment method";
  }
  const validLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  if (!Array.isArray(items) || items.length === 0) return "No items in cart";

  const products = getProducts(validLocale);
  const lines: ValidOrder["lines"] = [];
  for (const item of items) {
    const { id, quantity } = (item ?? {}) as Record<string, unknown>;
    const product = products.find((p) => p.id === id);
    if (!product) return `Product with id ${String(id)} not found`;
    if (
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY
    ) {
      return `Invalid quantity for product ${product.id}`;
    }
    lines.push({ product, quantity });
  }

  return {
    lines,
    paymentMethod: paymentMethod as PaymentMethod,
    locale: validLocale,
  };
}

export async function POST(request: NextRequest) {
  try {
    const order = parseOrder(await request.json().catch(() => null));
    if (typeof order === "string") {
      return NextResponse.json({ error: order }, { status: 400 });
    }
    const { lines, paymentMethod, locale } = order;

    // 送料はサーバー側の価格から計算する（ブラウザの値は使わない）
    const subtotal = lines.reduce(
      (sum, { product, quantity }) => sum + product.price * quantity,
      0,
    );
    const shippingCost = calculateShipping(subtotal, paymentMethod);

    // ライン項目の作成
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = lines.map(
      ({ product, quantity }) => {
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
          quantity,
        };
      },
    );

    // 送料をラインアイテムに追加（オンライン決済で送料がかかる場合）
    if (shippingCost > 0) {
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
      success_url: `${BASE_URL}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/${locale}/cancel`,
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
    const session = await getStripe().checkout.sessions.create(sessionOptions);

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
