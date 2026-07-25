import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { notFound } from 'next/navigation'
import { ContactSection } from '@/components/contact/contact-section'
import { createPageMetadata } from '@/lib/seo'
import { sanityFetch } from '@/sanity/lib/live'
import { CONTACT_PAGE_QUERY } from '@/sanity/lib/queries'
import type { ContactPageContent } from '@/sanity/lib/types'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return createPageMetadata('contact', locale)
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const [dict, { data }] = await Promise.all([
    getDictionary(locale as Locale),
    sanityFetch({
      query: CONTACT_PAGE_QUERY,
      params: { locale },
    }),
  ])
  const content = data as unknown as ContactPageContent | null

  return (
    <main>
      <ContactSection dict={dict} locale={locale} content={content} />
    </main>
  )
}
