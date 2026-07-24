import { defineQuery } from 'next-sanity'

export const HOME_HERO_QUERY = defineQuery(
  `*[_id == "homePage"][0] {
    "hero": {
      "titleLine1": coalesce(
        heroTitleLine1[language == $locale || _key == $locale][0].value,
        heroTitleLine1[language == "id" || _key == "id"][0].value
      ),
      "titleLine2": coalesce(
        heroTitleLine2[language == $locale || _key == $locale][0].value,
        heroTitleLine2[language == "id" || _key == "id"][0].value
      ),
      "description": coalesce(
        heroDescription[language == $locale || _key == $locale][0].value,
        heroDescription[language == "id" || _key == "id"][0].value
      ),
      "image": heroImage {
        asset,
        crop,
        hotspot
      },
      "imageLqip": heroImage.asset->metadata.lqip,
      "imageAlt": coalesce(
        heroImageAlt[language == $locale || _key == $locale][0].value,
        heroImageAlt[language == "id" || _key == "id"][0].value
      ),
      "primaryCtaLabel": coalesce(
        heroPrimaryCtaLabel[language == $locale || _key == $locale][0].value,
        heroPrimaryCtaLabel[language == "id" || _key == "id"][0].value
      ),
      "primaryCtaHref": heroPrimaryCtaHref,
      "secondaryCtaLabel": coalesce(
        heroSecondaryCtaLabel[language == $locale || _key == $locale][0].value,
        heroSecondaryCtaLabel[language == "id" || _key == "id"][0].value
      ),
      "secondaryCtaHref": heroSecondaryCtaHref
    }
  }`,
)

// All posts for the archive/listing page
export const ALL_POSTS_QUERY = defineQuery(
  `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    tag,
    publishedAt,
    excerpt
  }`,
)

// Single post by slug for the article detail page
export const POST_BY_SLUG_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    tag,
    publishedAt,
    excerpt,
    body
  }`,
)

// Latest 3 posts for the homepage section
export const LATEST_POSTS_QUERY = defineQuery(
  `*[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    tag,
    publishedAt,
    excerpt
  }`,
)

// All slugs for static generation
export const ALL_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }`,
)
