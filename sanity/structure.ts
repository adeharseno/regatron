import type {StructureResolver} from 'sanity/structure'
import { CogIcon } from '@sanity/icons/Cog'
import { EditIcon } from '@sanity/icons/Edit'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { HomeIcon } from '@sanity/icons/Home'
import { ThListIcon } from '@sanity/icons/ThList'
import { ContactSubmissionsTable } from './components/contactSubmissionsTable'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { CogIcon as ServiceIcon } from '@sanity/icons/Cog'
import { DocumentsIcon } from '@sanity/icons/Documents'

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
        .title('About Us')
        .icon(DocumentTextIcon)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About Us'),
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
        .title('E-Waste Service')
        .icon(ServiceIcon)
        .child(
          S.document()
            .schemaType('servicePage')
            .documentId('servicePage')
            .title('E-Waste Service'),
        ),
      S.listItem()
        .title('E-Waste Catalog')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('E-Waste Catalog')
            .items([
              S.listItem()
                .title('Konten Halaman')
                .icon(EditIcon)
                .child(
                  S.document()
                    .schemaType('catalogPage')
                    .documentId('catalogPage')
                    .title('Konten Halaman E-Waste Catalog'),
                ),
              S.documentTypeListItem('catalogItem').title('Material Katalog'),
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
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            'homePage',
            'siteSettings',
            'contactPage',
            'contactSubmission',
            'legalPage',
            'servicePage',
            'catalogPage',
            'catalogItem',
            'aboutPage',
          ].includes(item.getId() || ''),
      ),
      S.divider(),
      S.listItem()
        .title('Header, Footer & Contact Section')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Header, Footer & Contact Section'),
        ),
    ])
