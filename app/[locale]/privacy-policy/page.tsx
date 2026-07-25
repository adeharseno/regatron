import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  createLegalPageMetadata,
  LegalPage,
} from '@/components/legal/legal-page'
import { isValidLocale, type Locale } from '@/lib/i18n/config'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}

  return createLegalPageMetadata('privacyPolicy', locale)
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  return <LegalPage pageKey="privacyPolicy" locale={locale as Locale} />
}
