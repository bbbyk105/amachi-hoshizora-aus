import type { MetadataRoute } from "next";
import { getProducts } from "@/data";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

type SitemapEntry = MetadataRoute.Sitemap[number];

function localizedAlternates(path: string) {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]),
  );

  return {
    languages: {
      ...languages,
      "x-default": `${siteUrl}/${routing.defaultLocale}${path}`,
    },
  };
}

function createLocalizedEntries(
  path: string,
  options: Omit<SitemapEntry, "url" | "alternates">,
): SitemapEntry[] {
  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    alternates: localizedAlternates(path),
    ...options,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPages = ["commerce", "privacy", "faq", "terms"];
  const productIds = getProducts(routing.defaultLocale).map(
    (product) => product.id,
  );

  return [
    ...createLocalizedEntries("", {
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    }),
    ...staticPages.flatMap((page) =>
      createLocalizedEntries(`/${page}`, {
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),
    ...createLocalizedEntries("/products", {
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    }),
    ...productIds.flatMap((id) =>
      createLocalizedEntries(`/products/${id}`, {
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    ),
  ];
}
