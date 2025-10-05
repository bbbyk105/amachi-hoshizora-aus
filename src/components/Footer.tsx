"use client";
import { Instagram } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";
import { products } from "@/data";

export const Footer: React.FC = () => {
  const t = useTranslations();
  const tNav = useTranslations("navigation");

  // 商品データから主要な商品を取得（最初の4つまで）
  const featuredProducts = products.slice(0, 4);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">
              {t("footer.companyName")}
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{t("footer.address.postalCode")}</p>
              <p>{t("footer.address.street")}</p>
              <p>{t("footer.address.phone")}</p>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">
              {t("footer.sections.products.title")}
            </h3>
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
                  {t("footer.sections.products.viewAll")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">
              {t("footer.sections.company.title")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/q&a"
                  className="hover:text-white transition-colors"
                >
                  {tNav("qa")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  {tNav("product")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">
              {t("footer.sections.contact.title")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="https://www.mtfuji-sake.jp/"
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("footer.sections.contact.officialSite")}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">
                {t("footer.sections.contact.socialMedia")}
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/amasora_mtfuji3776/"
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
              <p>{t("footer.legal.copyright")}</p>
              <div className="flex space-x-4">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  {t("footer.legal.privacyPolicy")}
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  {t("footer.legal.termsOfService")}
                </Link>
                <Link
                  href="/commerce"
                  className="hover:text-white transition-colors"
                >
                  {t("footer.legal.commerceLaw")}
                </Link>
              </div>
            </div>

            {/* Age Verification Notice */}
            <div className="text-xs text-gray-500 text-center sm:text-right">
              <p>{t("footer.ageVerification.drinking")}</p>
              <p>{t("footer.ageVerification.driving")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
