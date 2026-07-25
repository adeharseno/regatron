import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'
import type { Locale } from '@/lib/i18n/config'
import { getSiteSettings } from '@/sanity/lib/site-settings'

interface CtaBannerProps {
  locale: Locale
  heading: string
  description: string
  primaryLabel: string
  secondaryLabel: string
}

function localizedHref(href: string, locale: Locale) {
  const cleanHref = stegaClean(href)
  if (!cleanHref.startsWith('/') || cleanHref.startsWith(`/${locale}`)) {
    return cleanHref
  }

  return `/${locale}${cleanHref === '/' ? '' : cleanHref}`
}

export async function CtaBanner({
  locale,
  heading,
  description,
  primaryLabel,
  secondaryLabel,
}: CtaBannerProps) {
  const content = (await getSiteSettings(locale))?.contactSection
  const primaryHref = localizedHref(content?.primaryHref || '/contact', locale)
  const secondaryHref = localizedHref(content?.secondaryHref || '/contact', locale)

  return (
    <section className="section-slant-top relative bg-navy py-24 text-on-primary">
      <div className="mx-auto max-w-[1440px] px-6 text-center md:px-margin-desktop">
        <h2 className="mb-8 text-[40px] font-bold leading-tight tracking-tight text-balance md:text-5xl">
          {content?.heading || heading}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg opacity-80">
          {content?.description || description}
        </p>
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <Link
            href={primaryHref}
            className="cursor-pointer bg-secondary px-10 py-5 text-sm font-bold tracking-widest text-white transition-colors hover:opacity-90"
          >
            {content?.primaryLabel || primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="cursor-pointer border border-white/20 px-10 py-5 text-sm font-bold tracking-widest transition-colors hover:bg-white/10"
          >
            {content?.secondaryLabel || secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
