import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'
import {StarIcon} from '@sanity/icons'

// TypeScript schema for FeaturesSection
const FeaturesSection = defineType({
  name: 'featuresSection',
  type: 'object',
  title: 'Features Section',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Section Description',
    }),
    defineField({
      name: 'features',
      type: 'array',
      title: 'Features',
      of: [defineArrayMember({type: 'feature'})],
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'List', value: 'list'},
          {title: 'Carousel', value: 'carousel'},
        ],
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    ...defaultBlockPreview,
    select: {
      title: 'title',
      features: 'features',
    },
    prepare(selection) {
      const {title, features} = selection
      return {
        title: title ?? 'Features Section',
        subtitle: `${features?.length ?? 0} Features`,
        media: StarIcon,
      }
    },
  },
})

export default FeaturesSection
