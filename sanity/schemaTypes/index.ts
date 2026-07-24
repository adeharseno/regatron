import { type SchemaTypeDefinition } from 'sanity'
import { siteSettingsType } from './siteSettingsType'
import { postType } from './postType'
import { homePageType } from './homePageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettingsType, homePageType, postType],
}
