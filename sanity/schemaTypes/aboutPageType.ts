import { UsersIcon } from '@sanity/icons/Users'
import {
  ALL_FIELDS_GROUP,
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'

const localizedStringField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'internationalizedArrayString',
    validation: (rule) => rule.required().min(2),
  })

const localizedTextField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'internationalizedArrayText',
    validation: (rule) => rule.required().min(2),
  })

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Us',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { ...ALL_FIELDS_GROUP, hidden: true },
    { name: 'hero', title: 'Banner', default: true },
    { name: 'profile', title: 'Profil' },
    { name: 'vision', title: 'Visi & Nilai' },
    { name: 'timeline', title: 'Timeline' },
    { name: 'leadership', title: 'Tim' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ ...localizedStringField('heroTitle', 'Judul'), group: 'hero' }),
    defineField({ ...localizedTextField('heroDescription', 'Deskripsi'), group: 'hero' }),
    defineField({
      name: 'heroImage',
      title: 'Gambar',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    defineField({ ...localizedStringField('heroImageAlt', 'Alternative Text Gambar'), group: 'hero' }),
    defineField({ ...localizedStringField('heroPrimaryLabel', 'Label Tombol Utama'), group: 'hero' }),
    defineField({
      name: 'heroPrimaryHref',
      title: 'Link Tombol Utama',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({ ...localizedStringField('heroSecondaryLabel', 'Label Tombol Kedua'), group: 'hero' }),
    defineField({
      name: 'heroSecondaryHref',
      title: 'Link Tombol Kedua',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({ ...localizedStringField('profileHeading', 'Judul'), group: 'profile' }),
    defineField({ ...localizedTextField('profileParagraph1', 'Paragraf Pertama'), group: 'profile' }),
    defineField({ ...localizedTextField('profileParagraph2', 'Paragraf Kedua'), group: 'profile' }),
    defineField({ ...localizedStringField('profileHighlightLabel', 'Label Sorotan'), group: 'profile' }),
    defineField({ ...localizedTextField('profileHighlight', 'Isi Sorotan'), group: 'profile' }),
    defineField({
      name: 'profileImage',
      title: 'Gambar',
      type: 'image',
      group: 'profile',
      options: { hotspot: true },
    }),
    defineField({ ...localizedStringField('profileImageAlt', 'Alternative Text Gambar'), group: 'profile' }),
    defineField({ ...localizedStringField('visionLabel', 'Label Visi'), group: 'vision' }),
    defineField({ ...localizedTextField('visionStatement', 'Pernyataan Visi'), group: 'vision' }),
    defineField({ ...localizedStringField('missionLabel', 'Label Misi'), group: 'vision' }),
    defineField({
      name: 'missions',
      title: 'Daftar Misi',
      type: 'array',
      group: 'vision',
      of: [
        defineArrayMember({
          name: 'missionItem',
          title: 'Misi',
          type: 'object',
          fields: [localizedStringField('text', 'Teks')],
          preview: { select: { title: 'text.0.value' } },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ ...localizedStringField('valuesEyebrow', 'Eyebrow Nilai'), group: 'vision' }),
    defineField({ ...localizedStringField('valuesHeading', 'Judul Nilai'), group: 'vision' }),
    defineField({ ...localizedTextField('valuesDescription', 'Deskripsi Nilai'), group: 'vision' }),
    defineField({
      name: 'values',
      title: 'Daftar Nilai',
      type: 'array',
      group: 'vision',
      of: [
        defineArrayMember({
          name: 'valueItem',
          title: 'Nilai',
          type: 'object',
          fields: [localizedStringField('text', 'Teks')],
          preview: { select: { title: 'text.0.value' } },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ ...localizedStringField('timelineHeading', 'Judul'), group: 'timeline' }),
    defineField({ ...localizedTextField('timelineDescription', 'Deskripsi'), group: 'timeline' }),
    defineField({
      name: 'milestones',
      title: 'Milestone',
      type: 'array',
      group: 'timeline',
      of: [
        defineArrayMember({
          name: 'milestone',
          title: 'Milestone',
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Tahun',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            localizedStringField('label', 'Label'),
            localizedTextField('description', 'Deskripsi'),
          ],
          preview: { select: { title: 'year', subtitle: 'label.0.value' } },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ ...localizedStringField('leadershipHeading', 'Judul'), group: 'leadership' }),
    defineField({ ...localizedTextField('leadershipDescription', 'Deskripsi'), group: 'leadership' }),
    defineField({
      name: 'members',
      title: 'Anggota Tim',
      type: 'array',
      group: 'leadership',
      of: [
        defineArrayMember({
          name: 'teamMember',
          title: 'Anggota Tim',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nama',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            localizedStringField('role', 'Jabatan'),
            defineField({
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: { hotspot: true },
            }),
            localizedStringField('imageAlt', 'Alternative Text Foto'),
          ],
          preview: {
            select: { title: 'name', subtitle: 'role.0.value', media: 'image' },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ ...localizedStringField('seoTitle', 'Meta Title'), group: 'seo' }),
    defineField({ ...localizedTextField('seoDescription', 'Meta Description'), group: 'seo' }),
  ],
  preview: {
    select: { media: 'heroImage' },
    prepare: ({ media }) => ({
      title: 'About Us',
      subtitle: 'Konten halaman tentang REGATRON',
      media,
    }),
  },
})
