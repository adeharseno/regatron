import { HomeIcon } from '@sanity/icons/Home'
import { defineArrayMember, defineField, defineType } from 'sanity'

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
      name: 'seo',
      title: 'SEO Metadata',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'hero',
      title: 'Homepage Banner',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'problem',
      title: 'Masalah yang Kami Selesaikan',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'services',
      title: 'Preview Layanan',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'catalog',
      title: 'Preview Katalog',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'seoMetaTitle',
      title: 'Meta Title',
      description:
        'Judul yang tampil di tab browser dan hasil pencarian. Rekomendasi maksimal 60 karakter.',
      type: 'internationalizedArrayString',
      fieldset: 'seo',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi Meta Title Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'seoMetaDescription',
      title: 'Meta Description',
      description:
        'Ringkasan halaman untuk hasil pencarian. Rekomendasi 120–160 karakter.',
      type: 'internationalizedArrayText',
      fieldset: 'seo',
      validation: (rule) =>
        rule
          .min(2)
          .warning('Lengkapi Meta Description Bahasa Indonesia dan English.'),
    }),
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
      description:
        'Gunakan path internal seperti /contact atau URL lengkap https://...',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value || value.startsWith('/') || value.startsWith('https://'))
            return true
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
      description:
        'Gunakan path internal seperti /services atau URL lengkap https://...',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value || value.startsWith('/') || value.startsWith('https://'))
            return true
          return 'Gunakan path yang diawali / atau URL https://'
        }),
    }),
    defineField({
      name: 'problemHeading',
      title: 'Judul',
      type: 'internationalizedArrayString',
      fieldset: 'problem',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'problemDescription',
      title: 'Deskripsi',
      type: 'internationalizedArrayText',
      fieldset: 'problem',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Judul',
      type: 'internationalizedArrayString',
      fieldset: 'services',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'servicesDescription',
      title: 'Deskripsi',
      type: 'internationalizedArrayText',
      fieldset: 'services',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'servicesItems',
      title: 'Daftar Layanan',
      description: 'Urutan item menentukan posisi kartu pada homepage.',
      type: 'array',
      fieldset: 'services',
      of: [defineArrayMember({ type: 'homeServiceItem' })],
      validation: (rule) =>
        rule.max(4).warning('Desain homepage menampilkan maksimal 4 layanan.'),
    }),
    defineField({
      name: 'catalogHeading',
      title: 'Judul',
      type: 'internationalizedArrayString',
      fieldset: 'catalog',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'catalogDescription',
      title: 'Deskripsi',
      type: 'internationalizedArrayText',
      fieldset: 'catalog',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'catalogItems',
      title: 'Item Preview Katalog',
      description: 'Urutan item menentukan posisi kartu pada homepage.',
      type: 'array',
      fieldset: 'catalog',
      of: [defineArrayMember({ type: 'homeCatalogItem' })],
      validation: (rule) =>
        rule.max(4).warning('Desain homepage menampilkan maksimal 4 item.'),
    }),
  ],
  initialValue: {
    seoMetaTitle: localizedString(
      'REGATRON | Solusi Pengelolaan & Daur Ulang E-Waste Terpercaya',
      'REGATRON | Sustainable E-Waste Management & Recycling Solutions',
    ),
    seoMetaDescription: localizedText(
      'REGATRON menghadirkan solusi daur ulang, penjemputan, dan perdagangan e-waste secara menyeluruh di Indonesia. Bersama ciptakan lingkungan bersih dan aman.',
      'REGATRON provides end-to-end e-waste recycling, safe disposal, and scrap trading solutions in Indonesia. Turn electronic waste into a cleaner future today.',
    ),
    heroTitleLine1: localizedString(
      'Mengubah E-Waste Menjadi',
      'Turning E-Waste Into',
    ),
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
    heroPrimaryCtaLabel: localizedString(
      'Konsultasi Gratis',
      'Get Free Consultation',
    ),
    heroPrimaryCtaHref: '/contact',
    heroSecondaryCtaLabel: localizedString('Lihat Layanan', 'Explore Services'),
    heroSecondaryCtaHref: '/services',
    problemHeading: localizedString(
      'Masalah yang Kami Selesaikan',
      'The Problem We Solve',
    ),
    problemDescription: localizedText(
      'Setiap tahun, semakin banyak perangkat elektronik mencapai akhir masa pakainya — tanpa penanganan yang tepat, material di dalamnya bisa meresap ke tanah dan air, membahayakan masyarakat dan ekosistem. REGATRON hadir untuk memastikan hal itu tidak terjadi.',
      "Every year, more electronic devices reach the end of their life — and without proper handling, the materials inside them can leach into soil and water, putting communities and ecosystems at risk. REGATRON exists to make sure that doesn't happen.",
    ),
    servicesHeading: localizedString(
      'Yang Membedakan Kami',
      'What Sets Us Apart',
    ),
    servicesDescription: localizedText(
      'Solusi end-to-end untuk pengelolaan limbah elektronik bernilai tinggi dengan efisiensi pemulihan material maksimal.',
      'End-to-end solutions for high-value electronic waste management with maximum material recovery efficiency.',
    ),
    servicesItems: [
      {
        _key: 'service-collection',
        _type: 'homeServiceItem',
        title: localizedString('Penjemputan E-Waste', 'E-Waste Collection'),
        description: localizedText(
          'Logistik tersertifikasi untuk penjemputan limbah dari rumah tangga, kantor, dan kawasan industri.',
          'Certified logistics for waste collection from households, offices, and industrial zones.',
        ),
        imageAlt: localizedString(
          'Penjemputan e-waste oleh REGATRON',
          'E-waste collection by REGATRON',
        ),
      },
      {
        _key: 'service-sorting',
        _type: 'homeServiceItem',
        title: localizedString('Sortir & Analisis', 'Sorting & Analysis'),
        description: localizedText(
          'Pemisahan material menggunakan teknologi AI untuk mengidentifikasi kandungan logam mulia dengan presisi tinggi.',
          'Material separation using AI technology to identify precious metal content with high precision.',
        ),
        imageAlt: localizedString(
          'Proses sortir dan analisis e-waste',
          'E-waste sorting and analysis process',
        ),
      },
      {
        _key: 'service-refining',
        _type: 'homeServiceItem',
        title: localizedString('Eco-Refining', 'Eco-Refining'),
        description: localizedText(
          'Ekstraksi logam mulia menggunakan metode hidrometalurgi ramah lingkungan dengan emisi karbon minimal.',
          'Precious metal extraction using eco-friendly hydrometallurgical methods with minimal carbon emissions.',
        ),
        imageAlt: localizedString(
          'Proses eco-refining REGATRON',
          'REGATRON eco-refining process',
        ),
      },
      {
        _key: 'service-supply',
        _type: 'homeServiceItem',
        title: localizedString('Pasokan Material', 'Material Supply'),
        description: localizedText(
          'Distribusi material hasil ekstraksi ke produsen teknologi global untuk mendukung ekonomi sirkular.',
          'Distribution of extracted materials to global technology manufacturers to support the circular economy.',
        ),
        imageAlt: localizedString(
          'Pasokan material hasil pemulihan',
          'Recovered material supply',
        ),
      },
    ],
    catalogHeading: localizedString('Produk Kami', 'Our Products'),
    catalogDescription: localizedText(
      'Katalog material hasil ekstraksi dengan tingkat kemurnian tinggi, siap diintegrasikan kembali ke rantai pasok manufaktur global.',
      'Catalog of extracted materials with high purity levels, ready for reintegration into the global manufacturing supply chain.',
    ),
    catalogItems: [
      {
        _key: 'catalog-pcb',
        _type: 'homeCatalogItem',
        title: localizedString('Scrap PCB', 'Scrap PCB'),
        description: localizedText(
          'Papan sirkuit dari berbagai perangkat elektronik dengan kandungan logam mulia yang dioptimalkan untuk proses pemurnian.',
          'Printed circuit boards from various electronic devices with precious metal content optimized for the refining process.',
        ),
        details: localizedString(
          'Motherboard • Server Board • PCB Laptop • PCB Desktop',
          'Motherboards • Server Boards • Laptop PCB • Desktop PCB',
        ),
      },
      {
        _key: 'catalog-chip',
        _type: 'homeCatalogItem',
        title: localizedString('IC & Chip Scrap', 'IC & Chip Scrap'),
        description: localizedText(
          'Komponen semikonduktor dengan konsentrasi emas dan perak tinggi.',
          'Semiconductor components with high gold and silver concentrations.',
        ),
        details: localizedString(
          'BGA • RAM • CPU • GPU',
          'BGA • RAM • CPU • GPU',
        ),
      },
      {
        _key: 'catalog-connectors',
        _type: 'homeCatalogItem',
        title: localizedString('Konektor PM', 'PM Connectors'),
        description: localizedText(
          'Konektor berlapis emas dan soket presisi tinggi.',
          'Gold-plated connectors and high-precision sockets.',
        ),
        details: localizedString(
          'Berlapis Emas • Soket CPU',
          'Gold-Plated • CPU Sockets',
        ),
      },
      {
        _key: 'catalog-components',
        _type: 'homeCatalogItem',
        title: localizedString(
          'Kapasitor & Resistor',
          'Capacitors & Resistors',
        ),
        description: localizedText(
          'Komponen pasif mengandung palladium dan perak, diproses melalui pemisahan mekanis presisi.',
          'Passive components containing palladium and silver, processed through precision mechanical separation.',
        ),
        details: localizedString('Industrial Grade', 'Industrial Grade'),
      },
    ],
  },
  preview: {
    prepare() {
      return {
        title: 'Homepage',
        subtitle: 'Seluruh konten Homepage ID & EN',
      }
    },
  },
})
