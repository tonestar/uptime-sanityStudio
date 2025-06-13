import {ImageIcon} from '@sanity/icons'
import type {StringRule, TextRule, ImageRule} from '@sanity/types'
import {defineField} from 'sanity'

// Common styling options for blocks
export const blockStyleFields = [
  defineField({
    name: 'style',
    title: 'Style Options',
    type: 'object',
    fields: [
      defineField({
        name: 'backgroundColor',
        title: 'Background Color',
        type: 'string',
        options: {
          list: [
            {title: 'White', value: 'white'},
            {title: 'Light Gray', value: 'lightGray'},
            {title: 'Dark Gray', value: 'darkGray'},
            {title: 'Primary', value: 'primary'},
            {title: 'Secondary', value: 'secondary'},
          ],
        },
        initialValue: 'white',
      }),
      defineField({
        name: 'padding',
        title: 'Padding',
        type: 'string',
        options: {
          list: [
            {title: 'None', value: 'none'},
            {title: 'Small', value: 'sm'},
            {title: 'Medium', value: 'md'},
            {title: 'Large', value: 'lg'},
          ],
        },
        initialValue: 'md',
      }),
      defineField({
        name: 'containerWidth',
        title: 'Container Width',
        type: 'string',
        options: {
          list: [
            {title: 'Full Width', value: 'full'},
            {title: 'Container', value: 'container'},
            {title: 'Narrow', value: 'narrow'},
          ],
        },
        initialValue: 'container',
      }),
    ],
  }),
]

// SEO fields for content blocks
export const seoFields = [
  defineField({
    name: 'seo',
    title: 'SEO Options',
    type: 'object',
    fields: [
      defineField({
        name: 'metaTitle',
        title: 'Meta Title',
        type: 'string',
        validation: (rule: StringRule) =>
          rule.max(60).warning('Meta titles should be under 60 characters'),
      }),
      defineField({
        name: 'metaDescription',
        title: 'Meta Description',
        type: 'text',
        validation: (rule: TextRule) =>
          rule.max(160).warning('Meta descriptions should be under 160 characters'),
      }),
      defineField({
        name: 'openGraph',
        title: 'Social Media Preview',
        type: 'object',
        fields: [
          defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {hotspot: true},
            validation: (rule: ImageRule) => rule.required(),
          }),
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule: StringRule) => rule.required(),
          }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (rule: TextRule) => rule.max(200),
          }),
        ],
      }),
    ],
  }),
]

export const pageBuilderConfig = {
  insertMenu: {
    groups: [
      {
        name: 'hero',
        title: 'Hero Sections',
        of: ['hero', 'heroSection'],
      },
      {
        name: 'content',
        title: 'Content Blocks',
        of: ['richTextEditor', 'heading', 'split', 'splitBlock'],
      },
      {
        name: 'features',
        title: 'Features & Benefits',
        of: ['feature', 'FeatureItem', 'featuresSection'],
      },
      {
        name: 'layout',
        title: 'Layout Components',
        of: ['threeUp', 'threeUpBlock', 'imageGallery'],
      },
      {
        name: 'social',
        title: 'Social & Testimonials',
        of: ['testimonials', 'testimonialSlider', 'socialMediaLinks'],
      },
      {
        name: 'engagement',
        title: 'Engagement',
        of: ['contactForm', 'newsletterSignup'],
      },
      {
        name: 'cta',
        title: 'Call to Action',
        of: ['cta', 'CTAd'],
      },
      {
        name: 'media',
        title: 'Media',
        of: ['videoEmbed'],
      },
      {
        name: 'lists',
        title: 'Lists & Grids',
        of: ['blogPostList', 'portfolioGrid'],
      },
      {
        name: 'team',
        title: 'Team & Events',
        of: ['eventListing', 'teamMembers', 'bio'],
      },
      {
        name: 'help',
        title: 'Help & Support',
        of: ['faqSection'],
      },
    ],
    views: [
      {name: 'list'},
      {
        name: 'grid',
        icon: ImageIcon,
        previewImageUrl: (schemaTypeName: string) => `/static/preview-${schemaTypeName}.png`,
      },
    ],
  },
}

export const defaultBlockPreview = {
  select: {
    title: 'title',
    subtitle: 'subtitle',
    media: 'image',
    style: 'style',
    content: 'content',
  },
  prepare(selection: {
    title?: string
    subtitle?: string
    media?: any
    style?: {backgroundColor?: string}
    content?: any[]
  }) {
    const {title, subtitle, media, style, content} = selection

    // Calculate content length if available
    const contentLength = content?.length ?? 0
    const contentIndicator = contentLength > 0 ? ` • ${contentLength} items` : ''

    // Get style indicator
    const styleIndicator = style?.backgroundColor ? ` • ${style.backgroundColor}` : ''

    return {
      title: title ?? 'Untitled Block',
      subtitle: `${subtitle ?? ''}${contentIndicator}${styleIndicator}`,
      media: media ?? ImageIcon,
    }
  },
}
