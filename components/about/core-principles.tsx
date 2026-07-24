import { Eye, Factory, HeartHandshake, Users } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'

export function CorePrinciples({ dict }: { dict: Dictionary }) {
  const t = dict.about.principles

  return (
    <section className="bg-surface-container py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-[40px] font-bold leading-tight tracking-tight text-on-background">
            {t.heading}
          </h2>
          <p className="text-lg text-on-surface-variant">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          <div className="flex flex-col justify-between border border-outline-variant/30 bg-white p-12 transition-colors hover:border-secondary md:col-span-2">
            <div>
              <div className="mb-8 flex h-12 w-12 items-center justify-center bg-secondary/10 text-secondary">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mb-6 text-2xl font-semibold text-on-background">{t.vision.title}</h3>
              <p className="text-lg leading-relaxed text-on-surface-variant">{t.vision.desc}</p>
            </div>
            <div className="mt-12 text-xs font-bold tracking-widest text-secondary">
              {t.vision.since}
            </div>
          </div>

          <div className="bg-primary p-10 text-on-primary">
            <Factory className="mb-6 h-9 w-9" />
            <h4 className="mb-4 text-lg font-semibold">{t.tech.title}</h4>
            <p className="text-sm leading-relaxed opacity-80">{t.tech.desc}</p>
          </div>

          <div className="border border-outline-variant/30 bg-white p-10">
            <HeartHandshake className="mb-6 h-9 w-9 text-secondary" />
            <h4 className="mb-4 text-lg font-semibold text-on-background">{t.eco.title}</h4>
            <p className="text-sm leading-relaxed text-on-surface-variant">{t.eco.desc}</p>
          </div>

          <div className="grid grid-cols-1 overflow-hidden border border-outline-variant/30 bg-white md:col-span-2 md:grid-cols-2">
            <div className="flex flex-col justify-center p-10">
              <Users className="mb-6 h-9 w-9 text-secondary" />
              <h4 className="mb-4 text-lg font-semibold text-on-background">
                {t.partnership.title}
              </h4>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {t.partnership.desc}
              </p>
            </div>
            <div className="relative h-64 md:h-auto">
              <img
                src="/images/service-collection.png"
                alt="Industrial professionals in safety gear"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
