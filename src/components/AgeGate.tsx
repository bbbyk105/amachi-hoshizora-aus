"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  AGE_VERIFIED_STORAGE_KEY,
  LOCATION_STORAGE_KEY,
} from "@/lib/ageGateStorage";

export function AgeGate() {
  const t = useTranslations("ageGate");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [passed, setPassed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    try {
      setPassed(window.localStorage.getItem(AGE_VERIFIED_STORAGE_KEY) === "1");
    } catch {
      setPassed(false);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (passed) return;

    const html = document.documentElement;
    const body = document.body;
    scrollYRef.current = window.scrollY;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyTouchAction = body.style.touchAction;
    const prevHtmlOverscroll = html.style.overscrollBehavior;
    const prevBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
      html.style.overscrollBehavior = prevHtmlOverscroll;
      body.style.overscrollBehavior = prevBodyOverscroll;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [passed]);

  const finalizeEntry = () => {
    try {
      window.localStorage.setItem(AGE_VERIFIED_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setConfirming(false);
    setPassed(true);
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

  const handleLanguageChange = (nextLocale: (typeof routing.locales)[number]) => {
    if (nextLocale === locale || confirming) return;
    if (typeof window !== "undefined") {
      document.cookie = `preferred-locale=${nextLocale}; path=/; max-age=${
        365 * 24 * 60 * 60
      }; SameSite=Lax`;
      localStorage.setItem("preferred-language", nextLocale);
    }
    router.replace(pathname, { locale: nextLocale });
  };

  if (passed) {
    return null;
  }

  if (!ready) {
    return (
      <div
        className="fixed inset-0 z-100 bg-background"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      lang={locale === "ja" ? "ja" : "en"}
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-desc"
    >
      <div className="my-auto w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-lg">
        <div className="mb-4 flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {t("langLabel")}
          </span>
          <div
            className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5"
            role="group"
            aria-label={t("langLabel")}
          >
            {routing.locales.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => handleLanguageChange(loc)}
                disabled={confirming}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  loc === locale
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                } disabled:opacity-50`}
              >
                {loc === "en" ? t("langEnglish") : t("langJapanese")}
              </button>
            ))}
          </div>
        </div>
        <h2
          id="age-gate-title"
          className="text-center text-xl font-semibold tracking-tight"
        >
          {t("title")}
        </h2>
        <p
          id="age-gate-desc"
          className="mt-4 text-center text-sm leading-relaxed text-muted-foreground"
        >
          {t("description")}
        </p>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {t("notice")}
        </p>
        <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
          {t("locationNotice")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            className="sm:min-w-[160px]"
            onClick={handleConfirm}
            disabled={confirming}
          >
            {confirming ? t("confirming") : t("confirm")}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="sm:min-w-[160px]"
            onClick={handleDecline}
            disabled={confirming}
          >
            {t("decline")}
          </Button>
        </div>
      </div>
    </div>
  );
}
