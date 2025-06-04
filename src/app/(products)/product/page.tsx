// src/app/(products)/product/page.tsx
"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart, Share2, SortDesc, Check } from "lucide-react";

import { Product } from "@/types/products";
import { useCart } from "@/store/cart";
import {
  categories,
  formatPrice,
  getProductDetails,
  getProductsByCategory,
  sortOptions,
  sortProducts,
} from "@/data";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);

    // カートに追加
    addToCart(product, 1);

    // 視覚的フィードバック
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);

      // 「追加済み」表示を2秒後にリセット
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    }, 500);
  };

  return (
    <Card className="group border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
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
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </Button>
          </div>

          {/* セール価格表示 */}
          {product.originalPrice && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-medium">
                セール
              </span>
            </div>
          )}
        </div>

        {/* 商品情報エリア */}
        <div className="p-4 space-y-3">
          {/* カテゴリ・評価 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
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
            {getProductDetails(product)
              .slice(0, 3)
              .map(
                (detail: { label: string; value: string }, index: number) => (
                  <p key={index}>
                    {detail.label}: {detail.value}
                  </p>
                )
              )}
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
                  追加中
                </div>
              ) : justAdded ? (
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  追加済み
                </div>
              ) : (
                <div className="flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  追加
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
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [sortBy, setSortBy] = useState("おすすめ順");
  const { getTotalQuantity } = useCart();

  // フィルタリング
  const filteredProducts = getProductsByCategory(selectedCategory);

  // ソート
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ヘロセクション */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wider">
              PRODUCT
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              富士の麓で醸される、伝統と革新が融合した日本酒と特選品をご紹介いたします
            </p>
            {/* カート情報表示 */}
            {getTotalQuantity() > 0 && (
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                カート: {getTotalQuantity()}点
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
                {sortedProducts.length}件の商品
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* 商品が見つからない場合 */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                選択されたカテゴリの商品は見つかりませんでした
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory("すべて")}
                className="mt-4"
              >
                すべての商品を表示
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
