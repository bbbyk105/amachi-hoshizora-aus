// src/data/format.ts - 価格の表示と並び替え（データを読み込まない純粋関数）。
// Client Component からはこちらを import する（utils.ts は全言語の商品データを読み込むため）
import type { Product } from "./types";

// 価格フォーマット（既存のまま - AUD表示）
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)} AUD`;
};

// 容量（商品名から取得）
export const getVolume = (product: Product): string =>
  product.name.match(/\d+ml/)?.[0] ?? "500ml";

// ボリューム付き価格フォーマット
export const formatPriceWithVolume = (product: Product): string => {
  return `${getVolume(product)} $${product.price.toFixed(2)} AUD`;
};

// 並び替え。表示名は言語ごとに違うので、キーで扱う（getSortOptions の並び順と対応）
export const SORT_KEYS = [
  "recommended",
  "price-asc",
  "price-desc",
  "newest",
] as const;
export type SortKey = (typeof SORT_KEYS)[number];

export function sortProductsBy<T extends { id: number; price: number }>(
  items: T[],
  key: SortKey,
): T[] {
  const sorted = [...items];
  switch (key) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => b.id - a.id);
    case "recommended":
    default:
      return sorted.sort((a, b) => a.id - b.id);
  }
}
