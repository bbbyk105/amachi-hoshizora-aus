// src/app/sitemap.ts

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://amachi-hoshizora-aus.vercel.app";
  const lastModified = new Date();

  // 基本ルート（トップページ）
  const homeRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ja: `${baseUrl}/ja`,
        },
      },
    },
    {
      url: `${baseUrl}/ja`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ja: `${baseUrl}/ja`,
        },
      },
    },
  ];

  // 静的ページ（top-page配下）
  const staticPages = ["commerce", "privacy", "q&a", "terms"];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.flatMap((page) => [
    {
      url: `${baseUrl}/en/${page}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/${page}`,
          ja: `${baseUrl}/ja/${page}`,
        },
      },
    },
    {
      url: `${baseUrl}/ja/${page}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/${page}`,
          ja: `${baseUrl}/ja/${page}`,
        },
      },
    },
  ]);

  // 商品ページ（products）
  // 注: 実際の商品スラッグは products.ts から取得することをお勧めします
  const productRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en/products`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/products`,
          ja: `${baseUrl}/ja/products`,
        },
      },
    },
    {
      url: `${baseUrl}/ja/products`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/products`,
          ja: `${baseUrl}/ja/products`,
        },
      },
    },
  ];

  // 決済関連ページ
  const paymentPages = ["cancel", "success"];

  const paymentRoutes: MetadataRoute.Sitemap = paymentPages.flatMap((page) => [
    {
      url: `${baseUrl}/en/payment/${page}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/en/payment/${page}`,
          ja: `${baseUrl}/ja/payment/${page}`,
        },
      },
    },
    {
      url: `${baseUrl}/ja/payment/${page}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/en/payment/${page}`,
          ja: `${baseUrl}/ja/payment/${page}`,
        },
      },
    },
  ]);

  // カートページ
  const cartRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en/cart`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/cart`,
          ja: `${baseUrl}/ja/cart`,
        },
      },
    },
    {
      url: `${baseUrl}/ja/cart`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/cart`,
          ja: `${baseUrl}/ja/cart`,
        },
      },
    },
  ];

  return [
    ...homeRoutes,
    ...staticRoutes,
    ...productRoutes,
    ...paymentRoutes,
    ...cartRoutes,
  ];
}
