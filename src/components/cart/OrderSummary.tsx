"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/data/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import type { PaymentMethod } from "@/types/checkout";

interface OrderSummaryProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  loading: boolean;
  onCheckout: () => void;
}

const PAYMENT_METHODS: PaymentMethod[] = ["in-store", "online"];

export function OrderSummary({
  paymentMethod,
  onPaymentMethodChange,
  itemCount,
  subtotal,
  shipping,
  loading,
  onCheckout,
}: OrderSummaryProps) {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");

  const methodLabels: Record<PaymentMethod, { label: string; description: string }> = {
    "in-store": {
      label: t("paymentMethod.inStore"),
      description: t("paymentMethod.inStoreDesc"),
    },
    online: {
      label: t("paymentMethod.online"),
      description: t("paymentMethod.onlineDesc"),
    },
  };

  return (
    <aside className="bg-mist p-6 sm:p-8 lg:sticky lg:top-24 lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
      <h2 className="font-serif text-xl text-ink">{t("summary.title")}</h2>

      {/* 受け取り方法 */}
      <fieldset className="mt-6">
        <legend className="text-xs text-muted-foreground">
          {t("paymentMethod.title")}
        </legend>
        <div className="mt-3 space-y-2" role="radiogroup">
          {PAYMENT_METHODS.map((method) => {
            const selected = paymentMethod === method;
            return (
              <button
                key={method}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onPaymentMethodChange(method)}
                className={`flex w-full cursor-pointer items-start gap-3 border bg-white p-4 text-left transition-colors ${
                  selected ? "border-ink" : "border-transparent hover:border-gray-300"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    selected ? "border-ink" : "border-gray-400"
                  }`}
                >
                  {selected && <span className="h-2 w-2 rounded-full bg-ink" />}
                </span>
                <span>
                  <span className="block text-sm text-ink">
                    {methodLabels[method].label}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {methodLabels[method].description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <dl className="mt-8 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">{t("summary.itemCount")}</dt>
          <dd className="tabular">{t("itemsCount", { count: itemCount })}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">{t("summary.subtotal")}</dt>
          <dd className="tabular">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">{t("summary.shipping")}</dt>
          <dd className="tabular">
            {shipping === 0 ? t("summary.shippingFree") : formatPrice(shipping)}
          </dd>
        </div>
      </dl>

      {/* 送料無料まであといくら表示 */}
      {paymentMethod === "online" && shipping > 0 && (
        <p className="mt-3 text-xs text-ruri">
          {t("summary2.freeShippingRemaining", {
            amount: formatPrice(FREE_SHIPPING_THRESHOLD - subtotal),
          })}
        </p>
      )}

      <div className="mt-6 flex items-baseline justify-between border-t border-gray-300 pt-5">
        <span className="text-sm text-ink">{t("summary.total")}</span>
        <span className="font-serif text-2xl tabular text-ink">
          {formatPrice(subtotal + shipping)}
        </span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={loading}
        className={buttonVariants({ size: "block", className: "mt-6" })}
      >
        {loading ? tCommon("processing") : t("summary.checkout")}
      </button>

      <div className="mt-4 text-center">
        <Link
          href="/products"
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-ink"
        >
          {t("summary.continueShopping")}
        </Link>
      </div>
    </aside>
  );
}
