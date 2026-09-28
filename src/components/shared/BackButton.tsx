"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// 直前のページへ戻る。ボタンだけを Client Component にする
export function BackButton({ label }: { label: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label={label}
      className="-ml-3 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center transition-colors hover:bg-mist"
    >
      <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
    </button>
  );
}
