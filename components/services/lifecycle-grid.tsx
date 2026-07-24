import { Truck, ScanLine, Recycle, PackageCheck } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'

const meta = [
  { img: '/images/service-collection.png', Icon: Truck },
  { img: '/images/service-sorting.png', Icon: ScanLine },
  { img: '/images/service-refining.png', Icon: Recycle },
  { img: '/images/service-supply.png', Icon: PackageCheck },
]

export function LifecycleGrid({ dict }: { dict: Dictionary }) {
  const t = dict.services

  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-16">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary">
            {t.lifecycle.eyebrow}
          </span>
          <h2 className="max-w-2xl text-[40px] font-bold leading-tight tracking-tight text-on-background">
            {t.lifecycle.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {t.items.map((item, i) => {
            const { img, Icon } = meta[i]
            return (
              <div
                key={item.title}
                className="overflow-hidden border border-outline-variant/30 bg-white transition-colors hover:border-primary"
              >
                <div className="relative aspect-[16/10]">
                  <img src={img} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center bg-primary text-on-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="mb-4 text-xl font-semibold text-on-background">{item.title}</h3>
                  <p className="leading-relaxed text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}