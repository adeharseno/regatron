import { DocumentsIcon } from '@sanity/icons/Documents'
import { ALL_FIELDS_GROUP, defineField, defineType } from 'sanity'

export const catalogPageType = defineType({
  name: 'catalogPage',
  title: 'E-Waste Catalog',
  type: 'document',
  icon: DocumentsIcon,
  groups: [
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
    { name: 'hero', title: 'Banner', default: true },
    { name: 'catalog', title: 'Katalog' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Judul',
      type: 'internationalizedArrayString',
      group: 'hero',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'heroQuote',
      title: 'Kutipan',
      type: 'internationalizedArrayText',
      group: 'hero',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'heroImage',
      title: 'Gambar',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Alternative Text Gambar',
      type: 'internationalizedArrayString',
      group: 'hero',
      validation: (rule) => rule.min(2),
    }),
    defineField({
      name: 'catalogEyebrow',
      title: 'Eyebrow',
      type: 'internationalizedArrayString',
      group: 'catalog',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'catalogHeading',
      title: 'Judul',
      type: 'internationalizedArrayString',
      group: 'catalog',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'seoTitle',
      title: 'Meta Title',
      type: 'internationalizedArrayString',
      group: 'seo',
      validation: (rule) => rule.min(2),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'internationalizedArrayText',
      group: 'seo',
      validation: (rule) => rule.min(2),
    }),
  ],
  preview: {
    select: {
      media: 'heroImage',
    },
    prepare({ media }) {
      return {
        title: 'E-Waste Catalog',
        subtitle: 'Konten halaman katalog',
        media,
      }
    },
  },
})
