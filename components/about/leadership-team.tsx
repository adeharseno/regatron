'use client'

import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { urlFor } from '@/sanity/lib/image'
import type { AboutLeadershipContent } from '@/sanity/lib/types'

function initials(name: string) {
  return name
    .split(' ')
    .filter((w) => /[A-Za-z]/.test(w[0]))
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function LeadershipTeam({
  dict,
  content,
}: {
  dict: Dictionary
  content?: AboutLeadershipContent
}) {
  const t = dict.about.leadership
  const sliderRef = useRef<HTMLDivElement>(null)
  const members: NonNullable<AboutLeadershipContent['members']> = content?.members?.length
    ? content.members
    : t.members.map((member, index) => ({
        _key: `fallback-member-${index}`,
        ...member,
      }))

  function scrollSlider(direction: -1 | 1) {
    const slider = sliderRef.current
    if (!slider) return

    const card = slider.firstElementChild as HTMLElement | null
    const gap = Number.parseFloat(getComputedStyle(slider).columnGap) || 24
    const distance = card ? card.offsetWidth + gap : slider.clientWidth

    slider.scrollBy({ left: direction * distance, behavior: 'smooth' })
  }

  return (
    <section className="overflow-hidden bg-surface-container-low py-20 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <div>
            <h2 className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-on-background md:text-6xl lg:text-7xl">
              {content?.heading || t.heading}
            </h2>
            <p className="mt-3 text-base text-on-surface-variant md:text-lg">
              {content?.description || t.description}
            </p>
          </div>

          {members.length > 1 && (
            <div className="hidden shrink-0 gap-3 sm:flex">
              <button
                type="button"
                onClick={() => scrollSlider(-1)}
                aria-label="Previous team member"
                className="flex size-12 items-center justify-center border border-primary text-primary transition-colors hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider(1)}
                aria-label="Next team member"
                className="flex size-12 items-center justify-center bg-primary text-on-primary transition-colors hover:bg-primary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div
          ref={sliderRef}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-gutter overflow-x-auto px-6 pb-2 md:mx-0 md:px-0"
        >
          {members.map((member) => (
            <article
              key={member._key}
              className="flex min-h-[304px] w-[82vw] max-w-[320px] shrink-0 snap-start flex-col items-center justify-center border border-outline-variant/30 bg-white p-8 text-center transition-colors hover:border-secondary sm:w-[calc((100%_-_24px)/2)] sm:max-w-none lg:w-[calc((100%_-_72px)/4)]"
            >
              {member.image ? (
                <img
                  src={urlFor(member.image).width(240).height(240).url()}
                  alt={member.imageAlt || member.name || ''}
                  className="mb-6 h-40 w-40 rounded-full object-cover"
                />
              ) : (
                <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary">
                  {initials(member.name || '')}
                </div>
              )}
              <h4 className="mb-2 text-xl font-semibold text-on-background">{member.name}</h4>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">
                {member.role}
              </p>
            </article>
          ))}
        </div>

        {members.length > 1 && (
          <div className="mt-6 flex gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => scrollSlider(-1)}
              aria-label="Previous team member"
              className="flex size-11 items-center justify-center border border-primary text-primary"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollSlider(1)}
              aria-label="Next team member"
              className="flex size-11 items-center justify-center bg-primary text-on-primary"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
