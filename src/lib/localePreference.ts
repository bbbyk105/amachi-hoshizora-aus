/** Persist the chosen locale (cookie is read by src/proxy.ts; client-only). */
export function saveLocalePreference(locale: string): void {
  if (typeof window === "undefined") return;
  document.cookie = `preferred-locale=${locale}; path=/; max-age=${
    365 * 24 * 60 * 60
  }; SameSite=Lax`;
  localStorage.setItem("preferred-language", locale);
}
