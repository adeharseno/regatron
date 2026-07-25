import { cache } from 'react'
import type { Locale } from '@/lib/i18n/config'
import { sanityFetch } from './live'
import { SITE_SETTINGS_QUERY } from './queries'
import type { SiteSettingsData } from './types'

export const getSiteSettings = cache(async (locale: Locale) => {
  const { data } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    params: { locale },
  })

  return data as SiteSettingsData | null
})
