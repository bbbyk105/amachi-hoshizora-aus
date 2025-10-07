// src/app/[locale]/cart/page.tsx

"use client";

import { useCart } from "@/store/cart";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  CreditCard,
  Package,
  AlertTriangle,
  Store,
  Truck,
  ShieldAlert,
} from "lucide-react";
import { formatPrice } from "@/data";
import { useTranslations } from "next-intl";

// 支払い方法の型定義
type PaymentMethod = "in-store" | "online";

// 送料の定数
const SHIPPING_COST = 50; // AUD
const FREE_SHIPPING_THRESHOLD = 600; // AUD

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalQuantity,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("in-store");

  // 年齢確認用のstate
  const [showAgeVerification, setShowAgeVerification] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [ageCheckboxChecked, setAgeCheckboxChecked] = useState(false);

  // 翻訳フック
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");

  // 送料計算
  const calculateShipping = (): number => {
    if (paymentMethod === "in-store") {
      return 0; // 対面決済は送料無料
    }
    const subtotal = getTotalPrice();
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  };

  // 合計金額計算
  const calculateTotal = (): number => {
    return getTotalPrice() + calculateShipping();
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      setItemToDelete(productId);
      setShowDeleteConfirm(true);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: number) => {
    setItemToDelete(productId);
    setShowDeleteConfirm(true);
  };

  const handleClearCart = () => {
    setShowClearConfirm(true);
  };

  const confirmDeleteItem = () => {
    if (itemToDelete !== null) {
      removeFromCart(itemToDelete);
      setItemToDelete(null);
    }
    setShowDeleteConfirm(false);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setShowClearConfirm(false);
    setItemToDelete(null);
  };

  // 年齢確認を開始
  const initiateCheckout = () => {
    if (!ageVerified) {
      setShowAgeVerification(true);
    } else {
      proceedToCheckout();
    }
  };

  // 年齢確認を完了して決済へ
  const confirmAgeVerification = () => {
    if (ageCheckboxChecked) {
      setAgeVerified(true);
      setShowAgeVerification(false);
      proceedToCheckout();
    }
  };

  // 年齢確認キャンセル
  const cancelAgeVerification = () => {
    setShowAgeVerification(false);
    setAgeCheckboxChecked(false);
  };

  // 実際の決済処理
  const proceedToCheckout = async () => {
    setLoading(true);
    try {
      const items = cartItems.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          paymentMethod,
          shippingCost: calculateShipping(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t("errors.checkoutFailed"));
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        error instanceof Error ? error.message : t("errors.checkoutFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  const isCartEmpty = cartItems.length === 0;
  const shipping = calculateShipping();
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ヘッダーセクション */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex items-center gap-2 sm:gap-4 mb-4">
            <Link
              href="/products"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{t("backToProducts")}</span>
              <span className="sm:hidden">{t("backToProductsShort")}</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900">
              {t("title")}
            </h1>
            {!isCartEmpty && (
              <span className="bg-gray-900 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                {t("itemsCount", { count: getTotalQuantity() })}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {isCartEmpty ? (
          /* 空のカート */
          <Card className="text-center py-8 sm:py-12 lg:py-16">
            <CardContent className="space-y-4 sm:space-y-6 px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-2">
                  {t("empty.title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">
                  {t("empty.description")}
                </p>
                <Link href="/products">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white w-full sm:w-auto">
                    {t("empty.viewProducts")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* カート内商品一覧 */}
            <div className="xl:col-span-2 xl:order-1 space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-medium text-gray-900">
                  {t("items.title")}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 self-start sm:self-auto"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t("items.removeAll")}
                </Button>
              </div>

              {cartItems.map((item) => (
                <Card key={item.product.id} className="overflow-hidden">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {/* 商品画像 */}
                      <div className="relative w-20 h-20 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image.url}
                          alt={item.product.image.alt}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* 商品情報 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                          <div className="flex-1 min-w-0 pr-2">
                            <h3 className="font-medium text-gray-900 line-clamp-2 text-sm sm:text-base">
                              {item.product.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                              {item.product.category}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-red-600 p-1 flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                          {/* 数量コントロール */}
                          <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <div className="w-10 sm:w-12 text-center text-sm font-medium">
                              {item.quantity}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>

                          {/* 価格 */}
                          <div className="text-left sm:text-right">
                            <div className="font-medium text-gray-900 text-sm sm:text-base">
                              {formatPrice(item.product.price * item.quantity)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-xs sm:text-sm text-gray-500">
                                {formatPrice(item.product.price)} ×{" "}
                                {item.quantity}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 注文サマリー */}
            <div className="xl:col-span-1 xl:order-2">
              <Card className="xl:sticky xl:top-24">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                    {t("summary.title")}
                  </h3>

                  {/* 支払い方法選択 */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t("paymentMethod.title")}
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setPaymentMethod("in-store")}
                        className={`w-full flex items-center p-3 border-2 rounded-lg transition-colors ${
                          paymentMethod === "in-store"
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Store className="w-5 h-5 mr-3 text-gray-600" />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">
                            {t("paymentMethod.inStore")}
                          </div>
                          <div className="text-xs text-gray-500">
                            {t("paymentMethod.inStoreDesc")}
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setPaymentMethod("online")}
                        className={`w-full flex items-center p-3 border-2 rounded-lg transition-colors ${
                          paymentMethod === "online"
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Truck className="w-5 h-5 mr-3 text-gray-600" />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">
                            {t("paymentMethod.online")}
                          </div>
                          <div className="text-xs text-gray-500">
                            {t("paymentMethod.onlineDesc")}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {t("summary.itemCount")}
                      </span>
                      <span>
                        {t("itemsCount", { count: getTotalQuantity() })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {t("summary.subtotal")}
                      </span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {t("summary.shipping")}
                      </span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0
                          ? t("summary.shippingFree")
                          : formatPrice(shipping)}
                      </span>
                    </div>

                    {/* 送料無料まであといくら表示 */}
                    {paymentMethod === "online" && shipping > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-2">
                        <p className="text-xs text-blue-800">
                          {t("summary2.freeShippingRemaining", {
                            amount: formatPrice(
                              FREE_SHIPPING_THRESHOLD - getTotalPrice()
                            ),
                          })}
                        </p>
                      </div>
                    )}

                    <div className="border-t pt-2 sm:pt-3">
                      <div className="flex justify-between font-medium text-base sm:text-lg">
                        <span>{t("summary.total")}</span>
                        <span className="text-gray-900">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={initiateCheckout}
                    disabled={loading || isCartEmpty}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white h-10 sm:h-12 text-sm sm:text-base disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {tCommon("processing")}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {t("summary.checkout")}
                      </div>
                    )}
                  </Button>

                  <div className="mt-3 sm:mt-4 text-center">
                    <Link
                      href="/products"
                      className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                      {t("summary.continueShopping")}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* 年齢確認ダイアログ */}
      {showAgeVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm sm:max-w-md mx-4">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900">
                  {t("ageVerification.title")}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-gray-600 mb-6">
                {t("ageVerification.message")}
              </p>

              {/* 年齢確認チェックボックス */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={ageCheckboxChecked}
                    onChange={(e) => setAgeCheckboxChecked(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900 select-none">
                    {t("ageVerification.checkbox")}
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={cancelAgeVerification}
                  className="w-full sm:w-1/2 order-2 sm:order-1"
                >
                  {tCommon("cancel")}
                </Button>
                <Button
                  onClick={confirmAgeVerification}
                  disabled={!ageCheckboxChecked}
                  className="w-full sm:w-1/2 bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                >
                  {t("ageVerification.confirm")}
                </Button>
              </div>

              {!ageCheckboxChecked && (
                <p className="text-xs text-red-600 mt-3 text-center">
                  {t("ageVerification.required")}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* 削除確認ダイアログ */}
      {(showDeleteConfirm || showClearConfirm) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm sm:max-w-md mx-4">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  {showClearConfirm
                    ? t("confirmDialog.clearCart.title")
                    : t("confirmDialog.deleteItem.title")}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {showClearConfirm
                  ? t("confirmDialog.clearCart.message")
                  : t("confirmDialog.deleteItem.message")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <Button
                  variant="outline"
                  onClick={cancelDelete}
                  className="px-4 py-2 w-full sm:w-auto order-2 sm:order-1"
                >
                  {tCommon("cancel")}
                </Button>
                <Button
                  onClick={
                    showClearConfirm ? confirmClearCart : confirmDeleteItem
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 w-full sm:w-auto order-1 sm:order-2"
                >
                  {showClearConfirm
                    ? t("confirmDialog.deleteAll")
                    : tCommon("delete")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
