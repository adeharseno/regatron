import type { SanityImageSource } from '@sanity/image-url'

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
