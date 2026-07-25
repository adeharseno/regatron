import type { SanityImageSource } from '@sanity/image-url'

export interface SiteLink {
  _key: string
  label?: string
  href?: string
}

export interface SiteHeaderContent {
  logo?: SanityImageSource
  logoLqip?: string
  logoAlt?: string
  navigation?: SiteLink[]
  contactLabel?: string
  contactHref?: string
}

export interface SiteFooterContent {
  companyName?: string
  logo?: SanityImageSource
  logoLqip?: string
  logoAlt?: string
  description?: string
  navigationHeading?: string
  navigationLinks?: SiteLink[]
  legalHeading?: string
  legalLinks?: SiteLink[]
  socialHeading?: string
  socialLinks?: SiteLink[]
  copyright?: string
  tagline?: string
  location?: string
}

export interface SiteContactSectionContent {
  heading?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export interface SiteSettingsData {
  header?: SiteHeaderContent
  footer?: SiteFooterContent
  contactSection?: SiteContactSectionContent
}

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

export interface HomeSeoContent {
  title?: string
  description?: string
}

export interface HomeProblemContent {
  heading?: string
  description?: string
}

export interface HomeServiceItem {
  _key: string
  title?: string
  description?: string
  image?: SanityImageSource
  imageLqip?: string
  imageAlt?: string
}

export interface HomeServicesContent {
  heading?: string
  description?: string
  items?: HomeServiceItem[]
}

export interface HomeCatalogItem {
  _key: string
  title?: string
  description?: string
  details?: string
}

export interface HomeCatalogContent {
  heading?: string
  description?: string
  items?: HomeCatalogItem[]
}

export interface HomePageData {
  hero?: HomeHeroContent
  problem?: HomeProblemContent
  services?: HomeServicesContent
  catalog?: HomeCatalogContent
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
