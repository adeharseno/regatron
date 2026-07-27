import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { AboutHero } from '@/components/about/about-hero'
import { WhyRegatron } from '@/components/about/why-regatron'
import { VisionMission } from '@/components/about/vision-mission'
import { ProgressTimeline } from '@/components/about/progress-timeline'
import { LeadershipTeam } from '@/components/about/leadership-team'
import { CtaBanner } from '@/components/shared/cta-banner'
import { createPageMetadata } from '@/lib/seo'
import { sanityFetch } from '@/sanity/lib/live'
import { ABOUT_PAGE_QUERY, ABOUT_PAGE_SEO_QUERY } from '@/sanity/lib/queries'
import type { AboutPageData, PageSeoContent } from '@/sanity/lib/types'
import { JsonLd } from '@/components/seo/json-ld'
import { webPageSchema } from '@/lib/structured-data'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const fallback = createPageMetadata('about', locale)
  const { data } = await sanityFetch({
    query: ABOUT_PAGE_SEO_QUERY,
    params: { locale },
    stega: false,
  })
  const seo = data as PageSeoContent | null
  const title = seo?.title?.trim()
  const description = seo?.description?.trim()

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

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)
  const { data } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
    params: { locale },
  })
  const page = data as AboutPageData | null

  return (
    <main>
      <JsonLd
        data={webPageSchema({
          type: 'AboutPage',
          locale: locale as Locale,
          path: '/about',
          name: page?.hero?.title || dict.about.hero.title,
          description:
            page?.hero?.description || dict.about.hero.description,
        })}
      />
      <AboutHero dict={dict} locale={locale as Locale} content={page?.hero} />
      <WhyRegatron dict={dict} content={page?.profile} />
      <VisionMission dict={dict} content={page?.visionMission} />
      <ProgressTimeline dict={dict} content={page?.timeline} />
      <LeadershipTeam dict={dict} content={page?.leadership} />
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
