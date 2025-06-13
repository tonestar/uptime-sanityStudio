import {defineArrayMember, defineField, defineType} from 'sanity'
// import {defaultBlockPreview, blockStyleFields, seoFields} from '../pageBuilder.config'
import {defaultBlockPreview} from '../pageBuilder.config'
import {SplitVerticalIcon} from '@sanity/icons'
import type {StringRule, ArrayRule, UrlRule, ImageRule} from '@sanity/types'

const SplitBlock = defineType({
  name: 'splitBlock',
  type: 'object',
  title: 'Split Block',
  icon: SplitVerticalIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'byline',
      media: 'image',
      layout: 'layout',
    },
    prepare({title, subtitle, media, layout}) {
      return {
        title: title || 'Untitled Split Block',
        subtitle: `${subtitle ? `${subtitle} - ` : ''}${layout === 'contentLeft' ? 'Content Left' : 'Content Right'}`,
        media: media || SplitVerticalIcon,
      }
    },
  },
  groups: [
    {name: 'content', title: 'Content', icon: SplitVerticalIcon},
    {name: 'media', title: 'Media'},
    {name: 'layout', title: 'Layout'},
    // {name: 'style', title: 'Style'},
    // {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Content Fields
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule: StringRule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'byline',
      type: 'string',
      title: 'Subtitle',
      description: 'Optional subtitle displayed above the title',
      group: 'content',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      description: 'Main heading displayed below the title',
      validation: (rule: StringRule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        }),
      ],
      validation: (rule: ArrayRule<{type: string}>) => rule.required(),
      group: 'content',
    }),

    // Media Fields
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['palette', 'lqip'],
        storeOriginalFilename: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed below the image',
        }),
        defineField({
          name: 'focal',
          type: 'object',
          title: 'Focal point',
          description: 'Set a focal point for dynamic cropping',
          fields: [
            defineField({
              name: 'x',
              type: 'number',
              title: 'X position',
              validation: (rule) => rule.required().min(0).max(100),
            }),
            defineField({
              name: 'y',
              type: 'number',
              title: 'Y position',
              validation: (rule) => rule.required().min(0).max(100),
            }),
          ],
        }),
      ],
      validation: (rule: ImageRule) => rule.required(),
      group: 'media',
    }),

    // Layout Fields
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Content Left, Image Right', value: 'contentLeft'},
          {title: 'Image Left, Content Right', value: 'imageLeft'},
        ],
      },
      initialValue: 'contentLeft',
      group: 'layout',
    }),
    // defineField({
    //   name: 'verticalAlignment',
    //   title: 'Vertical Alignment',
    //   type: 'string',
    //   options: {
    //     list: [
    //       {title: 'Top', value: 'top'},
    //       {title: 'Center', value: 'center'},
    //       {title: 'Bottom', value: 'bottom'},
    //     ],
    //   },
    //   initialValue: 'center',
    //   group: 'layout',
    // }),
    // defineField({
    //   name: 'contentWidth',
    //   title: 'Content Width',
    //   type: 'number',
    //   description: 'Width of the content section as a percentage',
    //   options: {
    //     list: [
    //       {title: '33%', value: 33},
    //       {title: '40%', value: 40},
    //       {title: '50%', value: 50},
    //       {title: '60%', value: 60},
    //       {title: '66%', value: 66},
    //     ],
    //   },
    //   initialValue: 50,
    //   validation: (rule: NumberRule) => rule.required().min(33).max(66),
    //   group: 'layout',
    // }),
    // defineField({
    //   name: 'containerWidth',
    //   title: 'Container Width',
    //   type: 'string',
    //   options: {
    //     list: [
    //       {title: 'Full Width', value: 'full'},
    //       {title: 'Container Width', value: 'container'},
    //       {title: 'Narrow', value: 'narrow'},
    //     ],
    //   },
    //   initialValue: 'container',
    //   group: 'layout',
    // }),

    // Call to Action
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      group: 'content',
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
              {title: 'Text Link', value: 'text'},
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

    // Add style fields
    // ...blockStyleFields.map((field) => ({...field, group: 'style'})),
    // Add SEO fields
    // ...seoFields.map((field) => ({...field, group: 'seo'})),
  ],
})

export default SplitBlock
