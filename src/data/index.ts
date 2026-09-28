// src/data/index.ts - 商品データと表示用ユーティリティの入口
export * from "./types";

export {
  getProducts,
  getHeroData,
  getTopicsData,
  getCategories,
  getSortOptions,
  getSortChoices,
  getProductDetails,
  getProductById,
} from "./utils";

// 価格の表示・並び替え（Client Component からは @/data/format を直接 import する）
export {
  formatPrice,
  formatPriceWithVolume,
  getVolume,
  sortProductsBy,
  SORT_KEYS,
} from "./format";
export type { SortKey } from "./format";
