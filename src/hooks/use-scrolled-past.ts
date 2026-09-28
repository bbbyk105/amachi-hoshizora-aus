"use client";

import { useEffect, useState } from "react";

/**
 * 画面の高さ × ratio より下までスクロールしたか。
 * enabled が false の間は監視せず false を返す。
 */
export function useScrolledPast(ratio: number, enabled = true) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const update = () => setPast(window.scrollY > window.innerHeight * ratio);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ratio, enabled]);

  return enabled && past;
}
