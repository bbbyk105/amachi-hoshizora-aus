import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

// 利用可能な言語とデフォルト言語を設定
export const routing = defineRouting({
  locales: ["ja", "en"],
  defaultLocale: "ja",
  localePrefix: "always",
});

// ナビゲーション用のユーティリティを作成
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
