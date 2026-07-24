import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { ContactSection } from '@/components/contact/contact-section'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    title: `${dict.contact.heading} — REGATRON`,
    description: dict.contact.description,
  }
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <Navbar dict={dict} />
      <main>
        <ContactSection dict={dict} />
      </main>
      <SiteFooter dict={dict} locale={locale as Locale} />
    </>
  )
}
