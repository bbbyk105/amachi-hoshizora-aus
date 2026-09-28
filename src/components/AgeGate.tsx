"use client";

import { useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  LOCATION_STORAGE_KEY,
  markAgeVerified,
  readAgeVerified,
} from "@/lib/ageGateStorage";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useLocaleSwitcher, type AppLocale } from "@/hooks/use-locale-switcher";

const subscribeNoop = () => () => {};

export function AgeGate() {
  const t = useTranslations("ageGate");
  const { locale, locales, switchLocale } = useLocaleSwitcher();
  // localStorage はサーバーで読めないので、ハイドレーション中は null（未確定）
  const storedPassed = useSyncExternalStore<boolean | null>(
    subscribeNoop,
    readAgeVerified,
    () => null
  );
  const [passedNow, setPassed] = useState(false);
  const passed = passedNow || storedPassed === true;
  const ready = storedPassed !== null;
  const [confirming, setConfirming] = useState(false);

  // 確認画面を出している間は後ろのページをスクロールさせない
  useBodyScrollLock(ready && !passed);


  const finalizeEntry = () => {
    setConfirming(false);
    setPassed(true);
    markAgeVerified();
  };

  const handleConfirm = () => {
    if (confirming) return;
    setConfirming(true);

    const tryLocationThenFinish = () => {
      if (typeof navigator === "undefined" || !navigator.geolocation) {
        finalizeEntry();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          try {
            window.localStorage.setItem(
              LOCATION_STORAGE_KEY,
              JSON.stringify({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                accuracy:
                  typeof pos.coords.accuracy === "number"
                    ? pos.coords.accuracy
                    : null,
                ts: Date.now(),
              })
            );
          } catch {
            /* ignore */
          }
          finalizeEntry();
        },
        () => {
          finalizeEntry();
        },
        {
          enableHighAccuracy: false,
          timeout: 12_000,
          maximumAge: 300_000,
        }
      );
    };

    tryLocationThenFinish();
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com";
  };

  const handleLanguageChange = (nextLocale: AppLocale) => {
    if (confirming) return;
    switchLocale(nextLocale);
  };

  if (passed) {
    return null;
  }

  // ハイドレーション前の下地。通過済みの人には CSS で出さない（globals.css の age-gate-placeholder）
  if (!ready) {
    return (
      <div
        className="age-gate-placeholder fixed inset-0 z-100 bg-night"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-100 overflow-y-auto bg-night text-white"
      role="dialog"
      aria-modal="true"
      lang={locale === "ja" ? "ja" : "en"}
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-desc"
    >
      <Image
        src="/hero/fuji-night-poster.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[57%_50%] opacity-30"
      />
      <div className="relative flex min-h-full flex-col items-center justify-center px-6 py-16 text-center">
        <p className="font-serif text-3xl tracking-[0.32em] mr-[-0.32em]">
          天地星空
        </p>
        <p className="mt-2 mr-[-0.24em] text-xs tracking-[0.24em] text-moon">
          Amachi Hoshisora
        </p>

        <div
          className="mt-10 flex items-center gap-3 text-xs"
          role="group"
          aria-label={t("langLabel")}
        >
          {locales.map((loc, index) => (
            <span key={loc} className="flex items-center gap-3">
              {index > 0 && (
                <span aria-hidden="true" className="h-3 w-px bg-white/30" />
              )}
              <button
                type="button"
                lang={loc}
                aria-pressed={loc === locale}
                onClick={() => handleLanguageChange(loc)}
                disabled={confirming}
                className={`cursor-pointer py-1 tracking-[0.16em] transition-opacity disabled:cursor-default ${
                  loc === locale ? "opacity-100" : "opacity-45 hover:opacity-100"
                }`}
              >
                {loc === "en" ? t("langEnglish") : t("langJapanese")}
              </button>
            </span>
          ))}
        </div>

        <div className="mt-10 w-full max-w-md border-t border-white/15 pt-10">
          <h2 id="age-gate-title" className="font-serif text-2xl">
            {t("title")}
          </h2>
          <p
            id="age-gate-desc"
            className="mt-5 text-sm leading-relaxed text-white/80"
          >
            {t("description")}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-white/55">
            {t("notice")}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/55">
            {t("locationNotice")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={confirming}
              className="h-12 cursor-pointer bg-white px-8 text-sm text-night transition-colors hover:bg-moon disabled:cursor-wait disabled:opacity-70 sm:min-w-[180px]"
            >
              {confirming ? t("confirming") : t("confirm")}
            </button>
            <button
              type="button"
              onClick={handleDecline}
              disabled={confirming}
              className="h-12 cursor-pointer border border-white/40 px-8 text-sm text-white transition-colors hover:border-white disabled:opacity-50 sm:min-w-[180px]"
            >
              {t("decline")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
