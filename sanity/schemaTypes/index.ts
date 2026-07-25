import { type SchemaTypeDefinition } from 'sanity'
import { siteSettingsType } from './siteSettingsType'
import { postType } from './postType'
import { homePageType } from './homePageType'
import { homeServiceItemType } from './homeServiceItemType'
import { homeCatalogItemType } from './homeCatalogItemType'
import { siteLinkType } from './siteLinkType'
import { postBodyType } from './postBodyType'
import { contactInquiryOptionType } from './contactInquiryOptionType'
import { contactPageType } from './contactPageType'
import { contactSubmissionType } from './contactSubmissionType'
import { legalPageType } from './legalPageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    homePageType,
    homeServiceItemType,
    homeCatalogItemType,
    siteLinkType,
    postBodyType,
    postType,
    contactInquiryOptionType,
    contactPageType,
    contactSubmissionType,
    legalPageType,
  ],
}
