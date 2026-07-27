import type { Locale } from '@/lib/i18n/config'

export const SITE_URL = 'https://regatron.co'
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path
  return new URL(path.startsWith('/') ? path : `/${path}`, SITE_URL).toString()
}

export function localizedPageUrl(locale: Locale, path = '') {
  const suffix = path ? (path.startsWith('/') ? path : `/${path}`) : ''
  if (locale === 'id') {
    return absoluteUrl(suffix ? `/id${suffix}` : '/')
  }
  return absoluteUrl(`/en${suffix}`)
}

export function organizationReference() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'REGATRON',
    url: SITE_URL,
  }
}

export function webPageSchema({
  type = 'WebPage',
  locale,
  path,
  name,
  description,
  includeContext = true,
}: {
  type?: string
  locale: Locale
  path: string
  name: string
  description?: string
  includeContext?: boolean
}) {
  const url = localizedPageUrl(locale, path)

  return {
    ...(includeContext ? { '@context': 'https://schema.org' } : {}),
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    inLanguage: locale === 'id' ? 'id-ID' : 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
  }
}
