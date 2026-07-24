import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Nama Perusahaan',
      type: 'string',
      initialValue: 'REGATRON',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading (Deprecated)',
      type: 'string',
      description: 'Gunakan dokumen Homepage untuk mengelola banner.',
      deprecated: { reason: 'Digantikan oleh field bilingual pada dokumen Homepage.' },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading (Deprecated)',
      type: 'text',
      rows: 3,
      deprecated: { reason: 'Digantikan oleh field bilingual pada dokumen Homepage.' },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
    }),
    defineField({
      name: 'aboutSection',
      title: 'Deskripsi Tentang Kami',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email Kontak',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Nomor Telepon / WhatsApp',
      type: 'string',
    }),
  ],
})
