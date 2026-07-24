import { Eye, Target } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'

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

        <div className="mt-gutter border border-outline-variant/30 bg-white p-12 text-center">
          <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-outline">
            {t.valuesLabel}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {t.values.map((value, i) => (
              <span key={value} className="flex items-center gap-8">
                <span className="text-lg font-semibold text-on-background">{value}</span>
                {i < t.values.length - 1 && (
                  <span className="hidden h-1 w-1 rounded-full bg-outline-variant md:inline-block" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
