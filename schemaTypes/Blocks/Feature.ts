import {defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'
import {StarIcon} from '@sanity/icons'

const Feature = defineType({
  name: 'feature',
  type: 'object',
  title: 'Feature',
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
      title: 'Feature Image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Learn More Link',
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
        title: title ?? 'Feature',
        subtitle: 'Feature Block',
        media: media ?? StarIcon,
      }
    },
  },
})

export default Feature
