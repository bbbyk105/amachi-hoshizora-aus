// src/app/[locale]/page.tsx - トップページ
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProducts, getHeroData, getTopicsData } from "@/data";
import { Hero } from "./(top-page)/Hero";
import { About } from "./(top-page)/About";
import { Product } from "./(top-page)/Product";
import { HeritageTeaser } from "./(top-page)/HeritageTeaser";
import { localizedAlternates } from "@/lib/site";

interface TopPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// タイトルや説明は layout の既定値を使い、canonical と hreflang だけをここで付ける
export async function generateMetadata({
  params,
}: TopPageProps): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localizedAlternates(locale) };
}

const TopPage = async ({ params }: TopPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  return (
    <>
      <Hero
        heroData={getHeroData(locale)}
        locale={locale}
        scrollLabel={t("scroll")}
      />
      <About topicsData={getTopicsData(locale)} title={t("aboutTitle")} />
      <HeritageTeaser />
      <Product
        products={getProducts(locale)}
        title={t("productsTitle")}
        viewAllLabel={t("viewAll")}
      />
    </>
  );
};

export default TopPage;
