// src/app/[locale]/(products)/products/[slug]/page.tsx - 商品詳細
// 表示はサーバーで行い、数量とカート追加（PurchasePanel）だけを Client にする
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  formatPrice,
  getProductById,
  getProductDetails,
  getProducts,
} from "@/data";
import { ProductTile } from "@/components/ProductTile";
import { PurchasePanel } from "@/components/products/PurchasePanel";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SpecList } from "@/components/shared/SpecList";
import { localizedAlternates } from "@/lib/site";

interface ProductDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// 商品は固定なので、全商品のページをビルド時に作る（locale は layout 側で展開）
export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: String(product.id) }));
}

const findProduct = (slug: string, locale: string) =>
  getProductById(Number(slug), locale);

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = findProduct(slug, locale);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [{ url: product.image.url, alt: product.image.alt }] },
    alternates: localizedAlternates(locale, `/products/${slug}`),
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = findProduct(slug, locale);
  if (!product) notFound();

  const t = await getTranslations("productDetail");
  const tCommon = await getTranslations("common");

  // 同カテゴリの他商品（1商品しかないカテゴリでは空になる）
  const relatedProducts = getProducts(locale)
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="bg-white pt-16">
      {/* パンくず */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-6xl px-5 pt-8 text-xs text-muted-foreground sm:px-8"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/products"
              className="underline-offset-4 hover:text-ink hover:underline"
            >
              {t("productList")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mx-auto max-w-6xl px-5 pt-8 pb-24 sm:px-8 sm:pb-32">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-8">
          {/* 画像 */}
          <div className="md:sticky md:top-24 md:col-span-7">
            <div
              data-motion="reveal"
              className="relative aspect-4/5 overflow-hidden bg-mist"
            >
              <Image
                src={product.image.url}
                alt={product.image.alt}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                priority
                className={
                  product.image.cutout
                    ? "object-contain py-[6%]"
                    : "object-cover"
                }
              />
              {product.originalPrice && (
                <span className="absolute top-5 left-5 bg-ink px-3 py-1 text-xs text-white">
                  {t("onSale")}
                </span>
              )}
            </div>
          </div>

          {/* 商品情報 */}
          <div className="md:col-span-4 md:col-start-9 md:pt-6">
            <div data-motion="stagger">
              <p className="text-xs tracking-[0.2em] text-ruri">
                {product.category}
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-snug text-ink sm:text-[2.125rem]">
                {product.name}
              </h1>
              <p className="mt-4 text-sm text-muted-foreground sm:text-[15px]">
                {product.description}
              </p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-serif text-2xl tabular text-ink">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm tabular text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <PurchasePanel
              product={product}
              labels={{
                quantity: t("quantity"),
                subtotal: t("subtotal"),
                add: t("addToCart"),
                adding: t("adding"),
                added: t("addedToCart"),
                decrease: tCommon("decrease"),
                increase: tCommon("increase"),
              }}
            />

            {/* 商品詳細 */}
            <h2 className="mt-14 font-serif text-lg text-ink">
              {t("productDetails")}
            </h2>
            <SpecList
              items={getProductDetails(product, locale)}
              className="mt-4"
            />
          </div>
        </div>

        {/* 関連商品 */}
        {relatedProducts.length > 0 && (
          <section className="mt-28 sm:mt-36">
            <SectionHeading
              text={t("relatedProducts")}
              className="border-b border-border pb-5"
            />
            <div
              data-motion="stagger"
              className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:grid-cols-3"
            >
              {relatedProducts.map((relatedProduct) => (
                <ProductTile key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
