"use client";
import { Instagram } from "lucide-react";
import { Link } from "@/i18n/routing";
import React from "react";
import { products } from "@/data";

export const Footer: React.FC = () => {
  // 商品データから主要な商品を取得（最初の4つまで）
  const featuredProducts = products.slice(0, 4);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">天地星空</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>〒417-0051</p>
              <p> 静岡県富士市吉原２丁目８−２１</p>
              <p>TEL: 0545-52-0011</p>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">商品情報</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {featuredProducts.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors font-medium"
                >
                  すべての商品を見る →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">会社案内</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">お問い合わせ</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="https://www.mtfuji-sake.jp/"
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  オフィシャルサイト
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">SNS</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/amasora_mtfujisake3776/"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <p>&copy; 2025 天地星空. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  プライバシーポリシー
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  利用規約
                </Link>
                <Link
                  href="/commerce"
                  className="hover:text-white transition-colors"
                >
                  特定商取引法
                </Link>
              </div>
            </div>

            {/* Age Verification Notice */}
            <div className="text-xs text-gray-500 text-center sm:text-right">
              <p>※お酒は20歳になってから</p>
              <p>※飲酒運転は法律で禁止されています</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
