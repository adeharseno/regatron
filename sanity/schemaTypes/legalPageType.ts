import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import {
  ALL_FIELDS_GROUP,
  defineField,
  defineType,
} from 'sanity'

export const legalPageType = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
    {
      name: 'content',
      title: 'Konten',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Halaman',
      type: 'internationalizedArrayString',
      group: 'content',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'body',
      title: 'Isi Halaman',
      description:
        'Konten legal awal adalah template dan sebaiknya ditinjau penasihat hukum.',
      type: 'internationalizedArrayText',
      group: 'content',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Tanggal Terakhir Diperbarui',
      type: 'date',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'internationalizedArrayString',
      group: 'seo',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'internationalizedArrayText',
      group: 'seo',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi Bahasa Indonesia dan English.'),
    }),
  ],
  preview: {
    select: {
      title: 'title.0.value',
      lastUpdated: 'lastUpdated',
    },
    prepare({ title, lastUpdated }) {
      return {
        title: title || 'Legal Page',
        subtitle: lastUpdated
          ? `Diperbarui ${new Date(lastUpdated).toLocaleDateString('id-ID')}`
          : 'Belum memiliki tanggal',
      }
    },
  },
})
