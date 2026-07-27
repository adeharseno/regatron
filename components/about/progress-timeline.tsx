import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { AboutTimelineContent } from '@/sanity/lib/types'

export function ProgressTimeline({
  dict,
  content,
}: {
  dict: Dictionary
  content?: AboutTimelineContent
}) {
  const t = dict.about.timeline
  const items = content?.items?.length
    ? content.items
    : t.items.map((item, index) => ({
        _key: `fallback-milestone-${index}`,
        year: item.year,
        label: item.label,
        description: item.desc,
      }))
  const milestones = items.map((item, i) => ({ ...item, done: i < items.length - 1 }))

  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-16">
          <h2 className="text-[40px] font-bold leading-tight tracking-tight text-on-background">
            {content?.heading || t.heading}
          </h2>
          <p className="text-outline">{content?.description || t.description}</p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 top-0 h-[2px] w-full bg-outline-variant" />
          <div className="no-scrollbar flex gap-12 overflow-x-auto pb-4">
            {milestones.map((m) => (
              <div key={m._key} className="relative min-w-[280px] pt-12">
                <div
                  className={`absolute -top-[6px] left-0 h-3 w-3 rounded-full ${
                    m.done ? 'bg-secondary' : 'border-2 border-background bg-outline-variant'
                  }`}
                />
                <span
                  className={`mb-4 block text-2xl font-bold ${
                    m.done ? 'text-secondary' : 'text-outline'
                  }`}
                >
                  {m.year}
                </span>
                <h4
                  className={`mb-2 text-xs font-bold uppercase tracking-widest ${
                    m.done ? 'text-on-background' : 'text-outline'
                  }`}
                >
                  {m.label}
                </h4>
                <p
                  className={`text-sm leading-relaxed text-on-surface-variant ${
                    m.done ? '' : 'italic'
                  }`}
                >
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
