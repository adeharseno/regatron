import type {StructureResolver} from 'sanity/structure'
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
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'homePage'),
    ])
