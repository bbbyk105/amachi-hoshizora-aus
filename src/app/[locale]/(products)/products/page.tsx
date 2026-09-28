// src/app/[locale]/(products)/products/page.tsx - 商品一覧
// 商品タイルはサーバーで描画し、絞り込みと並べ替えだけを Client（ProductCatalog）に任せる
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCategories, getProducts, getSortChoices } from "@/data";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProductTile } from "@/components/ProductTile";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { localizedAlternates } from "@/lib/site";

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "productList" });
  return {
    title: t("title"),
    description: t("heroDescription"),
    alternates: localizedAlternates(locale, "/products"),
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("productList");
  const products = getProducts(locale);
  const addLabels = { add: t("add"), adding: t("adding"), added: t("added") };

  return (
    <div className="bg-white pb-28 sm:pb-40">
      <PageHeader title={t("title")} lead={t("heroDescription")} />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ProductCatalog
          items={products.map(({ id, category, price }) => ({
            id,
            category,
            price,
          }))}
          tiles={Object.fromEntries(
            products.map((product, index) => [
              product.id,
              <ProductTile key={product.id} product={product} priority={index < 3}>
                <AddToCartButton product={product} labels={addLabels} />
              </ProductTile>,
            ]),
          )}
          categories={getCategories(locale)}
          sortChoices={getSortChoices(locale)}
          labels={{
            itemsCount: t("itemsCount"),
            noProductsFound: t("noProductsFound"),
            showAllProducts: t("showAllProducts"),
          }}
        />
      </div>
    </div>
  );
}
