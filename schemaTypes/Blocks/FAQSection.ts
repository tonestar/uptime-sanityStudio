import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview, blockStyleFields, seoFields} from '../pageBuilder.config'
import {HelpCircleIcon} from '@sanity/icons'
import type {StringRule, TextRule, ArrayRule} from '@sanity/types'

// TypeScript schema for FAQSection
const FAQSection = defineType({
  name: 'faqSection',
  type: 'object',
  title: 'FAQ Section',
  icon: HelpCircleIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'faqs', title: 'FAQs'},
    {name: 'categories', title: 'Categories'},
    {name: 'layout', title: 'Layout'},
    {name: 'style', title: 'Style'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Content Fields
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      description: 'The main heading for your FAQ section',
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
      description: 'A brief introduction to this FAQ section',
      validation: (rule: TextRule) => rule.max(200),
      group: 'content',
    }),

    // FAQ Categories
    defineField({
      name: 'categories',
      type: 'array',
      title: 'FAQ Categories',
      description: 'Create categories to organize your FAQs',
      group: 'categories',
      validation: (rule) =>
        rule.custom((categories: Array<{name: string}> | undefined) => {
          if (!categories) return true
          const names = new Set<string>()
          for (const category of categories) {
            if (names.has(category.name)) {
              return 'Category names must be unique'
            }
            names.add(category.name)
          }
          return true
        }),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Category Name',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Category Description',
              description: 'Optional description for this category',
            }),
            defineField({
              name: 'icon',
              type: 'string',
              title: 'Category Icon',
              description: 'Optional icon identifier for this category',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
            },
          },
        }),
      ],
    }),

    // FAQ Items
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQ Items',
      description: 'Add frequently asked questions and answers',
      group: 'faqs',
      validation: (rule: ArrayRule<{type: string}>) => rule.min(1),
      of: [
        defineArrayMember({
          type: 'object',
          groups: [
            {name: 'basic', title: 'Basic Info'},
            {name: 'content', title: 'Content'},
            {name: 'meta', title: 'Meta Info'},
          ],
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Question',
              validation: (rule: StringRule) => rule.required(),
              group: 'basic',
            }),
            defineField({
              name: 'answer',
              type: 'array',
              title: 'Answer',
              description: 'Rich text answer with formatting options',
              validation: (rule: ArrayRule<{type: string}>) => rule.required(),
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H4', value: 'h4'},
                    {title: 'Quote', value: 'blockquote'},
                  ],
                  lists: [
                    {title: 'Bullet', value: 'bullet'},
                    {title: 'Numbered', value: 'number'},
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                      {title: 'Code', value: 'code'},
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'URL',
                            validation: (rule) => rule.uri({allowRelative: true}),
                          },
                          {
                            name: 'openInNewTab',
                            type: 'boolean',
                            title: 'Open in New Tab',
                            initialValue: false,
                          },
                        ],
                      },
                    ],
                  },
                }),
                defineArrayMember({
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    defineField({
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                      description: 'Important for SEO and accessibility',
                      validation: (rule: StringRule) => rule.required(),
                    }),
                    defineField({
                      name: 'caption',
                      type: 'string',
                      title: 'Caption',
                      description: 'Optional caption for the image',
                    }),
                  ],
                }),
              ],
              group: 'content',
            }),
            defineField({
              name: 'categoryName',
              type: 'string',
              title: 'Category',
              description: 'Assign this FAQ to a category',
              options: {
                list: [], // This will be populated dynamically from the categories array
              },
              group: 'meta',
            }),
            defineField({
              name: 'tags',
              type: 'array',
              title: 'Tags',
              description: 'Add tags for better searchability',
              of: [{type: 'string'}],
              options: {
                layout: 'tags',
              },
              group: 'meta',
            }),
          ],
          preview: {
            select: {
              title: 'question',
              categoryName: 'categoryName',
              tags: 'tags',
            },
            prepare({title, categoryName, tags}) {
              return {
                title: title || 'Untitled FAQ',
                subtitle: `${categoryName ? `${categoryName} • ` : ''}${
                  tags?.length ? `${tags.join(', ')}` : ''
                }`,
              }
            },
          },
        }),
      ],
    }),

    // Layout Settings
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout Style',
      options: {
        list: [
          {title: 'Accordion', value: 'accordion'},
          {title: 'Grid', value: 'grid'},
          {title: 'List', value: 'list'},
          {title: 'Tabs', value: 'tabs'},
        ],
      },
      initialValue: 'accordion',
      group: 'layout',
    }),
    defineField({
      name: 'displayOptions',
      type: 'object',
      title: 'Display Options',
      group: 'layout',
      fields: [
        defineField({
          name: 'showCategories',
          type: 'boolean',
          title: 'Show Categories',
          description: 'Display category filters above the FAQs',
          initialValue: true,
        }),
        defineField({
          name: 'showSearch',
          type: 'boolean',
          title: 'Show Search',
          description: 'Add a search box to filter FAQs',
          initialValue: true,
        }),
        defineField({
          name: 'expandedByDefault',
          type: 'boolean',
          title: 'Expanded by Default',
          description: 'Show all FAQ answers expanded by default',
          initialValue: false,
        }),
      ],
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
      faqs: 'faqs',
      categories: 'categories',
    },
    prepare(selection) {
      const {title, faqs = [], categories = []} = selection
      return {
        title: title || 'FAQ Section',
        subtitle: `${faqs.length} FAQs • ${categories.length} Categories`,
        media: HelpCircleIcon,
      }
    },
  },
})

export default FAQSection
