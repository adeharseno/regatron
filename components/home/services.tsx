import Image from 'next/image'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { HomeServiceItem, HomeServicesContent } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'

const meta = [
  {
    img: '/images/service-collection.png',
    clip: 'service-clip-first',
    z: 'z-10',
  },
  { img: '/images/service-sorting.png', clip: 'service-clip', z: 'z-20' },
  { img: '/images/service-refining.png', clip: 'service-clip', z: 'z-30' },
  { img: '/images/service-supply.png', clip: 'service-clip-last', z: 'z-40' },
]

export function Services({
  dict,
  content,
}: {
  dict: Dictionary
  content?: HomeServicesContent
}) {
  const t = dict.home.services
  const fallbackItems: HomeServiceItem[] = t.items.map((item, index) => ({
    _key: `fallback-service-${index}`,
    title: item.title,
    description: item.desc,
  }))
  const items = Array.isArray(content?.items) ? content.items : fallbackItems
  const services = items.map((item, index) => {
    const presentation = meta[index] || meta[meta.length - 1]
    const imageUrl = item.image
      ? urlFor(item.image).width(1200).height(1400).fit('crop').url()
      : presentation.img

    return {
      ...item,
      title: item.title || fallbackItems[index]?.title || '',
      description: item.description || fallbackItems[index]?.description || '',
      imageUrl,
      imageAlt:
        item.imageAlt || item.title || fallbackItems[index]?.title || '',
      imageLqip: item.imageLqip,
      ...presentation,
    }
  })
  const heading = content?.heading || t.heading
  const description = content?.description || t.description

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#e9e9e9] py-24"
    >
      <div className="relative mx-auto mb-16 max-w-[1440px] px-6 md:px-margin-desktop">
        <h2 className="text-[40px] font-bold tracking-tighter">{heading}</h2>
        <p className="mt-2 max-w-xl">{description}</p>
      </div>

      <div className="flex h-auto w-full flex-col overflow-hidden md:h-[650px] md:flex-row">
        {services.map((s, i) => (
          <div
            key={s._key}
            className={`group slanted-card relative min-h-[400px] flex-1 cursor-pointer overflow-hidden transition-all duration-700 ease-in-out hover:flex-[1.5] md:min-h-full md:-mr-20 ${s.clip} ${s.z} ${
              i === services.length - 1 ? 'md:mr-0' : ''
            }`}
          >
            <Image
              src={s.imageUrl}
              alt={s.imageAlt}
              fill
              sizes="(min-width: 768px) 35vw, 100vw"
              placeholder={s.imageLqip ? 'blur' : 'empty'}
              blurDataURL={s.imageLqip}
              className="absolute inset-0 h-full w-full scale-105 object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="slanted-card-overlay pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-navy/55 transition-all duration-500" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-10 md:pl-20">
              <div className="mb-6 h-1 w-12 origin-left bg-white transition-transform group-hover:scale-x-150" />
              <h3 className="mb-4 text-lg font-semibold uppercase tracking-widest text-white md:text-xl">
                {s.title}
              </h3>
              <div className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-40">
                <p className="max-w-xs text-sm leading-relaxed text-white/90">
                  {s.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
