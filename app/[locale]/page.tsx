import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Navbar } from '@/components/layout/navbar'
import { Hero } from '@/components/home/hero'
import { Milestones } from '@/components/home/milestones'
import { Services } from '@/components/home/services'
import { Products } from '@/components/home/products'
import { News } from '@/components/home/news-section'
import { CtaBanner } from '@/components/shared/cta-banner'
import { SiteFooter } from '@/components/layout/site-footer'
import { createPageMetadata } from '@/lib/seo'
import { sanityFetch } from '@/sanity/lib/live'
import { HOME_HERO_QUERY } from '@/sanity/lib/queries'
import type { HomePageData } from '@/sanity/lib/types'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return createPageMetadata('home', locale)
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)
  const { data } = await sanityFetch({
    query: HOME_HERO_QUERY,
    params: { locale },
  })
  const homePage = data as HomePageData | null

  return (
    <>
      <Navbar dict={dict} />
      <main>
        <Hero dict={dict} locale={locale as Locale} content={homePage?.hero} />
        <Milestones dict={dict} />
        <Services dict={dict} />
        <Products dict={dict} />
        <News dict={dict} locale={locale as Locale} />
        <CtaBanner
          heading={dict.ctaBanner.heading}
          description={dict.ctaBanner.description}
          primaryLabel={dict.ctaBanner.primary}
          secondaryLabel={dict.ctaBanner.secondary}
        />
      </main>
      <SiteFooter dict={dict} locale={locale as Locale} />
    </>
  )
}
