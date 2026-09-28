// src/app/[locale]/(top-page)/heritage/page.tsx - 富士錦酒造の歴史と伝統
// 写真はすべて富士錦酒造の提供（公式サイト掲載写真）。
// 元画像が小さく、再圧縮すると荒れるので unoptimized でそのまま配信する。
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SplitChars } from "@/components/motion/SplitChars";
import { CtaBand } from "@/components/shared/CtaBand";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { CraftItem, Era, HeritagePhoto } from "@/types/heritage";
import { localizedAlternates } from "@/lib/site";

interface HeritagePageProps {
  params: Promise<{ locale: string }>;
}


export async function generateMetadata({
  params,
}: HeritagePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "heritage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates(locale, "/heritage"),
  };
}

const bodyText = "text-sm leading-[2] text-gray-700 sm:text-[15px]";
const caption = "mt-3 text-xs leading-relaxed text-muted-foreground";

const HeritagePage = async ({ params }: HeritagePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const ja = locale === "ja";
  const t = await getTranslations("heritage");
  const originBody = t.raw("origin.body") as string[];
  const archivePhotos = t.raw("archive.photos") as HeritagePhoto[];
  const eras = t.raw("eras") as Era[];
  const craftItems = t.raw("craft.items") as CraftItem[];
  const shizuokaBody = t.raw("shizuoka.body") as string[];
  const kurabirakiBody = t.raw("kurabiraki.body") as string[];
  const kurabirakiPhotos = t.raw("kurabiraki.photos") as HeritagePhoto[];

  return (
    <div className="bg-white">
      {/* 冒頭: 見出しと、富士山を背にした蔵 */}
      <section
        data-motion="intro"
        className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pt-28 pb-20 sm:px-8 sm:pt-36 md:grid-cols-12 md:items-end md:gap-8 md:pb-28"
      >
        <div className="md:col-span-6 md:pb-4">
          <h1 className="font-serif text-[2rem] leading-snug text-ink sm:text-[2.75rem]">
            <SplitChars text={t("title")} />
          </h1>
          <p data-motion-item className={`mt-6 max-w-[30em] ${bodyText}`}>
            {t("lead")}
          </p>
        </div>
        <figure className="md:col-span-5 md:col-start-8">
          <div
            data-motion-reveal
            className="relative aspect-5/7 overflow-hidden bg-mist"
          >
            <Image
              src="/heritage/brewery.webp"
              alt={t("heroCaption")}
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>
          <figcaption data-motion-item className={caption}>
            {t("heroCaption")}
          </figcaption>
        </figure>
      </section>

      {/* 酒銘「富士錦」の由来 */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading text={t("origin.title")} />
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <blockquote className="md:col-span-3">
              <p
                data-motion="chars"
                className={
                  ja
                    ? "font-serif text-4xl tracking-[0.2em] text-ink md:text-5xl md:[writing-mode:vertical-rl]"
                    : "font-serif text-3xl italic leading-snug text-ink md:text-4xl"
                }
              >
                <SplitChars text={t("origin.quote")} />
              </p>
              <footer data-motion="fade" className="mt-5 text-xs text-muted-foreground">
                {t("origin.quoteBy")}
              </footer>
            </blockquote>
            <div data-motion="fade" className={`space-y-5 md:col-span-5 ${bodyText}`}>
              {originBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <figure data-motion="develop" className="md:col-span-3 md:col-start-10">
              <div className="relative aspect-176/253 w-40 overflow-hidden bg-mist sm:w-44">
                <Image
                  src="/heritage/archive-kintaro.webp"
                  alt={t("origin.portraitCaption")}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <figcaption className={caption}>
                {t("origin.portraitCaption")}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 明治の蔵（古写真。現像されるように見せる）
          元画像が小さいので写真は大きくせず、左に説明を置いて右側に並べる */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <SectionHeading text={t("archive.title")} />
            <p data-motion="fade" className={`mt-6 ${bodyText}`}>
              {t("archive.body")}
            </p>
          </div>
          <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:gap-10 md:col-span-7 md:col-start-6">
            {archivePhotos.map((photo, index) => (
              <figure
                key={photo.image}
                data-motion="develop"
                className={`w-full max-w-[18rem] ${index === 1 ? "sm:mt-24" : ""}`}
              >
                {/* 台紙に貼った紙焼きのように見せる */}
                <div className="bg-white p-3">
                  <div
                    className={`relative overflow-hidden ${
                      index === 0 ? "aspect-283/220" : "aspect-260/200"
                    }`}
                  >
                    <Image
                      src={photo.image}
                      alt={photo.caption}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </div>
                <figcaption className={caption}>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 年表（元号ごと。左の縦線がスクロールに合わせて伸びる） */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading text={t("timelineTitle")} />
        <div className="relative mt-10">
          <span
            aria-hidden="true"
            data-motion="line"
            className="absolute top-0 bottom-0 -left-3 w-px bg-ruri sm:-left-6"
          />
          {eras.map((era) => (
            <div
              key={era.name}
              className="grid grid-cols-[3rem_1fr] gap-5 border-t border-ink/70 py-8 sm:grid-cols-[8rem_1fr] sm:gap-10"
            >
              <div>
                <h3
                  data-motion="chars"
                  className={
                    ja
                      ? "font-serif text-2xl tracking-[0.3em] text-ink [writing-mode:vertical-rl] sm:text-3xl"
                      : "font-serif text-xl text-ink sm:text-2xl"
                  }
                >
                  <SplitChars text={era.name} />
                </h3>
                <p className="mt-3 hidden text-[11px] tabular text-muted-foreground sm:block">
                  {era.span}
                </p>
              </div>
              <ol data-motion="rows" className="space-y-5">
                {era.items.map((item) => (
                  <li
                    key={`${item.year}-${item.text}`}
                    className="grid grid-cols-1 gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  >
                    <p className="text-sm tabular text-ink">
                      {ja ? item.wareki : item.year}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {ja ? item.year : item.wareki}
                      </span>
                    </p>
                    <p className={bodyText}>{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-2 border-t border-ink/70 pt-4 text-xs text-muted-foreground">
          {t("sourceNote")}
        </p>
      </section>

      {/* 蔵の仕事 */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading text={t("craft.title")} />
          <div
            data-motion="stagger"
            className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
          >
            {craftItems.map((item) => (
              <figure key={item.image}>
                <div className="relative aspect-550/393 overflow-hidden bg-mist">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-5">
                  <p className="font-serif text-2xl text-ink">{item.title}</p>
                  <p className={`mt-2 ${bodyText}`}>{item.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <blockquote className="mx-auto mt-20 max-w-3xl text-center sm:mt-28">
            <p
              data-motion="chars-scrub"
              className="font-serif text-xl leading-[1.9] text-ink sm:text-2xl"
            >
              <SplitChars
                text={ja ? `「${t("craft.quote")}」` : `“${t("craft.quote")}”`}
              />
            </p>
            <footer data-motion="fade" className="mt-5 text-sm text-muted-foreground">
              {t("craft.quoteBy")}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 吟醸王国・静岡 */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-12 md:items-center md:gap-8">
          <figure
            data-motion="parallax"
            className="relative aspect-7/5 overflow-hidden bg-white md:col-span-6"
          >
            <Image
              src="/heritage/fuji-fields.webp"
              alt=""
              fill
              unoptimized
              className="object-cover"
            />
          </figure>
          <div className="md:col-span-5 md:col-start-8">
            <SectionHeading text={t("shizuoka.title")} />
            <div data-motion="fade" className={`mt-6 space-y-4 ${bodyText}`}>
              {shizuokaBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              {t("shizuoka.source")}
            </p>
          </div>
        </div>
      </section>

      {/* 蔵開き（机に写真を並べるように出す） */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading text={t("kurabiraki.title")} />
          </div>
          <div data-motion="fade" className={`space-y-4 md:col-span-6 md:col-start-7 ${bodyText}`}>
            {kurabirakiBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div
          data-motion="tilt"
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6"
        >
          {kurabirakiPhotos.map((photo) => (
            <figure key={photo.image} className="mx-auto w-full max-w-90">
              <div className="relative aspect-3/2 overflow-hidden bg-mist">
                <Image
                  src={photo.image}
                  alt={photo.caption}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <figcaption className={caption}>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 商品一覧への導線 */}
      <section className="mx-auto max-w-6xl px-5 pb-28 sm:px-8 sm:pb-40">
        <CtaBand
          title={t("cta.title")}
          href="/products"
          label={t("cta.button")}
        />
        <p className="mt-10 text-xs text-muted-foreground">
          {t("photoCredit")}
        </p>
      </section>
    </div>
  );
};

export default HeritagePage;
