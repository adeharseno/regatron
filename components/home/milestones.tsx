import type { Dictionary } from '@/lib/i18n/dictionaries'

export function Milestones({ dict }: { dict: Dictionary }) {
  const t = dict.home.milestones

  return (
    <section id="milestones" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-[1440px] px-6 text-center md:px-margin-desktop">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-[40px] font-bold leading-tight tracking-tight text-balance text-on-background">
            {t.heading}
          </h2>
          <p className="leading-relaxed text-on-surface-variant">{t.description}</p>
        </div>
      </div>
    </section>
  )
}
