"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Header } from "@/components/Header";
import { useTranslations } from "next-intl";

// 型定義
interface QAItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

// 翻訳データの型定義
interface TranslationQAItem {
  question: string;
  answer: string;
}

type GroupedQA = Record<string, QAItem[]>;
type OpenItems = Record<number, boolean>;

const QAPage: React.FC = () => {
  const t = useTranslations("qa");
  const [openItems, setOpenItems] = useState<OpenItems>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // 質問内容に基づいた適切なカテゴリマッピング
  const categoryMapping = [
    "商品について", // Q1: 天地星空の特徴は何ですか？
    "商品について", // Q2: 720mlと500mlの違いは何ですか？
    "商品について", // Q3: 抹茶も販売されているのですか？
    "製造・原料", // Q4: 使用している米について教えてください
    "製造・原料", // Q5: 富士の伏流水とは何ですか？
    "購入・配送", // Q6: 配送はどのように行われますか？
    "飲み方・保存", // Q7: おすすめの飲み方を教えてください
    "飲み方・保存", // Q8: 保存方法について教えてください
    "商品について", // Q9: アルコール度数はどのくらいですか？
  ];

  // Q&Aデータを翻訳から取得
  const qaData: QAItem[] = (t.raw("questions") as TranslationQAItem[]).map(
    (item: TranslationQAItem, index: number) => ({
      id: index + 1,
      category: categoryMapping[index] || "商品について", // 適切なカテゴリを割り当て
      question: item.question,
      answer: item.answer,
    })
  );

  // カテゴリーごとにデータをグループ化
  const groupedQA: GroupedQA = qaData.reduce((acc: GroupedQA, item: QAItem) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

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

  const getCategoryLabel = (category: string): string => {
    if (category === "all") return t("all");
    return t(`categories.${category}` as Parameters<typeof t>[0]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
            <br />
            {t("subtitleNote")}
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
                  {getCategoryLabel(category)}
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
                          {getCategoryLabel(item.category)}
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
