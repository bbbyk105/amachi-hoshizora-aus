// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["ja", "en"],
  defaultLocale: "en", // デフォルト言語は英語のまま
  localePrefix: "always",
  localeDetection: false, // ブラウザ言語設定は無効のまま
});

// ナビゲーション用のユーティリティを作成
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
