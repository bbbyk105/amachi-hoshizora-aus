import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";

interface CtaBandProps {
  title: string;
  href: string;
  label: string;
}

// ページ末尾の「商品一覧へ」などの導線
export function CtaBand({ title, href, label }: CtaBandProps) {
  return (
    <div
      data-motion="fade"
      className="flex flex-col items-start justify-between gap-8 border-t border-border pt-10 sm:flex-row sm:items-center"
    >
      <h2 className="font-serif text-2xl text-ink sm:text-3xl">{title}</h2>
      <Link
        href={href}
        className={buttonVariants()}
      >
        {label}
      </Link>
    </div>
  );
}
