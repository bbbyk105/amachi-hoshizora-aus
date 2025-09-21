// src/app/[locale]/page.tsx - ロケール対応版
"use client";
import React, { use } from "react"; // useをインポート
import {
  getProducts,
  formatPriceWithVolume,
  getHeroData,
  getTopicsData,
} from "@/data";
import { Hero } from "./(top-page)/Hero";
import { About } from "./(top-page)/About";
import { Product } from "./(top-page)/Product";

// 型定義を修正：paramsはPromiseになる
interface TopPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const TopPage = ({ params }: TopPageProps) => {
  // React.use()を使ってPromiseを解決
  const { locale } = use(params);

  // ロケール別のデータを取得
  const products = getProducts(locale);
  const heroData = getHeroData(locale);
  const topicsData = getTopicsData(locale);

  // products データを既存のコンポーネントと互換性のある形式に変換
  const compatibleProductsData = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: formatPriceWithVolume(product, locale),
    colorClass: product.colorClass || "from-gray-600 to-gray-700",
    label: product.label,
    image: product.image.url.replace("/", ""), // Remove leading slash for compatibility
  }));

  return (
    <div className="min-h-screen bg-white">
      <Hero heroData={heroData} />
      <About topicsData={topicsData} />
      <Product productsData={compatibleProductsData} />
    </div>
  );
};

export default TopPage;
