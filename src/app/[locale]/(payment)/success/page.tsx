"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, ArrowLeft } from "lucide-react";
import { useCart } from "@/store/cart";
import { useTranslations } from "next-intl";

// ✅ Stripeセッションデータの型定義
interface StripeSessionData {
  id: string;
  payment_status: string;
  amount_total: number | null;
  currency: string | null;
  customer_details: {
    email: string | null;
    name: string | null;
  } | null;
}

// useSearchParams()を使用するコンポーネント
function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionData, setSessionData] = useState<StripeSessionData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  // 翻訳フック
  const t = useTranslations("success");

  // useRefで一度だけの実行を保証
  const hasInitialized = useRef(false);

  const fetchSessionData = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/checkout?session_id=${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setSessionData(data.session);
      }
    } catch (error) {
      console.error("Failed to fetch session data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 初期化が済んでいる場合は何もしない
    if (hasInitialized.current) return;

    // 初期化フラグを立てる
    hasInitialized.current = true;

    // カートをクリア（一度だけ）
    clearCart();

    // セッション情報を取得
    if (sessionId) {
      fetchSessionData(sessionId);
    } else {
      setLoading(false);
    }
  }, [sessionId, clearCart]); // 必要な依存関係を含める

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <CardContent className="p-8 space-y-6">
            {/* 成功アイコン */}
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            {/* メッセージ */}
            <div className="space-y-3">
              <h1 className="text-2xl font-medium text-gray-900">
                {t("title")}
              </h1>
              <p className="text-gray-600">{t("message")}</p>
            </div>

            {/* セッション情報 */}
            {loading ? (
              <div className="text-sm text-gray-500">
                {t("loadingOrderInfo")}
              </div>
            ) : sessionData ? (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h3 className="font-medium text-gray-900">
                  {t("orderDetails")}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    {t("orderId")}: {sessionData.id}
                  </p>
                  <p>
                    {t("paymentStatus")}:{" "}
                    {sessionData.payment_status === "paid"
                      ? t("paymentCompleted")
                      : t("paymentProcessing")}
                  </p>
                  {sessionData.amount_total && (
                    <p>
                      {t("totalAmount")}: $
                      {(sessionData.amount_total / 100).toFixed(2)}{" "}
                      {sessionData.currency?.toUpperCase()}
                    </p>
                  )}
                  {sessionData.customer_details?.email && (
                    <p>
                      {t("email")}: {sessionData.customer_details.email}
                    </p>
                  )}
                </div>
              </div>
            ) : sessionId ? (
              <div className="text-sm text-gray-500">
                {t("orderInfoFailed")}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                {t("sessionNotFound")}
              </div>
            )}

            {/* アクションボタン */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Package className="w-4 h-4 mr-2" />
                  {t("backToProducts")}
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("backToHome")}
                </Button>
              </Link>
            </div>

            {/* 追加情報 */}
            <div className="text-xs text-gray-500 pt-4 border-t">
              <p>{t("additionalInfo")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// メインのページコンポーネント（Suspenseで囲む）
export default function SuccessPage() {
  const tCommon = useTranslations("common");

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{tCommon("loading")}</p>
          </div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}
