import type {StructureResolver} from 'sanity/structure'
import { CogIcon } from '@sanity/icons/Cog'
import { EditIcon } from '@sanity/icons/Edit'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { HomeIcon } from '@sanity/icons/Home'
import { ThListIcon } from '@sanity/icons/ThList'
import { ContactSubmissionsTable } from './components/contactSubmissionsTable'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'

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
      S.listItem()
        .title('Contact Us')
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title('Contact Us')
            .items([
              S.listItem()
                .title('Konten Halaman')
                .icon(EditIcon)
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                    .title('Konten Halaman Contact Us'),
                ),
              S.listItem()
                .title('Form Submissions')
                .icon(ThListIcon)
                .child(
                  S.component()
                    .id('contact-submissions-table')
                    .title('Form Submissions')
                    .component(ContactSubmissionsTable),
                ),
            ]),
        ),
      S.listItem()
        .title('Legal Pages')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Legal Pages')
            .items([
              S.listItem()
                .title('Privacy Policy')
                .icon(DocumentTextIcon)
                .child(
                  S.document()
                    .schemaType('legalPage')
                    .documentId('privacyPolicyPage')
                    .initialValueTemplate('privacyPolicyPageTemplate')
                    .title('Privacy Policy'),
                ),
              S.listItem()
                .title('Terms & Conditions')
                .icon(DocumentTextIcon)
                .child(
                  S.document()
                    .schemaType('legalPage')
                    .documentId('termsConditionsPage')
                    .initialValueTemplate('termsConditionsPageTemplate')
                    .title('Terms & Conditions'),
                ),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            'homePage',
            'siteSettings',
            'contactPage',
            'contactSubmission',
            'legalPage',
          ].includes(item.getId() || ''),
      ),
    ])
