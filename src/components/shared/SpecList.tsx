import { Countable } from "@/components/motion/Countable";
import { cn } from "@/lib/utils";

interface SpecListProps {
  items: { label: string; value: string }[];
  /** 見出し列の幅。長いラベル（「ろ過にかかる年月」など）は wide */
  labelWidth?: "narrow" | "wide";
  className?: string;
}

const LABEL_COLUMNS = {
  narrow: "grid-cols-[7.5em_1fr]",
  wide: "grid-cols-[10em_1fr]",
};

// 仕様・数値の表。行が順に入り、数字は数え上がる
export function SpecList({ items, labelWidth = "narrow", className }: SpecListProps) {
  return (
    <dl data-motion="rows" className={cn("border-t border-ink/80 text-sm", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "grid gap-4 border-b border-border py-3",
            LABEL_COLUMNS[labelWidth],
          )}
        >
          <dt className="text-muted-foreground">{item.label}</dt>
          <dd className="tabular text-ink">
            <Countable value={item.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
