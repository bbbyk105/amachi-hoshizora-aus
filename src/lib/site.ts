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
