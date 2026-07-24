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
  tag?: string
  publishedAt?: string
  excerpt?: string
}

export function ArticleCard({ article, locale }: { article: ArticleCardData; locale: Locale }) {
  const imgSrc = article.mainImage
    ? urlFor(article.mainImage).width(600).height(750).url()
    : '/placeholder.svg'

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
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
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mb-4 flex items-center gap-4">
        {article.tag && (
          <span className="bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            {article.tag}
          </span>
        )}
        {formattedDate && (
          <span className="text-[10px] font-medium uppercase text-outline">
            {formattedDate}
          </span>
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
        <span>Read More</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  )
}
