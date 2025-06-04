import { products } from "./products";
import { Product } from "./types";

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)} AUD`;
};

export const formatPriceWithVolume = (product: Product): string => {
  if (product.category === "抹茶") {
    return `20g $${product.price.toFixed(2)} AUD`;
  }
  const volume = product.name.includes("720ml") ? "720ml" : "500ml";
  return `${volume} $${product.price.toFixed(2)} AUD`;
};

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

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "すべて") return products;
  return products.filter((product) => product.category === category);
};

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
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted.sort((a, b) => a.id - b.id);
  }
};
