"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Header } from "@/components/Header";

// 型定義
interface QAItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

type GroupedQA = Record<string, QAItem[]>;
type OpenItems = Record<number, boolean>;

// Q&Aデータ
const qaData: QAItem[] = [
  {
    id: 1,
    category: "商品について",
    question: "天地星空の特徴は何ですか？",
    answer:
      "天地星空は富士山の伏流水と山田錦100%を使用した純米大吟醸です。三百年の歴史を持つ蔵元が、伝統的な醸造技術と富士の自然の恵みを活かして醸造しています。米と水だけで醸した真の日本酒として、世界に挑戦する意志を込めて作られています。",
  },
  {
    id: 2,
    category: "商品について",
    question: "720mlと500mlの違いは何ですか？",
    answer:
      "どちらも同じ天地星空 純米大吟醸で、富士の伏流水と山田錦100%を使用しています。容量の違いのみで、720ml（¥8,800）は贈答用やじっくり楽しみたい方に、500ml（¥6,600）は初回購入や少人数で楽しみたい方におすすめです。",
  },
  {
    id: 3,
    category: "商品について",
    question: "抹茶も販売されているのですか？",
    answer:
      "はい、完全無農薬の静岡県産抹茶（20g ¥5,500）も販売しております。日本酒と同様に、自然の恵みを大切にした高品質な商品として提供しています。日本酒との組み合わせもお楽しみいただけます。",
  },
  {
    id: 4,
    category: "製造・原料",
    question: "使用している米について教えてください",
    answer:
      "天地星空には酒造好適米の最高峰である山田錦を100%使用しています。山田錦は大粒で心白が大きく、雑味の少ない上品な日本酒を醸すのに最適な米として知られており、純米大吟醸の品質を支える重要な要素です。",
  },
  {
    id: 5,
    category: "製造・原料",
    question: "富士の伏流水とは何ですか？",
    answer:
      "富士山に降った雨や雪が長い年月をかけて地下に浸透し、火山岩層でろ過された清らかな地下水です。ミネラルバランスが良く、日本酒醸造に最適な軟水で、天地星空の味わいの基盤となっています。",
  },
  {
    id: 7,
    category: "購入・配送",
    question: "配送はどのように行われますか？",
    answer:
      "商品の品質を保つため、適切な温度管理の下で配送いたします。配送日時のご指定も可能です。ギフト包装も承っておりますので、贈り物としてもご利用いただけます。",
  },
  {
    id: 8,
    category: "飲み方・保存",
    question: "おすすめの飲み方を教えてください",
    answer:
      "冷やしてお飲みいただくのがおすすめです（10-15℃程度）。純米大吟醸の繊細な香りと味わいを最大限にお楽しみいただけます。また、ぬる燗（40℃程度）でも違った味わいをお楽しみいただけます。",
  },
  {
    id: 9,
    category: "飲み方・保存",
    question: "保存方法について教えてください",
    answer:
      "直射日光を避け、涼しい場所で保存してください。開封後は冷蔵庫で保存し、なるべく早めにお飲みください。適切な保存により、天地星空本来の味わいを長くお楽しみいただけます。",
  },
  {
    id: 10,
    category: "商品について",
    question: "アルコール度数はどのくらいですか？",
    answer:
      "天地星空のアルコール度数は16度です。純米大吟醸として標準的な度数で、すっきりとした飲み口でありながら、しっかりとした味わいをお楽しみいただけます。",
  },
];

// カテゴリーごとにデータをグループ化
const groupedQA: GroupedQA = qaData.reduce((acc: GroupedQA, item: QAItem) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item);
  return acc;
}, {});

const QAPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<OpenItems>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleItem = (id: number): void => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = ["all", ...Object.keys(groupedQA)];

  const filteredQA =
    selectedCategory === "all"
      ? qaData
      : qaData.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            よくあるご質問
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            天地星空について、お客様からよくいただくご質問をまとめました。
            <br />
            こちらで解決しないご質問は、お気軽にお問い合わせください。
          </p>
        </div>
      </section>

      {/* Main Q&A Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* カテゴリーフィルター */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm rounded-full border transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white border-gray-900 shadow-lg"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md"
                  }`}
                >
                  {category === "all" ? "すべて" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Q&Aリスト */}
          <div className="space-y-4 sm:space-y-6">
            {filteredQA.map((item, index) => (
              <Card
                key={item.id}
                className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-blue-900 bg-blue-50 rounded-full w-6 h-6 flex items-center justify-center">
                          Q
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                        {item.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      {openItems[item.id] ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                      )}
                    </div>
                  </button>

                  {openItems[item.id] && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100 bg-gray-50/30">
                      <div className="pt-4 sm:pt-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <span className="text-sm sm:text-base font-semibold text-green-700 bg-green-50 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                            A
                          </span>
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QAPage;
