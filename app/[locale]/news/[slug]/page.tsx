import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { ALL_SLUGS_QUERY, POST_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Post, PostWithBody } from '@/sanity/lib/types'
import { isValidLocale, locales, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: ALL_SLUGS_QUERY })
  const slugs = data as unknown as { slug: string }[]
  return locales.flatMap((locale) =>
    (slugs ?? []).map((item: { slug: string }) => ({ locale, slug: item.slug })),
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) return {}
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug, locale },
    stega: false,
  })
  const post = data as unknown as PostWithBody | null

  if (!post) return { title: 'Article Not Found' }

  const keywords = post.metaKeywords
    ?.split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean)

  return {
    title: post.metaTitle || `${post.title} — REGATRON News`,
    description: post.metaDescription || post.excerpt,
    keywords: keywords?.length ? keywords : undefined,
    alternates: {
      canonical: `/${locale}/news/${slug}`,
      languages: {
        id: `/id/news/${slug}`,
        en: `/en/news/${slug}`,
        'x-default': `/id/news/${slug}`,
      },
    },
    openGraph: post.mainImage
      ? {
          title: post.metaTitle || post.title,
          description: post.metaDescription || post.excerpt,
          url: `/${locale}/news/${slug}`,
          type: 'article',
          images: [urlFor(post.mainImage).width(1200).height(630).url()],
        }
      : undefined,
  }
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)

  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug, locale },
  })
  const post = data as unknown as PostWithBody | null

  if (!post) {
    notFound()
  }

  const heroImgSrc = post.mainImage
    ? urlFor(post.mainImage).width(1440).height(600).url()
    : null

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : ''

  const newsHref = `/${locale}/news`

  return (
    <main>
        {/* Hero Banner */}
        <section className="pb-16 pt-32">
          <div className="mx-auto max-w-360 px-6 md:px-margin-desktop">
            <Link
              href={newsHref}
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              {dict.home.news.backToNews}
            </Link>

            {/* Tag + Date */}
            <div className="mb-6 flex items-center gap-4">
              {post.tag && (
                <span className="bg-primary/20 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-container border border-primary/30">
                  {post.tag}
                </span>
              )}
              {formattedDate && (
                <span className="flex items-center gap-2 text-sm ">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
              )}
            </div>

            <h1 className="max-w-4xl text-[40px] font-bold leading-tight md:text-5xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-6 max-w-3xl text-lg leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </section>

        {/* Hero Image */}
        {heroImgSrc && (
          <section className="pb-16">
            <div className="mx-auto max-w-360 px-6 md:px-margin-desktop">
              <div className="overflow-hidden border border-outline-variant/20">
                <img
                  src={heroImgSrc}
                  alt={post.mainImageAlt || post.title}
                  className="w-full object-cover"
                  style={{ maxHeight: '480px' }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Article Body */}
        <section className="bg-surface-bright py-20">
          <div className="mx-auto max-w-3xl px-6 md:px-0">
            <div className="article-content">
              {post.body && post.body.length > 0 ? (
                <PortableText value={post.body as unknown as PortableTextBlock[]} />
              ) : (
                <p className="italic text-on-surface-variant">
                  {locale === 'id' ? 'Konten belum tersedia.' : 'No content available.'}
                </p>
              )}
            </div>

            {/* Divider */}
            <hr className="my-16 border-outline-variant/30" />

            {/* Back Link */}
            <Link
              href={newsHref}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:text-primary-container"
            >
              <ArrowLeft className="h-4 w-4" />
              {dict.home.news.backToNews}
            </Link>
          </div>
        </section>
    </main>
  )
}
