"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { formatPrice } from "@/data/format";
import type { CartItem } from "@/types/products";
import { QuantityStepper } from "@/components/shared/QuantityStepper";

interface CartLineItemProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartLineItem({ item, onQuantityChange, onRemove }: CartLineItemProps) {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const { product, quantity } = item;

  return (
    <li className="flex gap-5 border-b border-border py-6">
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-4/5 w-20 shrink-0 overflow-hidden bg-mist sm:w-24"
      >
        <Image
          src={product.image.url}
          alt={product.image.alt}
          fill
          sizes="96px"
          className={product.image.cutout ? "object-contain py-[6%]" : "object-cover"}
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-base leading-snug text-ink sm:text-lg">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm tabular text-ink">
              {formatPrice(product.price * quantity)}
            </p>
            {quantity > 1 && (
              <p className="mt-0.5 text-xs tabular text-muted-foreground">
                {formatPrice(product.price)} × {quantity}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <QuantityStepper
            value={quantity}
            onChange={onQuantityChange}
            decreaseLabel={tCommon("decrease")}
            increaseLabel={tCommon("increase")}
          />
          <button
            type="button"
            onClick={onRemove}
            className="cursor-pointer text-xs text-muted-foreground underline underline-offset-4 hover:text-destructive"
          >
            {t("items.remove")}
          </button>
        </div>
      </div>
    </li>
  );
}
