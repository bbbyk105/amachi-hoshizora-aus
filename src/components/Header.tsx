"use client";

import { Link, usePathname } from "@/i18n/routing";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { useCart } from "@/store/cart";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "./LanguageSelector";
import { cn } from "@/lib/utils";
import { useScrolledPast } from "@/hooks/use-scrolled-past";

const Logo = () => (
  <span className="flex flex-col items-center leading-none">
    <span className="font-serif text-lg tracking-[0.32em] mr-[-0.32em]">
      天地星空
    </span>
    <span className="mt-1.5 text-[10px] tracking-[0.24em] opacity-70 mr-[-0.24em]">
      Amachi Hoshisora
    </span>
  </span>
);

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { getTotalQuantity } = useCart();
  const t = useTranslations("navigation");
  const tHeader = useTranslations("header");

  const isHome = pathname === "/";
  // トップではヒーローの上に透明で重ね、ヒーローを抜けたら白地にする
  const pastHero = useScrolledPast(0.85, isHome);
  const overHero = isHome && !pastHero;
  const cartCount = getTotalQuantity();

  const menuItems = [
    { href: "/", label: t("home") },
    { href: "/details", label: t("details") },
    { href: "/heritage", label: t("heritage") },
    { href: "/products", label: t("product") },
    { href: "/faq", label: t("qa") },
  ];

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-motion="header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-300",
        overHero
          ? "border-b border-transparent text-white"
          : "border-b border-border bg-white/95 text-ink backdrop-blur-md",
      )}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-10">
        {/* 左: PCナビ / モバイルはメニュー */}
        <div className="flex items-center">
          <nav className="hidden gap-8 lg:flex">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className="text-[13px] underline-offset-[6px] decoration-1 hover:underline aria-[current=page]:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className="-ml-2 flex h-11 w-11 items-center justify-center lg:hidden"
              aria-label={tHeader("navigationMenu")}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="flex w-[86vw] max-w-sm flex-col border-0 bg-white p-0 text-ink"
            >
              <SheetTitle className="sr-only">
                {tHeader("navigationMenu")}
              </SheetTitle>

              <div className="flex h-16 items-center px-6">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Logo />
                </Link>
              </div>

              <nav className="mt-6 px-6">
                <ul className="border-t border-border">
                  {menuItems.map((item) => (
                    <li key={item.href} className="border-b border-border">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isCurrent(item.href) ? "page" : undefined}
                        className="block py-4 font-serif text-xl aria-[current=page]:text-ruri"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li className="border-b border-border">
                    <Link
                      href="/cart"
                      onClick={() => setIsOpen(false)}
                      className="flex items-baseline justify-between py-4 font-serif text-xl"
                    >
                      {t("cart")}
                      {cartCount > 0 && (
                        <span className="font-sans text-sm tabular">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="mt-auto px-6 pb-8">
                <LanguageSelector
                  variant="mobile"
                  onLanguageChange={() => setIsOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* 中央: ロゴ */}
        <Link href="/" aria-label="Amachi Hoshisora" className="justify-self-center">
          <Logo />
        </Link>

        {/* 右: 言語・カート */}
        <div className="flex items-center justify-end gap-6">
          <LanguageSelector variant="desktop" />
          <Link
            href="/cart"
            className="flex h-11 items-center gap-2 text-[13px]"
            aria-label={`${t("cart")} (${cartCount})`}
          >
            {t("cart")}
            <span
              className={cn(
                "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] tabular",
                cartCount > 0
                  ? overHero
                    ? "bg-white text-night"
                    : "bg-ink text-white"
                  : "border border-current opacity-50",
              )}
            >
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
