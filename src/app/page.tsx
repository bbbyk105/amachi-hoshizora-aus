"use client";
import React from "react";
import { Hero } from "./(top-page)/Hero";
import { About } from "./(top-page)/About";
import { Product } from "./(top-page)/Product";

// データ定義
const heroData = {
  title: ["聖なる富士の麓で、", "三百年の時を経て", "育まれた星空。"],
  subtitle: "純米大吟醸",
  productName: "天地星空 - AMACHIHOSHISORA",
  heroImage: "mt-fuji.gif",
};

const topicsData = [
  {
    id: 1,
    title: "富士の伏流水で醸す純米大吟醸",
    description: "山田錦100%使用の極上の逸品",
    image: "river.webp",
  },
  {
    id: 2,
    title: "「米と水だけで醸した真の日本酒で世界に挑戦したい」",
    description: "蔵元の想い",
    bgColor: "from-gray-800 to-gray-900",
    productColor: "from-blue-200 to-blue-300",
    hasRings: true,
    image: "rice.webp",
  },
  {
    id: 3,
    title: "季節とともに変わる夜空の星々",
    description: "富士の神々の物語",
    bgColor: "from-indigo-50 to-blue-100",
    productColor: "from-indigo-100 to-indigo-200",
    image: "star.webp",
  },
];

const productsData = [
  {
    id: 1,
    name: "天地星空 純米大吟醸 720ml",
    description: "富士の伏流水・山田錦100%使用",
    price: "720ml ¥8,800 (税込)",
    colorClass: "from-blue-800 to-blue-900",
    label: "天地星空",
    image: "720.webp",
  },
  {
    id: 2,
    name: "天地星空 純米大吟醸 500ml",
    description: "富士の伏流水使用",
    price: "500ml ¥6,600 (税込)",
    colorClass: "from-blue-700 to-blue-800",
    label: "天地星空",
    image: "500.webp",
  },
  {
    id: 3,
    name: "抹茶",
    description: "完全無農薬の静岡県抹茶",
    price: "20g ¥5,500 (税込)",
    colorClass: "from-indigo-600 to-indigo-700",
    label: "富士錦",
    image: "maccha.webp",
  },
];

const TopPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero heroData={heroData} />
      <About topicsData={topicsData} />
      <Product productsData={productsData} />
    </div>
  );
};

export default TopPage;
