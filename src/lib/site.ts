import { routing } from "@/i18n/routing";

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.mtfuji-sake-aus.com",
);

export function absoluteUrl(path = ""): string {
  if (!path) {
    return siteUrl;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * ページごとの canonical と言語別 URL（hreflang）。
 * path は言語を除いたパス（例: "/details"、トップは ""）
 */
export function localizedAlternates(locale: string, path = "") {
  const href = (lang: string) => `/${lang}${path}`;
  return {
    canonical: href(locale),
    languages: {
      ...Object.fromEntries(routing.locales.map((lang) => [lang, href(lang)])),
      "x-default": href(routing.defaultLocale),
    },
  };
}
