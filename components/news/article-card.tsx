import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'
import type { Locale } from '@/lib/i18n/config'

export interface ArticleCardData {
  _id: string
  title: string
  slug: string
  mainImage?: SanityImageSource
  mainImageAlt?: string
  tag?: string
  publishedAt?: string
  excerpt?: string
}

export function ArticleCard({ article, locale }: { article: ArticleCardData; locale: Locale }) {
  const imgSrc = article.mainImage
    ? urlFor(article.mainImage).width(600).height(750).url()
    : '/placeholder.svg'

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })
    : ''

  const href = `/${locale}/news/${article.slug}`

  return (
    <article className="group">
      <Link href={href}>
        <div className="mb-6 aspect-[4/5] overflow-hidden border border-outline-variant/30 bg-surface">
          <img
            src={imgSrc}
            alt={article.mainImageAlt || article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mb-4 flex min-w-0 items-center gap-3">
        {article.tag && (
          <span
            className="min-w-0 max-w-[70%] truncate rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase leading-none tracking-[0.14em] text-primary"
            title={article.tag}
          >
            {article.tag}
          </span>
        )}
        {formattedDate && (
          <time
            dateTime={article.publishedAt}
            className="shrink-0 whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-outline"
          >
            {formattedDate}
          </time>
        )}
      </div>
      <Link href={href}>
        <h3 className="mb-4 cursor-pointer text-xl font-semibold transition-colors group-hover:text-primary">
          {article.title}
        </h3>
      </Link>
      {article.excerpt && (
        <p className="mb-6 line-clamp-3 text-sm text-on-surface-variant">
          {article.excerpt}
        </p>
      )}
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary"
      >
        <span>{locale === 'id' ? 'Baca Selengkapnya' : 'Read More'}</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  )
}
