"use client";

import { useState } from "react";
import type { Product } from "@/data/types";
import { formatPrice } from "@/data/format";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { AddToCartButton, type AddToCartLabels } from "./AddToCartButton";

interface PurchasePanelProps {
  product: Product;
  labels: AddToCartLabels & {
    quantity: string;
    subtotal: string;
    decrease: string;
    increase: string;
  };
}

// 商品詳細の「数量 → 小計 → カートに追加」。ここだけ状態を持つ
export function PurchasePanel({ product, labels }: PurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">{labels.quantity}</p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <QuantityStepper
            value={quantity}
            onChange={(next) => setQuantity(Math.max(next, 1))}
            size="lg"
            decreaseLabel={labels.decrease}
            increaseLabel={labels.increase}
          />
          <p className="text-sm text-muted-foreground">
            {labels.subtotal}{" "}
            <span className="tabular text-ink">
              {formatPrice(product.price * quantity)}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6">
        <AddToCartButton
          product={product}
          quantity={quantity}
          labels={labels}
          variant="solid"
        />
      </div>
    </>
  );
}
