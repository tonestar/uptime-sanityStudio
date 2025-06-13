import {defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'
import {ImageIcon} from '@sanity/icons'

const CTAd = defineType({
  name: 'CTAd',
  type: 'object',
  title: 'CTA with Details',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Background Image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Button Text',
    }),
    defineField({
      name: 'buttonLink',
      type: 'url',
      title: 'Button Link',
    }),
  ],
  preview: {
    ...defaultBlockPreview,
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title ?? 'CTA with Details',
        subtitle: 'Call to Action Block',
        media: media ?? ImageIcon,
      }
    },
  },
})

export default CTAd
