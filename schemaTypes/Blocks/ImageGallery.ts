import {defineArrayMember, defineField, defineType} from 'sanity'
import {blockStyleFields, seoFields} from '../pageBuilder.config'
import {ImageIcon} from '@sanity/icons'
import type {StringRule, ArrayRule, ImageRule} from '@sanity/types'

// TypeScript schema for ImageGallery
const ImageGallery = defineType({
  name: 'imageGallery',
  type: 'object',
  title: 'Image Gallery',
  icon: ImageIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'images', title: 'Gallery Images'},
    {name: 'settings', title: 'Gallery Settings'},
    {name: 'style', title: 'Style'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Gallery Title',
      description: 'The heading for this image gallery section',
      validation: (rule: StringRule) => rule.required().max(100),
      group: 'content',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Gallery Description',
      description: 'A brief description of this image collection',
      validation: (rule: StringRule) => rule.max(200),
      group: 'content',
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Gallery Images',
      description: 'Add and arrange images for the gallery',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (rule: ImageRule) => rule.required(),
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
          ],
        }),
      ],
      validation: (rule: ArrayRule<{type: string}>) => rule.required().min(1),
      group: 'content',
    }),
    defineField({
      name: 'display',
      type: 'object',
      title: 'Display Settings',
      group: 'settings',
      fields: [
        defineField({
          name: 'layout',
          type: 'string',
          title: 'Gallery Layout',
          options: {
            list: [
              {title: 'Grid', value: 'grid'},
              {title: 'Masonry', value: 'masonry'},
              {title: 'Carousel', value: 'carousel'},
              {title: 'Slideshow', value: 'slideshow'},
            ],
          },
          initialValue: 'grid',
        }),
        defineField({
          name: 'columns',
          type: 'number',
          title: 'Columns',
          description: 'Number of columns in grid or masonry layout',
          options: {
            list: [
              {title: '2 Columns', value: 2},
              {title: '3 Columns', value: 3},
              {title: '4 Columns', value: 4},
              {title: '5 Columns', value: 5},
            ],
          },
          hidden: ({parent}) => parent?.layout === 'carousel' || parent?.layout === 'slideshow',
          initialValue: 3,
        }),
        defineField({
          name: 'gap',
          type: 'number',
          title: 'Grid Gap',
          description: 'Space between images in pixels',
          initialValue: 16,
          validation: (rule) => rule.min(0).max(100),
        }),
        defineField({
          name: 'aspectRatio',
          type: 'string',
          title: 'Image Aspect Ratio',
          options: {
            list: [
              {title: 'Original', value: 'original'},
              {title: 'Square (1:1)', value: '1:1'},
              {title: 'Landscape (16:9)', value: '16:9'},
              {title: 'Portrait (3:4)', value: '3:4'},
            ],
          },
          initialValue: 'original',
        }),
      ],
    }),
    defineField({
      name: 'interaction',
      type: 'object',
      title: 'Interaction Settings',
      group: 'settings',
      fields: [
        defineField({
          name: 'lightbox',
          type: 'boolean',
          title: 'Enable Lightbox',
          description: 'Allow images to be viewed in fullscreen',
          initialValue: true,
        }),
        defineField({
          name: 'zoom',
          type: 'boolean',
          title: 'Enable Zoom',
          description: 'Allow images to be zoomed in lightbox view',
          initialValue: true,
          hidden: ({parent}) => !parent?.lightbox,
        }),
        defineField({
          name: 'autoplay',
          type: 'boolean',
          title: 'Autoplay Slideshow/Carousel',
          description: 'Automatically advance through images',
          initialValue: false,
          hidden: ({parent}) => parent?.layout !== 'carousel' && parent?.layout !== 'slideshow',
        }),
      ],
    }),
    defineField({
      name: 'width',
      type: 'string',
      title: 'Container Width',
      options: {
        list: [
          {title: 'Full Width', value: 'full'},
          {title: 'Container Width', value: 'container'},
          {title: 'Narrow', value: 'narrow'},
        ],
      },
      initialValue: 'container',
      group: 'settings',
    }),
    // Add style fields
    ...blockStyleFields.map((field) => ({...field, group: 'style'})),
    // Add SEO fields
    ...seoFields.map((field) => ({...field, group: 'seo'})),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      images: 'images',
      layout: 'display.layout',
    },
    prepare(selection) {
      const {title, description, images, layout} = selection
      const imageCount = images?.length || 0
      const layoutIndicator = layout ? ` • ${layout}` : ''

      return {
        title: title || 'Image Gallery',
        subtitle: `${description ? `${description} • ` : ''}${imageCount} images${layoutIndicator}`,
        media: ImageIcon,
      }
    },
  },
})

export default ImageGallery
