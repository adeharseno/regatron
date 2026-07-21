import { defineQuery } from 'next-sanity'

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
