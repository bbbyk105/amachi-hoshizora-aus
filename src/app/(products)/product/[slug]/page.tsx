// src/app/(products)/product/[slug]/page.tsx
"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ShoppingCart,
  ArrowLeft,
  Share2,
  Minus,
  Plus,
  Check,
} from "lucide-react";

import { useCart } from "@/store/cart";
import { products, formatPrice, getProductDetails } from "@/data";

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // slugからproductを取得（実際の実装では、slugを使ってproductを特定する）
  // 今回は簡単のため、idで検索
  const productId = parseInt(params.slug as string);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            商品が見つかりません
          </h1>
          <Button onClick={() => router.push("/product")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            商品一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product, quantity);

    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }, 500);
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  const productDetails = getProductDetails(product);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ナビゲーション */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              onClick={() => router.push("/product")}
              className="flex items-center hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              商品一覧
            </button>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 画像セクション */}
          <div className="space-y-4">
            {/* メイン画像 */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <Image
                src={product.image.url}
                alt={product.image.alt}
                fill
                className="object-cover"
                priority
              />

              {/* セール表示 */}
              {product.originalPrice && (
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    セール中
                  </span>
                </div>
              )}

              {/* アクションボタン */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white p-0"
                >
                  <Share2 className="w-5 h-5 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>

          {/* 商品情報セクション */}
          <div className="space-y-6">
            {/* 基本情報 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-sm text-gray-500 bg-blue-100  px-3 py-1 rounded-full">
                  {product.label}
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            {/* 価格 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* 数量選択 */}
            <div className="space-y-4">
              <span className="text-sm font-medium text-gray-900">数量</span>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(false)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(true)}
                    className="w-10 h-10 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  小計: {formatPrice(product.price * quantity)}
                </div>
              </div>
            </div>

            {/* カートに追加ボタン */}
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full h-12 text-base font-medium transition-all duration-300 ${
                justAdded
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
            >
              {isAdding ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  追加中...
                </div>
              ) : justAdded ? (
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  カートに追加済み
                </div>
              ) : (
                <div className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  カートに追加
                </div>
              )}
            </Button>

            {/* 商品詳細情報 */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  商品詳細
                </h3>
                <div className="space-y-3">
                  {productDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-sm text-gray-600">
                        {detail.label}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 配送・返品情報 */}
            {/* <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  配送・返品について
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">送料無料</p>
                      <p>2-3営業日でお届け</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">
                        30日間返品保証
                      </p>
                      <p>未開封品に限り返品可能</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">品質保証</p>
                      <p>厳選された素材のみを使用</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>

        {/* 関連商品セクション */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">関連商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(
                (p) => p.id !== product.id && p.category === product.category
              )
              .slice(0, 4)
              .map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => router.push(`/product/${relatedProduct.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <Image
                        src={relatedProduct.image.url}
                        alt={relatedProduct.image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
