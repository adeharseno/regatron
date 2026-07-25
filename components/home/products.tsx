import { ArrowRight, Cable, Cpu, SlidersHorizontal, Zap } from 'lucide-react'
import type { ComponentType } from 'react'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { HomeCatalogContent, HomeCatalogItem } from '@/sanity/lib/types'

const icons: ComponentType<{ className?: string }>[] = [
  Cpu,
  SlidersHorizontal,
  Cable,
  Zap,
]

export function Products({
  dict,
  content,
}: {
  dict: Dictionary
  content?: HomeCatalogContent
}) {
  const t = dict.home.products
  const fallbackItems: HomeCatalogItem[] = [
    {
      _key: 'fallback-catalog-1',
      title: t.cat1.title,
      description: t.cat1.desc,
      details: t.cat1.items.join(' • '),
    },
    {
      _key: 'fallback-catalog-2',
      title: t.cat2.title,
      description: t.cat2.desc,
      details: t.cat2.tag,
    },
    {
      _key: 'fallback-catalog-3',
      title: t.cat3.title,
      description: t.cat3.desc,
      details: t.cat3.tag,
    },
    {
      _key: 'fallback-catalog-4',
      title: t.cat4.title,
      description: t.cat4.desc,
      details: t.cat4.tag,
    },
  ]
  const items = (
    Array.isArray(content?.items) ? content.items : fallbackItems
  ).slice(0, 4)
  const [primaryItem, secondItem, thirdItem, fourthItem] = items
  const heading = content?.heading || t.heading
  const description = content?.description || t.description

  return (
    <section id="products" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-24 flex flex-col items-end justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl">
            <h2 className="text-[40px] font-bold leading-none tracking-tighter text-on-background">
              {heading}
            </h2>
            <p className="mt-6 max-w-lg text-on-surface-variant">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          <div className="space-y-gutter md:col-span-7">
            {primaryItem && <PrimaryCatalogCard item={primaryItem} index={0} />}

            {(secondItem || thirdItem) && (
              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
                {secondItem && <SmallCatalogCard item={secondItem} index={1} />}
                {thirdItem && <SmallCatalogCard item={thirdItem} index={2} />}
              </div>
            )}
          </div>

          {fourthItem && (
            <div className="space-y-gutter md:col-span-5">
              <FinalCatalogCard item={fourthItem} index={3} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function CardHeader({ index }: { index: number }) {
  const Icon = icons[index] || Cpu

  return (
    <div className="mb-8 flex items-start justify-between">
      <span className="text-[10px] font-black tracking-widest text-outline/30">
        CAT-{String(index + 1).padStart(2, '0')}
      </span>
      <Icon className="h-6 w-6 text-primary" />
    </div>
  )
}

function PrimaryCatalogCard({
  item,
  index,
}: {
  item: HomeCatalogItem
  index: number
}) {
  const details = item.details
    ?.split('•')
    .map((detail) => detail.trim())
    .filter(Boolean)

  return (
    <article className="group flex flex-col gap-10 border border-outline-variant/30 bg-white p-12 transition-colors duration-500 hover:border-primary md:flex-row">
      <div className="flex-1">
        <CardHeader index={index} />
        <h3 className="mb-6 text-2xl font-semibold uppercase tracking-wide">
          {item.title}
        </h3>
        <p className="mb-8 text-sm leading-relaxed text-on-surface-variant">
          {item.description}
        </p>
        {details && details.length > 0 && (
          <ul className="grid grid-cols-2 gap-4">
            {details.map((detail) => (
              <li
                key={detail}
                className="flex items-center gap-2 text-xs font-bold uppercase text-outline"
              >
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

function SmallCatalogCard({
  item,
  index,
}: {
  item: HomeCatalogItem
  index: number
}) {
  return (
    <article className="group border border-outline-variant/30 bg-white p-10 transition-colors duration-500 hover:border-primary">
      <CardHeader index={index} />
      <h3 className="mb-4 text-xl font-semibold uppercase tracking-wide">
        {item.title}
      </h3>
      <p className="mb-6 text-xs leading-relaxed text-on-surface-variant">
        {item.description}
      </p>
      {item.details && (
        <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
          {item.details}
        </div>
      )}
    </article>
  )
}

function FinalCatalogCard({
  item,
  index,
}: {
  item: HomeCatalogItem
  index: number
}) {
  return (
    <article className="group flex h-full flex-col border border-outline-variant/30 bg-white p-12 transition-colors duration-500 hover:border-primary">
      <CardHeader index={index} />
      <h3 className="mb-6 text-2xl font-semibold uppercase tracking-wide">
        {item.title}
      </h3>
      <p className="mb-10 text-sm leading-relaxed text-on-surface-variant">
        {item.description}
      </p>
      {item.details && (
        <div className="mt-auto border-t border-outline-variant/20 pt-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-outline">
              {item.details}
            </span>
            <ArrowRight className="h-6 w-6 text-primary" />
          </div>
        </div>
      )}
    </article>
  )
}
