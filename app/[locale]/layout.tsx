import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import '../globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: 'REGATRON — Sustainable PCB Scrap & E-Waste Processing',
  description:
    'Pioneering PCB scrap and e-waste processing in Indonesia. Precious metal extraction through environmentally friendly processes with Industry 4.0 standards.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#001944',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  return (
    <html lang={locale satisfies Locale} className={`${plusJakarta.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
