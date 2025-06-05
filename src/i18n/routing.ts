// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

// 言語検出を無効にしてデフォルト言語を強制
export const routing = defineRouting({
  locales: ["ja", "en"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false, // ブラウザ言語設定を無視
});

// ナビゲーション用のユーティリティを作成
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
