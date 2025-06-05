"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                プライバシーポリシー
              </h1>
              <p className="text-sm text-gray-600 mt-1">天地星空</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              制定日：2025年1月1日
              <br />
              最終更新日：2025年6月4日
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                1. 基本方針
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                株式会社近藤薬局（以下「当社」といいます）は、お客様の個人情報の保護について、社会的責務を十分に認識し、本ウェブサイト上で提供されるサービスの円滑な運営に必要な範囲で個人情報を収集・利用し、その保護について適切な措置を講じます。
              </p>
              <p className="text-gray-700 leading-relaxed">
                当社は、個人情報保護法をはじめとする個人情報保護に関する法令およびその他の規範を遵守し、個人情報の適正な取り扱いを実施いたします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                2. 個人情報の定義
              </h2>
              <p className="text-gray-700 leading-relaxed">
                個人情報とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                3. 個人情報の収集について
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                当社は、以下の場合に個人情報を収集することがあります
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>お問い合わせフォームへの入力時</li>
                <li>商品の購入・注文時</li>
                <li>キャンペーンやイベントへの参加時</li>
                <li>展示会での購入時</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                4. 個人情報の利用目的
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                当社は、個人情報を以下の目的で利用いたします
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>商品の発送および代金の請求</li>
                <li>お客様からのお問い合わせに対する回答</li>
                <li>メールマガジンの配信</li>
                <li>キャンペーンやイベントのご案内</li>
                <li>商品開発やサービス向上のための統計資料作成</li>
                <li>その他、お客様にとって有益と思われる情報の提供</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                5. 個人情報の第三者提供
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                当社は、以下の場合を除き、あらかじめお客様の同意を得ることなく、第三者に個人情報を提供することはありません
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                <li>
                  公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合
                </li>
                <li>
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                6. 個人情報の開示・訂正・削除
              </h2>
              <p className="text-gray-700 leading-relaxed">
                お客様ご本人から個人情報の開示・訂正・削除等をご希望される場合には、ご本人であることを確認の上、対応させていただきます。お問い合わせ窓口までご連絡ください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                7. Cookie（クッキー）について
              </h2>
              <p className="text-gray-700 leading-relaxed">
                当社のウェブサイトでは、お客様により良いサービスを提供するため、Cookieを使用することがあります。Cookieの使用を希望されない場合は、ブラウザの設定でCookieを無効にすることが可能です。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                8. 個人情報の管理
              </h2>
              <p className="text-gray-700 leading-relaxed">
                当社は、個人情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。また、個人情報を取り扱う従業者や委託先に対して、必要かつ適切な監督を行います。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                9. プライバシーポリシーの変更
              </h2>
              <p className="text-gray-700 leading-relaxed">
                当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当社ウェブサイトに掲載したときから効力を生じるものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                10. お問い合わせ窓口
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>株式会社 近藤薬局</strong>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  〒417-0051 静岡県富士市吉原２丁目８−２１
                  <br />
                  TEL: 0545-52-0011
                  <br />
                  受付時間：平日 9:00-17:00（土日祝日を除く）
                </p>
              </div>
            </section>

            <div className="text-right text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200">
              株式会社 近藤薬局
              <br />
              天地星空 - AMACHIHOSHISORA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
