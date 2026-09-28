export interface Image {
  url: string;
  alt: string;
  width: number;
  height: number;
  /** 背景が透過の切り抜き画像（余白を取って contain で置く） */
  cutout?: boolean;
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
  heroVideo?: string;
}

export interface TopicFact {
  label: string;
  value: string;
}

export interface TopicData {
  id: number;
  title: string;
  description: string;
  image: string;
  /** 本文（段落ごと）。出典: 富士錦酒造・天地星空の公式サイト */
  body?: string[];
  /** 数値で見せる事実（ろ過の年月・硬度など） */
  facts?: TopicFact[];
  bgColor?: string;
  productColor?: string;
  hasRings?: boolean;
}
