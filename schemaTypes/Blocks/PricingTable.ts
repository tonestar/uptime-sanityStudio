import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview, blockStyleFields, seoFields} from '../pageBuilder.config'
import {TagIcon} from '@sanity/icons'
import type {StringRule, TextRule, ArrayRule, UrlRule} from '@sanity/types'

// TypeScript schema for PricingTable
const PricingTable = defineType({
  name: 'pricingTable',
  type: 'object',
  title: 'Pricing Table',
  icon: TagIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'plans', title: 'Pricing Plans'},
    {name: 'layout', title: 'Layout'},
    {name: 'style', title: 'Style'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      description: 'The main heading for this pricing section',
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
      description: 'A brief description of your pricing plans',
      validation: (rule: TextRule) => rule.max(200),
      group: 'content',
    }),
    defineField({
      name: 'plans',
      type: 'array',
      title: 'Pricing Plans',
      description: 'Add and arrange your pricing plans',
      validation: (rule: ArrayRule<{type: string}>) => rule.required().min(1),
      group: 'plans',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Plan Name',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'price',
              type: 'string',
              title: 'Price',
              description: 'The price of this plan (e.g. "$29/mo")',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Plan Description',
              description: 'Brief description of this pricing plan',
              validation: (rule: TextRule) => rule.max(200),
            }),
            defineField({
              name: 'features',
              type: 'array',
              title: 'Features',
              description: 'List of features included in this plan',
              of: [defineArrayMember({type: 'string'})],
              validation: (rule: ArrayRule<{type: string}>) => rule.required().min(1),
            }),
            defineField({
              name: 'buttonText',
              type: 'string',
              title: 'Button Text',
              description: 'Text to display on the call-to-action button',
              validation: (rule: StringRule) => rule.required(),
              initialValue: 'Get Started',
            }),
            defineField({
              name: 'buttonLink',
              type: 'url',
              title: 'Button Link',
              description: 'Where the button should link to',
              validation: (rule: UrlRule) => rule.uri({allowRelative: true}),
            }),
            defineField({
              name: 'highlight',
              type: 'boolean',
              title: 'Highlight Plan',
              description: 'Highlight this as the recommended or popular plan',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
              description: 'description',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout Style',
      description: 'Choose how the pricing plans should be displayed',
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
      plans: 'plans',
    },
    prepare(selection) {
      const {title, plans} = selection
      return {
        title: title || 'Pricing Table',
        subtitle: `${plans?.length || 0} Pricing Plans`,
        media: TagIcon,
      }
    },
  },
})

export default PricingTable
