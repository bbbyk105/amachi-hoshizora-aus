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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title:
      "AMACHI-HOSHISORA Australia | 天地星空 - Premium Junmai Daiginjo Sake from Mt. Fuji",
    description:
      "Experience AMACHI-HOSHISORA (天地星空), the finest Junmai Daiginjo sake crafted at the base of Mt. Fuji by Fujinishiki Brewery. Made with 100% Yamada Nishiki rice and pure Mt. Fuji spring water, this premium Japanese sake embodies 300 years of brewing tradition. Available in Australia.",
    keywords: [
      "AMACHI HOSHISORA",
      "amachi hoshisora",
      "天地星空",
      "Japanese sake Australia",
      "Junmai Daiginjo Australia",
      "Mt Fuji sake",
      "Premium sake Australia",
      "Fujinishiki Brewery",
      "純米大吟醸 オーストラリア",
    ],
    authors: [{ name: "Amachihoshisora" }],
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
      },
    },
    openGraph: {
      title:
        "AMACHI-HOSHISORA Australia | Premium Mt. Fuji Junmai Daiginjo Sake",
      description:
        "Discover AMACHI-HOSHISORA (天地星空), an exceptional Junmai Daiginjo sake from the foothills of Mt. Fuji. Crafted with 100% Yamada Nishiki rice and pristine Mt. Fuji water by Fujinishiki Brewery's 300-year tradition. Premium Japanese sake now available in Australia.",
      url: baseUrl,
      siteName: "AMACHI-HOSHISORA Australia",
      locale: locale === "ja" ? "ja_JP" : "en_AU",
      alternateLocale: locale === "ja" ? ["en_AU"] : ["ja_JP"],
      type: "website",
      images: [
        {
          url: "/images/amachi-hoshisora-og.jpg",
          width: 1200,
          height: 630,
          alt: "AMACHI-HOSHISORA - Premium Junmai Daiginjo Sake from Mt. Fuji",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AMACHI-HOSHISORA Australia | Premium Mt. Fuji Sake",
      description:
        "Experience the finest Junmai Daiginjo sake from Mt. Fuji's foothills. 300 years of tradition, 100% Yamada Nishiki rice, pure Mt. Fuji water.",
      images: ["/images/amachi-hoshisora-twitter.jpg"],
    },

    // JSON-LD構造化データを追加
    other: {
      "application/ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${baseUrl}/#organization`,
          name: "AMACHI-HOSHISORA Australia",
          alternateName: "天地星空",
          url: baseUrl,
          logo: `${baseUrl}/images/star.webp`,
          image: `${baseUrl}/images/star.webp`,
          description:
            "Premium Junmai Daiginjo sake from Mt. Fuji, crafted by Fujinishiki Brewery with 300 years of tradition. Made with 100% Yamada Nishiki rice and pure Mt. Fuji spring water.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Sydney",
            addressRegion: "NSW",
            addressCountry: "AU",
          },
          areaServed: {
            "@type": "Country",
            name: "Australia",
          },
          makesOffer: {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "AMACHI-HOSHISORA Junmai Daiginjo",
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
          name: "AMACHI-HOSHISORA Junmai Daiginjo",
          alternateName: "天地星空 純米大吟醸",
          brand: {
            "@type": "Brand",
            name: "AMACHI-HOSHISORA",
            logo: `${baseUrl}/images/star.webp`,
          },
          description:
            "The finest Junmai Daiginjo sake crafted at the base of sacred Mt. Fuji. Brewed by Fujinishiki Brewery using 100% Yamada Nishiki rice and pristine Mt. Fuji spring water, embodying 300 years of traditional sake brewing expertise. This premium Japanese sake offers an exquisite harmony of flavors with elegant fragrance and refined taste.",
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
              name: "AMACHI-HOSHISORA Australia",
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
          name: "AMACHI-HOSHISORA Australia",
          description:
            "Premium Junmai Daiginjo sake from Mt. Fuji, available in Australia",
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
              name: "What is AMACHI-HOSHISORA?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AMACHI-HOSHISORA (天地星空) is a premium Junmai Daiginjo sake crafted at the base of Mt. Fuji by Fujinishiki Brewery. Made with 100% Yamada Nishiki rice and pure Mt. Fuji spring water, it represents 300 years of traditional Japanese sake brewing excellence.",
              },
            },
            {
              "@type": "Question",
              name: "Where can I buy AMACHI-HOSHISORA in Australia?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AMACHI-HOSHISORA is available through selected premium sake retailers, Japanese restaurants, and online stores across Australia, particularly in Sydney, Melbourne, and Brisbane.",
              },
            },
            {
              "@type": "Question",
              name: "What makes AMACHI-HOSHISORA special?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AMACHI-HOSHISORA is special because it uses 100% premium Yamada Nishiki rice (the king of sake rice), pure Mt. Fuji spring water, and is crafted by master brewers with 300 years of expertise at Fujinishiki Brewery located at the foothills of sacred Mt. Fuji.",
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
