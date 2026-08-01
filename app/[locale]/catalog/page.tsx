import { notFound } from "next/navigation";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { CatalogHero } from "@/components/catalog/catalog-hero";
import { CtaBanner } from "@/components/shared/cta-banner";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { createPageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CATALOG_PAGE_QUERY,
  CATALOG_PAGE_SEO_QUERY,
} from "@/sanity/lib/queries";
import type {
  CatalogItemData,
  CatalogPageData,
  PageSeoContent,
} from "@/sanity/lib/types";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const fallback = createPageMetadata("catalog", locale);
  const { data } = await sanityFetch({
    query: CATALOG_PAGE_SEO_QUERY,
    params: { locale },
    stega: false,
  });
  const seo = data as PageSeoContent | null;
  return {
    ...fallback,
    ...(seo?.title?.trim() ? { title: seo.title } : {}),
    ...(seo?.description?.trim() ? { description: seo.description } : {}),
  };
}

export default async function CatalogPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const { data } = await sanityFetch({
    query: CATALOG_PAGE_QUERY,
    params: { locale },
  });
  const result = data as {
    page: CatalogPageData | null;
    items: CatalogItemData[];
  } | null;
  const items = result?.items ?? [];

  return (
    <main>
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          locale: locale as Locale,
          path: "/catalog",
          name: result?.page?.hero?.title || dict.catalog.hero.title,
          description: result?.page?.hero?.quote || dict.catalog.hero.quote,
        })}
      />
      <CatalogHero dict={dict} content={result?.page?.hero} />
      <CatalogGrid
        dict={dict}
        content={result?.page?.grid}
        items={items}
        locale={locale as Locale}
      />
      <CtaBanner
        locale={locale as Locale}
        heading={dict.ctaBanner.heading}
        description={dict.ctaBanner.description}
        primaryLabel={dict.ctaBanner.primary}
        secondaryLabel={dict.ctaBanner.secondary}
      />
    </main>
  );
}
