import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { ServicesHero } from '@/components/services/services-hero'
import { LifecycleGrid } from '@/components/services/lifecycle-grid'
import { CtaBanner } from '@/components/shared/cta-banner'
import { createPageMetadata } from '@/lib/seo'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return createPageMetadata('services', locale)
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)

  return (
    <main>
      <ServicesHero dict={dict} />
      <LifecycleGrid dict={dict} />
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
