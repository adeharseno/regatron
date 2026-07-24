import type { SanityImageSource } from '@sanity/image-url'

export interface HomeHeroContent {
  titleLine1?: string
  titleLine2?: string
  description?: string
  image?: SanityImageSource
  imageLqip?: string
  imageAlt?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

export interface HomePageData {
  hero?: HomeHeroContent
}

export interface Post {
  _id: string
  title: string
  slug: string
  mainImage?: SanityImageSource
  tag?: string
  publishedAt?: string
  excerpt?: string
}

export interface PostWithBody extends Post {
  body?: Record<string, unknown>[] | null
}
