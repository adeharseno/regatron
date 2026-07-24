import { BadgeCheck } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'

export function WhyRegatron({ dict }: { dict: Dictionary }) {
  const t = dict.about.why
  const stats = [t.stat1, t.stat2]

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-margin-desktop">
      <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-[40px] font-bold leading-tight tracking-tight text-on-background">
            {t.heading}
          </h2>
          <h3 className="mb-8 text-xl font-semibold italic text-outline">
            &ldquo;{t.quote}&rdquo;
          </h3>
          <div className="space-y-6 text-on-surface-variant">
            <p className="leading-relaxed">{t.paragraph1}</p>
            <p className="leading-relaxed">{t.paragraph2}</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-outline-variant pt-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="text-4xl font-bold text-secondary">{stat.value}</span>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-outline">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square overflow-hidden bg-surface-container shadow-xl">
            <img
              src="/images/service-refining.png"
              alt="Purified metals extracted from electronic waste"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 max-w-xs bg-primary p-10 text-on-primary shadow-2xl">
            <BadgeCheck className="mb-4 h-9 w-9" />
            <p className="text-sm leading-relaxed">{t.badge}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
