"use client";

import { Check } from "lucide-react";
import type { Product } from "@/data/types";
import { useAddToCartFeedback } from "@/hooks/use-add-to-cart-feedback";
import { cn } from "@/lib/utils";

export interface AddToCartLabels {
  add: string;
  adding: string;
  added: string;
}

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  labels: AddToCartLabels;
  /** outline は一覧の小さなボタン、solid は商品詳細の大きなボタン */
  variant?: "outline" | "solid";
}

export function AddToCartButton({
  product,
  quantity = 1,
  labels,
  variant = "outline",
}: AddToCartButtonProps) {
  const { status, add } = useAddToCartFeedback();

  return (
    <button
      type="button"
      onClick={() => add(product, quantity)}
      disabled={status === "adding"}
      aria-live="polite"
      className={cn(
        "inline-flex w-full cursor-pointer items-center justify-center gap-2 text-sm transition-colors disabled:cursor-wait",
        variant === "outline"
          ? cn(
              "mt-5 h-11 border",
              status === "added"
                ? "border-ink bg-ink text-white"
                : "border-ink/80 text-ink hover:bg-ink hover:text-white",
            )
          : cn(
              "h-14 text-white",
              status === "added" ? "bg-ruri" : "bg-ink hover:bg-ruri",
            ),
      )}
    >
      {status === "adding" ? (
        labels.adding
      ) : status === "added" ? (
        <>
          <Check className="h-4 w-4" strokeWidth={1.5} />
          {labels.added}
        </>
      ) : (
        labels.add
      )}
    </button>
  );
}
