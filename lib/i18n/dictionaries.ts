import type { Locale } from './config'
import en from './dictionaries/en'

export type Dictionary = typeof en

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => Promise.resolve(en),
  id: () => import('./dictionaries/id').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]()
}
