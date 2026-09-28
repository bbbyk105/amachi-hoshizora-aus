// src/app/[locale]/(top-page)/details/page.tsx - 天地星空・富士の雫の紹介ページ
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  formatPriceWithVolume,
  getProductDetails,
  getProducts,
  getVolume,
} from "@/data";

interface DetailsPageProps {
  params: Promise<{ locale: string }>;
}

interface LineCopy {
  catch: string;
  body: string[];
  rice?: string;
}

// 紹介するお酒と、対応する商品ID（src/data/locales の id）
const LINES: { key: string; productIds: number[] }[] = [
  { key: "amachi", productIds: [1, 2] },
  { key: "shizuku", productIds: [3] },
];

// 精米歩合の区分（純米吟醸 60%以下 / 純米大吟醸 50%以下）
const GINJO_MAX = 60;
const DAIGINJO_MAX = 50;

export async function generateMetadata({
  params,
}: DetailsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "details" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("details");
  const products = getProducts(locale);
  const lineCopy = t.raw("lines") as Record<string, LineCopy>;
  const breweryBody = t.raw("brewery.body") as string[];

  const lines = LINES.flatMap(({ key, productIds }) => {
    const items = products.filter((p) => productIds.includes(p.id));
    const main = items[0];
    if (!main) return [];

    const copy = lineCopy[key];
    const specs = [
      { label: t("spec.type"), value: main.category },
      ...(copy.rice ? [{ label: t("spec.rice"), value: copy.rice }] : []),
      ...getProductDetails(main, locale),
      { label: t("spec.volume"), value: items.map(getVolume).join(" / ") },
    ];

    return [
      {
        key,
        main,
        items,
        copy,
        specs,
        polishRatio: parseInt(main.details.riceMilling ?? "", 10),
      },
    ];
  });

  return (
    <div className="min-h-screen bg-white">
      {/* ヒーロー */}
      <section className="pt-24 pb-10 sm:pb-14 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs tracking-[0.3em] text-gray-500 mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-5">
            {t("title")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t("lead")}
          </p>
        </div>
      </section>

      {/* 商品ごとの紹介 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {lines.map(({ key, main, items, copy, specs }, index) => (
          <section
            key={key}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start"
          >
            <div
              className={`relative aspect-square rounded-2xl overflow-hidden bg-gray-50 ${
                index % 2 === 1 ? "md:order-last" : ""
              }`}
            >
              <Image
                src={main.image.url}
                alt={main.image.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={index === 0}
                className="object-cover"
              />
            </div>

            <div>
              <span className="inline-block text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full mb-4">
                {main.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-3">
                {main.label}
              </h2>
              <p className="text-base sm:text-lg text-gray-900 mb-5">
                {copy.catch}
              </p>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
                {copy.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <dl className="border-y border-gray-200 divide-y divide-gray-100 mb-8">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-6 py-3 text-sm"
                  >
                    <dt className="text-gray-500 shrink-0">{spec.label}</dt>
                    <dd className="text-gray-900 text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="text-xs text-gray-500 mb-3">{t("priceHeading")}</p>
              <div className="flex flex-wrap gap-3">
                {items.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    {formatPriceWithVolume(product)}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 純米吟醸と純米大吟醸の違い */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-28">
        <div className="bg-gray-50 rounded-2xl px-5 py-10 sm:p-12">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-5 text-center">
            {t("polish.title")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-10">
            {t("polish.body")}
          </p>

          <figure>
            <figcaption className="text-xs text-gray-500 mb-5">
              {t("polish.chartLabel")}
            </figcaption>
            <ul className="space-y-6">
              {lines
                .filter(({ polishRatio }) => !Number.isNaN(polishRatio))
                .map(({ key, main, polishRatio }) => (
                  <li key={key}>
                    <div className="flex justify-between items-baseline text-sm mb-2">
                      <span className="text-gray-900">
                        {main.label}
                        <span className="text-gray-500 ml-2">
                          {main.category}
                        </span>
                      </span>
                      <span className="text-gray-900 font-medium">
                        {polishRatio}%
                      </span>
                    </div>
                    <div className="relative h-3 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-800"
                        style={{ width: `${polishRatio}%` }}
                      />
                      {[DAIGINJO_MAX, GINJO_MAX].map((line) => (
                        <span
                          key={line}
                          className="absolute inset-y-0 w-px bg-white"
                          style={{ left: `${line}%` }}
                        />
                      ))}
                    </div>
                  </li>
                ))}
            </ul>
            {/* 区分の目盛り */}
            <div className="relative h-5 mt-2 text-[11px] text-gray-500">
              <span
                className="absolute top-0 pr-1.5 whitespace-nowrap"
                style={{ right: `${100 - DAIGINJO_MAX}%` }}
              >
                {t("polish.daiginjoLine")}
              </span>
              <span
                className="absolute top-0 pl-1.5 whitespace-nowrap"
                style={{ left: `${GINJO_MAX}%` }}
              >
                {t("polish.ginjoLine")}
              </span>
            </div>
          </figure>

          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-8">
            {t("polish.note")}
          </p>
        </div>
      </section>

      {/* 醸造元 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-900">
            <Image
              src="/mt-fuji.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-5">
              {t("brewery.title")}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              {breweryBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 商品一覧への導線 */}
      <section className="py-20 sm:py-28 text-center">
        <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-6">
          {t("cta.title")}
        </h2>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3 text-sm text-white hover:bg-gray-700 transition-colors"
        >
          {t("cta.button")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default DetailsPage;
