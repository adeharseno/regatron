import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { LATEST_POSTS_QUERY } from '@/sanity/lib/queries'
import { ArticleCard } from '@/components/news/article-card'
import type { Post } from '@/sanity/lib/types'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'

export async function News({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.home.news
  const { data } = await sanityFetch({ query: LATEST_POSTS_QUERY })
  const posts = data as unknown as Post[]

  // Don't render the section if there are no posts
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section id="news" className="bg-surface-bright py-24">
      <div className="mx-auto max-w-360 px-6 md:px-margin-desktop">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="text-[40px] font-bold tracking-tight">{t.heading}</h2>
            <p className="text-secondary">{t.description}</p>
          </div>
          <Link
            href={`/${locale}/news`}
            className="hidden border-b-2 border-primary pb-1 text-sm font-bold uppercase tracking-widest text-primary md:block"
          >
            {t.seeAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {posts.map((post: Post) => (
            <ArticleCard key={post._id} article={post} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
