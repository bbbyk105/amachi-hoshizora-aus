// src/app/[locale]/layout.tsx

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { CartProvider } from "@/store/cart";
import "../globals.css";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// 動的ルートでのメタデータ生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://amachi-hoshizora-aus.vercel.app";

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
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ja: "/ja",
      },
    },
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
          sameAs: [
            "https://www.instagram.com/amachihoshisora_au/",
            "https://www.facebook.com/amachihoshisora.australia/",
          ],
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // SSG対応
  setRequestLocale(locale);

  // 言語ファイルの読み込み
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* 追加のSEOタグ */}
        <link
          rel="canonical"
          href={`https://amachi-hoshizora-aus.vercel.app/${locale}`}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Header />
            <main className="container mx-auto p-4">{children}</main>
            <Footer />
            <Toaster />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
