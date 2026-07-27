import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { ServicesHero } from '@/components/services/services-hero'
import { LifecycleGrid } from '@/components/services/lifecycle-grid'
import { CtaBanner } from '@/components/shared/cta-banner'
import { createPageMetadata } from '@/lib/seo'
import { sanityFetch } from '@/sanity/lib/live'
import { SERVICE_PAGE_QUERY, SERVICE_PAGE_SEO_QUERY } from '@/sanity/lib/queries'
import type { PageSeoContent, ServicePageData } from '@/sanity/lib/types'
import { JsonLd } from '@/components/seo/json-ld'
import {
  ORGANIZATION_ID,
  localizedPageUrl,
  webPageSchema,
} from '@/lib/structured-data'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const fallback = createPageMetadata('services', locale)
  const { data } = await sanityFetch({
    query: SERVICE_PAGE_SEO_QUERY,
    params: { locale },
    stega: false,
  })
  const seo = data as PageSeoContent | null
  return {
    ...fallback,
    ...(seo?.title?.trim() ? { title: seo.title } : {}),
    ...(seo?.description?.trim() ? { description: seo.description } : {}),
  }
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)
  const { data } = await sanityFetch({
    query: SERVICE_PAGE_QUERY,
    params: { locale },
  })
  const page = data as ServicePageData | null

  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            webPageSchema({
              locale: locale as Locale,
              path: '/services',
              name: page?.hero?.title || dict.services.hero.title,
              description: page?.hero?.quote || dict.services.hero.quote,
              includeContext: false,
            }),
            {
              '@type': 'Service',
              '@id': `${localizedPageUrl(locale as Locale, '/services')}#service`,
              name: page?.hero?.title || dict.services.hero.title,
              serviceType:
                locale === 'id'
                  ? 'Pengelolaan Limbah Elektronik (E-Waste)'
                  : 'Electronic Waste (E-Waste) Management',
              description: page?.hero?.quote || dict.services.hero.quote,
              provider: { '@id': ORGANIZATION_ID },
              areaServed: {
                '@type': 'Country',
                name: 'Indonesia',
              },
            },
          ],
        }}
      />
      <ServicesHero dict={dict} content={page?.hero} />
      <LifecycleGrid dict={dict} content={page?.lifecycle} />
      <CtaBanner
        locale={locale as Locale}
        heading={dict.ctaBanner.heading}
        description={dict.ctaBanner.description}
        primaryLabel={dict.ctaBanner.primary}
        secondaryLabel={dict.ctaBanner.secondary}
      />
    </main>
  )
}
