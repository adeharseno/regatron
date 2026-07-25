import { BlockContentIcon } from '@sanity/icons/BlockContent'
import { defineArrayMember, defineType } from 'sanity'

export const postBodyType = defineType({
  name: 'postBody',
  title: 'Isi Artikel',
  type: 'array',
  icon: BlockContentIcon,
  of: [
    defineArrayMember({ type: 'block' }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
