import { Link } from "@/i18n/routing";
import type { Product as ProductType } from "@/data/types";
import { ProductTile } from "@/components/ProductTile";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface ProductProps {
  products: ProductType[];
  title: string;
  viewAllLabel: string;
}

export function Product({ products, title, viewAllLabel }: ProductProps) {
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-5">
          <SectionHeading text={title} />
          <Link
            href="/products"
            className="text-sm text-ink underline decoration-gray-300 underline-offset-[6px] transition-colors hover:decoration-ink"
          >
            {viewAllLabel}
          </Link>
        </div>

        <div
          data-motion="stagger"
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:grid-cols-3"
        >
          {products.map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
