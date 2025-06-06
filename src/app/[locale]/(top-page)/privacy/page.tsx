"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const Privacy = () => {
  const t = useTranslations("privacyPolicy");

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
              {t("enacted")}
              <br />
              {t("lastUpdated")}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("basicPolicy")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("basicPolicyText1")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("basicPolicyText2")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("definition")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("definitionText")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
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

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
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

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
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

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("disclosure")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("disclosureText")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("cookies")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("cookiesText")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("management")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("managementText")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("changes")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("changesText")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("contact")}
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
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
