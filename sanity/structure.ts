import type {StructureResolver} from 'sanity/structure'
import { CogIcon } from '@sanity/icons/Cog'
import { HomeIcon } from '@sanity/icons/Home'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Homepage Banner'),
        ),
      S.listItem()
        .title('Header, Footer & Contact Section')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Header, Footer & Contact Section'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['homePage', 'siteSettings'].includes(item.getId() || ''),
      ),
    ])
