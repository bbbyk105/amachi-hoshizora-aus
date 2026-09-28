import type { ReactNode } from "react";
import { SplitChars } from "@/components/motion/SplitChars";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  lead?: ReactNode;
  /** narrow は FAQ や規約のような読み物ページ用 */
  width?: "wide" | "narrow";
}

// 各ページ冒頭の見出し。読み込み時に文字が下から出る（data-motion="intro"）
export function PageHeader({ title, lead, width = "wide" }: PageHeaderProps) {
  return (
    <header
      data-motion="intro"
      className={cn(
        "mx-auto px-5 pt-32 pb-14 sm:px-8 sm:pt-40 sm:pb-20",
        width === "wide" ? "max-w-6xl" : "max-w-3xl",
      )}
    >
      <h1 className="font-serif text-3xl text-ink sm:text-[2.75rem] sm:leading-tight">
        <SplitChars text={title} />
      </h1>
      {lead && (
        <p
          data-motion-item
          className="mt-6 max-w-[38em] text-sm text-muted-foreground sm:text-base"
        >
          {lead}
        </p>
      )}
    </header>
  );
}
