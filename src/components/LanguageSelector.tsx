"use client";

import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";

interface LanguageSelectorProps {
  variant?: "desktop" | "mobile";
  onLanguageChange?: () => void;
}

export const LanguageSelector = ({
  variant = "desktop",
  onLanguageChange,
}: LanguageSelectorProps) => {
  const tLang = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // 現在の言語設定をローカルストレージに保存
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", locale);
    }
  }, [locale]);

  const getLanguageDisplay = (loc: string) => {
    const names = {
      ja: "日本語",
      en: "English",
    };
    return names[loc as keyof typeof names];
  };

  const currentLang = getLanguageDisplay(locale);

  const handleLanguageChange = (loc: string) => {
    // クッキーに保存（ミドルウェアと連携）
    if (typeof window !== "undefined") {
      document.cookie = `preferred-locale=${loc}; path=/; max-age=${
        365 * 24 * 60 * 60
      }; SameSite=Lax`;
      localStorage.setItem("preferred-language", loc);
    }

    router.replace(pathname, { locale: loc });
    onLanguageChange?.();
  };

  if (variant === "mobile") {
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          {tLang("select")}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {routing.locales.map((loc) => {
            const langName = getLanguageDisplay(loc);
            return (
              <Button
                key={loc}
                variant={loc === locale ? "default" : "outline"}
                className={`h-12 rounded-xl transition-all duration-200 flex items-center justify-center ${
                  loc === locale
                    ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg"
                    : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
                onClick={() => handleLanguageChange(loc)}
                disabled={loc === locale}
              >
                <span className="text-sm font-medium">{langName}</span>
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hidden lg:flex p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 items-center gap-2"
        >
          <Globe className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">{currentLang}</span>
          <ChevronDown className="w-3 h-3 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 p-2 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-xl"
      >
        <DropdownMenuLabel className="text-xs text-gray-500 uppercase tracking-wider px-3 py-2">
          {tLang("select")}
        </DropdownMenuLabel>
        {routing.locales.map((loc) => {
          const langName = getLanguageDisplay(loc);
          return (
            <DropdownMenuItem
              key={loc}
              disabled={loc === locale}
              onClick={() => handleLanguageChange(loc)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                loc === locale
                  ? "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="flex-1">{langName}</span>
              {loc === locale && (
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
