import { type SchemaTypeDefinition } from 'sanity'
import { siteSettingsType } from './siteSettingsType'
import { postType } from './postType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettingsType, postType],
}