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

export const CONTACT_PAGE_QUERY = defineQuery(
  `*[_id == "contactPage"][0] {
    "heading": coalesce(
      heading[language == $locale || _key == $locale][0].value,
      heading[language == "id" || _key == "id"][0].value
    ),
    "description": coalesce(
      description[language == $locale || _key == $locale][0].value,
      description[language == "id" || _key == "id"][0].value
    ),
    "addressLabel": coalesce(
      addressLabel[language == $locale || _key == $locale][0].value,
      addressLabel[language == "id" || _key == "id"][0].value
    ),
    "address": coalesce(
      address[language == $locale || _key == $locale][0].value,
      address[language == "id" || _key == "id"][0].value
    ),
    "phoneLabel": coalesce(
      phoneLabel[language == $locale || _key == $locale][0].value,
      phoneLabel[language == "id" || _key == "id"][0].value
    ),
    phone,
    "emailLabel": coalesce(
      emailLabel[language == $locale || _key == $locale][0].value,
      emailLabel[language == "id" || _key == "id"][0].value
    ),
    email,
    "form": {
      "fullNameLabel": coalesce(
        fullNameLabel[language == $locale || _key == $locale][0].value,
        fullNameLabel[language == "id" || _key == "id"][0].value
      ),
      "companyLabel": coalesce(
        companyLabel[language == $locale || _key == $locale][0].value,
        companyLabel[language == "id" || _key == "id"][0].value
      ),
      "phoneLabel": coalesce(
        formPhoneLabel[language == $locale || _key == $locale][0].value,
        formPhoneLabel[language == "id" || _key == "id"][0].value
      ),
      "emailLabel": coalesce(
        formEmailLabel[language == $locale || _key == $locale][0].value,
        formEmailLabel[language == "id" || _key == "id"][0].value
      ),
      "inquiryTypeLabel": coalesce(
        inquiryTypeLabel[language == $locale || _key == $locale][0].value,
        inquiryTypeLabel[language == "id" || _key == "id"][0].value
      ),
      "inquiryOptions": inquiryOptions[] {
        _key,
        "label": coalesce(
          label[language == $locale || _key == $locale][0].value,
          label[language == "id" || _key == "id"][0].value
        )
      },
      "messageLabel": coalesce(
        messageLabel[language == $locale || _key == $locale][0].value,
        messageLabel[language == "id" || _key == "id"][0].value
      ),
      "submitLabel": coalesce(
        submitLabel[language == $locale || _key == $locale][0].value,
        submitLabel[language == "id" || _key == "id"][0].value
      ),
      "submittingLabel": coalesce(
        submittingLabel[language == $locale || _key == $locale][0].value,
        submittingLabel[language == "id" || _key == "id"][0].value
      ),
      "successMessage": coalesce(
        successMessage[language == $locale || _key == $locale][0].value,
        successMessage[language == "id" || _key == "id"][0].value
      ),
      "errorMessage": coalesce(
        errorMessage[language == $locale || _key == $locale][0].value,
        errorMessage[language == "id" || _key == "id"][0].value
      )
    }
  }`,
)

export const ORGANIZATION_CONTACT_QUERY = defineQuery(
  `*[_id == "contactPage"][0] {
    "address": coalesce(
      address[language == $locale || _key == $locale][0].value,
      address[language == "id" || _key == "id"][0].value
    ),
    phone,
    email
  }`,
)

