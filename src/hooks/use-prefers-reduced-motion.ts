"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** 今の設定をその場で読む（effect の中など、ハイドレーション直後でも正しい値が要る時に使う） */
export function prefersReducedMotion() {
  return window.matchMedia(QUERY).matches;
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** OS の「視差効果を減らす」設定。サーバーでは false とみなす */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    prefersReducedMotion,
    () => false,
  );
}
