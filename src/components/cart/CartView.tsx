"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { useCheckout } from "@/hooks/use-checkout";
import { calculateShipping } from "@/lib/cart";
import type { PaymentMethod } from "@/types/checkout";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { CartLineItem } from "./CartLineItem";
import { OrderSummary } from "./OrderSummary";

// 削除の確認対象（1 商品 or すべて）
type PendingRemoval = { type: "item"; productId: number } | { type: "all" } | null;

// カートの中身はブラウザ上の状態なので、この画面は Client で組み立てる
export function CartView() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalQuantity } =
    useCart();
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const { checkout, loading } = useCheckout(t("errors.checkoutFailed"));

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("in-store");
  const [pendingRemoval, setPendingRemoval] = useState<PendingRemoval>(null);
  // 年齢確認（この画面で一度確認したら、次の決済では聞かない）
  const [ageDialogOpen, setAgeDialogOpen] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = calculateShipping(subtotal, paymentMethod);
  const itemCount = getTotalQuantity();

  const startCheckout = () => checkout({ items: cartItems, paymentMethod });

  const requestCheckout = () => {
    if (ageVerified) startCheckout();
    else setAgeDialogOpen(true);
  };

  const confirmAge = () => {
    if (!ageChecked) return;
    setAgeVerified(true);
    setAgeDialogOpen(false);
    startCheckout();
  };

  const cancelAge = () => {
    setAgeDialogOpen(false);
    setAgeChecked(false);
  };

  const confirmRemoval = () => {
    if (pendingRemoval?.type === "all") clearCart();
    else if (pendingRemoval?.type === "item") removeFromCart(pendingRemoval.productId);
    setPendingRemoval(null);
  };

  return (
    <div className="bg-white pb-28 sm:pb-40">
      {/* 見出し */}
      <header className="mx-auto max-w-6xl px-5 pt-28 pb-10 sm:px-8 sm:pt-36 sm:pb-14">
        <Link
          href="/products"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-ink hover:underline"
        >
          <span className="hidden sm:inline">{t("backToProducts")}</span>
          <span className="sm:hidden">{t("backToProductsShort")}</span>
        </Link>
        <h1 className="mt-4 flex items-baseline gap-4 font-serif text-3xl text-ink sm:text-[2.75rem]">
          {t("title")}
          {cartItems.length > 0 && (
            <span className="font-sans text-sm tabular text-muted-foreground">
              {t("itemsCount", { count: itemCount })}
            </span>
          )}
        </h1>
      </header>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {cartItems.length === 0 ? (
          /* 空のカート */
          <div className="border-t border-border py-20 text-center sm:py-28">
            <h2 className="font-serif text-2xl text-ink">{t("empty.title")}</h2>
            <p className="mt-4 text-sm text-muted-foreground">{t("empty.description")}</p>
            <Link
              href="/products"
              className={buttonVariants({ className: "mt-10" })}
            >
              {t("empty.viewProducts")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-8">
            {/* カート内商品一覧 */}
            <section className="lg:col-span-7">
              <div className="flex items-baseline justify-between border-b border-ink/80 pb-3">
                <h2 className="text-sm text-ink">{t("items.title")}</h2>
                <button
                  type="button"
                  onClick={() => setPendingRemoval({ type: "all" })}
                  className="cursor-pointer text-xs text-muted-foreground underline underline-offset-4 hover:text-destructive"
                >
                  {t("items.removeAll")}
                </button>
              </div>
              <ul>
                {cartItems.map((item) => (
                  <CartLineItem
                    key={item.product.id}
                    item={item}
                    onQuantityChange={(quantity) =>
                      quantity < 1
                        ? setPendingRemoval({ type: "item", productId: item.product.id })
                        : updateQuantity(item.product.id, quantity)
                    }
                    onRemove={() =>
                      setPendingRemoval({ type: "item", productId: item.product.id })
                    }
                  />
                ))}
              </ul>
            </section>

            <OrderSummary
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              itemCount={itemCount}
              subtotal={subtotal}
              shipping={shipping}
              loading={loading}
              onCheckout={requestCheckout}
            />
          </div>
        )}
      </div>

      {/* 年齢確認ダイアログ */}
      {ageDialogOpen && (
        <ConfirmDialog
          title={t("ageVerification.title")}
          message={t("ageVerification.message")}
          confirmLabel={t("ageVerification.confirm")}
          cancelLabel={tCommon("cancel")}
          onConfirm={confirmAge}
          onCancel={cancelAge}
          confirmDisabled={!ageChecked}
        >
          <label className="mt-6 flex cursor-pointer items-start gap-3 border-y border-border py-4">
            <input
              type="checkbox"
              checked={ageChecked}
              onChange={(e) => setAgeChecked(e.target.checked)}
              className="mt-1 h-4 w-4 cursor-pointer accent-ink"
            />
            <span className="text-sm text-ink select-none">
              {t("ageVerification.checkbox")}
            </span>
          </label>
          {!ageChecked && (
            <p className="mt-3 text-xs text-muted-foreground">
              {t("ageVerification.required")}
            </p>
          )}
        </ConfirmDialog>
      )}

      {/* 削除確認ダイアログ */}
      {pendingRemoval && (
        <ConfirmDialog
          tone="danger"
          title={
            pendingRemoval.type === "all"
              ? t("confirmDialog.clearCart.title")
              : t("confirmDialog.deleteItem.title")
          }
          message={
            pendingRemoval.type === "all"
              ? t("confirmDialog.clearCart.message")
              : t("confirmDialog.deleteItem.message")
          }
          confirmLabel={
            pendingRemoval.type === "all" ? t("confirmDialog.deleteAll") : tCommon("delete")
          }
          cancelLabel={tCommon("cancel")}
          onConfirm={confirmRemoval}
          onCancel={() => setPendingRemoval(null)}
        />
      )}
    </div>
  );
}
