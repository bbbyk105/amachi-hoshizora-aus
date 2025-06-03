"use client";
import Link from "next/link";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useCart } from "@/store/cart";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalQuantity } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* PC Navigation - 左側 */}
          <nav className="hidden lg:flex space-x-8">
            <a
              href="/product"
              className="text-gray-900 hover:text-gray-600 font-medium text-sm"
            >
              PRODUCT
            </a>
            <a
              href="/about"
              className="text-gray-900 hover:text-gray-600 font-medium text-sm"
            >
              ABOUT
            </a>
            <a
              href="/support"
              className="text-gray-900 hover:text-gray-600 font-medium text-sm"
            >
              SUPPORT
            </a>
          </nav>

          {/* モバイルメニューボタン */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col space-y-6 mt-8">
                <a
                  href="/product"
                  className="text-gray-900 hover:text-gray-600 font-medium text-lg"
                >
                  PRODUCT
                </a>
                <a
                  href="/about"
                  className="text-gray-900 hover:text-gray-600 font-medium text-lg"
                >
                  ABOUT
                </a>
                <a
                  href="/support"
                  className="text-gray-900 hover:text-gray-600 font-medium text-lg"
                >
                  SUPPORT
                </a>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Center Logo */}
          <Link
            href="/"
            className="text-lg sm:text-xl lg:text-2xl font-light tracking-wider text-gray-900 hover:text-gray-600 transition-colors absolute left-1/2 transform -translate-x-1/2"
          >
            <span className="hidden sm:inline">Amachi-Hoshizora</span>
            <span className="sm:hidden">天地星空</span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </Button>

            <Link
              href="/cart"
              className="relative p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {getTotalQuantity() > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalQuantity()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
