import { defineQuery } from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings"] | order(_updatedAt desc)[0] {
    "header": {
      "logo": headerLogo {
        asset,
        crop,
        hotspot
      },
      "logoLqip": headerLogo.asset->metadata.lqip,
      "logoAlt": coalesce(
        headerLogoAlt[language == $locale || _key == $locale][0].value,
        headerLogoAlt[language == "id" || _key == "id"][0].value
      ),
      "navigation": headerNavigation[] {
        _key,
        "label": coalesce(
          label[language == $locale || _key == $locale][0].value,
          label[language == "id" || _key == "id"][0].value
        ),
        href
      },
      "contactLabel": coalesce(
        headerContactLabel[language == $locale || _key == $locale][0].value,
        headerContactLabel[language == "id" || _key == "id"][0].value
      ),
      "contactHref": headerContactHref
    },
    "footer": {
      "companyName": companyName,
      "logo": footerLogo {
        asset,
        crop,
        hotspot
      },
      "logoLqip": footerLogo.asset->metadata.lqip,
      "logoAlt": coalesce(
        footerLogoAlt[language == $locale || _key == $locale][0].value,
        footerLogoAlt[language == "id" || _key == "id"][0].value
      ),
      "description": coalesce(
        footerDescription[language == $locale || _key == $locale][0].value,
        footerDescription[language == "id" || _key == "id"][0].value
      ),
      "navigationHeading": coalesce(
        footerNavigationHeading[language == $locale || _key == $locale][0].value,
        footerNavigationHeading[language == "id" || _key == "id"][0].value
      ),
      "navigationLinks": footerNavigationLinks[] {
        _key,
        "label": coalesce(
          label[language == $locale || _key == $locale][0].value,
          label[language == "id" || _key == "id"][0].value
        ),
        href
      },
      "legalHeading": coalesce(
        footerLegalHeading[language == $locale || _key == $locale][0].value,
        footerLegalHeading[language == "id" || _key == "id"][0].value
      ),
      "legalLinks": footerLegalLinks[] {
        _key,
        "label": coalesce(
          label[language == $locale || _key == $locale][0].value,
          label[language == "id" || _key == "id"][0].value
        ),
        href
      },
      "socialHeading": coalesce(
        footerSocialHeading[language == $locale || _key == $locale][0].value,
        footerSocialHeading[language == "id" || _key == "id"][0].value
      ),
      "socialLinks": footerSocialLinks[] {
        _key,
        "label": coalesce(
          label[language == $locale || _key == $locale][0].value,
          label[language == "id" || _key == "id"][0].value
        ),
        href
      },
      "copyright": coalesce(
        footerCopyright[language == $locale || _key == $locale][0].value,
        footerCopyright[language == "id" || _key == "id"][0].value
      ),
      "tagline": coalesce(
        footerTagline[language == $locale || _key == $locale][0].value,
        footerTagline[language == "id" || _key == "id"][0].value
      ),
      "location": coalesce(
        footerLocation[language == $locale || _key == $locale][0].value,
        footerLocation[language == "id" || _key == "id"][0].value
      )
    },
    "contactSection": {
      "heading": coalesce(
        contactSectionHeading[language == $locale || _key == $locale][0].value,
        contactSectionHeading[language == "id" || _key == "id"][0].value
      ),
      "description": coalesce(
        contactSectionDescription[language == $locale || _key == $locale][0].value,
        contactSectionDescription[language == "id" || _key == "id"][0].value
      ),
      "primaryLabel": coalesce(
        contactSectionPrimaryLabel[language == $locale || _key == $locale][0].value,
        contactSectionPrimaryLabel[language == "id" || _key == "id"][0].value
      ),
      "primaryHref": contactSectionPrimaryHref,
      "secondaryLabel": coalesce(
        contactSectionSecondaryLabel[language == $locale || _key == $locale][0].value,
        contactSectionSecondaryLabel[language == "id" || _key == "id"][0].value
      ),
      "secondaryHref": contactSectionSecondaryHref
    }
  }`,
)

export const HOME_PAGE_SEO_QUERY = defineQuery(
  `*[_id == "homePage"][0] {
    "title": coalesce(
      seoMetaTitle[language == $locale || _key == $locale][0].value,
      seoMetaTitle[language == "id" || _key == "id"][0].value
    ),
    "description": coalesce(
      seoMetaDescription[language == $locale || _key == $locale][0].value,
      seoMetaDescription[language == "id" || _key == "id"][0].value
    )
  }`,
)

export const HOME_PAGE_QUERY = defineQuery(
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
    },
    "problem": {
      "heading": coalesce(
        problemHeading[language == $locale || _key == $locale][0].value,
        problemHeading[language == "id" || _key == "id"][0].value
      ),
      "description": coalesce(
        problemDescription[language == $locale || _key == $locale][0].value,
        problemDescription[language == "id" || _key == "id"][0].value
      )
    },
    "services": {
      "heading": coalesce(
        servicesHeading[language == $locale || _key == $locale][0].value,
        servicesHeading[language == "id" || _key == "id"][0].value
      ),
      "description": coalesce(
        servicesDescription[language == $locale || _key == $locale][0].value,
        servicesDescription[language == "id" || _key == "id"][0].value
      ),
      "items": servicesItems[] {
        _key,
        "title": coalesce(
          title[language == $locale || _key == $locale][0].value,
          title[language == "id" || _key == "id"][0].value
        ),
        "description": coalesce(
          description[language == $locale || _key == $locale][0].value,
          description[language == "id" || _key == "id"][0].value
        ),
        "image": image {
          asset,
          crop,
          hotspot
        },
        "imageLqip": image.asset->metadata.lqip,
        "imageAlt": coalesce(
          imageAlt[language == $locale || _key == $locale][0].value,
          imageAlt[language == "id" || _key == "id"][0].value
        )
      }
    },
    "catalog": {
      "heading": coalesce(
        catalogHeading[language == $locale || _key == $locale][0].value,
        catalogHeading[language == "id" || _key == "id"][0].value
      ),
      "description": coalesce(
        catalogDescription[language == $locale || _key == $locale][0].value,
        catalogDescription[language == "id" || _key == "id"][0].value
      ),
      "items": catalogItems[] {
        _key,
        "title": coalesce(
          title[language == $locale || _key == $locale][0].value,
          title[language == "id" || _key == "id"][0].value
        ),
        "description": coalesce(
          description[language == $locale || _key == $locale][0].value,
          description[language == "id" || _key == "id"][0].value
        ),
        "details": coalesce(
          details[language == $locale || _key == $locale][0].value,
          details[language == "id" || _key == "id"][0].value
        )
      }
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
