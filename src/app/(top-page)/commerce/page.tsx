"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CommerceLaw = () => {
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
                特定商取引法に基づく表記
              </h1>
              <p className="text-sm text-gray-600 mt-1">天地星空</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              特定商取引法に基づき、以下の通り表記いたします。
              <br />
              最終更新日：2025年6月4日
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  販売業者
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    富士錦酒造株式会社
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  代表責任者
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    代表取締役 [代表者名]
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  所在地
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    〒417-0051
                    <br />
                    静岡県富士市吉原２丁目８−２１
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  連絡先
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    TEL: 0545-52-0011
                    <br />
                    受付時間：平日 9:00-17:00（土日祝日を除く）
                    <br />
                    メールアドレス：[メールアドレス]
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  販売価格
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    各商品ページに記載された価格（税込価格）
                  </p>
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>主要商品価格：</strong>
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>天地星空 純米大吟醸 720ml：¥8,800（税込）</li>
                      <li>天地星空 純米大吟醸 500ml：¥6,600（税込）</li>
                      <li>抹茶 20g：¥5,500（税込）</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  商品代金以外の必要料金
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>送料：</strong>
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                      <li>全国一律 ¥1,100（税込）</li>
                      <li>¥10,000以上のご購入で送料無料</li>
                      <li>クール便（冷蔵）：追加¥330（税込）</li>
                    </ul>
                    <p className="mb-3">
                      <strong>代金引換手数料：</strong>
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                      <li>¥330（税込）</li>
                    </ul>
                    <p className="mb-3">
                      <strong>銀行振込手数料：</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>お客様負担</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  支払方法
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        クレジットカード（VISA、MasterCard、JCB、American
                        Express、Diners Club）
                      </li>
                      <li>代金引換（現金のみ）</li>
                      <li>銀行振込（前払い）</li>
                      <li>PayPay</li>
                      <li>Amazon Pay</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  支払時期
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        <strong>クレジットカード：</strong>ご注文確定時
                      </li>
                      <li>
                        <strong>代金引換：</strong>商品お届け時
                      </li>
                      <li>
                        <strong>銀行振込：</strong>ご注文後7日以内
                      </li>
                      <li>
                        <strong>PayPay・Amazon Pay：</strong>ご注文確定時
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  商品の引渡し時期
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        <strong>在庫商品：</strong>
                        ご注文確認後、3-5営業日以内に発送
                      </li>
                      <li>
                        <strong>予約商品：</strong>商品ページに記載の発送予定日
                      </li>
                      <li>
                        <strong>銀行振込：</strong>
                        ご入金確認後、3-5営業日以内に発送
                      </li>
                    </ul>
                    <p className="mt-4 text-sm text-gray-600">
                      ※土日祝日、年末年始、ゴールデンウィーク、お盆期間は除きます
                      <br />
                      ※天候や交通事情により遅延する場合があります
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  返品・交換について
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      <strong>返品・交換をお受けできる場合：</strong>
                    </p>
                    <ul className="list-disc list-inside mb-6 space-y-2">
                      <li>商品に明らかな不備・破損があった場合</li>
                      <li>ご注文と異なる商品が届いた場合</li>
                      <li>商品到着後7日以内にご連絡をいただいた場合</li>
                    </ul>

                    <p className="mb-4">
                      <strong>返品・交換をお受けできない場合：</strong>
                    </p>
                    <ul className="list-disc list-inside mb-6 space-y-2">
                      <li>お客様のご都合による返品（食品のため）</li>
                      <li>商品到着後8日以上経過した場合</li>
                      <li>開封・使用済みの商品</li>
                      <li>お客様の責任で汚損・破損した商品</li>
                    </ul>

                    <p className="mb-4">
                      <strong>返品・交換の送料：</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>当社の責任による場合：当社負担</li>
                      <li>お客様のご都合による場合：お客様負担</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  酒類販売について
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        <strong>酒類販売業免許：</strong>静岡県富士市第〇〇号
                      </li>
                      <li>
                        <strong>販売条件：</strong>満20歳以上の方のみ
                      </li>
                      <li>
                        <strong>注意事項：</strong>
                      </li>
                      <li className="ml-4">
                        妊娠中や授乳期の飲酒は、胎児・乳児の発育に悪影響を与えるおそれがあります
                      </li>
                      <li className="ml-4">飲酒運転は法律で禁止されています</li>
                      <li className="ml-4">
                        適量を心がけ、お酒は楽しく飲みましょう
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  個人情報の取扱い
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    お客様からお預かりした個人情報は、商品の発送、ご連絡、当社からのご案内のみに使用し、第三者に譲渡・提供することはありません。詳しくは「プライバシーポリシー」をご確認ください。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  その他
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        商品の色合いは、ご利用のモニターにより実際の商品と異なって見える場合があります
                      </li>
                      <li>
                        商品の仕様・価格は予告なく変更される場合があります
                      </li>
                      <li>
                        システムメンテナンス等により、一時的にサービスを停止する場合があります
                      </li>
                      <li>
                        本表記に記載のない事項については、消費者契約法その他の法令に従います
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <div className="text-right text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200">
              富士錦酒造株式会社
              <br />
              天地星空 - AMACHIHOSHISORA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommerceLaw;
