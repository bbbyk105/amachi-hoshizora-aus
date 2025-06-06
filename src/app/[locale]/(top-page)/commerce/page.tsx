"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const CommerceLaw = () => {
  const t = useTranslations("commerceLaw");

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
              <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
              <p className="text-sm text-gray-600 mt-1">{t("subtitle")}</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              {t("intro")}
              <br />
              {t("lastUpdated")}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("seller")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {t("sellerInfo")}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("representative")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {t("representativeInfo")}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("address")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {t("addressInfo")}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("contact")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {t("contactInfo")}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("prices")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("additionalFees")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
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
                    <p className="mb-3">
                      <strong>{t("bankTransferFee")}</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>{t("bankTransferFeeInfo")}</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("paymentMethods")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("paymentTiming")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("deliveryTiming")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("returns")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("alcoholSales")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("privacy")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {t("privacyInfo")}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {t("other")}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
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
