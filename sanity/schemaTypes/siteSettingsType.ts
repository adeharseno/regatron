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
      title: 'Hero Heading',
      type: 'string',
      description: 'Judul utama di halaman depan',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
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