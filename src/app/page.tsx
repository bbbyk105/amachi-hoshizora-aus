// src/app/page.tsx
"use client";
import React from "react";
import { Hero } from "./(top-page)/Hero";
import { About } from "./(top-page)/About";
import { Product } from "./(top-page)/Product";
import {
  heroData,
  topicsData,
  products,
  formatPriceWithVolume,
} from "@/data/products";

// products データを既存のコンポーネントと互換性のある形式に変換
const compatibleProductsData = products.map((product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: formatPriceWithVolume(product),
  colorClass: product.colorClass || "from-gray-600 to-gray-700",
  label: product.label,
  image: product.image.url.replace("/", ""), // Remove leading slash for compatibility
}));

const TopPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero heroData={heroData} />
      <About topicsData={topicsData} />
      <Product productsData={compatibleProductsData} />
    </div>
  );
};

export default TopPage;
