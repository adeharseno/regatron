import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import {
  getLegalPageCopy,
  legalPages,
  type LegalPageKey,
} from '@/lib/legal-pages'
import { sanityFetch } from '@/sanity/lib/live'
import { LEGAL_PAGE_QUERY } from '@/sanity/lib/queries'
import type { LegalPageContent } from '@/sanity/lib/types'
import { JsonLd } from '@/components/seo/json-ld'
import { webPageSchema } from '@/lib/structured-data'

async function getLegalPage(
  pageKey: LegalPageKey,
  locale: Locale,
) {
  const definition = legalPages[pageKey]
  const { data } = await sanityFetch({
    query: LEGAL_PAGE_QUERY,
    params: {
      documentId: definition.documentId,
      locale,
    },
    stega: false,
  })

  return data as unknown as LegalPageContent | null
}

export async function createLegalPageMetadata(
  pageKey: LegalPageKey,
  locale: Locale,
): Promise<Metadata> {
  const definition = legalPages[pageKey]
  const fallback = getLegalPageCopy(pageKey, locale)
  const content = await getLegalPage(pageKey, locale)

  return {
    title: content?.metaTitle || fallback.metaTitle,
    description: content?.metaDescription || fallback.metaDescription,
    alternates: {
      canonical: `/${locale}${definition.path}`,
      languages: {
        id: `/id${definition.path}`,
        en: `/en${definition.path}`,
        'x-default': `/id${definition.path}`,
      },
    },
  }
}

export async function LegalPage({
  pageKey,
  locale,
}: {
  pageKey: LegalPageKey
  locale: Locale
}) {
  const definition = legalPages[pageKey]
  const fallback = getLegalPageCopy(pageKey, locale)
  const content = await getLegalPage(pageKey, locale)
  const title = content?.title || fallback.title
  const body = content?.body || fallback.body
  const lastUpdated = content?.lastUpdated || definition.lastUpdated
  const formattedDate = new Date(`${lastUpdated}T00:00:00`).toLocaleDateString(
    locale === 'id' ? 'id-ID' : 'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  )

  return (
    <main className="bg-white">
      <JsonLd
        data={webPageSchema({
          locale,
          path: definition.path,
          name: title,
          description: content?.metaDescription || fallback.metaDescription,
        })}
      />
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-36 md:px-10">
        <h1 className="text-4xl font-bold leading-tight text-on-background md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-on-surface-variant">
          {locale === 'id' ? 'Terakhir diperbarui' : 'Last updated'}:{' '}
          <time dateTime={lastUpdated}>{formattedDate}</time>
        </p>
        <div className="mt-12 whitespace-pre-line text-base leading-8 text-on-surface">
          {body}
        </div>
      </article>
    </main>
  )
}
