import { Eye, Handshake, Leaf, Lightbulb, Scale, ShieldCheck, Target } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'

const valueIcons = [Leaf, ShieldCheck, Lightbulb, Scale, Handshake]

export function VisionMission({ dict }: { dict: Dictionary }) {
  const t = dict.about.visionMission

  return (
    <section className="bg-surface-container py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          <div className="border border-outline-variant/30 bg-white p-12">
            <div className="mb-8 flex h-12 w-12 items-center justify-center bg-secondary/10 text-secondary">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-secondary">
              {t.visionLabel}
            </h3>
            <p className="text-xl leading-relaxed text-on-background">{t.vision}</p>
          </div>

          <div className="bg-primary p-12 text-on-primary">
            <div className="mb-8 flex h-12 w-12 items-center justify-center bg-white/10">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest opacity-70">
              {t.missionLabel}
            </h3>
            <ul className="space-y-4">
              {t.mission.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-white/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mt-gutter overflow-hidden bg-navy px-8 py-14 text-white md:px-12 md:py-16">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border border-white/5" />
          <div className="absolute -right-8 -top-16 h-52 w-52 rounded-full border border-white/5" />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="mb-5 block text-xs font-bold uppercase tracking-[0.18em] text-secondary-container">
                {t.valuesEyebrow}
              </span>
              <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{t.valuesLabel}</h3>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
                {t.valuesDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-5">
              {t.values.map((value, index) => {
                const Icon = valueIcons[index]

                return (
                  <div
                    key={value}
                    className="group border-t border-white/20 pt-5 transition-colors hover:border-secondary-container"
                  >
                    <div className="mb-9 flex items-start justify-between text-secondary-container">
                      <Icon className="h-12 w-12" strokeWidth={1.35} />
                      <span className="text-[10px] font-bold tracking-[0.18em] text-white/30">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-base font-semibold leading-snug text-white">{value}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
