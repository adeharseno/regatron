import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { AboutHero } from '@/components/about/about-hero'
import { WhyRegatron } from '@/components/about/why-regatron'
import { CorePrinciples } from '@/components/about/core-principles'
import { ProgressTimeline } from '@/components/about/progress-timeline'
import { LeadershipTeam } from '@/components/about/leadership-team'
import { CtaBanner } from '@/components/shared/cta-banner'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: `${dict.about.hero.title} — REGATRON`,
    description: dict.about.hero.description,
  }
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <Navbar dict={dict} />
      <main>
        <AboutHero dict={dict} />
        <WhyRegatron dict={dict} />
        <CorePrinciples dict={dict} />
        <ProgressTimeline dict={dict} />
        <LeadershipTeam dict={dict} />
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
