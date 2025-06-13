import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'
import type {StringRule} from '@sanity/types'

const category = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Color used to visually identify the category',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Green', value: 'green'},
          {title: 'Red', value: 'red'},
          {title: 'Purple', value: 'purple'},
          {title: 'Orange', value: 'orange'},
          {title: 'Pink', value: 'pink'},
          {title: 'Gray', value: 'gray'},
        ],
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from your icon set',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Category',
      type: 'boolean',
      description: 'Show this category prominently in listings',
      initialValue: false,
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Optional parent category for hierarchical organization',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      featured: 'featured',
      color: 'color',
    },
    prepare({title, subtitle, featured, color}) {
      const featuredIndicator = featured ? ' ★' : ''
      const colorIndicator = color ? ` • ${color}` : ''

      return {
        title: title || 'Untitled Category',
        subtitle: `${subtitle || ''}${colorIndicator}${featuredIndicator}`,
        media: TagIcon,
      }
    },
  },
})

export default category
