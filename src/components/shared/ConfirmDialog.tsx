"use client";

import { useEffect, useId, type ReactNode } from "react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { buttonVariants } from "@/components/ui/button";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  /** danger は削除などの取り消せない操作 */
  tone?: "default" | "danger";
  confirmDisabled?: boolean;
  children?: ReactNode;
}

// 確認ダイアログ（カートの削除・年齢確認で共通）。Esc で閉じる
export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  tone = "default",
  confirmDisabled = false,
  children,
}: ConfirmDialogProps) {
  const titleId = useId();
  useBodyScrollLock(true);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-night/60 p-4 backdrop-blur-sm">
      <div
        role={tone === "danger" ? "alertdialog" : "dialog"}
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md bg-white p-8"
      >
        <h2 id={titleId} className="font-serif text-xl text-ink">
          {title}
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">{message}</p>
        {children}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled}
            className={buttonVariants({
              variant: tone === "danger" ? "danger" : "primary",
              className: "flex-1 px-6",
            })}
          >
            {confirmLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={buttonVariants({ variant: "outline", className: "flex-1 px-6" })}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
