"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart, Share2, SortDesc } from "lucide-react";

// 拡張された商品データ
const allProductsData = [
  {
    id: 1,
    name: "天地星空 純米大吟醸 720ml",
    description: "富士の伏流水・山田錦100%使用",
    price: "¥8,800",
    originalPrice: null,
    category: "純米大吟醸",
    label: "天地星空",
    image: "720.webp",
    alcoholContent: "16%",
    riceMilling: "40%",
    brewery: "富士錦酒造",
    region: "静岡県富士市",
    taste: "芳醇で上品な香り、なめらかな口当たり",
    temperature: "10-15℃",
    isNew: false,
    isPopular: true,
  },
  {
    id: 2,
    name: "天地星空 純米大吟醸 500ml",
    description: "富士の伏流水使用",
    price: "¥6,600",
    originalPrice: null,
    category: "純米大吟醸",
    label: "天地星空",
    image: "500.webp",
    alcoholContent: "16%",
    riceMilling: "40%",
    brewery: "富士錦酒造",
    region: "静岡県富士市",
    taste: "上品な香りと深い味わい",
    temperature: "10-15℃",
    isNew: false,
    isPopular: true,
  },
  {
    id: 3,
    name: "抹茶",
    description: "完全無農薬の静岡県抹茶",
    price: "¥5,500",
    originalPrice: null,
    category: "抹茶",
    label: "富士錦",
    image: "maccha.webp",
    alcoholContent: null,
    riceMilling: null,
    brewery: "富士錦酒造",
    region: "静岡県",
    taste: "濃厚で上品な苦味と甘み",
    temperature: "70-80℃",
    isNew: true,
    isPopular: false,
  },
];

const categories = ["すべて", "純米大吟醸", "抹茶"];
const sortOptions = ["おすすめ順", "価格の安い順", "価格の高い順", "新着順"];

interface ProductCardProps {
  product: (typeof allProductsData)[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="group border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      <CardContent className="p-0">
        {/* 商品画像エリア */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={`/${product.image}`}
            alt={product.name}
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
            {product.alcoholContent && (
              <p>アルコール度数: {product.alcoholContent}</p>
            )}
            {product.riceMilling && <p>精米歩合: {product.riceMilling}</p>}
            <p>推奨温度: {product.temperature}</p>
          </div>

          {/* 価格とボタン */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
            <Button
              size="sm"
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              カート
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

  // フィルタリング
  const filteredProducts = allProductsData.filter(
    (product) =>
      selectedCategory === "すべて" || product.category === selectedCategory
  );

  // ソート
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "価格の安い順":
        return (
          parseInt(a.price.replace(/[¥,]/g, "")) -
          parseInt(b.price.replace(/[¥,]/g, ""))
        );
      case "価格の高い順":
        return (
          parseInt(b.price.replace(/[¥,]/g, "")) -
          parseInt(a.price.replace(/[¥,]/g, ""))
        );
      case "新着順":
        return b.isNew ? 1 : -1;
      default:
        return 0;
    }
  });

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
