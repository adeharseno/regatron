import { HomeIcon } from '@sanity/icons/Home'
import { defineField, defineType } from 'sanity'

const localizedString = (id: string, en: string) => [
  {
    _key: 'homepage-id-string',
    _type: 'internationalizedArrayStringValue',
    language: 'id',
    value: id,
  },
  {
    _key: 'homepage-en-string',
    _type: 'internationalizedArrayStringValue',
    language: 'en',
    value: en,
  },
]

const localizedText = (id: string, en: string) => [
  {
    _key: 'homepage-id-text',
    _type: 'internationalizedArrayTextValue',
    language: 'id',
    value: id,
  },
  {
    _key: 'homepage-en-text',
    _type: 'internationalizedArrayTextValue',
    language: 'en',
    value: en,
  },
]

export const homePageType = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'Homepage Banner',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'heroTitleLine1',
      title: 'Judul Baris Pertama',
      description: 'Kalimat utama sebelum teks berwarna biru muda.',
      type: 'internationalizedArrayString',
      fieldset: 'hero',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'heroTitleLine2',
      title: 'Judul Baris Kedua',
      description: 'Bagian judul yang ditampilkan dengan aksen biru muda.',
      type: 'internationalizedArrayString',
      fieldset: 'hero',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Deskripsi',
      type: 'internationalizedArrayText',
      fieldset: 'hero',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'heroImage',
      title: 'Gambar Banner',
      type: 'image',
      fieldset: 'hero',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Alternative Text Gambar',
      description: 'Jelaskan isi gambar untuk aksesibilitas dan SEO.',
      type: 'internationalizedArrayString',
      fieldset: 'hero',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Label Tombol Utama',
      type: 'internationalizedArrayString',
      fieldset: 'hero',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'heroPrimaryCtaHref',
      title: 'Link Tombol Utama',
      type: 'string',
      fieldset: 'hero',
      description: 'Gunakan path internal seperti /contact atau URL lengkap https://...',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value || value.startsWith('/') || value.startsWith('https://')) return true
          return 'Gunakan path yang diawali / atau URL https://'
        }),
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Label Tombol Kedua',
      type: 'internationalizedArrayString',
      fieldset: 'hero',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'heroSecondaryCtaHref',
      title: 'Link Tombol Kedua',
      type: 'string',
      fieldset: 'hero',
      description: 'Gunakan path internal seperti /services atau URL lengkap https://...',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value || value.startsWith('/') || value.startsWith('https://')) return true
          return 'Gunakan path yang diawali / atau URL https://'
        }),
    }),
  ],
  initialValue: {
    heroTitleLine1: localizedString('Mengubah E-Waste Menjadi', 'Turning E-Waste Into'),
    heroTitleLine2: localizedString(
      'Masa Depan yang Lebih Bersih dan Aman',
      'A Cleaner, Safer Future',
    ),
    heroDescription: localizedText(
      'Daur ulang e-waste dan pemulihan material yang bertanggung jawab untuk bisnis, industri, dan institusi di seluruh Indonesia.',
      'Responsible e-waste recycling and material recovery for businesses, industries and institutions across Indonesia.',
    ),
    heroImageAlt: localizedString(
      'Fasilitas pengolahan e-waste industri REGATRON',
      'REGATRON industrial e-waste processing facility',
    ),
    heroPrimaryCtaLabel: localizedString('Konsultasi Gratis', 'Get Free Consultation'),
    heroPrimaryCtaHref: '/contact',
    heroSecondaryCtaLabel: localizedString('Lihat Layanan', 'Explore Services'),
    heroSecondaryCtaHref: '/services',
  },
  preview: {
    prepare() {
      return {
        title: 'Homepage',
        subtitle: 'Banner ID & EN',
      }
    },
  },
})
