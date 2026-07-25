import { TagIcon } from '@sanity/icons/Tag'
import { defineField, defineType } from 'sanity'

export const homeCatalogItemType = defineType({
  name: 'homeCatalogItem',
  title: 'Item Preview Katalog',
  type: 'object',
  icon: TagIcon,
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
      name: 'details',
      title: 'Detail Singkat',
      description: 'Contoh: Motherboard • Server Board • PCB Laptop',
      type: 'internationalizedArrayString',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi detail Bahasa Indonesia dan English.'),
    }),
  ],
  preview: {
    select: {
      title: 'title.0.value',
      subtitle: 'details.0.value',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Item katalog tanpa judul',
        subtitle,
      }
    },
  },
})
