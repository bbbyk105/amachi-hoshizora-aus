import { NextResponse } from "next/server";
import Stripe from "stripe";
import products from "@/src/data/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {});

export async function POST(request: Request) {
  try {
    const { items }: { items: Array<{ id: number; quantity: number }> } =
      await request.json();
    // items: [{ id: number, quantity: number }, ...]

    // サーバー側で正しい商品データを参照
    const lineItems = items.map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Invalid product ID: ${item.id}`);
      }

      return {
        price_data: {
          currency: "eur", // <--- ユーロで課金する
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.price * 100,
          // product.priceが65なら、 6500ユーロセントになる
        },
        quantity: item.quantity,
      };
    });

    // Stripe の Checkout セッションを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://amachi-hoshizora.vercel.app/success",
      cancel_url: "https://amachi-hoshizora.vercel.app/cancel",
    });

    // フロントエンドにCheckout URLを返す
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
