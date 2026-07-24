import { notFound } from "next/navigation";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { CatalogHero } from "@/components/catalog/catalog-hero";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { CtaBanner } from "@/components/shared/cta-banner";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCatalogItems } from "@/lib/catalog-data";
import { createPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return createPageMetadata("catalog", locale);
}

export default async function CatalogPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const items = getCatalogItems();

  return (
    <>
      <Navbar dict={dict} />
      <main>
        <CatalogHero dict={dict} />
        <CatalogGrid dict={dict} items={items} locale={locale as Locale} />
        <CtaBanner
          heading={dict.ctaBanner.heading}
          description={dict.ctaBanner.description}
          primaryLabel={dict.ctaBanner.primary}
          secondaryLabel={dict.ctaBanner.secondary}
        />
      </main>
      <SiteFooter dict={dict} locale={locale as Locale} />
    </>
  );
}
