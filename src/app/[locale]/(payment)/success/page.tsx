// src/app/[locale]/(payment)/success/page.tsx - 決済完了
// Stripe のセッションはサーバーで取得する（秘密鍵をブラウザに渡さない）
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { getCheckoutSessionSummary } from "@/lib/stripe";
import { ClearCartOnMount } from "@/components/cart/ClearCartOnMount";

interface SuccessPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string | string[] }>;
}

export async function generateMetadata({
  params,
}: SuccessPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "success" });
  return { title: t("title"), robots: { index: false } };
}

const row = "grid grid-cols-[9em_1fr] gap-4 border-b border-border py-3";

export default async function SuccessPage({
  params,
  searchParams,
}: SuccessPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { session_id } = await searchParams;
  const sessionId = typeof session_id === "string" ? session_id : null;
  const session = sessionId ? await getCheckoutSessionSummary(sessionId) : null;
  const t = await getTranslations("success");

  return (
    <div className="bg-white">
      <ClearCartOnMount />
      <div className="mx-auto max-w-2xl px-5 pt-32 pb-28 sm:px-8 sm:pt-40 sm:pb-40">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">{t("title")}</h1>
        <p className="mt-5 text-sm text-muted-foreground sm:text-base">
          {t("message")}
        </p>

        {/* セッション情報 */}
        <div className="mt-12 border-t border-ink/80">
          {session ? (
            <>
              <h2 className="pt-6 font-serif text-lg text-ink">{t("orderDetails")}</h2>
              <dl className="mt-3 text-sm">
                <div className={row}>
                  <dt className="text-muted-foreground">{t("orderId")}</dt>
                  <dd className="break-all text-ink">{session.id}</dd>
                </div>
                <div className={row}>
                  <dt className="text-muted-foreground">{t("paymentStatus")}</dt>
                  <dd className="text-ink">
                    {session.paymentStatus === "paid"
                      ? t("paymentCompleted")
                      : t("paymentProcessing")}
                  </dd>
                </div>
                {session.amountTotal !== null && (
                  <div className={row}>
                    <dt className="text-muted-foreground">{t("totalAmount")}</dt>
                    <dd className="tabular text-ink">
                      ${(session.amountTotal / 100).toFixed(2)}{" "}
                      {session.currency?.toUpperCase()}
                    </dd>
                  </div>
                )}
                {session.email && (
                  <div className={row}>
                    <dt className="text-muted-foreground">{t("email")}</dt>
                    <dd className="break-all text-ink">{session.email}</dd>
                  </div>
                )}
              </dl>
            </>
          ) : (
            <p className="py-6 text-sm text-muted-foreground">
              {sessionId ? t("orderInfoFailed") : t("sessionNotFound")}
            </p>
          )}
        </div>

        {/* アクション */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className={buttonVariants()}
          >
            {t("backToHome")}
          </Link>
          <Link
            href="/products"
            className={buttonVariants({ variant: "outline" })}
          >
            {t("backToProducts")}
          </Link>
        </div>

        <p className="mt-12 text-xs text-muted-foreground">{t("additionalInfo")}</p>
      </div>
    </div>
  );
}
