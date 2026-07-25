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
import { HOME_PAGE_QUERY, HOME_PAGE_SEO_QUERY } from '@/sanity/lib/queries'
import type { HomePageData, HomeSeoContent } from '@/sanity/lib/types'

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
  const dict = await getDictionary(locale as Locale)
  const { data } = await sanityFetch({
    query: HOME_PAGE_QUERY,
    params: { locale },
  })
  const homePage = data as HomePageData | null

  return (
    <main>
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
