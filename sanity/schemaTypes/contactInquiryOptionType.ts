import { TagIcon } from '@sanity/icons/Tag'
import { defineField, defineType } from 'sanity'

export const contactInquiryOptionType = defineType({
  name: 'contactInquiryOption',
  title: 'Pilihan Kebutuhan',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'internationalizedArrayString',
      validation: (rule) =>
        rule
          .min(2)
          .warning('Lengkapi label Bahasa Indonesia dan English.'),
    }),
  ],
  preview: {
    select: {
      title: 'label.0.value',
    },
    prepare({ title }) {
      return {
        title: title || 'Pilihan tanpa label',
      }
    },
  },
})
