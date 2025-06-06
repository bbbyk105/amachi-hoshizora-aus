"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const TermsOfService = () => {
  const t = useTranslations("termsOfService");

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
                {t("article1.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("article1.text1")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("article1.text2")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
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

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
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

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
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

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
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

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("article6.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("article6.text1")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("article6.text2")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
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

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("article8.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("article8.text")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("article9.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("article9.text")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("article10.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("article10.text1")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("article10.text2")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t("article11.title")}
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
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
