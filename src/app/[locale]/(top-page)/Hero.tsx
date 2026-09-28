import Image from "next/image";
import type { HeroData } from "@/data/types";
import { HeroVideo } from "./HeroVideo";
import { SplitChars } from "@/components/motion/SplitChars";

interface HeroProps {
  heroData: HeroData;
  locale: string;
  scrollLabel: string;
}

export function Hero({ heroData, locale, scrollLabel }: HeroProps) {
  // 日本語はラベルと同じ縦組み、英語は横組み
  const vertical = locale === "ja";
  const [name, gloss] = heroData.productName.split(" - ");

  return (
    <section className="relative h-svh min-h-140 w-full overflow-hidden bg-night text-white">
      {heroData.heroVideo ? (
        <HeroVideo src={heroData.heroVideo} poster={heroData.heroImage} />
      ) : (
        <Image
          src={heroData.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[57%_50%]"
        />
      )}
      {/* 文字が乗る上下だけ夜空の色を重ねる */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(15_22_38/0.6)_0%,rgb(15_22_38/0)_30%,rgb(15_22_38/0)_52%,rgb(15_22_38/0.88)_100%)]"
      />

      <div
        data-motion="intro hero-out"
        data-motion-onload
        data-motion-chars={vertical ? "brush" : undefined}
        className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-8 sm:px-10 sm:pb-12 lg:px-16"
      >
        {vertical ? (
          <h1 className="text-vertical absolute right-[7vw] top-[17svh] font-serif text-[clamp(1.75rem,3.2vw,2.875rem)] leading-[2.1] tracking-[0.2em] lg:right-16">
            {heroData.title.map((line) => (
              <span key={line} className="block">
                <SplitChars text={line} />
              </span>
            ))}
          </h1>
        ) : (
          <h1 className="absolute top-[18svh] left-5 right-5 font-serif text-[clamp(1.875rem,3.2vw,3rem)] leading-tight sm:left-10 lg:left-16">
            {heroData.title.map((line) => (
              <span key={line} className="block">
                <SplitChars text={line} />
              </span>
            ))}
          </h1>
        )}

        <div
          data-motion-item
          className="flex items-end justify-between gap-6 border-t border-white/20 pt-5"
        >
          <div>
            <p className="text-xs tracking-[0.2em] text-white/70">
              {heroData.subtitle}
            </p>
            <p className="mt-1.5 font-serif text-xl tracking-[0.14em] sm:text-2xl">
              {name}
            </p>
            {gloss && <p className="mt-1 text-xs text-moon">{gloss}</p>}
          </div>
          <div className="hidden items-center gap-3 text-[11px] tracking-[0.2em] text-white/70 sm:flex">
            {scrollLabel}
            <span className="scroll-cue relative block h-12 w-px overflow-hidden bg-white/25" />
          </div>
        </div>
      </div>
    </section>
  );
}
