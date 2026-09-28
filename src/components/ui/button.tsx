import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// サイト共通のボタン。<Link> をボタンの見た目にする時は buttonVariants() を className に使う
const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** 主な操作（藍墨の地、ホバーで瑠璃） */
        primary: "bg-ink text-white hover:bg-ruri",
        /** 並べて置く控えめな操作 */
        outline: "border border-input text-ink hover:border-ink",
        /** 削除など取り消せない操作 */
        danger: "bg-destructive text-white hover:opacity-90",
      },
      size: {
        default: "h-12 px-8",
        /** 横幅いっぱいの大きなボタン（決済など） */
        block: "h-14 w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
