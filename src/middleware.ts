import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

type Locale = (typeof routing.locales)[number];

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // クッキーから前回選択した言語を取得
  const savedLocale = request.cookies.get("preferred-locale")?.value;

  // URLに言語プレフィックスがない場合の処理
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale && pathname === "/") {
    // ルートパスでアクセスされた場合
    if (savedLocale && routing.locales.includes(savedLocale as Locale)) {
      // 保存された言語にリダイレクト
      return NextResponse.redirect(
        new URL(
          `/${savedLocale}${pathname === "/" ? "" : pathname}`,
          request.url
        )
      );
    }
    // 保存された言語がない場合はデフォルト言語（英語）にリダイレクト
    return NextResponse.redirect(
      new URL(
        `/${routing.defaultLocale}${pathname === "/" ? "" : pathname}`,
        request.url
      )
    );
  }

  // 通常のnext-intlミドルウェア処理
  const response = intlMiddleware(request);

  // 現在の言語をクッキーに保存
  if (response && pathnameHasLocale) {
    const currentLocale = pathname.split("/")[1];
    if (routing.locales.includes(currentLocale as Locale)) {
      response.cookies.set("preferred-locale", currentLocale, {
        maxAge: 365 * 24 * 60 * 60, // 1年
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
