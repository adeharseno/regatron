import type { Dictionary } from '@/lib/i18n/dictionaries'
import { urlFor } from '@/sanity/lib/image'
import type { PageHeroContent } from '@/sanity/lib/types'

export function ServicesHero({ dict, content }: { dict: Dictionary; content?: PageHeroContent }) {
  const t = dict.services.hero
  const image = content?.image
    ? urlFor(content.image).width(1800).height(700).url()
    : '/images/service-sorting.png'

  return (
    <section className="section-slant-bottom relative flex min-h-[500px] items-center overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={content?.imageAlt || 'REGATRON e-waste processing facility'}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/70" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-32 md:px-margin-desktop">
        <div className="max-w-2xl space-y-6">
          <div className="h-1 w-16 bg-secondary-container" />
          <h1 className="text-[40px] font-black leading-tight tracking-tight text-white text-balance md:text-[42px]">
            {content?.title || t.title}
          </h1>
          <p className="max-w-lg text-lg italic leading-relaxed text-white/80">
            &ldquo;{content?.quote || t.quote}&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
