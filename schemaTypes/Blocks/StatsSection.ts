import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview, blockStyleFields, seoFields} from '../pageBuilder.config'
import {BarChartIcon} from '@sanity/icons'
import type {StringRule, TextRule, ArrayRule} from '@sanity/types'

// TypeScript schema for StatsSection
const StatsSection = defineType({
  name: 'statsSection',
  type: 'object',
  title: 'Stats Section',
  icon: BarChartIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'stats', title: 'Statistics'},
    {name: 'layout', title: 'Layout'},
    {name: 'style', title: 'Style'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      description: 'The main heading for this statistics section',
      validation: (rule: StringRule) => rule.required().max(100),
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Section Subtitle',
      description: 'Optional subtitle displayed below the title',
      group: 'content',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Section Description',
      description: 'A brief description of this statistics section',
      validation: (rule: TextRule) => rule.max(200),
      group: 'content',
    }),
    defineField({
      name: 'stats',
      type: 'array',
      title: 'Statistics',
      description: 'Add statistics to display',
      validation: (rule: ArrayRule<{type: string}>) => rule.required().min(1),
      group: 'stats',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              description: 'Label for this statistic',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'value',
              type: 'string',
              title: 'Value',
              description: 'The statistical value to display',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
              description: 'Optional description or context for this statistic',
              validation: (rule: TextRule) => rule.max(100),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout Style',
      description: 'Choose how the statistics should be displayed',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'List', value: 'list'},
          {title: 'Carousel', value: 'carousel'},
        ],
      },
      initialValue: 'grid',
      group: 'layout',
    }),
    // Add style fields
    ...blockStyleFields.map((field) => ({...field, group: 'style'})),
    // Add SEO fields
    ...seoFields.map((field) => ({...field, group: 'seo'})),
  ],
  preview: {
    ...defaultBlockPreview,
    select: {
      title: 'title',
      stats: 'stats',
    },
    prepare(selection) {
      const {title, stats} = selection
      return {
        title: title || 'Stats Section',
        subtitle: `${stats?.length || 0} Statistics`,
        media: BarChartIcon,
      }
    },
  },
})

export default StatsSection
