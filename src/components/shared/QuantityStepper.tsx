"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  size?: "md" | "lg";
  decreaseLabel: string;
  increaseLabel: string;
}

const SIZES = {
  md: { box: "h-10", button: "w-10", count: "w-9 text-sm", icon: "h-3.5 w-3.5" },
  lg: { box: "h-12", button: "w-12", count: "w-10", icon: "h-4 w-4" },
};

// 数量の増減（商品詳細・カートで共通）
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  size = "md",
  decreaseLabel,
  increaseLabel,
}: QuantityStepperProps) {
  const s = SIZES[size];
  const button = cn(
    "flex h-full cursor-pointer items-center justify-center text-ink transition-colors hover:bg-mist disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent",
    s.button,
  );

  return (
    <div className={cn("flex items-center border border-input", s.box)}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={decreaseLabel}
        className={button}
      >
        <Minus className={s.icon} strokeWidth={1.5} />
      </button>
      <span className={cn("text-center tabular", s.count)} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label={increaseLabel}
        className={button}
      >
        <Plus className={s.icon} strokeWidth={1.5} />
      </button>
    </div>
  );
}
