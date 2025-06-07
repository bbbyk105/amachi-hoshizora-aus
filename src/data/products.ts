// src/data/products.ts - 後方互換性のため作成
// 既存のコードが @/data/products からimportしているためのファイル

import { products as jaProducts } from "./locales/ja";
import { products as enProducts } from "./locales/en";

// デフォルトエクスポート（日本語）
export const products = jaProducts;

// ロケール別のエクスポート
export const productsJa = jaProducts;
export const productsEn = enProducts;

// 型定義も再エクスポート
export type { Product } from "./types";
