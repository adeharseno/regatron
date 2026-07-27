import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Hero } from '@/components/home/hero'
import { Milestones } from '@/components/home/milestones'
import { Services } from '@/components/home/services'
import { Products } from '@/components/home/products'
import { News } from '@/components/home/news-section'
import { CtaBanner } from '@/components/shared/cta-banner'
import { createPageMetadata } from '@/lib/seo'
import { sanityFetch } from '@/sanity/lib/live'
import {
  HOME_PAGE_QUERY,
  HOME_PAGE_SEO_QUERY,
  ORGANIZATION_CONTACT_QUERY,
} from '@/sanity/lib/queries'
import type { HomePageData, HomeSeoContent } from '@/sanity/lib/types'
import { getSiteSettings } from '@/sanity/lib/site-settings'
import { urlFor } from '@/sanity/lib/image'
import { JsonLd } from '@/components/seo/json-ld'
import {
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
} from '@/lib/structured-data'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const fallback = createPageMetadata('home', locale)
  const { data } = await sanityFetch({
    query: HOME_PAGE_SEO_QUERY,
    params: { locale },
    stega: false,
  })
  const seo = data as HomeSeoContent | null
  const title = seo?.title?.trim()
  const description = seo?.description?.trim()

  if (!title && !description) return fallback

  return {
    ...fallback,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    openGraph: {
      ...(fallback.openGraph || {}),
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    },
    twitter: {
      ...(fallback.twitter || {}),
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const [dict, { data }, siteSettings, { data: contactData }] =
    await Promise.all([
      getDictionary(locale as Locale),
      sanityFetch({ query: HOME_PAGE_QUERY, params: { locale } }),
      getSiteSettings(locale as Locale),
      sanityFetch({
        query: ORGANIZATION_CONTACT_QUERY,
        params: { locale },
        stega: false,
      }),
    ])
  const homePage = data as HomePageData | null
  const contact = contactData as {
    address?: string
    phone?: string
    email?: string
  } | null
  const logoSource = siteSettings?.header?.logo || siteSettings?.footer?.logo
  const logo = logoSource
    ? urlFor(logoSource).width(600).url()
    : `${SITE_URL}/images/logo.png`
  const socialLinks =
    siteSettings?.footer?.socialLinks
      ?.map((link) => link.href)
      .filter((href): href is string => Boolean(href?.startsWith('http'))) || []
  const organization = {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: siteSettings?.footer?.companyName || 'REGATRON',
    alternateName: 'Regatron Indonesia',
    legalName: 'PT Regar Karya Utama',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    description:
      siteSettings?.footer?.description ||
      'Solusi profesional pengelolaan limbah elektronik dan daur ulang di Indonesia.',
    ...(contact?.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: contact.address,
            addressCountry: 'ID',
          },
        }
      : {}),
    ...(contact?.phone || contact?.email
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            ...(contact.phone ? { telephone: contact.phone } : {}),
            ...(contact.email ? { email: contact.email } : {}),
            contactType: 'customer service',
            areaServed: 'ID',
            availableLanguage: ['Indonesian', 'English'],
          },
        }
      : {}),
    ...(socialLinks.length ? { sameAs: socialLinks } : {}),
  }
  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: 'Regatron Indonesia',
    alternateName: 'REGATRON',
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: ['id-ID', 'en-US'],
  }

  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [organization, website],
        }}
      />
      <Hero dict={dict} locale={locale as Locale} content={homePage?.hero} />
      <Milestones dict={dict} content={homePage?.problem} />
      <Services dict={dict} content={homePage?.services} />
      <Products dict={dict} content={homePage?.catalog} />
      <News dict={dict} locale={locale as Locale} />
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
