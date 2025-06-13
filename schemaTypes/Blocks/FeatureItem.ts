import {defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'

const FeatureItem = defineType({
  name: 'FeatureItem',
  type: 'object',
  title: 'Feature Item',
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
    }),
  ],
  preview: {
    ...defaultBlockPreview,
    prepare(selection) {
      const prepared = defaultBlockPreview.prepare(selection)
      return {
        ...prepared,
        subtitle: 'Feature Item',
      }
    },
  },
})

export default FeatureItem
