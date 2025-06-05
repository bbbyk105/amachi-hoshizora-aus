"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CancelPage() {
  const t = useTranslations("cancel");

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <CardContent className="p-8 space-y-6">
            {/* キャンセルアイコン */}
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>

            {/* メッセージ */}
            <div className="space-y-3">
              <h1 className="text-2xl font-medium text-gray-900">
                {t("title")}
              </h1>
              <p className="text-gray-600">{t("message")}</p>
            </div>

            {/* アクションボタン */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/cart">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white w-full sm:w-auto">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t("backToCart")}
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="w-full sm:w-auto">
                  {t("viewProducts")}
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto">
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