export const LEGAL_PAGE_QUERY = defineQuery(
  `*[_id == $documentId][0] {
    "title": coalesce(
      title[language == $locale || _key == $locale][0].value,
      title[language == "id" || _key == "id"][0].value
    ),
    "body": coalesce(
      body[language == $locale || _key == $locale][0].value,
      body[language == "id" || _key == "id"][0].value
    ),
    lastUpdated,
    "metaTitle": coalesce(
      metaTitle[language == $locale || _key == $locale][0].value,
      metaTitle[language == "id" || _key == "id"][0].value
    ),
    "metaDescription": coalesce(
      metaDescription[language == $locale || _key == $locale][0].value,
      metaDescription[language == "id" || _key == "id"][0].value
    )
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

export const ABOUT_PAGE_QUERY = defineQuery(
  `*[_id == "aboutPage"][0] {
    "hero": {
      "title": coalesce(heroTitle[language == $locale || _key == $locale][0].value, heroTitle[language == "id" || _key == "id"][0].value),
      "description": coalesce(heroDescription[language == $locale || _key == $locale][0].value, heroDescription[language == "id" || _key == "id"][0].value),
      "image": heroImage,
      "imageAlt": coalesce(heroImageAlt[language == $locale || _key == $locale][0].value, heroImageAlt[language == "id" || _key == "id"][0].value),
      "primaryLabel": coalesce(heroPrimaryLabel[language == $locale || _key == $locale][0].value, heroPrimaryLabel[language == "id" || _key == "id"][0].value),
      "primaryHref": heroPrimaryHref,
      "secondaryLabel": coalesce(heroSecondaryLabel[language == $locale || _key == $locale][0].value, heroSecondaryLabel[language == "id" || _key == "id"][0].value),
      "secondaryHref": heroSecondaryHref
    },
    "profile": {
      "heading": coalesce(profileHeading[language == $locale || _key == $locale][0].value, profileHeading[language == "id" || _key == "id"][0].value),
      "paragraph1": coalesce(profileParagraph1[language == $locale || _key == $locale][0].value, profileParagraph1[language == "id" || _key == "id"][0].value),
      "paragraph2": coalesce(profileParagraph2[language == $locale || _key == $locale][0].value, profileParagraph2[language == "id" || _key == "id"][0].value),
      "highlightLabel": coalesce(profileHighlightLabel[language == $locale || _key == $locale][0].value, profileHighlightLabel[language == "id" || _key == "id"][0].value),
      "highlight": coalesce(profileHighlight[language == $locale || _key == $locale][0].value, profileHighlight[language == "id" || _key == "id"][0].value),
      "image": profileImage,
      "imageAlt": coalesce(profileImageAlt[language == $locale || _key == $locale][0].value, profileImageAlt[language == "id" || _key == "id"][0].value)
    },
    "visionMission": {
      "visionLabel": coalesce(visionLabel[language == $locale || _key == $locale][0].value, visionLabel[language == "id" || _key == "id"][0].value),
      "vision": coalesce(visionStatement[language == $locale || _key == $locale][0].value, visionStatement[language == "id" || _key == "id"][0].value),
      "missionLabel": coalesce(missionLabel[language == $locale || _key == $locale][0].value, missionLabel[language == "id" || _key == "id"][0].value),
      "missions": missions[] {
        _key,
        "text": coalesce(text[language == $locale || _key == $locale][0].value, text[language == "id" || _key == "id"][0].value)
      },
      "valuesEyebrow": coalesce(valuesEyebrow[language == $locale || _key == $locale][0].value, valuesEyebrow[language == "id" || _key == "id"][0].value),
      "valuesHeading": coalesce(valuesHeading[language == $locale || _key == $locale][0].value, valuesHeading[language == "id" || _key == "id"][0].value),
      "valuesDescription": coalesce(valuesDescription[language == $locale || _key == $locale][0].value, valuesDescription[language == "id" || _key == "id"][0].value),
      "values": values[] {
        _key,
        "text": coalesce(text[language == $locale || _key == $locale][0].value, text[language == "id" || _key == "id"][0].value)
      }
    },
    "timeline": {
      "heading": coalesce(timelineHeading[language == $locale || _key == $locale][0].value, timelineHeading[language == "id" || _key == "id"][0].value),
      "description": coalesce(timelineDescription[language == $locale || _key == $locale][0].value, timelineDescription[language == "id" || _key == "id"][0].value),
      "items": milestones[] {
        _key,
        year,
        "label": coalesce(label[language == $locale || _key == $locale][0].value, label[language == "id" || _key == "id"][0].value),
        "description": coalesce(description[language == $locale || _key == $locale][0].value, description[language == "id" || _key == "id"][0].value)
      }
    },
    "leadership": {
      "heading": coalesce(leadershipHeading[language == $locale || _key == $locale][0].value, leadershipHeading[language == "id" || _key == "id"][0].value),
      "description": coalesce(leadershipDescription[language == $locale || _key == $locale][0].value, leadershipDescription[language == "id" || _key == "id"][0].value),
      "members": members[] {
        _key,
        name,
        "role": coalesce(role[language == $locale || _key == $locale][0].value, role[language == "id" || _key == "id"][0].value),
        image,
        "imageAlt": coalesce(imageAlt[language == $locale || _key == $locale][0].value, imageAlt[language == "id" || _key == "id"][0].value)
      }
    }
  }`,
)

export const ABOUT_PAGE_SEO_QUERY = defineQuery(
  `*[_id == "aboutPage"][0] {
    "title": coalesce(seoTitle[language == $locale || _key == $locale][0].value, seoTitle[language == "id" || _key == "id"][0].value),
    "description": coalesce(seoDescription[language == $locale || _key == $locale][0].value, seoDescription[language == "id" || _key == "id"][0].value)
  }`,
)

export const SERVICE_PAGE_QUERY = defineQuery(
  `*[_id == "servicePage"][0] {
    "hero": {
      "title": coalesce(
        heroTitle[language == $locale || _key == $locale][0].value,
        heroTitle[language == "id" || _key == "id"][0].value
      ),
      "quote": coalesce(
        heroQuote[language == $locale || _key == $locale][0].value,
        heroQuote[language == "id" || _key == "id"][0].value
      ),
      "image": heroImage,
      "imageAlt": coalesce(
        heroImageAlt[language == $locale || _key == $locale][0].value,
        heroImageAlt[language == "id" || _key == "id"][0].value
      )
    },
    "lifecycle": {
      "eyebrow": coalesce(
        lifecycleEyebrow[language == $locale || _key == $locale][0].value,
        lifecycleEyebrow[language == "id" || _key == "id"][0].value
      ),
      "heading": coalesce(
        lifecycleHeading[language == $locale || _key == $locale][0].value,
        lifecycleHeading[language == "id" || _key == "id"][0].value
      ),
      "items": items[] {
        _key,
        "title": coalesce(
          title[language == $locale || _key == $locale][0].value,
          title[language == "id" || _key == "id"][0].value
        ),
        "description": coalesce(
          description[language == $locale || _key == $locale][0].value,
          description[language == "id" || _key == "id"][0].value
        ),
        image,
        "imageAlt": coalesce(
          imageAlt[language == $locale || _key == $locale][0].value,
          imageAlt[language == "id" || _key == "id"][0].value
        )
      }
    }
  }`,
)

export const SERVICE_PAGE_SEO_QUERY = defineQuery(
  `*[_id == "servicePage"][0] {
    "title": coalesce(
      seoTitle[language == $locale || _key == $locale][0].value,
      seoTitle[language == "id" || _key == "id"][0].value
    ),
    "description": coalesce(
      seoDescription[language == $locale || _key == $locale][0].value,
      seoDescription[language == "id" || _key == "id"][0].value
    )
  }`,
)

export const CATALOG_PAGE_QUERY = defineQuery(
  `{
    "page": *[_id == "catalogPage"][0] {
      "hero": {
        "title": coalesce(
          heroTitle[language == $locale || _key == $locale][0].value,
          heroTitle[language == "id" || _key == "id"][0].value
        ),
        "quote": coalesce(
          heroQuote[language == $locale || _key == $locale][0].value,
          heroQuote[language == "id" || _key == "id"][0].value
        ),
        "image": heroImage,
        "imageAlt": coalesce(
          heroImageAlt[language == $locale || _key == $locale][0].value,
          heroImageAlt[language == "id" || _key == "id"][0].value
        )
      },
      "grid": {
        "eyebrow": coalesce(
          catalogEyebrow[language == $locale || _key == $locale][0].value,
          catalogEyebrow[language == "id" || _key == "id"][0].value
        ),
        "heading": coalesce(
          catalogHeading[language == $locale || _key == $locale][0].value,
          catalogHeading[language == "id" || _key == "id"][0].value
        )
      }
    },
    "items": *[_type == "catalogItem"] | order(order asc, code asc) {
      _id,
      "no": order,
      prefix,
      code,
      "category": coalesce(
        category[language == $locale || _key == $locale][0].value,
        category[language == "id" || _key == "id"][0].value
      ),
      "name": coalesce(
        name[language == $locale || _key == $locale][0].value,
        name[language == "id" || _key == "id"][0].value
      ),
      image,
      "imageAlt": coalesce(
        imageAlt[language == $locale || _key == $locale][0].value,
        imageAlt[language == "id" || _key == "id"][0].value
      )
    }
  }`,
)

export const CATALOG_PAGE_SEO_QUERY = defineQuery(
  `*[_id == "catalogPage"][0] {
    "title": coalesce(
      seoTitle[language == $locale || _key == $locale][0].value,
      seoTitle[language == "id" || _key == "id"][0].value
    ),
    "description": coalesce(
      seoDescription[language == $locale || _key == $locale][0].value,
      seoDescription[language == "id" || _key == "id"][0].value
    )
  }`,
)

// Paginated posts for the archive/listing page
export const ALL_POSTS_QUERY = defineQuery(
  `{
    "posts": *[_type == "post"] | order(publishedAt desc, _id asc) [$start...$end] {
      _id,
      "title": coalesce(
        titleI18n[language == $locale || _key == $locale][0].value,
        titleI18n[language == "id" || _key == "id"][0].value,
        title,
        ""
      ),
      "slug": slug.current,
      mainImage,
      "mainImageAlt": coalesce(
        mainImageAlt[language == $locale || _key == $locale][0].value,
        mainImageAlt[language == "id" || _key == "id"][0].value
      ),
      "tag": coalesce(
        tagI18n[language == $locale || _key == $locale][0].value,
        tagI18n[language == "id" || _key == "id"][0].value,
        tag
      ),
      publishedAt,
      "excerpt": coalesce(
        metaDescriptionI18n[language == $locale || _key == $locale][0].value,
        metaDescriptionI18n[language == "id" || _key == "id"][0].value,
        excerptI18n[language == $locale || _key == $locale][0].value,
        excerptI18n[language == "id" || _key == "id"][0].value,
        excerpt
      )
    },
    "total": count(*[_type == "post"])
  }`,
)

// Single post by slug for the article detail page
export const POST_BY_SLUG_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    "title": coalesce(
      titleI18n[language == $locale || _key == $locale][0].value,
      titleI18n[language == "id" || _key == "id"][0].value,
      title,
      ""
    ),
    "slug": slug.current,
    mainImage,
    "mainImageAlt": coalesce(
      mainImageAlt[language == $locale || _key == $locale][0].value,
      mainImageAlt[language == "id" || _key == "id"][0].value
    ),
    "tag": coalesce(
      tagI18n[language == $locale || _key == $locale][0].value,
      tagI18n[language == "id" || _key == "id"][0].value,
      tag
    ),
    publishedAt,
    "metaTitle": coalesce(
      metaTitleI18n[language == $locale || _key == $locale][0].value,
      metaTitleI18n[language == "id" || _key == "id"][0].value,
      titleI18n[language == $locale || _key == $locale][0].value,
      titleI18n[language == "id" || _key == "id"][0].value,
      title,
      ""
    ),
    "metaDescription": coalesce(
      metaDescriptionI18n[language == $locale || _key == $locale][0].value,
      metaDescriptionI18n[language == "id" || _key == "id"][0].value,
      excerptI18n[language == $locale || _key == $locale][0].value,
      excerptI18n[language == "id" || _key == "id"][0].value,
      excerpt
    ),
    "metaKeywords": coalesce(
      metaKeywordsI18n[language == $locale || _key == $locale][0].value,
      metaKeywordsI18n[language == "id" || _key == "id"][0].value
    ),
    "excerpt": coalesce(
      metaDescriptionI18n[language == $locale || _key == $locale][0].value,
      metaDescriptionI18n[language == "id" || _key == "id"][0].value,
      excerptI18n[language == $locale || _key == $locale][0].value,
      excerptI18n[language == "id" || _key == "id"][0].value,
      excerpt
    ),
    "body": coalesce(
      bodyI18n[language == $locale || _key == $locale][0].value,
      bodyI18n[language == "id" || _key == "id"][0].value,
      body,
      []
    )
  }`,
)

