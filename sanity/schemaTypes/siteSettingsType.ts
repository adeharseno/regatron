import { CogIcon } from '@sanity/icons/Cog'
import { defineArrayMember, defineField, defineType } from 'sanity'

const localizedString = (id: string, en: string) => [
  {
    _key: 'site-settings-id-string',
    _type: 'internationalizedArrayStringValue',
    language: 'id',
    value: id,
  },
  {
    _key: 'site-settings-en-string',
    _type: 'internationalizedArrayStringValue',
    language: 'en',
    value: en,
  },
]

const localizedText = (id: string, en: string) => [
  {
    _key: 'site-settings-id-text',
    _type: 'internationalizedArrayTextValue',
    language: 'id',
    value: id,
  },
  {
    _key: 'site-settings-en-text',
    _type: 'internationalizedArrayTextValue',
    language: 'en',
    value: en,
  },
]

const siteLink = (key: string, id: string, en: string, href: string) => ({
  _key: key,
  _type: 'siteLink',
  label: localizedString(id, en),
  href,
})

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Header, Footer & Contact Section',
  type: 'document',
  icon: CogIcon,
  fieldsets: [
    {
      name: 'header',
      title: 'Header',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'footer',
      title: 'Footer',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'contactSection',
      title: 'Contact Section di Atas Footer',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'legacy',
      title: 'Field Lama',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'headerLogo',
      title: 'Logo Header',
      type: 'image',
      fieldset: 'header',
      options: { hotspot: true },
      validation: (rule) =>
        rule.warning('Tambahkan logo agar header tidak memakai aset bawaan.'),
    }),
    defineField({
      name: 'headerLogoAlt',
      title: 'Alternative Text Logo',
      type: 'internationalizedArrayString',
      fieldset: 'header',
      validation: (rule) =>
        rule
          .min(2)
          .warning('Lengkapi alternative text Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'headerNavigation',
      title: 'Menu Navigasi',
      description: 'Item dapat ditambah, dihapus, dan diurutkan.',
      type: 'array',
      fieldset: 'header',
      of: [defineArrayMember({ type: 'siteLink' })],
    }),
    defineField({
      name: 'headerContactLabel',
      title: 'Label Tombol Kontak',
      type: 'internationalizedArrayString',
      fieldset: 'header',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi label Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'headerContactHref',
      title: 'Link Tombol Kontak',
      type: 'string',
      fieldset: 'header',
      description: 'Gunakan path internal seperti /contact atau URL https://...',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value || value.startsWith('/') || value.startsWith('https://')) {
            return true
          }

          return 'Gunakan path yang diawali / atau URL https://'
        }),
    }),
    defineField({
      name: 'companyName',
      title: 'Nama Perusahaan',
      type: 'string',
      fieldset: 'footer',
      initialValue: 'REGATRON',
    }),
    defineField({
      name: 'footerLogo',
      title: 'Logo Footer',
      type: 'image',
      fieldset: 'footer',
      options: { hotspot: true },
    }),
    defineField({
      name: 'footerLogoAlt',
      title: 'Alternative Text Logo Footer',
      type: 'internationalizedArrayString',
      fieldset: 'footer',
      validation: (rule) =>
        rule
          .min(2)
          .warning('Lengkapi alternative text Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'footerDescription',
      title: 'Deskripsi Perusahaan',
      type: 'internationalizedArrayText',
      fieldset: 'footer',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi deskripsi Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'footerNavigationHeading',
      title: 'Judul Kolom Navigasi',
      type: 'internationalizedArrayString',
      fieldset: 'footer',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi judul Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'footerNavigationLinks',
      title: 'Link Navigasi Footer',
      type: 'array',
      fieldset: 'footer',
      of: [defineArrayMember({ type: 'siteLink' })],
    }),
    defineField({
      name: 'footerLegalHeading',
      title: 'Judul Kolom Legal',
      type: 'internationalizedArrayString',
      fieldset: 'footer',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi judul Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'footerLegalLinks',
      title: 'Link Legal',
      type: 'array',
      fieldset: 'footer',
      of: [defineArrayMember({ type: 'siteLink' })],
    }),
    defineField({
      name: 'footerSocialHeading',
      title: 'Judul Kolom Media Sosial',
      type: 'internationalizedArrayString',
      fieldset: 'footer',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi judul Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'footerSocialLinks',
      title: 'Link Media Sosial',
      type: 'array',
      fieldset: 'footer',
      of: [defineArrayMember({ type: 'siteLink' })],
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Copyright',
      type: 'internationalizedArrayString',
      fieldset: 'footer',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi copyright Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'footerTagline',
      title: 'Tagline',
      type: 'internationalizedArrayString',
      fieldset: 'footer',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi tagline Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'footerLocation',
      title: 'Lokasi',
      type: 'internationalizedArrayString',
      fieldset: 'footer',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi lokasi Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'contactSectionHeading',
      title: 'Judul',
      type: 'internationalizedArrayString',
      fieldset: 'contactSection',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi judul Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'contactSectionDescription',
      title: 'Deskripsi',
      type: 'internationalizedArrayText',
      fieldset: 'contactSection',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi deskripsi Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'contactSectionPrimaryLabel',
      title: 'Label Tombol Utama',
      type: 'internationalizedArrayString',
      fieldset: 'contactSection',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi label Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'contactSectionPrimaryHref',
      title: 'Link Tombol Utama',
      type: 'string',
      fieldset: 'contactSection',
      description: 'Gunakan path internal seperti /contact atau URL https://...',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value || value.startsWith('/') || value.startsWith('https://')) {
            return true
          }

          return 'Gunakan path yang diawali / atau URL https://'
        }),
    }),
    defineField({
      name: 'contactSectionSecondaryLabel',
      title: 'Label Tombol Kedua',
      type: 'internationalizedArrayString',
      fieldset: 'contactSection',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi label Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'contactSectionSecondaryHref',
      title: 'Link Tombol Kedua',
      type: 'string',
      fieldset: 'contactSection',
      description: 'Gunakan path internal seperti /contact atau URL https://...',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value || value.startsWith('/') || value.startsWith('https://')) {
            return true
          }

          return 'Gunakan path yang diawali / atau URL https://'
        }),
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading (Deprecated)',
      type: 'string',
      fieldset: 'legacy',
      description: 'Gunakan dokumen Homepage untuk mengelola banner.',
      deprecated: {
        reason: 'Digantikan oleh field bilingual pada dokumen Homepage.',
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading (Deprecated)',
      type: 'text',
      rows: 3,
      fieldset: 'legacy',
      deprecated: {
        reason: 'Digantikan oleh field bilingual pada dokumen Homepage.',
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
    }),
    defineField({
      name: 'aboutSection',
      title: 'Deskripsi Tentang Kami (Deprecated)',
      type: 'array',
      fieldset: 'legacy',
      of: [defineArrayMember({ type: 'block' })],
      deprecated: {
        reason: 'Konten halaman About akan dikelola pada dokumen terpisah.',
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email Kontak Lama (Deprecated)',
      type: 'string',
      fieldset: 'legacy',
      deprecated: {
        reason: 'Gunakan link pada Footer atau Contact Section.',
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
    }),
    defineField({
      name: 'contactPhone',
      title: 'Nomor Telepon Lama (Deprecated)',
      type: 'string',
      fieldset: 'legacy',
      deprecated: {
        reason: 'Gunakan link pada Footer atau Contact Section.',
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
    }),
  ],
  initialValue: {
    companyName: 'REGATRON',
    headerLogoAlt: localizedString('Logo REGATRON', 'REGATRON logo'),
    headerNavigation: [
      siteLink('header-about', 'Tentang Kami', 'About Us', '/about'),
      siteLink('header-services', 'Servis E-Waste', 'E-Waste Service', '/services'),
      siteLink('header-catalog', 'Katalog E-Waste', 'E-Waste Catalog', '/catalog'),
      siteLink('header-news', 'Berita', 'News', '/news'),
    ],
    headerContactLabel: localizedString('Hubungi Kami', 'Contact Us'),
    headerContactHref: '/contact',
    footerLogoAlt: localizedString('Logo REGATRON', 'REGATRON logo'),
    footerDescription: localizedText(
      'Solusi tepercaya untuk ekstraksi logam mulia dan pengelolaan e-waste dengan standar lingkungan tertinggi. Pelopor industri elektronik sirkular Indonesia.',
      "Trusted solutions for precious metal extraction and e-waste management with the highest environmental standards. Indonesia's pioneer in circular electronics industry.",
    ),
    footerNavigationHeading: localizedString('Navigasi', 'Navigation'),
    footerNavigationLinks: [
      siteLink('footer-about', 'Tentang Kami', 'About Us', '/about'),
      siteLink('footer-services', 'Layanan & Solusi', 'Services & Solutions', '/services'),
      siteLink('footer-catalog', 'Katalog Produk', 'Product Catalog', '/catalog'),
      siteLink('footer-news', 'Pusat Berita', 'News Center', '/news'),
    ],
    footerLegalHeading: localizedString('Legal', 'Legal'),
    footerLegalLinks: [
      siteLink('footer-privacy', 'Kebijakan Privasi', 'Privacy Policy', '#'),
      siteLink('footer-terms', 'Syarat & Ketentuan', 'Terms & Conditions', '#'),
      siteLink('footer-certifications', 'Sertifikasi ISO', 'ISO Certifications', '#'),
    ],
    footerSocialHeading: localizedString('Media Sosial', 'Social Media'),
    footerSocialLinks: [
      siteLink('footer-linkedin', 'LinkedIn', 'LinkedIn', '#'),
      siteLink('footer-instagram', 'Instagram', 'Instagram', '#'),
      siteLink('footer-youtube', 'YouTube', 'YouTube', '#'),
    ],
    footerCopyright: localizedString(
      '© 2024 PT. Regar Karya Utama. Seluruh Hak Cipta Dilindungi.',
      '© 2024 PT. Regar Karya Utama. All Rights Reserved.',
    ),
    footerTagline: localizedString('Precision Enterprise', 'Precision Enterprise'),
    footerLocation: localizedString('Bekasi, Indonesia', 'Bekasi, Indonesia'),
    contactSectionHeading: localizedString(
      'Siap mengamankan rantai pasok Anda?',
      'Ready to secure your supply chain?',
    ),
    contactSectionDescription: localizedText(
      'Bergabunglah dengan ratusan perusahaan Indonesia dalam transisi menuju sirkularitas industri. Mari bangun masa depan yang lebih bersih bersama.',
      "Join hundreds of Indonesian enterprises in the transition to industrial circularity. Let's build a cleaner future together.",
    ),
    contactSectionPrimaryLabel: localizedString('Mulai Konsultasi', 'Start Consultation'),
    contactSectionPrimaryHref: '/contact',
    contactSectionSecondaryLabel: localizedString(
      'Ajukan Kunjungan Lokasi',
      'Request Site Visit',
    ),
    contactSectionSecondaryHref: '/contact',
  },
  preview: {
    prepare() {
      return {
        title: 'Header, Footer & Contact Section',
        subtitle: 'Konten global Bahasa Indonesia & English',
      }
    },
  },
})
