import { PackageIcon } from '@sanity/icons/Package'
import { defineField, defineType } from 'sanity'

export const servicePageItemType = defineType({
  name: 'servicePageItem',
  title: 'Tahap Layanan',
  type: 'object',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'internationalizedArrayText',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'image',
      title: 'Gambar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Alternative Text Gambar',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.min(2),
    }),
  ],
  preview: {
    select: { title: 'title.0.value', media: 'image' },
    prepare: ({ title, media }) => ({ title: title || 'Tahap layanan', media }),
  },
})
