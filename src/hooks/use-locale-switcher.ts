"use client";

import { useCallback, useTransition } from "react";
import { useLocale } from "next-intl";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { saveLocalePreference } from "@/lib/localePreference";

export type AppLocale = (typeof routing.locales)[number];

/** 今のページのまま言語を切り替え、選んだ言語を次回用に保存する */
export function useLocaleSwitcher() {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = useCallback(
    (next: AppLocale) => {
      if (next === locale) return;
      saveLocalePreference(next);
      startTransition(() => {
        router.replace(pathname, { locale: next });
      });
    },
    [locale, pathname, router],
  );

  return { locale, locales: routing.locales, switchLocale, isPending };
}
