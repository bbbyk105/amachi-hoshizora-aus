"use client";

// サイト全体のスクロール演出を有効にする。演出の種類は src/lib/motion/patterns.ts を参照
import { useSiteMotion } from "@/hooks/use-site-motion";

export function MotionProvider() {
  useSiteMotion();
  return null;
}
