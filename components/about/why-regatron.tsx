import { Info } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { urlFor } from '@/sanity/lib/image'
import type { AboutProfileContent } from '@/sanity/lib/types'

export function WhyRegatron({ dict, content }: { dict: Dictionary; content?: AboutProfileContent }) {
  const t = dict.about.why
  const image = content?.image
    ? urlFor(content.image).width(900).height(900).url()
    : '/images/service-refining.png'

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-margin-desktop">
      <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <h2 className="mb-8 text-[40px] font-bold leading-tight tracking-tight text-on-background">
            {content?.heading || t.heading}
          </h2>
          <div className="space-y-6 text-on-surface-variant">
            <p className="leading-relaxed">{content?.paragraph1 || t.paragraph1}</p>
            <p className="leading-relaxed">{content?.paragraph2 || t.paragraph2}</p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square overflow-hidden bg-surface-container shadow-xl">
            <img
              src={image}
              alt={content?.imageAlt || 'REGATRON e-waste processing facility'}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 max-w-xs bg-primary p-10 text-on-primary shadow-2xl">
            <Info className="mb-4 h-9 w-9" />
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest opacity-80">
              {content?.highlightLabel || t.atGlanceLabel}
            </h4>
            <p className="text-sm leading-relaxed">{content?.highlight || t.atGlance}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
