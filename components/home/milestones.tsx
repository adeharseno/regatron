import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { HomeProblemContent } from '@/sanity/lib/types'

export function Milestones({
  dict,
  content,
}: {
  dict: Dictionary
  content?: HomeProblemContent
}) {
  const t = dict.home.milestones
  const heading = content?.heading || t.heading
  const description = content?.description || t.description

  return (
    <section id="milestones" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-[1440px] px-6 text-center md:px-margin-desktop">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-[40px] font-bold leading-tight tracking-tight text-balance text-on-background">
            {heading}
          </h2>
          <p className="leading-relaxed text-on-surface-variant">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
