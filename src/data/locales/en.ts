// src/data/locales/en.ts - 英語データ
import { Product, HeroData, TopicData } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Amachi Hoshisora Junmai Daiginjo 720ml",
    description:
      "Made with Mt. Fuji underground water & 100% Yamada Nishiki rice",
    price: 120,
    originalPrice: null,
    category: "Junmai Daiginjo",
    label: "Amachi Hoshisora",
    image: {
      url: "/720.webp",
      alt: "Amachi Hoshisora Junmai Daiginjo 720ml",
      width: 400,
      height: 400,
      cutout: true,
    },
    details: {
      alcoholContent: "15%",
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
    price: 95,
    originalPrice: null,
    category: "Junmai Daiginjo",
    label: "Amachi Hoshisora",
    image: {
      url: "/500.webp",
      alt: "Amachi Hoshisora Junmai Daiginjo 500ml",
      width: 400,
      height: 400,
      cutout: true,
    },
    details: {
      alcoholContent: "15%",
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
    name: "Fuji no Shizuku Junmai Ginjo 180ml",
    description: "Made with Mt. Fuji underground water, in a single-serve size",
    price: 30,
    originalPrice: null,
    category: "Junmai Ginjo",
    label: "Fuji no Shizuku",
    image: {
      url: "/180.webp",
      alt: "Fuji no Shizuku Junmai Ginjo 180ml",
      width: 400,
      height: 400,
    },
    details: {
      alcoholContent: "15%",
      riceMilling: "55%",
      brewery: "Fujinishiki Brewery",
      region: "Fuji City, Shizuoka Prefecture",
      taste: "Clear ginjo aroma with a soft, gentle mouthfeel",
      temperature: "10-15℃ (50-59°F)",
    },
    stock: 100,
    stripeProductId: "prod_fuji_shizuku_180ml_au",
    stripePriceId: "price_fuji_shizuku_180ml_aud",
    colorClass: "from-blue-900 to-indigo-900",
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
  heroImage: "/hero/fuji-night-poster.webp",
  heroVideo: "/hero/fuji-night.mp4",
};

export const topicsData: TopicData[] = [
  {
    id: 1,
    title: "Junmai Daiginjo brewed with Mt. Fuji underground water",
    description: "Exquisite masterpiece using 100% Yamada Nishiki rice",
    image: "/river.webp",
    body: [
      "Rain and snow that fall on Mt. Fuji sink deep underground, where layers of hard lava rock filter them slowly for about 70 years.",
      "The water surfaces in Yuno, the village where the brewery stands. With a hardness of just 32, it is exceptionally soft. Fujinishiki has brewed with this spring water ever since it was founded in the Genroku era.",
    ],
    facts: [
      { label: "Time underground", value: "About 70 years" },
      { label: "Water hardness", value: "32 (soft)" },
      { label: "Brewery founded", value: "Genroku era (1688–1704)" },
    ],
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
    body: [
      "Yuno is a cold valley swept by the fuji-oroshi, the wind that blows down from the mountain. Its mineral-rich spring water also nurtures organically grown Yamada-nishiki, the classic sake rice.",
      "In 1974 the brewery released Fuji Tennen Jozoshu, a sake brewed from rice alone. Since 2006 it has been led by its 18th-generation head. Amachi Hoshisora is a junmai daiginjo made from Yamada-nishiki polished to 40%, brewed with nothing but rice and water.",
    ],
    facts: [
      { label: "Rice", value: "100% Yamada-nishiki" },
      { label: "Polishing ratio", value: "40%" },
      { label: "Brewery head", value: "18th generation (since 2006)" },
    ],
  },
  {
    id: 3,
    title: "The night sky stars that change with the seasons",
    description: "The story of Mt. Fuji's deities",
    bgColor: "from-indigo-50 to-blue-100",
    productColor: "from-indigo-100 to-indigo-200",
    image: "/star.webp",
    body: [
      "Amachi Hoshisora means heaven, earth and starry sky. At the foot of Mt. Fuji, stars that shift with each season light up the night.",
    ],
  },
];

export const categories = ["All", "Junmai Daiginjo", "Junmai Ginjo"];

export const sortOptions = [
  "Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
];
