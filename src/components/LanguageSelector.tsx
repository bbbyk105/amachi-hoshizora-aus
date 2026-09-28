"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useLocaleSwitcher, type AppLocale } from "@/hooks/use-locale-switcher";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  variant?: "desktop" | "mobile";
  onLanguageChange?: () => void;
}

const LABELS: Record<string, { short: string; name: string }> = {
  ja: { short: "JP", name: "日本語" },
  en: { short: "EN", name: "English" },
};

// JP / EN の切り替え。色は親の文字色を引き継ぐ（ヒーロー上では白）
export const LanguageSelector = ({
  variant = "desktop",
  onLanguageChange,
}: LanguageSelectorProps) => {
  const tLang = useTranslations("language");
  const { locale, locales, switchLocale } = useLocaleSwitcher();

  // 現在の言語設定をローカルストレージに保存
  useEffect(() => {
    try {
      localStorage.setItem("preferred-language", locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const handleLanguageChange = (loc: AppLocale) => {
    if (loc === locale) return;
    switchLocale(loc);
    onLanguageChange?.();
  };

  const isMobile = variant === "mobile";

  return (
    <div
      role="group"
      aria-label={tLang("select")}
      className={cn(
        "items-center",
        isMobile ? "flex gap-6 text-base" : "hidden gap-3 text-xs lg:flex",
      )}
    >
      {locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-3">
          {index > 0 && (
            <span aria-hidden="true" className="h-3 w-px bg-current opacity-30" />
          )}
          <button
            type="button"
            lang={loc}
            aria-label={LABELS[loc].name}
            aria-pressed={loc === locale}
            onClick={() => handleLanguageChange(loc)}
            className={cn(
              "tracking-[0.16em] transition-opacity",
              isMobile ? "py-2" : "py-1",
              loc === locale
                ? "opacity-100"
                : "cursor-pointer opacity-45 hover:opacity-100",
            )}
          >
            {isMobile ? LABELS[loc].name : LABELS[loc].short}
          </button>
        </span>
      ))}
    </div>
  );
};
