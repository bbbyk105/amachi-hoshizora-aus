// src/data/utils.ts - 言語別の商品・トップページデータの取得
import type { Product } from "./types";
import { SORT_KEYS } from "./format";

// ロケール別データのインポート
import * as jaData from "./locales/ja";
import * as enData from "./locales/en";

export {
  formatPrice,
  formatPriceWithVolume,
  getVolume,
  sortProductsBy,
  SORT_KEYS,
} from "./format";
export type { SortKey } from "./format";

// ロケール別データマップ（未対応の言語は日本語）
const dataByLocale = {
  ja: jaData,
  en: enData,
} as const;

const dataFor = (locale: string) =>
  dataByLocale[locale as keyof typeof dataByLocale] ?? dataByLocale.ja;

export const getProducts = (locale: string = "ja"): Product[] =>
  dataFor(locale).products;

export const getHeroData = (locale: string = "ja") => dataFor(locale).heroData;

export const getTopicsData = (locale: string = "ja") =>
  dataFor(locale).topicsData;

/** 先頭は「すべて」 */
export const getCategories = (locale: string = "ja"): string[] =>
  dataFor(locale).categories;

export const getSortOptions = (locale: string = "ja"): string[] =>
  dataFor(locale).sortOptions;

/** 並び替えの選択肢（キーと表示名） */
export const getSortChoices = (locale: string = "ja") =>
  getSortOptions(locale).map((label, i) => ({ key: SORT_KEYS[i], label }));

// 商品詳細の取得（国際化対応）
export const getProductDetails = (
  product: Product,
  locale: string = "ja"
): { label: string; value: string }[] => {
  const details = [];

  // ラベルの翻訳マップ
  const labels = {
    ja: {
      alcoholContent: "アルコール度数",
      riceMilling: "精米歩合",
      weight: "内容量",
      brewery: "醸造元",
      region: "産地",
      taste: "味わい",
      temperature: "適温",
    },
    en: {
      alcoholContent: "Alcohol Content",
      riceMilling: "Rice Polishing Ratio",
      weight: "Net Weight",
      brewery: "Brewery",
      region: "Region",
      taste: "Taste Profile",
      temperature: "Serving Temperature",
    },
  };

  const labelMap = labels[locale as keyof typeof labels] || labels.ja;

  if (product.details.alcoholContent) {
    details.push({
      label: labelMap.alcoholContent,
      value: product.details.alcoholContent,
    });
  }
  if (product.details.riceMilling) {
    details.push({
      label: labelMap.riceMilling,
      value: product.details.riceMilling,
    });
  }
  if (product.details.weight) {
    details.push({
      label: labelMap.weight,
      value: product.details.weight,
    });
  }
  details.push({
    label: labelMap.brewery,
    value: product.details.brewery,
  });
  details.push({
    label: labelMap.region,
    value: product.details.region,
  });
  details.push({
    label: labelMap.taste,
    value: product.details.taste,
  });
  details.push({
    label: labelMap.temperature,
    value: product.details.temperature,
  });

  return details;
};

// 商品IDで検索（国際化対応）
export const getProductById = (
  id: number,
  locale: string = "ja"
): Product | undefined => {
  const products = getProducts(locale);
  return products.find((product) => product.id === id);
};
