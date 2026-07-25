import { type SchemaTypeDefinition } from 'sanity'
import { siteSettingsType } from './siteSettingsType'
import { postType } from './postType'
import { homePageType } from './homePageType'
import { homeServiceItemType } from './homeServiceItemType'
import { homeCatalogItemType } from './homeCatalogItemType'
import { siteLinkType } from './siteLinkType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    homePageType,
    homeServiceItemType,
    homeCatalogItemType,
    siteLinkType,
    postType,
  ],
}
