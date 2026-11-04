// 検索エンジン向けの構造化データ（JSON-LD）。そのページに実際に出ている内容だけを書く
import type { Product } from "@/data/types";
import { absoluteUrl, siteUrl } from "@/lib/site";

const CONTEXT = "https://schema.org";
const ORGANIZATION_ID = `${siteUrl}/#organization`;

/** 全ページ共通の情報。商品と FAQ は、それぞれのページで出す */
export const siteStructuredData = [
  {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "AMACHI HOSHISORA Australia",
    alternateName: [
      "天地星空",
      "Amachi Aus",
      "AMACHI AUS",
      "Amachi Hoshisora Australia",
    ],
    url: siteUrl,
    logo: absoluteUrl("/images/star.webp"),
    image: absoluteUrl("/images/star.webp"),
    description:
      "AMACHI HOSHISORA Australia (Amachi Aus) - Premium Junmai Daiginjo sake from Mt. Fuji, crafted by Fujinishiki Brewery with 300 years of tradition. Made with 100% Yamada Nishiki rice and pure Mt. Fuji spring water.",
    sameAs: ["https://www.instagram.com/amasora_mtfuji3776/"],
  },
  {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "AMACHI HOSHISORA Australia",
    alternateName: ["Amachi Aus", "天地星空 オーストラリア"],
    description:
      "AMACHI HOSHISORA Australia (Amachi Aus) - Premium Junmai Daiginjo sake from Mt. Fuji, available in Australia",
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: ["en-AU", "ja-JP"],
  },
];

export function productStructuredData(product: Product, locale: string) {
  return {
    "@context": CONTEXT,
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image.url),
    brand: { "@type": "Brand", name: product.details.brewery },
    manufacturer: { "@type": "Organization", name: product.details.brewery },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/${locale}/products/${product.id}`),
      price: product.price,
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqStructuredData(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
