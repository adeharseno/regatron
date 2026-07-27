import type { MetadataRoute } from 'next'
import { locales, type Locale } from '@/lib/i18n/config'
import { localizedPageUrl } from '@/lib/structured-data'
import { sanityFetch } from '@/sanity/lib/live'
import {
  SITEMAP_PAGE_UPDATES_QUERY,
  SITEMAP_POSTS_QUERY,
} from '@/sanity/lib/queries'

interface SitemapPost {
  slug: string
  publishedAt?: string
  _updatedAt?: string
  image?: string
}

interface PageUpdate {
  _id: string
  _updatedAt: string
}

const staticPages = [
  {
    path: '',
    documentId: 'homePage',
    changeFrequency: 'weekly' as const,
    priority: 1,
  },
  {
    path: '/about',
    documentId: 'aboutPage',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    path: '/services',
    documentId: 'servicePage',
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  },
  {
    path: '/catalog',
    documentId: 'catalogPage',
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    path: '/news',
    documentId: null,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    path: '/contact',
    documentId: 'contactPage',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    path: '/privacy-policy',
    documentId: 'privacyPolicyPage',
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  },
  {
    path: '/terms-and-conditions',
    documentId: 'termsConditionsPage',
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  },
]

function languageAlternates(path: string) {
  const id = localizedPageUrl('id', path)
  const en = localizedPageUrl('en', path)

  return {
    languages: {
      id,
      en,
      'x-default': id,
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: postData }, { data: updateData }] = await Promise.all([
    sanityFetch({
      query: SITEMAP_POSTS_QUERY,
      perspective: 'published',
      stega: false,
    }),
    sanityFetch({
      query: SITEMAP_PAGE_UPDATES_QUERY,
      perspective: 'published',
      stega: false,
    }),
  ])
  const posts = (postData || []) as SitemapPost[]
  const updates = (updateData || []) as PageUpdate[]
  const updatedAt = new Map(updates.map((item) => [item._id, item._updatedAt]))
  const latestPostUpdate = posts[0]?._updatedAt

  const pages = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: localizedPageUrl(locale, page.path),
      ...(page.documentId && updatedAt.get(page.documentId)
        ? { lastModified: updatedAt.get(page.documentId) }
        : page.path === '/news' && latestPostUpdate
          ? { lastModified: latestPostUpdate }
          : {}),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: languageAlternates(page.path),
    })),
  )

  const articles = posts.flatMap((post) =>
    locales.map((locale: Locale) => {
      const path = `/news/${post.slug}`
      return {
        url: localizedPageUrl(locale, path),
        lastModified: post._updatedAt || post.publishedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: languageAlternates(path),
        ...(post.image ? { images: [post.image] } : {}),
      }
    }),
  )

  return [...pages, ...articles]
}
