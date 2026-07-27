import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'
import { urlFor } from '@/sanity/lib/image'
import type { AboutHeroContent } from '@/sanity/lib/types'

export function AboutHero({
  dict,
  locale,
  content,
}: {
  dict: Dictionary
  locale: Locale
  content?: AboutHeroContent
}) {
  const t = dict.about.hero
  const image = content?.image
    ? urlFor(content.image).width(1800).height(900).url()
    : '/images/hero-facility.png'
  const localizeHref = (href: string) => {
    const cleanHref = stegaClean(href)
    return cleanHref.startsWith('/') && !cleanHref.startsWith(`/${locale}`)
      ? `/${locale}${cleanHref}`
      : cleanHref
  }

  return (
    <section className="section-slant-bottom relative flex min-h-[600px] items-center overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={content?.imageAlt || 'REGATRON industrial e-waste processing facility'}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-32 md:px-margin-desktop">
        <div className="max-w-2xl space-y-8">
          <div className="h-1 w-16 bg-secondary-container" />
          <h1 className="text-[40px] font-black leading-tight tracking-tight text-white text-balance md:text-[42px]">
            {content?.title || t.title}
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-white/80">
            {content?.description || t.description}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href={localizeHref(content?.primaryHref || '/services')}
              className="group flex cursor-pointer items-center gap-2 bg-white px-10 py-5 text-sm font-bold tracking-widest text-primary transition-colors hover:bg-secondary-container"
            >
              <span>{content?.primaryLabel || t.primaryCta}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={localizeHref(content?.secondaryHref || '/contact')}
              className="cursor-pointer border border-white/30 px-10 py-5 text-sm font-bold tracking-widest text-white transition-colors hover:bg-white/10"
            >
              {content?.secondaryLabel || t.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
