// src/app/[locale]/(top-page)/privacy/page.tsx
// 本文はすべてサーバーで描画する（戻るボタンだけ Client。LegalHeader 内の BackButton）
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalHeader } from "@/components/shared/LegalHeader";
import { localizedAlternates } from "@/lib/site";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });
  return {
    title: t("title"),
    alternates: localizedAlternates(locale, "/privacy"),
  };
}

const Privacy = async ({ params }: PrivacyPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacyPolicy");
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
                {t("basicPolicy")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("basicPolicyText1")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("basicPolicyText2")}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("definition")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("definitionText")}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("collection")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("collectionText")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                {t.raw("collectionList").map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("usage")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("usageText")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                {t.raw("usageList").map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("thirdParty")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("thirdPartyText")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                {t.raw("thirdPartyList").map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("disclosure")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("disclosureText")}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("cookies")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("cookiesText")}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("management")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("managementText")}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("changes")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("changesText")}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-serif text-xl text-ink">
                {t("contact")}
              </h2>
              <div className="bg-mist p-6">
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>{t("contactCompany")}</strong>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t("contactAddress")}
                  <br />
                  {t("contactPhone")}
                  <br />
                  {t("contactHours")}
                </p>
              </div>
            </section>

            <div className="text-right text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200 whitespace-pre-line">
              {t("companyFooter")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
