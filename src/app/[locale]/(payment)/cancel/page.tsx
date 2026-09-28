// src/app/[locale]/(payment)/cancel/page.tsx - 決済キャンセル
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";

interface CancelPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CancelPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cancel" });
  return { title: t("title"), robots: { index: false } };
}

export default async function CancelPage({ params }: CancelPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("cancel");

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-5 pt-32 pb-28 sm:px-8 sm:pt-40 sm:pb-40">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-sm text-muted-foreground sm:text-base">
          {t("message")}
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/cart"
            className={buttonVariants()}
          >
            {t("backToCart")}
          </Link>
          <Link
            href="/products"
            className={buttonVariants({ variant: "outline" })}
          >
            {t("viewProducts")}
          </Link>
        </div>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-muted-foreground underline underline-offset-4 hover:text-ink"
        >
          {t("backToHome")}
        </Link>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          {t("additionalInfo")}
        </p>
      </div>
    </div>
  );
}
