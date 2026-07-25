import { PackageIcon } from '@sanity/icons/Package'
import { defineField, defineType } from 'sanity'

export const homeServiceItemType = defineType({
  name: 'homeServiceItem',
  title: 'Layanan Homepage',
  type: 'object',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'internationalizedArrayString',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi judul Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'internationalizedArrayText',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi deskripsi Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'image',
      title: 'Gambar',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) =>
        rule.warning(
          'Tambahkan gambar agar layanan tidak memakai gambar bawaan.',
        ),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Alternative Text Gambar',
      description: 'Jelaskan isi gambar untuk aksesibilitas dan SEO.',
      type: 'internationalizedArrayString',
      validation: (rule) =>
        rule
          .min(2)
          .warning('Lengkapi alternative text Bahasa Indonesia dan English.'),
    }),
  ],
  preview: {
    select: {
      title: 'title.0.value',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Layanan tanpa judul',
        media,
      }
    },
  },
})
