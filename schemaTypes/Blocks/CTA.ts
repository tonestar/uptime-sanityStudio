import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview, blockStyleFields, seoFields} from '../pageBuilder.config'
import {RocketIcon} from '@sanity/icons'
import type {StringRule, UrlRule} from '@sanity/types'

const CTA = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'layout', title: 'Layout'},
    {name: 'style', title: 'Style'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main heading for this call to action',
      validation: (rule: StringRule) => rule.required().max(100),
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'A supporting subtitle to provide additional context',
      validation: (rule: StringRule) => rule.max(200),
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'The main content of the call to action',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Button',
      type: 'object',
      group: 'content',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'text',
          type: 'string',
          title: 'Button Text',
          validation: (rule: StringRule) => rule.required().max(30),
        }),
        defineField({
          name: 'link',
          type: 'url',
          title: 'Button Link',
          validation: (rule: UrlRule) => rule.required().uri({allowRelative: true}),
        }),
        defineField({
          name: 'style',
          type: 'string',
          title: 'Button Style',
          options: {
            list: [
              {title: 'Primary', value: 'primary'},
              {title: 'Secondary', value: 'secondary'},
              {title: 'Outline', value: 'outline'},
            ],
          },
          initialValue: 'primary',
        }),
        defineField({
          name: 'openInNewTab',
          type: 'boolean',
          title: 'Open in New Tab',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          {title: 'Content Left, CTA Right', value: 'contentLeft'},
          {title: 'CTA Left, Content Right', value: 'contentRight'},
          {title: 'Centered Content', value: 'centered'},
          {title: 'Stacked Vertical', value: 'stacked'},
        ],
      },
      initialValue: 'contentLeft',
      group: 'layout',
    }),
    defineField({
      name: 'width',
      title: 'Content Width',
      type: 'string',
      options: {
        list: [
          {title: 'Full Width', value: 'full'},
          {title: 'Container Width', value: 'container'},
          {title: 'Narrow', value: 'narrow'},
        ],
      },
      initialValue: 'container',
      group: 'layout',
    }),
    // Add style fields
    ...blockStyleFields.map((field) => ({...field, group: 'style'})),
    // Add SEO fields
    ...seoFields.map((field) => ({...field, group: 'seo'})),
  ],
  preview: defaultBlockPreview,
})

export default CTA
