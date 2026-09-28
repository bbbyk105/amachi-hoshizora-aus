import Image from "next/image";
import type { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import type { Product } from "@/data/types";
import { formatPrice } from "@/data/format";
import { cn } from "@/lib/utils";

interface ProductTileProps {
  product: Product;
  sizes?: string;
  priority?: boolean;
  /** 価格の下に置くアクション（カート追加など） */
  children?: ReactNode;
}

// 商品一覧・トップ・関連商品で共通の商品タイル
export function ProductTile({
  product,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw",
  priority,
  children,
}: ProductTileProps) {
  return (
    <article className="group flex flex-col">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-4/5 overflow-hidden bg-mist">
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              product.image.cutout
                ? "object-contain py-[6%]"
                : "object-cover",
            )}
          />
        </div>
        <h3 className="mt-5 font-serif text-lg leading-snug text-ink underline-offset-[6px] decoration-1 group-hover:underline">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {product.description}
        </p>
        <p className="mt-3 text-sm tabular text-ink">
          {formatPrice(product.price)}
        </p>
      </Link>
      {children}
    </article>
  );
}
