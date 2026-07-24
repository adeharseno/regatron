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

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <Navbar dict={dict} />
      <main>
        <Hero dict={dict} />
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
