"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Menu,
  X,
  Package,
  Info,
  HeadphonesIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { useCart } from "@/store/cart";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "./LanguageSelector";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalQuantity } = useCart();
  const t = useTranslations("navigation");
  const tHeader = useTranslations("header");

  const menuItems = [
    { href: "/", label: t("home"), icon: HeadphonesIcon },
    { href: "/q&a", label: t("qa"), icon: Info },
    { href: "/products", label: t("product"), icon: Package },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* PC Navigation - 左側 */}
          <nav className="hidden lg:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-900 hover:text-gray-600 font-medium text-sm transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-100/80 transition-all duration-200 rounded-xl"
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-80 p-0 border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"
            >
              <VisuallyHidden>
                <SheetTitle>{tHeader("navigationMenu")}</SheetTitle>
              </VisuallyHidden>

              {/* Header Section */}
              <div className="relative p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='17' cy='17' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  }}
                ></div>

                <div className="relative flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-light tracking-wider">
                      天地星空
                    </h2>
                    <p className="text-sm text-white/70 mt-1">
                      Amachi-Hoshizora
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 text-white rounded-full transition-all duration-200"
                    aria-label={tHeader("closeMenu")}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Navigation Section */}
              <div className="p-6">
                <nav className="space-y-2">
                  {menuItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <item.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-900 font-medium text-lg group-hover:text-gray-700 transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-gray-400 transition-colors duration-200"></div>
                    </Link>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                {/* Language Selector - Mobile */}
                <LanguageSelector
                  variant="mobile"
                  onLanguageChange={() => setIsOpen(false)}
                />

                {/* Quick Actions */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                    {t("quickActions")}
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/cart"
                      onClick={() => setIsOpen(false)}
                      className="h-12 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2 relative"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="text-sm">{t("cart")}</span>
                      {getTotalQuantity() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {getTotalQuantity()}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer Section */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 to-transparent">
                <div className="text-center">
                  <p className="text-xs text-gray-400">
                    © 2024 Amachi-Hoshizora
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center Logo */}
          <Link
            href="/"
            className="text-lg sm:text-xl lg:text-2xl font-light tracking-wider text-gray-900 hover:text-gray-600 absolute left-1/2 transform -translate-x-1/2"
          >
            <span className="hidden sm:inline">Amachi-Hoshizora</span>
            <span className="sm:hidden">Amachi-Hoshizora</span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Selector - Desktop */}
            <LanguageSelector variant="desktop" />

            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {getTotalQuantity() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {getTotalQuantity()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slideInLeft 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};
