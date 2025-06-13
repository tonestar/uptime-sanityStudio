import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'
import type {StringRule, UrlRule} from '@sanity/types'

const author = defineType({
  name: 'author',
  title: 'Authors',
  type: 'document',
  icon: UserIcon,
  groups: [
    {name: 'profile', title: 'Profile'},
    {name: 'social', title: 'Social Media'},
    {name: 'bio', title: 'Biography'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
      group: 'profile',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'profile',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        }),
      ],
      group: 'profile',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: "The author's role or position",
      group: 'profile',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 3,
      description: 'Brief biography of the author',
      validation: (rule) => rule.max(300),
      group: 'bio',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule: StringRule) => rule.email(),
      group: 'profile',
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'object',
      group: 'social',
      fields: [
        defineField({
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
          validation: (rule: UrlRule) => rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
          validation: (rule: UrlRule) => rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'github',
          title: 'GitHub URL',
          type: 'url',
          validation: (rule: UrlRule) => rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'website',
          title: 'Personal Website',
          type: 'url',
          validation: (rule: UrlRule) => rule.uri({scheme: ['http', 'https']}),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Unnamed Author',
        subtitle: subtitle || '',
        media: media || UserIcon,
      }
    },
  },
})

export default author
