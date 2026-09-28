// src/app/[locale]/layout.tsx

import { Noto_Serif, Noto_Serif_JP, Shippori_Mincho } from "next/font/google";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CartProvider } from "@/store/cart";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { siteUrl } from "@/lib/site";
import { AGE_VERIFIED_BOOT_SCRIPT } from "@/lib/ageGateStorage";

// フォントは fujisan と同じ構成（本文: Noto Serif + Noto Serif JP / 見出し: Shippori Mincho）
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  adjustFontFallback: true,
  preload: true,
});
const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-noto-serif-jp",
  adjustFontFallback: true,
  preload: false,
});
const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-shippori-mincho",
  adjustFontFallback: true,
  preload: false,
});

// 動的ルートでのメタデータ生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = siteUrl;

  return {
    title: {
      default:
        "AMACHI HOSHISORA Australia | 天地星空 AUS - Premium Junmai Daiginjo Sake",
      template: "%s | AMACHI HOSHISORA Australia",
    },
    description:
      "AMACHI HOSHISORA Australia (天地星空 AUS) - Experience the finest Junmai Daiginjo sake from Mt. Fuji. Premium Japanese sake in Australia, crafted by Fujinishiki Brewery with 300 years tradition. Amachi Aus official distributor.",
    keywords: [
      "AMACHI HOSHISORA",
      "Amachi Hoshisora Australia",
      "Amachi aus",
      "amachi aus",
      "AMACHI AUS",
      "天地星空",
      "天地星空 オーストラリア",
      "天地星空 AUS",
      "Japanese sake Australia",
      "Junmai Daiginjo Australia",
      "Mt Fuji sake",
      "Premium sake Australia",
      "Fujinishiki Brewery",
      "sake Sydney",
      "sake Melbourne",
      "sake Brisbane",
      "純米大吟醸 オーストラリア",
      "日本酒 オーストラリア",
      "Amachi Hoshizora",
      "Amachihoshisora",
    ],
    authors: [{ name: "Amachi Hoshisora Australia" }],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    // canonical と hreflang は各ページの generateMetadata で付ける（localizedAlternates）
    metadataBase: new URL(baseUrl),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title:
        "AMACHI HOSHISORA Australia | 天地星空 AUS - Premium Mt. Fuji Sake",
      description:
        "Amachi Hoshisora Australia (天地星空 AUS) - Premium Junmai Daiginjo sake from Mt. Fuji. 100% Yamada Nishiki, Mt. Fuji water, 300 years tradition. Official Amachi Aus distributor.",
      url: baseUrl,
      siteName: "AMACHI HOSHISORA Australia | Amachi Aus",
      locale: locale === "ja" ? "ja_JP" : "en_AU",
      alternateLocale: locale === "ja" ? ["en_AU"] : ["ja_JP"],
      type: "website",
      images: [
        {
          url: "/images/amachi-hoshisora-og.jpg",
          width: 1200,
          height: 630,
          alt: "AMACHI HOSHISORA Australia - Premium Junmai Daiginjo Sake from Mt. Fuji",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AMACHI HOSHISORA Australia | Amachi Aus | Premium Mt. Fuji Sake",
      description:
        "Amachi Hoshisora Australia - Premium Junmai Daiginjo from Mt. Fuji. 300 years tradition, 100% Yamada Nishiki. Official Amachi Aus.",
      images: ["/images/amachi-hoshisora-twitter.jpg"],
    },
    verification: {
      google: "I9vYqWRKCC6wQW9ozvpwFSO9kevgNgmyEra13lQWQYY", // Google Search Consoleで取得
    },

    // JSON-LD構造化データを追加
    other: {
      "application/ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${baseUrl}/#organization`,
          name: "AMACHI HOSHISORA Australia",
          alternateName: [
            "天地星空",
            "Amachi Aus",
            "AMACHI AUS",
            "Amachi Hoshisora Australia",
          ],
          url: baseUrl,
          logo: `${baseUrl}/images/star.webp`,
          image: `${baseUrl}/images/star.webp`,
          description:
            "AMACHI HOSHISORA Australia (Amachi Aus) - Premium Junmai Daiginjo sake from Mt. Fuji, crafted by Fujinishiki Brewery with 300 years of tradition. Made with 100% Yamada Nishiki rice and pure Mt. Fuji spring water. Official distributor in Australia.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Sydney",
            addressRegion: "NSW",
            addressCountry: "AU",
          },
          areaServed: [
            {
              "@type": "Country",
              name: "Australia",
            },
            {
              "@type": "City",
              name: "Sydney",
            },
            {
              "@type": "City",
              name: "Melbourne",
            },
            {
              "@type": "City",
              name: "Brisbane",
            },
          ],
          makesOffer: {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "AMACHI HOSHISORA Junmai Daiginjo",
              description: "Premium Japanese sake from Mt. Fuji",
            },
          },
          sameAs: ["https://www.instagram.com/amasora_mtfuji3776/"],
        },
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: "AMACHI HOSHISORA Junmai Daiginjo",
          alternateName: [
            "天地星空 純米大吟醸",
            "Amachi Hoshisora",
            "Amachi Aus Sake",
          ],
          brand: {
            "@type": "Brand",
            name: "AMACHI HOSHISORA",
            alternateName: ["Amachi Aus", "天地星空"],
            logo: `${baseUrl}/images/star.webp`,
          },
          description:
            "AMACHI HOSHISORA (Amachi Aus) - The finest Junmai Daiginjo sake crafted at the base of sacred Mt. Fuji. Brewed by Fujinishiki Brewery using 100% Yamada Nishiki rice and pristine Mt. Fuji spring water, embodying 300 years of traditional sake brewing expertise. This premium Japanese sake offers an exquisite harmony of flavors with elegant fragrance and refined taste. Available in Australia.",
          manufacturer: {
            "@type": "Organization",
            name: "Fujinishiki Brewery",
            logo: `${baseUrl}/images/star.webp`,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Yunono, Fuji City",
              addressLocality: "Shizuoka",
              addressCountry: "JP",
            },
            foundingDate: "1688",
          },
          category: "Junmai Daiginjo Sake",
          alcoholWarning: "Drink responsibly. Must be 18+ to purchase.",
          countryOfOrigin: {
            "@type": "Country",
            name: "Japan",
          },
          offers: {
            "@type": "AggregateOffer",
            availability: "https://schema.org/InStock",
            priceCurrency: "AUD",
            seller: {
              "@type": "Organization",
              name: "AMACHI HOSHISORA Australia",
              alternateName: "Amachi Aus",
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "127",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          url: baseUrl,
          name: "AMACHI HOSHISORA Australia",
          alternateName: ["Amachi Aus", "天地星空 オーストラリア"],
          description:
            "AMACHI HOSHISORA Australia (Amachi Aus) - Premium Junmai Daiginjo sake from Mt. Fuji, available in Australia",
          publisher: {
            "@id": `${baseUrl}/#organization`,
          },
          potentialAction: [
            {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/search?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          ],
          inLanguage: ["en-AU", "ja-JP"],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is AMACHI HOSHISORA Australia (Amachi Aus)?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AMACHI HOSHISORA Australia (also known as Amachi Aus or 天地星空 AUS) is the official Australian distributor of premium Junmai Daiginjo sake crafted at the base of Mt. Fuji by Fujinishiki Brewery. Made with 100% Yamada Nishiki rice and pure Mt. Fuji spring water, it represents 300 years of traditional Japanese sake brewing excellence.",
              },
            },
            {
              "@type": "Question",
              name: "Where can I buy AMACHI HOSHISORA (Amachi Aus) in Australia?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AMACHI HOSHISORA (Amachi Aus) is available through selected premium sake retailers, Japanese restaurants, and online stores across Australia, particularly in Sydney, Melbourne, and Brisbane. Contact us for the nearest stockist.",
              },
            },
            {
              "@type": "Question",
              name: "What makes AMACHI HOSHISORA (Amachi Aus) special?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AMACHI HOSHISORA (Amachi Aus) is special because it uses 100% premium Yamada Nishiki rice (the king of sake rice), pure Mt. Fuji spring water, and is crafted by master brewers with 300 years of expertise at Fujinishiki Brewery located at the foothills of sacred Mt. Fuji in Japan.",
              },
            },
          ],
        },
      ]),
    },
  };
}

