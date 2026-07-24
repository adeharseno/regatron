import Image from 'next/image'
import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'
import type { HomeHeroContent } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'

interface HeroProps {
  dict: Dictionary
  locale: Locale
  content?: HomeHeroContent
}

function localizedHref(href: string, locale: Locale) {
  const cleanHref = stegaClean(href)
  if (!cleanHref.startsWith('/') || cleanHref.startsWith(`/${locale}`)) return cleanHref
  return `/${locale}${cleanHref === '/' ? '' : cleanHref}`
}

export function Hero({ dict, locale, content }: HeroProps) {
  const t = dict.home.hero
  const titleLine1 = content?.titleLine1 || t.titleLine1
  const titleLine2 = content?.titleLine2 || t.titleLine2
  const description = content?.description || t.description
  const primaryCtaLabel = content?.primaryCtaLabel || t.ctaPrimary
  const secondaryCtaLabel = content?.secondaryCtaLabel || t.ctaSecondary
  const primaryCtaHref = localizedHref(content?.primaryCtaHref || '/contact', locale)
  const secondaryCtaHref = localizedHref(content?.secondaryCtaHref || '/services', locale)
  const imageUrl = content?.image
    ? urlFor(content.image).width(1920).height(1080).fit('crop').url()
    : '/images/hero-facility.png'
  const imageAlt =
    content?.imageAlt ||
    (locale === 'id'
      ? 'Fasilitas pengolahan e-waste industri REGATRON'
      : 'REGATRON industrial e-waste processing facility')

  return (
    <section className="relative flex h-screen min-h-[600px] overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          placeholder={content?.imageLqip ? 'blur' : 'empty'}
          blurDataURL={content?.imageLqip}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative z-10 flex w-full items-center bg-gradient-to-br from-navy via-[#002b6b] to-primary hero-slant md:w-[70%]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-16 lg:px-16 xl:px-16 2xl:px-46">
          <div className="max-w-2xl space-y-8">
            <div className="h-1 w-20 bg-secondary-container" />
            <h1 className="text-[40px] font-black leading-tight tracking-tight text-white text-balance md:text-[42px]">
              {titleLine1} <br />
              <span className="text-secondary-container">{titleLine2}</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-white/80">{description}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={primaryCtaHref}
                className="cursor-pointer bg-white px-10 py-5 text-sm font-bold tracking-widest text-primary transition-colors hover:bg-secondary-container"
              >
                {primaryCtaLabel}
              </Link>
              <Link
                href={secondaryCtaHref}
                className="cursor-pointer border border-white/30 px-10 py-5 text-sm font-bold tracking-widest text-white transition-colors hover:bg-white/10"
              >
                {secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
