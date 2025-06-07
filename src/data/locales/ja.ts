// src/data/locales/ja.ts - 日本語データ
import { Product, HeroData, TopicData } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "天地星空 純米大吟醸 720ml",
    description: "富士の伏流水・山田錦100%使用",
    price: 200,
    originalPrice: null,
    category: "純米大吟醸",
    label: "天地星空",
    image: {
      url: "/720.webp",
      alt: "天地星空 純米大吟醸 720ml",
      width: 400,
      height: 400,
    },
    details: {
      alcoholContent: "16%",
      riceMilling: "40%",
      brewery: "富士錦酒造",
      region: "静岡県富士市",
      taste: "芳醇で上品な香り、なめらかな口当たり",
      temperature: "10-15℃",
    },
    stock: 50,
    stripeProductId: "prod_amachi_720ml_au",
    stripePriceId: "price_amachi_720ml_aud",
    colorClass: "from-blue-800 to-blue-900",
  },
  {
    id: 2,
    name: "天地星空 純米大吟醸 500ml",
    description: "富士の伏流水使用",
    price: 150,
    originalPrice: null,
    category: "純米大吟醸",
    label: "天地星空",
    image: {
      url: "/500.webp",
      alt: "天地星空 純米大吟醸 500ml",
      width: 400,
      height: 400,
    },
    details: {
      alcoholContent: "16%",
      riceMilling: "40%",
      brewery: "富士錦酒造",
      region: "静岡県富士市",
      taste: "上品な香りと深い味わい",
      temperature: "10-15℃",
    },
    stock: 75,
    stripeProductId: "prod_amachi_500ml_au",
    stripePriceId: "price_amachi_500ml_aud",
    colorClass: "from-blue-700 to-blue-800",
  },
  {
    id: 3,
    name: "抹茶",
    description: "完全無農薬の静岡県抹茶",
    price: 55,
    originalPrice: null,
    category: "抹茶",
    label: "富士錦",
    image: {
      url: "/maccha.webp",
      alt: "抹茶",
      width: 400,
      height: 400,
    },
    details: {
      brewery: "富士錦酒造",
      region: "静岡県",
      taste: "濃厚で上品な苦味と甘み",
      temperature: "70-80℃",
      weight: "20g",
    },
    stock: 100,
    stripeProductId: "prod_matcha_premium_au",
    stripePriceId: "price_matcha_premium_aud",
    colorClass: "from-indigo-600 to-indigo-700",
  },
];

export const heroData: HeroData = {
  title: ["聖なる富士の麓で、", "三百年の時を経て", "育まれた星空。"],
  subtitle: "純米大吟醸",
  productName: "天地星空 - AMACHIHOSHISORA",
  heroImage: "/mt-fuji.gif",
};

export const topicsData: TopicData[] = [
  {
    id: 1,
    title: "富士の伏流水で醸す純米大吟醸",
    description: "山田錦100%使用の極上の逸品",
    image: "/river.webp",
  },
  {
    id: 2,
    title: "「米と水だけで醸した真の日本酒で世界に挑戦したい」",
    description: "蔵元の想い",
    bgColor: "from-gray-800 to-gray-900",
    productColor: "from-blue-200 to-blue-300",
    hasRings: true,
    image: "/rice.webp",
  },
  {
    id: 3,
    title: "季節とともに変わる夜空の星々",
    description: "富士の神々の物語",
    bgColor: "from-indigo-50 to-blue-100",
    productColor: "from-indigo-100 to-indigo-200",
    image: "/star.webp",
  },
];

export const categories = ["すべて", "純米大吟醸", "抹茶"];

export const sortOptions = [
  "おすすめ順",
  "価格の安い順",
  "価格の高い順",
  "新着順",
];
