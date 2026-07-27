import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { ALL_POSTS_QUERY } from '@/sanity/lib/queries'
import { ArticleCard } from '@/components/news/article-card'
import { Pagination } from '@/components/news/pagination'
import type { Post } from '@/sanity/lib/types'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { createPageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/seo/json-ld'
import { webPageSchema } from '@/lib/structured-data'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string | string[] }>
}

const POSTS_PER_PAGE = 6

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return createPageMetadata('news', locale)
}

export default async function NewsArchivePage({ params, searchParams }: PageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const { page: pageParam } = await searchParams
  const parsedPage = typeof pageParam === 'string' ? Number.parseInt(pageParam, 10) : 1
  const requestedPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1
  const dict = await getDictionary(locale as Locale)
  const t = dict.home.news

  const { data } = await sanityFetch({
    query: ALL_POSTS_QUERY,
    params: {
      locale,
      start: (requestedPage - 1) * POSTS_PER_PAGE,
      end: requestedPage * POSTS_PER_PAGE,
    },
  })
  const result = data as unknown as { posts: Post[]; total: number }
  const posts = result.posts ?? []
  const totalPages = Math.ceil((result.total ?? 0) / POSTS_PER_PAGE)
  const currentPage = totalPages > 0 ? Math.min(requestedPage, totalPages) : 1

  if (requestedPage > currentPage) notFound()

  return (
    <main>
        <JsonLd
          data={webPageSchema({
            type: 'Blog',
            locale: locale as Locale,
            path: '/news',
            name: t.archiveTitle,
            description: t.description,
          })}
        />
        {/* Hero Banner */}
        <section className="bg-navy pb-20 pt-32">
          <div className="mx-auto max-w-360 px-6 md:px-margin-desktop">
            <Link
              href={`/${locale}`}
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backToHome}
            </Link>
            <h1 className="text-[40px] font-bold tracking-tight text-white md:text-5xl">
              {t.archiveTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/60">{t.description}</p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="bg-surface-bright py-24">
          <div className="mx-auto max-w-360 px-6 md:px-margin-desktop">
            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post: Post) => (
                  <ArticleCard key={post._id} article={post} locale={locale as Locale} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <p className="text-lg text-on-surface-variant">{t.empty}</p>
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              locale={locale as Locale}
            />
          </div>
        </section>
    </main>
  )
}
