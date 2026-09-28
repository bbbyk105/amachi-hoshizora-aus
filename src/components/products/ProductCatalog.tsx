"use client";

import { useMemo, useState, type ReactNode } from "react";
import { sortProductsBy, type SortKey } from "@/data/format";
import { cn } from "@/lib/utils";

interface CatalogItem {
  id: number;
  category: string;
  price: number;
}

interface ProductCatalogProps {
  items: CatalogItem[];
  /** サーバーで描画済みの商品タイル。ここでは絞り込みと並べ替えだけを行う */
  tiles: Record<number, ReactNode>;
  /** 先頭は「すべて」 */
  categories: string[];
  sortChoices: { key: SortKey; label: string }[];
  labels: {
    itemsCount: string;
    noProductsFound: string;
    showAllProducts: string;
  };
}

export function ProductCatalog({
  items,
  tiles,
  categories,
  sortChoices,
  labels,
}: ProductCatalogProps) {
  const [allCategory] = categories;
  const [category, setCategory] = useState(allCategory);
  const [sortKey, setSortKey] = useState<SortKey>(sortChoices[0].key);

  const visible = useMemo(
    () =>
      sortProductsBy(
        category === allCategory
          ? items
          : items.filter((item) => item.category === category),
        sortKey,
      ),
    [items, category, allCategory, sortKey],
  );

  return (
    <>
      {/* フィルター・ソート */}
      <div className="flex flex-col gap-4 border-y border-border py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-2 flex flex-wrap" role="group">
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => setCategory(option)}
              className={cn(
                "cursor-pointer px-2 py-2 text-sm underline-offset-[7px] decoration-1 transition-colors sm:mr-4",
                category === option
                  ? "text-ink underline"
                  : "text-muted-foreground hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-6 text-sm text-muted-foreground sm:justify-end">
          <span className="tabular">
            {visible.length}
            {labels.itemsCount}
          </span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="cursor-pointer border-0 bg-transparent py-2 pr-1 text-sm text-ink focus-visible:outline-2"
          >
            {sortChoices.map((choice) => (
              <option key={choice.key} value={choice.key}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 商品一覧 */}
      <div
        data-motion="stagger"
        className="mt-12 grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-8 lg:grid-cols-3"
      >
        {visible.map((item) => (
          <div key={item.id}>{tiles[item.id]}</div>
        ))}
      </div>

      {/* 商品が見つからない場合 */}
      {visible.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-muted-foreground">{labels.noProductsFound}</p>
          <button
            type="button"
            onClick={() => setCategory(allCategory)}
            className="mt-6 cursor-pointer text-sm text-ink underline underline-offset-4"
          >
            {labels.showAllProducts}
          </button>
        </div>
      )}
    </>
  );
}
