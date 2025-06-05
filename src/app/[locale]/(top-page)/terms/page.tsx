"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
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
              <h1 className="text-2xl font-bold text-gray-900">利用規約</h1>
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
                第1条（適用）
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                本規約は、株式会社近藤薬局（以下「当社」といいます）が運営する「天地星空」ウェブサイト（以下「本サイト」といいます）の利用に関して、利用者と当社との間の権利義務関係を定めることを目的とし、利用者と当社との間の本サービスの利用に関わる一切の関係に適用されます。
              </p>
              <p className="text-gray-700 leading-relaxed">
                利用者が本サイトを利用した場合、本規約に同意したものとみなします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                第2条（定義）
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                本規約において使用する用語の定義は、次の各号のとおりとします。
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  「本サービス」とは、当社が提供する「天地星空」に関する一切のサービスをいいます。
                </li>
                <li>
                  「利用者」とは、本サービスを利用する全ての方をいいます。
                </li>
                <li>
                  「知的財産権」とは、著作権、特許権、実用新案権、商標権、意匠権その他の知的財産権（それらの権利を取得し、またはそれらの権利につき登録等を出願する権利を含みます。）をいいます。
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                第3条（利用条件）
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                本サイトの利用にあたり、利用者は以下の条件を満たす必要があります：
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                <li>満20歳以上であること（酒類に関する情報を含むため）</li>
                <li>本規約の内容を理解し、これに同意すること</li>
                <li>反社会的勢力でないこと</li>
                <li>日本の法律に従うこと</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                第4条（禁止事項）
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                利用者は、本サービスの利用にあたり、以下の行為をしてはなりません：
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>
                  当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                </li>
                <li>当社のサービスの運営を妨害するおそれのある行為</li>
                <li>他の利用者に関する個人情報等を収集または蓄積する行為</li>
                <li>他の利用者に成りすます行為</li>
                <li>
                  当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
                </li>
                <li>その他、当社が不適切と判断する行為</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                第5条（年齢制限について）
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                本サイトでは酒類に関する情報を取り扱っております。酒類の購入および酒類に関する情報の閲覧は、満20歳以上の方に限定されます。
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>満20歳未満の方は、本サイトをご利用いただけません</li>
                <li>
                  妊娠中や授乳期の飲酒は、胎児・乳児の発育に悪影響を与えるおそれがあります
                </li>
                <li>飲酒運転は法律で禁止されています</li>
                <li>適量を心がけ、お酒は楽しく飲みましょう</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                第6条（知的財産権）
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                本サイトに含まれるコンテンツ（文章、画像、動画、音声、デザイン等）に関する知的財産権は、当社または当社にその利用を許諾した権利者に帰属します。
              </p>
              <p className="text-gray-700 leading-relaxed">
                利用者は、当社の事前の書面による許可なく、本サイトのコンテンツを複製、転用、販売、その他の方法で利用することはできません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                第7条（免責事項）
              </h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-3 ml-4">
                <li>
                  当社は、本サービスの内容変更、中断、終了によって生じるいかなる損害についても、一切の責任を負いません。
                </li>
                <li>
                  当社は、利用者と第三者との間で生じた紛争について一切の責任を負いません。
                </li>
                <li>
                  当社は、本サイトで提供する情報について、その正確性、完全性、有用性等について、いかなる保証もいたしません。
                </li>
                <li>
                  当社は、利用者が本サービスを利用することによって生じた損害について、当社の故意または重過失による場合を除き、一切の責任を負いません。
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                第8条（サービス内容の変更等）
              </h2>
              <p className="text-gray-700 leading-relaxed">
                当社は、利用者に通知することなく、本サービスの内容を変更、追加または廃止することがあり、利用者はこれを承諾するものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                第9条（利用規約の変更）
              </h2>
              <p className="text-gray-700 leading-relaxed">
                当社は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、本サイト上に表示された時点で効力を生じるものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                第10条（準拠法・裁判管轄）
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                本規約の解釈にあたっては、日本法を準拠法とします。
              </p>
              <p className="text-gray-700 leading-relaxed">
                本サービスに関して紛争が生じた場合には、静岡地方裁判所を第一審の専属的合意管轄とします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                第11条（お問い合わせ）
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>株式会社近藤薬局</strong>
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

export default TermsOfService;
