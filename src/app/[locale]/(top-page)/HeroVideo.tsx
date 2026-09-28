"use client";
import { useEffect, useRef } from "react";
import {
  prefersReducedMotion,
  usePrefersReducedMotion,
} from "@/hooks/use-prefers-reduced-motion";

interface HeroVideoProps {
  src: string;
  poster: string;
}

// 夜の富士のタイムラプス。
// サーバーの HTML では自動再生も先読みもせず、1枚目（poster）だけを見せる。
// 表示後、視差効果を減らす設定でなければ読み込んで再生する（設定している人は動画を取得しない）
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // ハイドレーション直後の 1 回目は reducedMotion がサーバー側の値（false）なので、直接確かめる
    if (reducedMotion || prefersReducedMotion()) {
      video.pause();
      return;
    }
    video.preload = "auto";
    video.play().catch(() => {});
  }, [reducedMotion]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover object-[57%_50%]"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
