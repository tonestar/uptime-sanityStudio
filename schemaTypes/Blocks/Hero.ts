import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview, blockStyleFields, seoFields} from '../pageBuilder.config'
import {RocketIcon} from '@sanity/icons'
import type {StringRule, TextRule, ArrayRule, UrlRule, ImageRule} from '@sanity/types'

const Hero = defineType({
  name: 'hero',
  type: 'object',
  title: 'Hero',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'media', title: 'Media'},
    {name: 'layout', title: 'Layout'},
    {name: 'style', title: 'Style'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Content Fields
    defineField({
      name: 'overline',
      type: 'string',
      title: 'Overline',
      description: 'Optional text displayed above the title (e.g., "NEW RELEASE" or "FEATURED")',
      group: 'content',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The main headline of your hero section',
      validation: (rule: StringRule) => rule.required().max(100),
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Subtitle',
      description: 'A compelling subtitle to support your headline',
      validation: (rule: TextRule) => rule.max(200),
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Additional content below the subtitle',
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
              {title: 'Underline', value: 'underline'},
            ],
          },
        }),
      ],
      group: 'content',
    }),

    // Call to Actions
    defineField({
      name: 'ctas',
      title: 'Call to Actions',
      type: 'array',
      description: 'Add up to two call-to-action buttons',
      validation: (rule: ArrayRule<{type: string}>) => rule.max(2),
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
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
              validation: (rule: UrlRule) => rule.uri({allowRelative: true}),
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
              name: 'icon',
              type: 'string',
              title: 'Icon',
              description: 'Optional icon to display with the button',
            }),
            defineField({
              name: 'openInNewTab',
              type: 'boolean',
              title: 'Open in New Tab',
              initialValue: false,
            }),
          ],
        }),
      ],
    }),

    // Media Fields
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['palette', 'lqip'],
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
          description: 'Optional caption for the image',
        }),
      ],
      validation: (rule: ImageRule) => rule.required(),
      group: 'media',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'object',
      group: 'media',
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'Video URL',
          description: 'Supports YouTube, Vimeo, or MP4 URLs',
          validation: (rule: UrlRule) => rule.uri({allowRelative: true}),
        }),
        defineField({
          name: 'autoplay',
          type: 'boolean',
          title: 'Autoplay',
          description: 'Start playing automatically (muted)',
          initialValue: true,
        }),
        defineField({
          name: 'loop',
          type: 'boolean',
          title: 'Loop',
          description: 'Replay video when it ends',
          initialValue: true,
        }),
        defineField({
          name: 'muted',
          type: 'boolean',
          title: 'Muted',
          description: 'Required for autoplay',
          initialValue: true,
          hidden: ({parent}) => !parent?.autoplay,
        }),
        defineField({
          name: 'overlay',
          type: 'string',
          title: 'Video Overlay',
          description: 'Optional overlay to ensure text readability',
          options: {
            list: [
              {title: 'None', value: 'none'},
              {title: 'Light', value: 'light'},
              {title: 'Dark', value: 'dark'},
              {title: 'Gradient', value: 'gradient'},
            ],
          },
          initialValue: 'none',
        }),
      ],
    }),

    // Layout Fields
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Content Left', value: 'contentLeft'},
          {title: 'Content Right', value: 'contentRight'},
          {title: 'Content Center', value: 'contentCenter'},
          {title: 'Content Over Media', value: 'overlay'},
        ],
      },
      initialValue: 'contentLeft',
      group: 'layout',
    }),
    defineField({
      name: 'fullHeight',
      title: 'Full Height',
      type: 'boolean',
      description: 'Make the hero section full viewport height',
      initialValue: true,
      group: 'layout',
    }),
    defineField({
      name: 'contentWidth',
      title: 'Content Width',
      type: 'string',
      options: {
        list: [
          {title: 'Narrow', value: 'narrow'},
          {title: 'Standard', value: 'standard'},
          {title: 'Wide', value: 'wide'},
          {title: 'Full Width', value: 'full'},
        ],
      },
      initialValue: 'standard',
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
      subtitle: 'subtitle',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Hero',
        subtitle: subtitle || 'Hero Section',
        media: media || RocketIcon,
      }
    },
  },
})

export default Hero
