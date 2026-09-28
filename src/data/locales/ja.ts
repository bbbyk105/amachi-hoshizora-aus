// src/data/locales/ja.ts - 日本語データ
import { Product, HeroData, TopicData } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "天地星空 純米大吟醸 720ml",
    description: "富士の伏流水・山田錦100%使用",
    price: 120,
    originalPrice: null,
    category: "純米大吟醸",
    label: "天地星空",
    image: {
      url: "/720.webp",
      alt: "天地星空 純米大吟醸 720ml",
      width: 400,
      height: 400,
      cutout: true,
    },
    details: {
      alcoholContent: "15%",
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
    price: 95,
    originalPrice: null,
    category: "純米大吟醸",
    label: "天地星空",
    image: {
      url: "/500.webp",
      alt: "天地星空 純米大吟醸 500ml",
      width: 400,
      height: 400,
      cutout: true,
    },
    details: {
      alcoholContent: "15%",
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
    name: "富士の雫 純米吟醸 180ml",
    description: "富士の伏流水使用・飲みきりサイズ",
    price: 30,
    originalPrice: null,
    category: "純米吟醸",
    label: "富士の雫",
    image: {
      url: "/180.webp",
      alt: "富士の雫 純米吟醸 180ml",
      width: 400,
      height: 400,
    },
    details: {
      alcoholContent: "15%",
      riceMilling: "55%",
      brewery: "富士錦酒造",
      region: "静岡県富士市",
      taste: "澄んだ吟醸香とやわらかな口当たり",
      temperature: "10-15℃",
    },
    stock: 100,
    stripeProductId: "prod_fuji_shizuku_180ml_au",
    stripePriceId: "price_fuji_shizuku_180ml_aud",
    colorClass: "from-blue-900 to-indigo-900",
  },
];

export const heroData: HeroData = {
  title: ["聖なる富士の麓で、", "三百年の時を経て", "育まれた星空"],
  subtitle: "純米大吟醸",
  productName: "天地星空 - Amachi Hoshisora",
  heroImage: "/hero/fuji-night-poster.webp",
  heroVideo: "/hero/fuji-night.mp4",
};

export const topicsData: TopicData[] = [
  {
    id: 1,
    title: "富士の伏流水で醸す純米大吟醸",
    description: "山田錦100%使用の極上の逸品",
    image: "/river.webp",
    body: [
      "富士山に降った雨や雪は地下深くへしみ込み、硬い溶岩の層に守られながら、およそ70年かけてゆっくりろ過されます。",
      "その水が湧き出るのが、蔵のある柚野（ゆの）の里。硬度32という、とてもやわらかな水です。富士錦酒造は元禄年間の創業から今まで、この湧き水で酒を仕込んできました。",
    ],
    facts: [
      { label: "ろ過にかかる年月", value: "約70年" },
      { label: "仕込み水の硬度", value: "32（軟水）" },
      { label: "蔵の創業", value: "元禄年間（1688〜1704年）" },
    ],
  },
  {
    id: 2,
    title: "「米と水だけで醸した真の日本酒で世界に挑戦したい」",
    description: "蔵元の想い",
    bgColor: "from-gray-800 to-gray-900",
    productColor: "from-blue-200 to-blue-300",
    hasRings: true,
    image: "/rice.webp",
    body: [
      "柚野は、富士山から吹き下ろす「富士おろし」が冷たい寒冷地。ミネラルを含んだ湧き水で、有機農法の酒米・山田錦が育つ土地でもあります。",
      "蔵は1974年に、米だけで醸す清酒「富士天然醸造酒」を発売。2006年からは18代目の清 信一が率いています。天地星空は、山田錦を40%まで磨き、米と水だけで仕込んだ純米大吟醸です。",
    ],
    facts: [
      { label: "原料米", value: "山田錦 100%" },
      { label: "精米歩合", value: "40%" },
      { label: "蔵元", value: "18代目 清 信一（2006年〜）" },
    ],
  },
  {
    id: 3,
    title: "季節とともに変わる夜空の星々",
    description: "富士の神々の物語",
    bgColor: "from-indigo-50 to-blue-100",
    productColor: "from-indigo-100 to-indigo-200",
    image: "/star.webp",
    body: [
      "天地星空という名は、天と地、そして星空から。富士の麓では、季節とともに移り変わる星々が夜の景色を彩ります。",
    ],
  },
];

export const categories = ["すべて", "純米大吟醸", "純米吟醸"];

export const sortOptions = [
  "おすすめ順",
  "価格の安い順",
  "価格の高い順",
  "新着順",
];
