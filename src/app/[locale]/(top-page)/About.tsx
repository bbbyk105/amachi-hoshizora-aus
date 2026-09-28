import Image from "next/image";
import type { TopicData, TopicFact } from "@/data/types";
import { SplitChars } from "@/components/motion/SplitChars";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SpecList } from "@/components/shared/SpecList";

interface AboutProps {
  topicsData: TopicData[];
  title: string;
}

const Body = ({ paragraphs }: { paragraphs?: string[] }) =>
  paragraphs?.length ? (
    <div
      data-motion="fade"
      className="mt-6 max-w-[34em] space-y-4 text-sm leading-[1.95] text-muted-foreground sm:text-[15px]"
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  ) : null;

// 数値で見せたい事実（詳細ページの仕様表と同じ組み方）
const Facts = ({ facts }: { facts?: TopicFact[] }) =>
  facts?.length ? (
    <SpecList items={facts} labelWidth="wide" className="mt-8 max-w-[34em]" />
  ) : null;

// 水・蔵元の言葉・星空。内容ごとに組み方を変える
export function About({ topicsData, title }: AboutProps) {
  const [water, voice, sky] = topicsData;

  return (
    <section id="about" className="bg-white pt-24 sm:pt-32 lg:pt-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading text={title} />

        {water && (
          <div className="mt-12 grid grid-cols-1 items-center gap-8 sm:mt-16 md:grid-cols-12 md:gap-10">
            <figure
              data-motion="reveal"
              className="relative aspect-2/3 overflow-hidden bg-mist md:col-span-4"
            >
              <Image
                src={water.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </figure>
            <div className="md:col-span-7 md:col-start-6">
              <h3
                data-motion="chars"
                className="font-serif text-2xl leading-relaxed text-ink sm:text-[1.75rem]"
              >
                <SplitChars text={water.title} />
              </h3>
              <p data-motion="fade" className="mt-3 text-sm text-ink sm:text-base">
                {water.description}
              </p>
              <Body paragraphs={water.body} />
              <Facts facts={water.facts} />
            </div>
          </div>
        )}

        {voice && (
          <div className="mt-24 grid grid-cols-1 items-start gap-10 sm:mt-32 md:grid-cols-12">
            <div className="order-2 md:order-1 md:col-span-7">
              <blockquote>
                <p
                  data-motion="chars-scrub"
                  className="font-serif text-[1.625rem] leading-[1.75] text-ink sm:text-[2.125rem]"
                >
                  <SplitChars text={voice.title} />
                </p>
                <footer
                  data-motion="fade"
                  className="mt-6 flex items-center gap-4 text-sm text-muted-foreground"
                >
                  <span aria-hidden="true" className="h-px w-8 bg-gray-400" />
                  {voice.description}
                </footer>
              </blockquote>
              <Body paragraphs={voice.body} />
              <Facts facts={voice.facts} />
            </div>
            <figure
              data-motion="reveal"
              data-motion-dir="left"
              className="relative order-1 aspect-4/3 overflow-hidden bg-mist md:order-2 md:col-span-4 md:col-start-9 md:mt-3"
            >
              <Image
                src={voice.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </figure>
          </div>
        )}
      </div>

      {sky && (
        <figure
          data-motion="zoom"
          className="relative mt-24 h-[72svh] min-h-105 w-full overflow-hidden bg-night sm:mt-32"
        >
          <Image
            src={sky.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(15_22_38/0.88)_0%,rgb(15_22_38/0)_60%)]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-10 text-white sm:px-8 sm:pb-14">
            <h3
              data-motion="chars"
              className="font-serif text-2xl leading-relaxed sm:text-3xl"
            >
              <SplitChars text={sky.title} />
            </h3>
            <p data-motion="fade" className="mt-2 text-sm text-white/70">
              {sky.description}
            </p>
            {sky.body?.map((paragraph) => (
              <p
                key={paragraph}
                data-motion="fade"
                className="mt-5 max-w-[34em] text-sm leading-[1.95] text-white/85 sm:text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </figcaption>
        </figure>
      )}
    </section>
  );
}
