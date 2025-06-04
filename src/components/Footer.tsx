"use client";
import { Instagram } from "lucide-react";
import React from "react";

export const Footer: React.FC = () => {
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
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  天地星空 純米大吟醸
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  富士錦 純米酒
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  特別純米酒
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  季節限定商品
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">会社案内</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Product
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
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
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  プライバシーポリシー
                </a>
                <a href="/terms" className="hover:text-white transition-colors">
                  利用規約
                </a>
                <a
                  href="/commerce"
                  className="hover:text-white transition-colors"
                >
                  特定商取引法
                </a>
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
