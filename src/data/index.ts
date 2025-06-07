// src/data/index.ts - 修正版
export * from "./types";

// 国際化対応のユーティリティ関数をエクスポート
export {
  getProducts,
  getHeroData,
  getTopicsData,
  getCategories,
  getSortOptions,
  formatPrice,
  formatPriceWithVolume,
  getProductDetails,
  getProductById,
  getProductsByCategory,
  sortProducts,
} from "./utils";

// products のエクスポート - これが欠けていたためエラーが発生
export { products } from "./locales/ja"; // デフォルトは日本語
export { categories, sortOptions } from "./locales/ja";
export { heroData, topicsData } from "./locales/ja";

// 後方互換性のため、既存のコードで使用されているエクスポートも追加
import { getProducts } from "./utils";

// ロケール指定なしで使用される場合のデフォルト
export const getDefaultProducts = () => getProducts("ja");
