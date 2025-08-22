import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview, blockStyleFields, seoFields} from '../pageBuilder.config'
import {EditIcon} from '@sanity/icons'
import type {StringRule} from '@sanity/types'

// TypeScript schema for RichTextEditor
const RichTextEditor = defineType({
  name: 'richTextEditor',
  type: 'object',
  title: 'Rich Text Editor',
  icon: EditIcon,
  groups: [
    {name: 'content', title: 'Content'},
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
      description: 'Optional heading for this content section',
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
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Rich text content with advanced formatting options',
      group: 'content',
      of: [
        // Text Block
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Heading 5', value: 'h5'},
            {title: 'Heading 6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
            {title: 'Check List', value: 'check'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
              {title: 'Code', value: 'code'},
              {title: 'Highlight', value: 'highlight'},
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
        // Image
        defineArrayMember({
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
            metadata: ['palette', 'lqip'],
          },
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
              description: 'Optional caption displayed below the image',
            }),
            defineField({
              name: 'alignment',
              type: 'string',
              title: 'Alignment',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Center', value: 'center'},
                  {title: 'Right', value: 'right'},
                ],
              },
              initialValue: 'center',
            }),
          ],
        }),
        // Code Block
        defineArrayMember({
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'all',
            withFilename: true,
          },
        }),
        // Video Embed
        defineArrayMember({
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Embed',
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              title: 'Video URL',
              description: 'Supports YouTube, Vimeo, and other video platforms',
              validation: (rule) => rule.uri({allowRelative: true}),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption displayed below the video',
            }),
          ],
        }),
      ],
    }),

    // Layout Settings
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Content Layout',
      description: 'Choose how the content should be displayed',
      options: {
        list: [
          {title: 'Standard', value: 'standard'},
          {title: 'Wide', value: 'wide'},
          {title: 'Full Width', value: 'fullWidth'},
          {title: 'Narrow', value: 'narrow'},
        ],
      },
      initialValue: 'standard',
      group: 'layout',
    }),
    defineField({
      name: 'spacing',
      type: 'string',
      title: 'Content Spacing',
      options: {
        list: [
          {title: 'Tight', value: 'tight'},
          {title: 'Normal', value: 'normal'},
          {title: 'Relaxed', value: 'relaxed'},
        ],
      },
      initialValue: 'normal',
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
      content: 'content',
    },
    prepare(selection) {
      const {title, subtitle, content = []} = selection
      const blocks = content.filter((block: {_type: string}) => block._type === 'block')
      return {
        title: title || 'Rich Text Editor',
        subtitle: subtitle || `${blocks.length} Text Blocks`,
        media: EditIcon,
      }
    },
  },
})

export default RichTextEditor
