import { Cpu, Download, SlidersHorizontal, Cable, Zap, ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'

export function Products({ dict }: { dict: Dictionary }) {
  const t = dict.home.products

  return (
    <section id="products" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-24 flex flex-col items-end justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl">
            <h2 className="text-[40px] font-bold leading-none tracking-tighter text-on-background">
              {t.heading}
            </h2>
            <p className="mt-6 max-w-lg text-on-surface-variant">{t.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          <div className="space-y-gutter md:col-span-7">
            <div className="group flex flex-col gap-10 border border-outline-variant/30 bg-white p-12 transition-colors duration-500 hover:border-primary md:flex-row">
              <div className="flex-1">
                <div className="mb-8 flex items-start justify-between">
                  <span className="text-[10px] font-black tracking-widest text-outline/30">
                    CAT-01
                  </span>
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-6 text-2xl font-semibold uppercase tracking-wide">
                  {t.cat1.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-on-surface-variant">
                  {t.cat1.desc}
                </p>
                <ul className="grid grid-cols-2 gap-4">
                  {t.cat1.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs font-bold uppercase text-outline"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
              <div className="group border border-outline-variant/30 bg-white p-10 transition-colors duration-500 hover:border-primary">
                <div className="mb-8 flex items-start justify-between">
                  <span className="text-[10px] font-black tracking-widest text-outline/30">
                    CAT-02
                  </span>
                  <SlidersHorizontal className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-4 text-xl font-semibold uppercase tracking-wide">
                  {t.cat2.title}
                </h3>
                <p className="mb-6 text-xs leading-relaxed text-on-surface-variant">
                  {t.cat2.desc}
                </p>
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {t.cat2.tag}
                </div>
              </div>
              <div className="group border border-outline-variant/30 bg-white p-10 transition-colors duration-500 hover:border-primary">
                <div className="mb-8 flex items-start justify-between">
                  <span className="text-[10px] font-black tracking-widest text-outline/30">
                    CAT-03
                  </span>
                  <Cable className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-4 text-xl font-semibold uppercase tracking-wide">
                  {t.cat3.title}
                </h3>
                <p className="mb-6 text-xs leading-relaxed text-on-surface-variant">
                  {t.cat3.desc}
                </p>
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {t.cat3.tag}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-gutter md:col-span-5">
            <div className="group flex h-full flex-col border border-outline-variant/30 bg-white p-12 transition-colors duration-500 hover:border-primary">
              <div className="mb-8 flex items-start justify-between">
                <span className="text-[10px] font-black tracking-widest text-outline/30">
                  CAT-04
                </span>
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-6 text-2xl font-semibold uppercase tracking-wide">
                {t.cat4.title}
              </h3>
              <p className="mb-10 text-sm leading-relaxed text-on-surface-variant">
                {t.cat4.desc}
              </p>
              <div className="mt-auto border-t border-outline-variant/20 pt-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-outline">
                    {t.cat4.tag}
                  </span>
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
