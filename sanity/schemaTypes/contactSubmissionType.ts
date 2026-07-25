import { UserIcon } from '@sanity/icons/User'
import { defineField, defineType } from 'sanity'

export const contactSubmissionType = defineType({
  name: 'contactSubmission',
  title: 'Contact Form Submission',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        layout: 'radio',
        list: [
          { title: 'Baru', value: 'new' },
          { title: 'Sudah Dihubungi', value: 'contacted' },
          { title: 'Selesai', value: 'closed' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Nama Lengkap',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Perusahaan',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Telepon',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.email().required(),
    }),
    defineField({
      name: 'inquiryType',
      title: 'Jenis Kebutuhan',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Pesan',
      type: 'text',
      rows: 6,
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locale',
      title: 'Bahasa Halaman',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          { title: 'Bahasa Indonesia', value: 'id' },
          { title: 'English', value: 'en' },
        ],
      },
    }),
    defineField({
      name: 'submittedAt',
      title: 'Waktu Submit',
      type: 'datetime',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Terbaru',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      fullName: 'fullName',
      email: 'email',
      submittedAt: 'submittedAt',
    },
    prepare({ fullName, email, submittedAt }) {
      const submittedDate = submittedAt
        ? new Date(submittedAt).toLocaleString('id-ID')
        : 'Tanpa tanggal'

      return {
        title: fullName || 'Submission tanpa nama',
        subtitle: `${email || 'Tanpa email'} • ${submittedDate}`,
      }
    },
  },
})
