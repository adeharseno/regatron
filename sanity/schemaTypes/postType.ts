import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { defineArrayMember, defineField, defineType } from 'sanity'

type LocalizedTitleItem = {
  language?: string
  value?: string
}

function getSlugSource(document: Record<string, unknown>) {
  const localizedTitle = Array.isArray(document.titleI18n)
    ? (document.titleI18n as LocalizedTitleItem[])
    : []

  return (
    localizedTitle.find((item) => item.language === 'id')?.value ||
    localizedTitle.find((item) => item.language === 'en')?.value ||
    localizedTitle[0]?.value ||
    (typeof document.title === 'string' ? document.title : '')
  )
}

export const postType = defineType({
  name: 'post',
  title: 'Artikel / Posts',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: 'content',
      title: 'Konten Bilingual',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'seo',
      title: 'SEO & Metadata',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'settings',
      title: 'Pengaturan Artikel',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'titleI18n',
      title: 'Judul Artikel',
      type: 'internationalizedArrayString',
      fieldset: 'content',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi judul Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'tagI18n',
      title: 'Kategori / Tag',
      type: 'internationalizedArrayString',
      fieldset: 'content',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi tag Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'bodyI18n',
      title: 'Isi Artikel',
      type: 'internationalizedArrayPostBody',
      fieldset: 'content',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi artikel Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'metaTitleI18n',
      title: 'Meta Title',
      type: 'internationalizedArrayString',
      fieldset: 'seo',
      description:
        'Judul yang tampil pada hasil pencarian. Jika kosong, judul artikel akan digunakan.',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi Meta Title Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'metaDescriptionI18n',
      title: 'Meta Description',
      type: 'internationalizedArrayText',
      fieldset: 'seo',
      description:
        'Deskripsi untuk hasil pencarian dan ringkasan artikel pada website.',
      validation: (rule) =>
        rule
          .min(2)
          .warning('Lengkapi Meta Description Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'metaKeywordsI18n',
      title: 'Meta Keywords',
      type: 'internationalizedArrayString',
      fieldset: 'seo',
      description: 'Pisahkan setiap keyword menggunakan koma.',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi Meta Keywords Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      fieldset: 'settings',
      description: 'Slug digunakan bersama untuk URL versi ID dan EN.',
      options: {
        source: getSlugSource,
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      fieldset: 'settings',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mainImageAlt',
      title: 'Alternative Text Gambar',
      type: 'internationalizedArrayString',
      fieldset: 'settings',
      validation: (rule) =>
        rule
          .min(2)
          .warning('Lengkapi alternative text Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      fieldset: 'settings',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'title',
      title: 'Judul Artikel Lama',
      type: 'string',
      deprecated: {
        reason: 'Gunakan Judul Artikel bilingual.',
      },
      readOnly: true,
      hidden: true,
      initialValue: undefined,
    }),
    defineField({
      name: 'tag',
      title: 'Kategori / Tag Lama',
      type: 'string',
      deprecated: {
        reason: 'Gunakan Kategori / Tag bilingual.',
      },
      readOnly: true,
      hidden: true,
      initialValue: undefined,
    }),
    defineField({
      name: 'excerptI18n',
      title: 'Ringkasan Bilingual Lama',
      type: 'internationalizedArrayText',
      deprecated: {
        reason: 'Gunakan Meta Description.',
      },
      readOnly: true,
      hidden: true,
      initialValue: undefined,
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan Lama',
      type: 'text',
      rows: 3,
      deprecated: {
        reason: 'Gunakan Meta Description.',
      },
      readOnly: true,
      hidden: true,
      initialValue: undefined,
    }),
    defineField({
      name: 'body',
      title: 'Isi Artikel Lama',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'image' }),
      ],
      deprecated: {
        reason: 'Gunakan Isi Artikel bilingual.',
      },
      readOnly: true,
      hidden: true,
      initialValue: undefined,
    }),
  ],
  preview: {
    select: {
      localizedTitle: 'titleI18n.0.value',
      legacyTitle: 'title',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare({ localizedTitle, legacyTitle, media, publishedAt }) {
      return {
        title: localizedTitle || legacyTitle || 'Artikel tanpa judul',
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString('id-ID')
          : 'Belum memiliki tanggal publikasi',
        media,
      }
    },
  },
})
