import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { getProducts } from "@/data";

const linkClass =
  "underline-offset-4 decoration-1 transition-colors hover:text-white hover:underline";

export const Footer: React.FC = () => {
  const t = useTranslations();
  const tNav = useTranslations("navigation");
  const products = getProducts(useLocale()).slice(0, 4);

  const columns = [
    {
      title: t("footer.sections.products.title"),
      links: [
        ...products.map((product) => ({
          href: `/products/${product.id}`,
          label: product.name,
        })),
        { href: "/products", label: t("footer.sections.products.viewAll") },
      ],
    },
    {
      title: t("footer.sections.company.title"),
      links: [
        { href: "/", label: tNav("home") },
        { href: "/details", label: tNav("details") },
        { href: "/heritage", label: tNav("heritage") },
        { href: "/faq", label: tNav("qa") },
      ],
    },
  ];

  return (
    <footer className="bg-night text-sm text-white/70">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-serif text-3xl tracking-[0.32em] text-white">
              天地星空
            </p>
            <p className="mt-2 text-xs tracking-[0.24em] text-moon">
              Amachi Hoshisora
            </p>
            <address className="mt-8 space-y-1 not-italic leading-relaxed">
              <p>{t("footer.address.postalCode")}</p>
              <p>{t("footer.address.street")}</p>
              <p className="tabular">{t("footer.address.phone")}</p>
            </address>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs text-white/45">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-xs text-white/45">
                {t("footer.sections.contact.title")}
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="https://www.mtfuji-sake.jp/"
                    className={linkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("footer.sections.contact.officialSite")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/amasora_mtfuji3776/"
                    className={linkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-6 text-xs text-white/50 lg:flex-row lg:items-start lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className={linkClass}>
                {t("footer.legal.privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                {t("footer.legal.termsOfService")}
              </Link>
            </li>
            <li>
              <Link href="/commerce" className={linkClass}>
                {t("footer.legal.commerceLaw")}
              </Link>
            </li>
          </ul>
          <div className="space-y-1 lg:text-right">
            <p>{t("footer.ageVerification.drinking")}</p>
            <p>{t("footer.ageVerification.driving")}</p>
            <p className="pt-3">{t("footer.legal.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
