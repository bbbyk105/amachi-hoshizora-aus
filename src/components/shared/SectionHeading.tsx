import { SplitChars } from "@/components/motion/SplitChars";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  text: string;
  className?: string;
}

// セクション見出し。スクロールで1文字ずつ出る（data-motion="chars"）
export function SectionHeading({ text, className }: SectionHeadingProps) {
  return (
    <h2
      data-motion="chars"
      className={cn("font-serif text-2xl text-ink sm:text-3xl", className)}
    >
      <SplitChars text={text} />
    </h2>
  );
}
