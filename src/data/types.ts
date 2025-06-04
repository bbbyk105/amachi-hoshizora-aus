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
