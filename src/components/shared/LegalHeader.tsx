import { BackButton } from "./BackButton";

interface LegalHeaderProps {
  title: string;
  subtitle: string;
  backLabel: string;
}

// プライバシーポリシー・利用規約・特定商取引法の見出し
export function LegalHeader({ title, subtitle, backLabel }: LegalHeaderProps) {
  return (
    <div className="mb-12 flex items-start gap-3 border-b border-ink/80 pb-8">
      <BackButton label={backLabel} />
      <div>
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
