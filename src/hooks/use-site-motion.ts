"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  applyMotionPatterns,
  refreshWhenFontsReady,
} from "@/lib/motion/patterns";

gsap.registerPlugin(useGSAP);

/**
 * ページが切り替わるたびに data-motion の演出を付け直す。
 * 視差効果を減らす設定の人には何もしない（matchMedia で分岐）。
 */
export function useSiteMotion() {
  const pathname = usePathname();
  // 直接開いたページか、サイト内で移動してきたページか
  const firstPathname = useRef(pathname);
  const navigated = useRef(false);

  useGSAP(
    () => {
      if (pathname !== firstPathname.current) navigated.current = true;
      document.documentElement.classList.add("motion-ready");
      const cleanups: (() => void)[] = [];
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        applyMotionPatterns(cleanups, { initialLoad: !navigated.current });
      });
      refreshWhenFontsReady();

      return () => {
        cleanups.forEach((cleanup) => cleanup());
        mm.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );
}
