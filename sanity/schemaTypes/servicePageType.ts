import { CogIcon } from '@sanity/icons/Cog'
import {
  ALL_FIELDS_GROUP,
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'

export const servicePageType = defineType({
  name: 'servicePage',
  title: 'E-Waste Service',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
    { name: 'hero', title: 'Banner', default: true },
    { name: 'lifecycle', title: 'Lifecycle' },
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
      name: 'lifecycleEyebrow',
      title: 'Eyebrow',
      type: 'internationalizedArrayString',
      group: 'lifecycle',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'lifecycleHeading',
      title: 'Judul',
      type: 'internationalizedArrayString',
      group: 'lifecycle',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'items',
      title: 'Tahapan Layanan',
      description: 'Urutan item menentukan posisi kartu.',
      type: 'array',
      group: 'lifecycle',
      of: [defineArrayMember({ type: 'servicePageItem' })],
      validation: (rule) => rule.required().min(1),
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
        title: 'E-Waste Service',
        subtitle: 'Konten halaman layanan',
        media,
      }
    },
  },
})
