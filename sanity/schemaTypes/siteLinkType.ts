import { LinkIcon } from '@sanity/icons/Link'
import { defineField, defineType } from 'sanity'

export const siteLinkType = defineType({
  name: 'siteLink',
  title: 'Link Website',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'internationalizedArrayString',
      validation: (rule) =>
        rule.min(2).warning('Lengkapi label Bahasa Indonesia dan English.'),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description:
        'Gunakan path internal seperti /about, URL https://, mailto:, tel:, atau #.',
      validation: (rule) =>
        rule.custom((value) => {
          if (
            !value ||
            value.startsWith('/') ||
            value.startsWith('https://') ||
            value.startsWith('mailto:') ||
            value.startsWith('tel:') ||
            value.startsWith('#')
          ) {
            return true
          }

          return 'Gunakan path internal, URL https://, mailto:, tel:, atau #'
        }),
    }),
  ],
  preview: {
    select: {
      title: 'label.0.value',
      subtitle: 'href',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Link tanpa label',
        subtitle,
      }
    },
  },
})