// Latest 3 posts for the homepage section
export const LATEST_POSTS_QUERY = defineQuery(
  `*[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    "title": coalesce(
      titleI18n[language == $locale || _key == $locale][0].value,
      titleI18n[language == "id" || _key == "id"][0].value,
      title,
      ""
    ),
    "slug": slug.current,
    mainImage,
    "mainImageAlt": coalesce(
      mainImageAlt[language == $locale || _key == $locale][0].value,
      mainImageAlt[language == "id" || _key == "id"][0].value
    ),
    "tag": coalesce(
      tagI18n[language == $locale || _key == $locale][0].value,
      tagI18n[language == "id" || _key == "id"][0].value,
      tag
    ),
    publishedAt,
    "excerpt": coalesce(
      metaDescriptionI18n[language == $locale || _key == $locale][0].value,
      metaDescriptionI18n[language == "id" || _key == "id"][0].value,
      excerptI18n[language == $locale || _key == $locale][0].value,
      excerptI18n[language == "id" || _key == "id"][0].value,
      excerpt
    )
  }`,
)

// All slugs for static generation
export const ALL_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }`,
)

export const SITEMAP_POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(_updatedAt desc) {
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    "image": mainImage.asset->url
  }`,
)

export const SITEMAP_PAGE_UPDATES_QUERY = defineQuery(
  `*[_id in [
    "homePage",
    "aboutPage",
    "servicePage",
    "catalogPage",
    "contactPage",
    "privacyPolicyPage",
    "termsConditionsPage"
  ]] {
    _id,
    _updatedAt
  }`,
)
