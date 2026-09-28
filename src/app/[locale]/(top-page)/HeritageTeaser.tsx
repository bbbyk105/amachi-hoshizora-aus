import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Era } from "@/types/heritage";

// 年表のうち、トップで見せる節目（創業・酒銘の由来・米だけの酒）
const HIGHLIGHT_YEARS = ["1688–1704", "1914", "1974"];

export async function HeritageTeaser() {
  const t = await getTranslations("heritage");
  const eras = t.raw("eras") as Era[];
  const highlights = eras
    .flatMap((era) => era.items)
    .filter((item) => HIGHLIGHT_YEARS.includes(item.year));

  return (
    <section className="bg-white pt-24 sm:pt-32 lg:pt-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading text={t("teaser.title")} />
          <Link
            href="/heritage"
            className="shrink-0 text-sm text-ink underline decoration-gray-300 underline-offset-[6px] transition-colors hover:decoration-ink"
          >
            {t("teaser.link")}
          </Link>
        </div>

        <ol
          data-motion="stagger"
          className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
        >
          {highlights.map((item) => (
            <li key={item.year} className="border-t border-ink/80 pt-5">
              <p className="font-serif text-3xl leading-none tabular text-ink sm:text-4xl">
                {item.year}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {item.wareki}
              </p>
              <p className="mt-4 text-sm leading-[1.95] text-muted-foreground sm:text-[15px]">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
