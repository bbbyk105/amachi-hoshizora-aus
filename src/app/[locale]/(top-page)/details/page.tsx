// src/app/[locale]/(top-page)/details/page.tsx - 天地星空・富士の雫の紹介ページ
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SpecList } from "@/components/shared/SpecList";
import {
  formatPriceWithVolume,
  getProductDetails,
  getProducts,
  getVolume,
} from "@/data";
import { localizedAlternates } from "@/lib/site";

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
    alternates: localizedAlternates(locale, "/details"),
  };
}

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("details");
  const tHeritage = await getTranslations("heritage");
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
    <div className="bg-white">
      <PageHeader title={t("title")} lead={t("lead")} />

      {/* 商品ごとの紹介 */}
      <div className="mx-auto max-w-6xl space-y-24 px-5 sm:space-y-36 sm:px-8">
        {lines.map(({ key, main, items, copy, specs }, index) => (
          <section
            key={key}
            className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-8"
          >
            <div
              className={`md:sticky md:top-24 md:col-span-6 ${
                index % 2 === 1 ? "md:order-last md:col-start-7" : ""
              }`}
            >
              <div
                data-motion="reveal"
                className="relative aspect-4/5 overflow-hidden bg-mist"
              >
                <Image
                  src={main.image.url}
                  alt={main.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={index === 0}
                  className={
                    main.image.cutout
                      ? "object-contain py-[6%]"
                      : "object-cover"
                  }
                />
              </div>
            </div>

            <div
              className={
                index % 2 === 1
                  ? "md:col-span-5 md:col-start-1 md:row-start-1"
                  : "md:col-span-5 md:col-start-8"
              }
            >
              <p className="text-xs tracking-[0.2em] text-ruri">
                {main.category}
              </p>
              <SectionHeading
                text={main.label}
                className="mt-3 text-3xl sm:text-4xl"
              />
              <p
                data-motion="fade"
                className="mt-5 font-serif text-lg leading-relaxed text-ink"
              >
                {copy.catch}
              </p>
              <div
                data-motion="fade"
                className="mt-6 space-y-4 text-sm text-muted-foreground sm:text-[15px]"
              >
                {copy.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <SpecList items={specs} className="mt-10" />

              <p className="mt-10 text-xs text-muted-foreground">
                {t("priceHeading")}
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {items.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="inline-flex h-12 items-center border border-ink px-6 text-sm tabular text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    {formatPriceWithVolume(product)}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 純米吟醸と純米大吟醸の違い */}
      <section className="mt-28 bg-mist py-20 sm:mt-40 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading text={t("polish.title")} />
          <p className="mt-6 text-sm text-muted-foreground sm:text-base">
            {t("polish.body")}
          </p>

          <figure className="mt-12">
            <figcaption className="text-xs text-muted-foreground">
              {t("polish.chartLabel")}
            </figcaption>
            <ul className="mt-6 space-y-7">
              {lines
                .filter(({ polishRatio }) => !Number.isNaN(polishRatio))
                .map(({ key, main, polishRatio }) => (
                  <li key={key}>
                    <div className="mb-2 flex items-baseline justify-between text-sm">
                      <span className="text-ink">
                        <span className="font-serif text-base">
                          {main.label}
                        </span>
                        <span className="ml-3 text-muted-foreground">
                          {main.category}
                        </span>
                      </span>
                      <span className="font-serif text-2xl tabular text-ink">
                        <span data-count={polishRatio}>{polishRatio}</span>
                        <span className="ml-0.5 text-sm">%</span>
                      </span>
                    </div>
                    <div className="relative h-1.5 bg-gray-300/70">
                      <div
                        data-motion="bar"
                        className="h-full bg-ruri"
                        style={{ width: `${polishRatio}%` }}
                      />
                      {[DAIGINJO_MAX, GINJO_MAX].map((line) => (
                        <span
                          key={line}
                          className="absolute -inset-y-1.5 w-px bg-ink/40"
                          style={{ left: `${line}%` }}
                        />
                      ))}
                    </div>
                  </li>
                ))}
            </ul>
            {/* 区分の目盛り */}
            <div className="relative mt-3 h-5 text-[11px] text-muted-foreground">
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

          <p className="mt-10 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {t("polish.note")}
          </p>
        </div>
      </section>

      {/* 醸造元 */}
      <section className="mx-auto mt-28 max-w-6xl px-5 sm:mt-40 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8">
          <div
            data-motion="parallax"
            className="relative aspect-4/3 overflow-hidden bg-night md:col-span-7"
          >
            <Image
              src="/mt-fuji.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <SectionHeading text={t("brewery.title")} />
            <div
              data-motion="fade"
              className="mt-6 space-y-4 text-sm text-muted-foreground sm:text-[15px]"
            >
              {breweryBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link
              href="/heritage"
              className="mt-6 inline-block text-sm text-ink underline decoration-gray-300 underline-offset-[6px] transition-colors hover:decoration-ink"
            >
              {tHeritage("teaser.link")}
            </Link>
          </div>
        </div>
      </section>

      {/* 商品一覧への導線 */}
      <section className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
        <CtaBand
          title={t("cta.title")}
          href="/products"
          label={t("cta.button")}
        />
      </section>
    </div>
  );
};

export default DetailsPage;