// Client Component が useTranslations で使う名前空間だけをブラウザに送る
// （規約などの長い本文はサーバーで描画済みなので送らない）
const CLIENT_MESSAGE_NAMESPACES = [
  "ageGate",
  "cart",
  "common",
  "header",
  "language",
  "navigation",
] as const;

// 全言語のページをビルド時に生成する（next-intl の静的レンダリング）
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // 静的レンダリングのため、このリクエストの言語を登録する
  setRequestLocale(locale);

  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    CLIENT_MESSAGE_NAMESPACES.map((namespace) => [namespace, messages[namespace]]),
  );

  return (
    // <html> の class は下のスクリプトが付けるので、ハイドレーション差分の警告を抑える
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* 最初の描画より前に <html> へ印を付ける。
            motion: 動きを減らす設定でなければ、GSAP の演出前に要素を隠しておく
            age-verified: 年齢確認を通過済みなら、確認画面の下地を出さない */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion');${AGE_VERIFIED_BOOT_SCRIPT}`,
          }}
        />
      </head>
      <body
        className={`${notoSerif.variable} ${notoSerifJp.variable} ${shipporiMincho.variable}`}
      >
        <NextIntlClientProvider messages={clientMessages}>
          <CartProvider>
            <AgeGate />
            <Header />
            <main>{children}</main>
            <Footer />
            <MotionProvider />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
