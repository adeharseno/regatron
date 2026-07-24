import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { ALL_SLUGS_QUERY, POST_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import type { Post, PostWithBody } from '@/sanity/lib/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: ALL_SLUGS_QUERY })
  const slugs = data as unknown as { slug: string }[]
  return (slugs ?? []).map((item: { slug: string }) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  })
  const post = data as unknown as PostWithBody | null

  if (!post) return { title: 'Article Not Found' }

  return {
    title: `${post.title} — REGATRON News`,
    description: post.excerpt,
    openGraph: post.mainImage
      ? {
          images: [urlFor(post.mainImage).width(1200).height(630).url()],
        }
      : undefined,
  }
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  })
  const post = data as unknown as PostWithBody | null

  if (!post) {
    notFound()
  }

  const heroImgSrc = post.mainImage
    ? urlFor(post.mainImage).width(1440).height(600).url()
    : null

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="pb-16 pt-32">
          <div className="mx-auto max-w-360 px-6 md:px-margin-desktop">
            <Link
              href="/news"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to News
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
                  alt={post.title}
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
                <p className="italic text-on-surface-variant">No content available.</p>
              )}
            </div>

            {/* Divider */}
            <hr className="my-16 border-outline-variant/30" />

            {/* Back Link */}
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:text-primary-container"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
