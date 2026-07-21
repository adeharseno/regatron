import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Artikel / Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Artikel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tag',
      title: 'Kategori / Tag',
      type: 'string',
      options: {
        list: [
          { title: 'Industry Insights', value: 'Industry Insights' },
          { title: 'Sustainability', value: 'Sustainability' },
          { title: 'Technology', value: 'Technology' },
          { title: 'Company Update', value: 'Company Update' },
          { title: 'Event', value: 'Event' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan Singkat (SEO Description)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Isi Artikel',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
})