import { TagIcon } from '@sanity/icons/Tag'
import { defineField, defineType } from 'sanity'

export const catalogItemType = defineType({
  name: 'catalogItem',
  title: 'Material Katalog',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'order',
      title: 'Urutan',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'prefix',
      title: 'Prefix',
      type: 'string',
      validation: (rule) => rule.required().uppercase().max(8),
    }),
    defineField({
      name: 'code',
      title: 'Kode Barang',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'internationalizedArrayString',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'name',
      title: 'Nama / Deskripsi',
      type: 'internationalizedArrayString',
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
    select: { title: 'name.0.value', subtitle: 'code', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: title || 'Material tanpa nama',
      subtitle,
      media,
    }),
  },
  orderings: [
    {
      title: 'Urutan katalog',
      name: 'catalogOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
