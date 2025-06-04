// data/products.ts
export interface Image {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // AUD (e.g., 88 = $88.00 AUD)
  originalPrice?: number | null;
  category: string;
  label: string;
  image: Image;
  details: {
    alcoholContent?: string;
    riceMilling?: string;
    brewery: string;
    region: string;
    taste: string;
    temperature: string;
    weight?: string; // for matcha
  };
  stock?: number;
  stripeProductId?: string;
  stripePriceId?: string;
  colorClass?: string; // for legacy compatibility
}

export interface HeroData {
  title: string[];
  subtitle: string;
  productName: string;
  heroImage: string;
}

export interface TopicData {
  id: number;
  title: string;
  description: string;
  image: string;
  bgColor?: string;
  productColor?: string;
  hasRings?: boolean;
}

// オーストラリア向け商品データ（商品名は日本語のまま）
export const products: Product[] = [
  {
    id: 1,
    name: "天地星空 純米大吟醸 720ml",
    description: "富士の伏流水・山田錦100%使用",
    price: 88, // $88.00 AUD
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
    stripeProductId: "prod_amachi_720ml_au", // cspell:disable-line
    stripePriceId: "price_amachi_720ml_aud", // cspell:disable-line
    colorClass: "from-blue-800 to-blue-900",
  },
  {
    id: 2,
    name: "天地星空 純米大吟醸 500ml",
    description: "富士の伏流水使用",
    price: 66, // $66.00 AUD
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
    stripeProductId: "prod_amachi_500ml_au", // cspell:disable-line
    stripePriceId: "price_amachi_500ml_aud", // cspell:disable-line
    colorClass: "from-blue-700 to-blue-800",
  },
  {
    id: 3,
    name: "抹茶",
    description: "完全無農薬の静岡県抹茶",
    price: 55, // $55.00 AUD
    originalPrice: null,
    category: "抹茶",
    label: "富士錦",
    image: {
      url: "/maccha.webp", // cspell:disable-line
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

// Hero section data
export const heroData: HeroData = {
  title: ["聖なる富士の麓で、", "三百年の時を経て", "育まれた星空。"],
  subtitle: "純米大吟醸",
  productName: "天地星空 - AMACHIHOSHISORA",
  heroImage: "mt-fuji.gif",
};

// Topics/About section data
export const topicsData: TopicData[] = [
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

// Categories for filtering
export const categories = ["すべて", "純米大吟醸", "抹茶"];

// Sort options
export const sortOptions = [
  "おすすめ順",
  "価格の安い順",
  "価格の高い順",
  "新着順",
];

// Helper function to format price in AUD
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)} AUD`;
};

// Helper function to format price with volume info (for compatibility)
export const formatPriceWithVolume = (product: Product): string => {
  if (product.category === "抹茶") {
    return `20g $${product.price.toFixed(2)} AUD`;
  }
  const volume = product.name.includes("720ml") ? "720ml" : "500ml";
  return `${volume} $${product.price.toFixed(2)} AUD`;
};

// Helper function to get product details for display
export const getProductDetails = (
  product: Product
): { label: string; value: string }[] => {
  const details = [];

  if (product.details.alcoholContent) {
    details.push({
      label: "アルコール度数",
      value: product.details.alcoholContent,
    });
  }
  if (product.details.riceMilling) {
    details.push({ label: "精米歩合", value: product.details.riceMilling });
  }
  if (product.details.weight) {
    details.push({ label: "内容量", value: product.details.weight });
  }
  details.push({ label: "醸造元", value: product.details.brewery });
  details.push({ label: "産地", value: product.details.region });
  details.push({ label: "味わい", value: product.details.taste });
  details.push({ label: "適温", value: product.details.temperature });

  return details;
};

// Helper function to get product by ID
export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  if (category === "すべて") return products;
  return products.filter((product) => product.category === category);
};

// Helper function to sort products
export const sortProducts = (
  products: Product[],
  sortBy: string
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case "価格の安い順":
      return sorted.sort((a, b) => a.price - b.price);
    case "価格の高い順":
      return sorted.sort((a, b) => b.price - a.price);
    case "新着順":
      // ID順でソート（新しいIDが後に追加されると仮定）
      return sorted.sort((a, b) => b.id - a.id);
    default: // おすすめ順
      // デフォルトでID順
      return sorted.sort((a, b) => a.id - b.id);
  }
};

// Export default for compatibility with existing imports
export default products;
