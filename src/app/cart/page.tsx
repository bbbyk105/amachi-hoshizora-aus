// app/cart/page.tsx
"use client";

import { Icon } from "@/components/Icon";
import { useCart } from "@/src/store/cart";
import Image from "next/image";
import { useState } from "react";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // カートアイテムを { id, quantity } だけ送る（改ざん対策）
          items: cartItems.map((item) => ({
            id: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });
      if (!res.ok) throw new Error("Checkout session creation failed");

      const data = await res.json();
      window.location.href = data.url; // リダイレクト
    } catch (error) {
      console.error(error);
      alert("Failed to initiate checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.product.id} className="flex items-center gap-4">
                <Image
                  src={item.product.image.url}
                  alt={item.product.image.alt}
                  width={100}
                  height={100}
                  className="object-cover"
                />
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p>
                    € {item.product.price} x {item.quantity} = €{" "}
                    {item.product.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-sm text-red-500 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-lg font-semibold">Total: € {getTotalPrice()}</p>
            <div className="flex gap-4 mt-4">
              <button onClick={clearCart} className="border px-4 py-2 rounded">
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? (
                  <Icon.spinner className="mr-2 animate-spin" />
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
