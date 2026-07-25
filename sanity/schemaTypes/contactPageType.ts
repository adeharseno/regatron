import { EnvelopeIcon } from '@sanity/icons/Envelope'
import {
  ALL_FIELDS_GROUP,
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'

const localizedString = (id: string, en: string) => [
  {
    _key: 'contact-page-id-string',
    _type: 'internationalizedArrayStringValue',
    language: 'id',
    value: id,
  },
  {
    _key: 'contact-page-en-string',
    _type: 'internationalizedArrayStringValue',
    language: 'en',
    value: en,
  },
]

const localizedText = (id: string, en: string) => [
  {
    _key: 'contact-page-id-text',
    _type: 'internationalizedArrayTextValue',
    language: 'id',
    value: id,
  },
  {
    _key: 'contact-page-en-text',
    _type: 'internationalizedArrayTextValue',
    language: 'en',
    value: en,
  },
]

const inquiryOption = (key: string, id: string, en: string) => ({
  _key: key,
  _type: 'contactInquiryOption',
  label: localizedString(id, en),
})

const localizedStringField = (
  name: string,
  title: string,
  group: string,
) =>
  defineField({
    name,
    title,
    type: 'internationalizedArrayString',
    group,
    validation: (rule) =>
      rule.min(2).warning('Lengkapi Bahasa Indonesia dan English.'),
  })

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Konten Halaman Contact Us',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
    {
      name: 'intro',
      title: 'Judul & Deskripsi',
      default: true,
    },
    {
      name: 'details',
      title: 'Informasi Kontak',
    },
    {
      name: 'form',
      title: 'Konten Form',
    },
  ],
  fields: [
    localizedStringField('heading', 'Judul Halaman', 'intro'),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'internationalizedArrayText',
      group: 'intro',
      validation: (rule) =>
        rule
          .min(2)
          .warning('Lengkapi deskripsi Bahasa Indonesia dan English.'),
    }),
    localizedStringField('addressLabel', 'Label Alamat', 'details'),
    defineField({
      name: 'address',
      title: 'Alamat',
      type: 'internationalizedArrayText',
      group: 'details',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi alamat Bahasa Indonesia dan English.'),
    }),
    localizedStringField('phoneLabel', 'Label Telepon', 'details'),
    defineField({
      name: 'phone',
      title: 'Nomor Telepon / WhatsApp',
      type: 'string',
      group: 'details',
    }),
    localizedStringField('emailLabel', 'Label Email', 'details'),
    defineField({
      name: 'email',
      title: 'Alamat Email',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.email(),
    }),
    localizedStringField('fullNameLabel', 'Label Nama Lengkap', 'form'),
    localizedStringField('companyLabel', 'Label Perusahaan', 'form'),
    localizedStringField('formPhoneLabel', 'Label Telepon Form', 'form'),
    localizedStringField('formEmailLabel', 'Label Email Form', 'form'),
    localizedStringField(
      'inquiryTypeLabel',
      'Label Jenis Kebutuhan',
      'form',
    ),
    defineField({
      name: 'inquiryOptions',
      title: 'Pilihan Jenis Kebutuhan',
      description: 'Pilihan dapat ditambah, dihapus, dan diurutkan.',
      type: 'array',
      group: 'form',
      of: [defineArrayMember({ type: 'contactInquiryOption' })],
      validation: (rule) => rule.min(1).warning('Tambahkan minimal satu pilihan.'),
    }),
    localizedStringField('messageLabel', 'Label Pesan', 'form'),
    localizedStringField('submitLabel', 'Label Tombol Kirim', 'form'),
    localizedStringField(
      'submittingLabel',
      'Label Saat Sedang Mengirim',
      'form',
    ),
    localizedStringField('successMessage', 'Pesan Berhasil', 'form'),
    localizedStringField('errorMessage', 'Pesan Gagal', 'form'),
  ],
  initialValue: {
    heading: localizedString('Hubungi Kami', 'Get in Touch'),
    description: localizedText(
      'Baik Anda butuh penjemputan e-waste, ingin mendapatkan pasokan scrap berkualitas, atau menjajaki kerja sama — kami ingin mendengar dari Anda.',
      "Whether you need e-waste collected, want to source high-quality scrap materials, or are exploring a partnership — we'd like to hear from you.",
    ),
    addressLabel: localizedString('Kantor Pusat', 'Head Office'),
    address: localizedText(
      'Jababeka Industrial Estate Phase III, Cikarang, Bekasi, Jawa Barat 17530',
      'Jababeka Industrial Estate Phase III, Cikarang, Bekasi, West Java 17530',
    ),
    phoneLabel: localizedString('Telepon/WhatsApp', 'Phone/WhatsApp'),
    phone: '+62 8-596-055-6937',
    emailLabel: localizedString('Email', 'Email'),
    email: 'faisalregar30@gmail.com',
    fullNameLabel: localizedString('Nama Lengkap', 'Full Name'),
    companyLabel: localizedString(
      'Perusahaan (opsional)',
      'Company (optional)',
    ),
    formPhoneLabel: localizedString('Telepon', 'Phone'),
    formEmailLabel: localizedString('Email Bisnis', 'Business Email'),
    inquiryTypeLabel: localizedString('Jenis Kebutuhan', 'Inquiry Type'),
    inquiryOptions: [
      inquiryOption(
        'contact-pickup',
        'Penjemputan E-Waste',
        'E-Waste Pickup',
      ),
      inquiryOption(
        'contact-trading',
        'Sourcing & Trading',
        'Sourcing & Trading',
      ),
      inquiryOption('contact-partnership', 'Kemitraan', 'Partnership'),
      inquiryOption('contact-other', 'Lainnya', 'Other'),
    ],
    messageLabel: localizedString('Pesan', 'Message'),
    submitLabel: localizedString('Kirim Pesan', 'Send Message'),
    submittingLabel: localizedString('Mengirim...', 'Sending...'),
    successMessage: localizedString(
      'Pesan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.',
      'Your message has been sent. Our team will contact you shortly.',
    ),
    errorMessage: localizedString(
      'Pesan belum dapat dikirim. Periksa data Anda atau coba lagi.',
      'Your message could not be sent. Check your details or try again.',
    ),
  },
  preview: {
    prepare() {
      return {
        title: 'Konten Halaman Contact Us',
        subtitle: 'Konten bilingual Bahasa Indonesia & English',
      }
    },
  },
})
