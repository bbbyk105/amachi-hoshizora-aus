// src/data/utils.ts - 国際化対応版
import { Product } from "./types";

// ロケール別データのインポート
import * as jaData from "./locales/ja";
import * as enData from "./locales/en";

// ロケール別データマップ
const dataByLocale = {
  ja: jaData,
  en: enData,
} as const;

// ロケール対応のデータ取得関数
export const getProducts = (locale: string = "ja"): Product[] => {
  const data =
    dataByLocale[locale as keyof typeof dataByLocale] || dataByLocale.ja;
  return data.products;
};

export const getHeroData = (locale: string = "ja") => {
  const data =
    dataByLocale[locale as keyof typeof dataByLocale] || dataByLocale.ja;
  return data.heroData;
};

export const getTopicsData = (locale: string = "ja") => {
  const data =
    dataByLocale[locale as keyof typeof dataByLocale] || dataByLocale.ja;
  return data.topicsData;
};

export const getCategories = (locale: string = "ja"): string[] => {
  const data =
    dataByLocale[locale as keyof typeof dataByLocale] || dataByLocale.ja;
  return data.categories;
};

export const getSortOptions = (locale: string = "ja"): string[] => {
  const data =
    dataByLocale[locale as keyof typeof dataByLocale] || dataByLocale.ja;
  return data.sortOptions;
};

// 価格フォーマット（既存のまま - AUD表示）
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)} AUD`;
};

// ボリューム付き価格フォーマット（国際化対応）
export const formatPriceWithVolume = (
  product: Product,
  locale: string = "ja"
): string => {
  if (product.category === "抹茶" || product.category === "Matcha") {
    const weightText = locale === "en" ? "20g" : "20g";
    return `${weightText} $${product.price.toFixed(2)} AUD`;
  }
  const volume = product.name.includes("720ml") ? "720ml" : "500ml";
  return `${volume} $${product.price.toFixed(2)} AUD`;
};

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

// カテゴリ別商品取得（国際化対応）
export const getProductsByCategory = (
  category: string,
  locale: string = "ja"
): Product[] => {
  const products = getProducts(locale);
  const categories = getCategories(locale);
  const allCategory = categories[0]; // "すべて" or "All"

  if (category === allCategory) return products;
  return products.filter((product) => product.category === category);
};

// 商品ソート（国際化対応）
export const sortProducts = (
  products: Product[],
  sortBy: string,
  locale: string = "ja"
): Product[] => {
  const sorted = [...products];
  const sortOptions = getSortOptions(locale);
  const [recommended, priceLowToHigh, priceHighToLow, newest] = sortOptions;

  switch (sortBy) {
    case priceLowToHigh:
      return sorted.sort((a, b) => a.price - b.price);
    case priceHighToLow:
      return sorted.sort((a, b) => b.price - a.price);
    case newest:
      return sorted.sort((a, b) => b.id - a.id);
    case recommended:
    default:
      return sorted.sort((a, b) => a.id - b.id);
  }
};
