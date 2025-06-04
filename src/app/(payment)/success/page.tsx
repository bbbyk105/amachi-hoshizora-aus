"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, ArrowLeft } from "lucide-react";
import { useCart } from "@/store/cart";

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
                ご注文ありがとうございます！
              </h1>
              <p className="text-gray-600">
                決済が正常に完了しました。注文確認メールをお送りいたします。
              </p>
            </div>

            {/* セッション情報 */}
            {loading ? (
              <div className="text-sm text-gray-500">
                注文情報を読み込み中...
              </div>
            ) : sessionData ? (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h3 className="font-medium text-gray-900">注文詳細</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>注文ID: {sessionData.id}</p>
                  <p>
                    支払い状況:{" "}
                    {sessionData.payment_status === "paid"
                      ? "決済完了"
                      : "決済中"}
                  </p>
                  {sessionData.amount_total && (
                    <p>
                      合計金額: ${(sessionData.amount_total / 100).toFixed(2)}{" "}
                      {sessionData.currency?.toUpperCase()}
                    </p>
                  )}
                  {sessionData.customer_details?.email && (
                    <p>メールアドレス: {sessionData.customer_details.email}</p>
                  )}
                </div>
              </div>
            ) : sessionId ? (
              <div className="text-sm text-gray-500">
                注文情報の取得に失敗しました
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                セッションIDが見つかりません
              </div>
            )}

            {/* アクションボタン */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/product">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Package className="w-4 h-4 mr-2" />
                  商品一覧に戻る
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  ホームに戻る
                </Button>
              </Link>
            </div>

            {/* 追加情報 */}
            <div className="text-xs text-gray-500 pt-4 border-t">
              <p>
                ご質問がございましたら、お気軽にお問い合わせください。
                商品の発送につきましては、別途ご連絡いたします。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// メインのページコンポーネント（Suspenseで囲む）
export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">読み込み中...</p>
          </div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}
