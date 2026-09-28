"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

interface FaqListProps {
  items: FaqItem[];
  /** key が "all" のものは「すべて」 */
  categories: { key: string; label: string }[];
}

// カテゴリーの絞り込みと、質問の開閉だけを受け持つ
export function FaqList({ items, categories }: FaqListProps) {
  const [openIds, setOpenIds] = useState<Set<number>>(() => new Set());
  const [selected, setSelected] = useState("all");

  const labelOf = (key: string) =>
    categories.find((category) => category.key === key)?.label ?? key;
  const visible =
    selected === "all" ? items : items.filter((item) => item.category === selected);

  const toggle = (id: number) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <>
      {/* カテゴリー */}
      <div className="border-b border-border pb-3">
        <div className="-mx-2 flex flex-wrap" role="group">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              aria-pressed={selected === category.key}
              onClick={() => setSelected(category.key)}
              className={cn(
                "cursor-pointer px-2 py-2 text-sm underline-offset-[7px] decoration-1 transition-colors sm:mr-4",
                selected === category.key
                  ? "text-ink underline"
                  : "text-muted-foreground hover:text-ink",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Q&A */}
      <ul data-motion="rows" className="mt-4">
        {visible.map((item) => {
          const open = openIds.has(item.id);
          return (
            <li key={item.id} className="border-b border-border">
              <h2>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={open}
                  aria-controls={`faq-${item.id}`}
                  className="group flex w-full cursor-pointer items-start gap-5 py-6 text-left"
                >
                  <span className="font-serif text-lg leading-7 text-ruri">Q</span>
                  <span className="flex-1">
                    <span className="block text-xs text-muted-foreground">
                      {labelOf(item.category)}
                    </span>
                    <span className="mt-1 block font-serif text-lg leading-relaxed text-ink underline-offset-[6px] decoration-1 group-hover:underline">
                      {item.question}
                    </span>
                  </span>
                  <Plus
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className={cn(
                      "mt-1 h-5 w-5 shrink-0 text-ink transition-transform duration-300",
                      open && "rotate-45",
                    )}
                  />
                </button>
              </h2>

              {open && (
                <div id={`faq-${item.id}`} className="flex gap-5 pb-8">
                  <span className="font-serif text-lg leading-7 text-muted-foreground">
                    A
                  </span>
                  <p className="flex-1 pr-10 text-sm leading-[1.9] text-gray-700 sm:text-[15px]">
                    {item.answer}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
