import {defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'
import {UserIcon} from '@sanity/icons'
import type {StringRule, ImageRule} from '@sanity/types'

const testimonials = defineType({
  name: 'testimonials',
  type: 'object',
  title: 'Testimonials',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Summary',
      description: 'The testimonial content',
      validation: (rule: StringRule) => rule.required().max(500),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Name of the person giving the testimonial',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'position',
      type: 'string',
      title: 'Position',
      description: 'Job title or company of the person',
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      title: 'Avatar',
      description: 'Profile picture of the person',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: (rule: StringRule) => rule.required(),
        }),
      ],
      validation: (rule: ImageRule) => rule.required(),
    }),
  ],
  preview: {
    ...defaultBlockPreview,
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'avatar',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Unnamed Testimonial',
        subtitle: subtitle || 'Testimonial',
        media: media || UserIcon,
      }
    },
  },
})

export default testimonials
