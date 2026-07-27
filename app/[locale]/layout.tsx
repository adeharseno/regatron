import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { Suspense } from 'react'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { NavigationProgress } from '@/components/layout/navigation-progress'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { SanityLive } from '@/sanity/lib/live'
import { getSiteSettings } from '@/sanity/lib/site-settings'
import '../globals.css'

const GOOGLE_ANALYTICS_ID = 'G-RJJQGD8QE0'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://regatron.co'),
  title: 'REGATRON — Sustainable PCB Scrap & E-Waste Processing',
  description:
    'Pioneering PCB scrap and e-waste processing in Indonesia. Precious metal extraction through environmentally friendly processes with Industry 4.0 standards.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/images/favicon.ico', type: 'image/x-icon' }],
    shortcut: '/images/favicon.ico',
  },
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
  const [dict, siteSettings] = await Promise.all([
    getDictionary(locale),
    getSiteSettings(locale),
  ])

  return (
    <html lang={locale satisfies Locale} className={`${plusJakarta.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <Navbar dict={dict} content={siteSettings?.header} />
        {children}
        <SiteFooter dict={dict} locale={locale} content={siteSettings?.footer} />
        <SanityLive />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ANALYTICS_ID}');
            `}
          </Script>
        </>
      )}
    </html>
  )
}
