// src/app/[locale]/(top-page)/terms/page.tsx
// 本文はすべてサーバーで描画する（戻るボタンだけ Client。LegalHeader 内の BackButton）
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalHeader } from "@/components/shared/LegalHeader";
import { localizedAlternates } from "@/lib/site";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "termsOfService" });
  return {
    title: t("title"),
    alternates: localizedAlternates(locale, "/terms"),
  };
}

const TermsOfService = async ({ params }: TermsPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("termsOfService");
  const tCommon = await getTranslations("common");

  return (
    <div className="bg-white">
      {/* Content */}
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-28 sm:px-8 sm:pt-40 sm:pb-40">
        <div className="text-[15px]">
          <LegalHeader
            title={t("title")}
            subtitle={t("subtitle")}
            backLabel={tCommon("back")}
          />

          <div className="max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              {t("enacted")}
              <br />
              {t("lastUpdated")}
            </p>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("article1.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("article1.text1")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("article1.text2")}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("article2.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("article2.intro")}
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                {(t.raw("article2.definitions") as string[]).map(
                  (definition, index) => (
                    <li key={index}>{definition}</li>
                  )
                )}
              </ol>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("article3.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("article3.intro")}
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                {(t.raw("article3.conditions") as string[]).map(
                  (condition, index) => (
                    <li key={index}>{condition}</li>
                  )
                )}
              </ol>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("article4.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("article4.intro")}
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                {(t.raw("article4.prohibitedActs") as string[]).map(
                  (act, index) => (
                    <li key={index}>{act}</li>
                  )
                )}
              </ol>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("article5.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("article5.intro")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                {(t.raw("article5.restrictions") as string[]).map(
                  (restriction, index) => (
                    <li key={index}>{restriction}</li>
                  )
                )}
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("article6.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("article6.text1")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("article6.text2")}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("article7.title")}
              </h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-3 ml-4">
                {(t.raw("article7.disclaimers") as string[]).map(
                  (disclaimer, index) => (
                    <li key={index}>{disclaimer}</li>
                  )
                )}
              </ol>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("article8.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("article8.text")}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("article9.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("article9.text")}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("article10.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("article10.text1")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("article10.text2")}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("article11.title")}
              </h2>
              <div className="bg-mist p-6">
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>{t("contact.company")}</strong>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t("contact.address")}
                  <br />
                  {t("contact.phone")}
                  <br />
                  {t("contact.hours")}
                </p>
              </div>
            </section>

            <div className="text-right text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200">
              {t("companyFooter")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
