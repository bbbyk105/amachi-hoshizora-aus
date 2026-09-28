// src/app/[locale]/(top-page)/commerce/page.tsx
// 本文はすべてサーバーで描画する（戻るボタンだけ Client。LegalHeader 内の BackButton）
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalHeader } from "@/components/shared/LegalHeader";
import { localizedAlternates } from "@/lib/site";

interface CommercePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CommercePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "commerceLaw" });
  return {
    title: t("title"),
    alternates: localizedAlternates(locale, "/commerce"),
  };
}

const CommerceLaw = async ({ params }: CommercePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("commerceLaw");
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
              {t("intro")}
              <br />
              {t("lastUpdated")}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("seller")}
                </h2>
                <div className="bg-mist p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {t("sellerInfo")}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("representative")}
                </h2>
                <div className="bg-mist p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {t("representativeInfo")}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("address")}
                </h2>
                <div className="bg-mist p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {t("addressInfo")}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("contact")}
                </h2>
                <div className="bg-mist p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {t("contactInfo")}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("prices")}
                </h2>
                <div className="bg-mist p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("pricesInfo")}
                  </p>
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>{t("mainPrices")}</strong>
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {t
                        .raw("priceList")
                        .map((price: string, index: number) => (
                          <li key={index}>{price}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("additionalFees")}
                </h2>
                <div className="bg-mist p-6">
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      <strong>{t("shipping")}</strong>
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                      {t
                        .raw("shippingFees")
                        .map((fee: string, index: number) => (
                          <li key={index}>{fee}</li>
                        ))}
                    </ul>
                    <p className="mb-3">
                      <strong>{t("codFee")}</strong>
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                      <li>{t("codFeeAmount")}</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("paymentMethods")}
                </h2>
                <div className="bg-mist p-6">
                  <div className="text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2">
                      {t
                        .raw("paymentMethodsList")
                        .map((method: string, index: number) => (
                          <li key={index}>{method}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("paymentTiming")}
                </h2>
                <div className="bg-mist p-6">
                  <div className="text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2">
                      {t
                        .raw("paymentTimingList")
                        .map((timing: string, index: number) => (
                          <li key={index}>{timing}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("deliveryTiming")}
                </h2>
                <div className="bg-mist p-6">
                  <div className="text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2">
                      {t
                        .raw("deliveryTimingList")
                        .map((timing: string, index: number) => (
                          <li key={index}>{timing}</li>
                        ))}
                    </ul>
                    <p className="mt-4 text-sm text-gray-600 whitespace-pre-line">
                      {t("deliveryNote")}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("returns")}
                </h2>
                <div className="bg-mist p-6">
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      <strong>{t("returnsAccepted")}</strong>
                    </p>
                    <ul className="list-disc list-inside mb-6 space-y-2">
                      {t
                        .raw("returnsAcceptedList")
                        .map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <p className="mb-4">
                      <strong>{t("returnsNotAccepted")}</strong>
                    </p>
                    <ul className="list-disc list-inside mb-6 space-y-2">
                      {t
                        .raw("returnsNotAcceptedList")
                        .map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <p className="mb-4">
                      <strong>{t("returnShipping")}</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      {t
                        .raw("returnShippingList")
                        .map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("alcoholSales")}
                </h2>
                <div className="bg-mist p-6">
                  <div className="text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        <strong>{t("alcoholLicense")}</strong>
                      </li>
                      <li>
                        <strong>{t("alcoholConditions")}</strong>
                      </li>
                      <li>
                        <strong>{t("alcoholWarnings")}</strong>
                      </li>
                      {t
                        .raw("alcoholWarningsList")
                        .map((warning: string, index: number) => (
                          <li key={index} className="ml-4">
                            {warning}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("privacy")}
                </h2>
                <div className="bg-mist p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {t("privacyInfo")}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-serif text-xl text-ink">
                  {t("other")}
                </h2>
                <div className="bg-mist p-6">
                  <div className="text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2">
                      {t.raw("otherList").map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <div className="text-right text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200 whitespace-pre-line">
              {t("companyFooter")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommerceLaw;
