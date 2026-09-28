// src/app/[locale]/(top-page)/faq/page.tsx - よくある質問
// 質問データはサーバーで組み立て、絞り込みと開閉だけを Client（FaqList）に任せる
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { FaqList, type FaqItem } from "@/components/faq/FaqList";
import { localizedAlternates } from "@/lib/site";

interface FaqPageProps {
  params: Promise<{ locale: string }>;
}

// 質問（messages の qa.questions の順）ごとのカテゴリー
const CATEGORY_BY_QUESTION = [
  "商品について", // Q1: 天地星空の特徴は何ですか？
  "商品について", // Q2: 720ml・500ml・180mlはどう違いますか？
  "製造・原料", // Q3: 使用している米について教えてください
  "製造・原料", // Q4: 富士の伏流水とは何ですか？
  "購入・配送", // Q5: 配送はどのように行われますか？
  "飲み方・保存", // Q6: おすすめの飲み方を教えてください
  "飲み方・保存", // Q7: 保存方法について教えてください
  "商品について", // Q8: アルコール度数はどのくらいですか？
];

export async function generateMetadata({
  params,
}: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "qa" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: localizedAlternates(locale, "/faq"),
  };
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("qa");
  const questions = t.raw("questions") as { question: string; answer: string }[];
  const categoryLabels = t.raw("categories") as Record<string, string>;

  const items: FaqItem[] = questions.map((item, index) => ({
    id: index + 1,
    category: CATEGORY_BY_QUESTION[index] ?? CATEGORY_BY_QUESTION[0],
    question: item.question,
    answer: item.answer,
  }));
  const usedCategories = [...new Set(items.map((item) => item.category))];

  return (
    <div className="bg-white pb-28 sm:pb-40">
      <PageHeader
        title={t("title")}
        width="narrow"
        lead={
          <>
            {t("subtitle")}
            <br />
            {t("subtitleNote")}
          </>
        }
      />

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <FaqList
          items={items}
          categories={[
            { key: "all", label: t("all") },
            ...usedCategories.map((key) => ({
              key,
              label: categoryLabels[key] ?? key,
            })),
          ]}
        />
      </div>
    </div>
  );
}
