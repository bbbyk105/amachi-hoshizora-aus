// src/data/locales/en.ts - 英語データ
import { Product, HeroData, TopicData } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Amachi Hoshizora Junmai Daiginjo 720ml",
    description:
      "Made with Mt. Fuji underground water & 100% Yamada Nishiki rice",
    price: 200,
    originalPrice: null,
    category: "Junmai Daiginjo",
    label: "Amachi Hoshisora",
    image: {
      url: "/720.webp",
      alt: "Amachi Hoshisora Junmai Daiginjo 720ml",
      width: 400,
      height: 400,
    },
    details: {
      alcoholContent: "16%",
      riceMilling: "40%",
      brewery: "Fujinishiki Brewery",
      region: "Fuji City, Shizuoka Prefecture",
      taste: "Rich and elegant aroma with smooth texture",
      temperature: "10-15℃ (50-59°F)",
    },
    stock: 50,
    stripeProductId: "prod_amachi_720ml_au",
    stripePriceId: "price_amachi_720ml_aud",
    colorClass: "from-blue-800 to-blue-900",
  },
  {
    id: 2,
    name: "Amachi Hoshisora Junmai Daiginjo 500ml",
    description: "Made with Mt. Fuji underground water",
    price: 150,
    originalPrice: null,
    category: "Junmai Daiginjo",
    label: "Amachi Hoshisora",
    image: {
      url: "/500.webp",
      alt: "Amachi Hoshisora Junmai Daiginjo 500ml",
      width: 400,
      height: 400,
    },
    details: {
      alcoholContent: "16%",
      riceMilling: "40%",
      brewery: "Fujinishiki Brewery",
      region: "Fuji City, Shizuoka Prefecture",
      taste: "Elegant aroma with deep flavor",
      temperature: "10-15℃ (50-59°F)",
    },
    stock: 75,
    stripeProductId: "prod_amachi_500ml_au",
    stripePriceId: "price_amachi_500ml_aud",
    colorClass: "from-blue-700 to-blue-800",
  },
  {
    id: 3,
    name: "Premium Matcha",
    description: "Completely pesticide-free matcha from Shizuoka Prefecture",
    price: 55,
    originalPrice: null,
    category: "Matcha",
    label: "Fujinishiki",
    image: {
      url: "/maccha.webp",
      alt: "Premium Matcha",
      width: 400,
      height: 400,
    },
    details: {
      brewery: "Fujinishiki Brewery",
      region: "Shizuoka Prefecture",
      taste: "Rich and elegant bitterness with sweetness",
      temperature: "70-80℃ (158-176°F)",
      weight: "20g",
    },
    stock: 100,
    stripeProductId: "prod_matcha_premium_au",
    stripePriceId: "price_matcha_premium_aud",
    colorClass: "from-indigo-600 to-indigo-700",
  },
];

export const heroData: HeroData = {
  title: [
    "At the sacred foot of Mt. Fuji,",
    "Through three centuries of time,",
    "The starry sky was nurtured.",
  ],
  subtitle: "Junmai Daiginjo",
  productName: "Amachi Hoshisora - Heaven Earth Starry Sky",
  heroImage: "/mt-fuji.gif",
};

export const topicsData: TopicData[] = [
  {
    id: 1,
    title: "Junmai Daiginjo brewed with Mt. Fuji underground water",
    description: "Exquisite masterpiece using 100% Yamada Nishiki rice",
    image: "/river.webp",
  },
  {
    id: 2,
    title:
      '"We want to challenge the world with authentic sake brewed only with rice and water"',
    description: "The brewery owner's passion",
    bgColor: "from-gray-800 to-gray-900",
    productColor: "from-blue-200 to-blue-300",
    hasRings: true,
    image: "/rice.webp",
  },
  {
    id: 3,
    title: "The night sky stars that change with the seasons",
    description: "The story of Mt. Fuji's deities",
    bgColor: "from-indigo-50 to-blue-100",
    productColor: "from-indigo-100 to-indigo-200",
    image: "/star.webp",
  },
];

export const categories = ["All", "Junmai Daiginjo", "Matcha"];

export const sortOptions = [
  "Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
];
