// src/app/[locale]/(products)/products/page.tsx - 国際化対応版
"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { ShoppingCart, Share2, SortDesc, Check } from "lucide-react";

import { Product } from "@/data/types";
import { useCart } from "@/store/cart";
import {
  getCategories,
  formatPrice,
  getProductDetails,
  getProductsByCategory,
  getSortOptions,
  sortProducts,
} from "@/data/utils";
import { useTranslations } from "next-intl";

interface ProductCardProps {
  product: Product;
  locale: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, locale }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // 翻訳フック
  const tCommon = useTranslations("productList");

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);

    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    }, 500);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // シェア機能の実装
  };

  const handleCardClick = () => {
    router.push(`/${locale}/products/${product.id}`);
  };

  return (
    <Card
      className="group border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        {/* 商品画像エリア */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* アクションボタン */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white p-0"
              onClick={handleShareClick}
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* 商品情報エリア */}
        <div className="p-4 space-y-3">
          {/* カテゴリ・ラベル */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
              {product.label}
            </span>
          </div>

          {/* 商品名 */}
          <h3 className="font-medium text-gray-900 text-sm lg:text-base leading-tight line-clamp-2">
            {product.name}
          </h3>

          {/* 説明 */}
          <p className="text-xs text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* 商品詳細 */}
          <div className="space-y-1 text-xs text-gray-500">
            {getProductDetails(product, locale)
              .slice(0, 3)
              .map((detail, index) => (
                <p key={index}>
                  {detail.label}: {detail.value}
                </p>
              ))}
          </div>

          {/* 価格とボタン */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`transition-all duration-300 ${
                justAdded
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-900 hover:bg-gray-800 text-white"
              }`}
            >
              {isAdding ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                  {tCommon("adding")}
                </div>
              ) : justAdded ? (
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  {tCommon("added")}
                </div>
              ) : (
                <div className="flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  {tCommon("add")}
                </div>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductPage = () => {
  const params = useParams();
  const locale = params.locale as string;

  // 翻訳フック
  const t = useTranslations("productList");

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const categories = getCategories(locale);
    return categories[0]; // "すべて" or "All"
  });
  const [sortBy, setSortBy] = useState(() => {
    const sortOptions = getSortOptions(locale);
    return sortOptions[0]; // "おすすめ順" or "Recommended"
  });

  const { getTotalQuantity } = useCart();

  // ロケール対応データの取得
  const categories = getCategories(locale);
  const sortOptions = getSortOptions(locale);

  // フィルタリング
  const filteredProducts = getProductsByCategory(selectedCategory, locale);

  // ソート
  const sortedProducts = sortProducts(filteredProducts, sortBy, locale);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ヘロセクション */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wider">
              {locale === "en" ? "PRODUCTS" : "PRODUCT"}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t("heroDescription")}
            </p>
            {/* カート情報表示 */}
            {getTotalQuantity() > 0 && (
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                {t("cartInfo", { count: getTotalQuantity() })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* フィルター・ソートセクション */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            {/* カテゴリフィルター */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* ソート */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SortDesc className="w-4 h-4 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-sm text-gray-600">
                {sortedProducts.length}
                {t("itemsCount")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 商品一覧 */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>

          {/* 商品が見つからない場合 */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">{t("noProductsFound")}</p>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(categories[0])}
                className="mt-4"
              >
                {t("showAllProducts")}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
