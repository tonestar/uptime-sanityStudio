import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'
import {SplitHorizontalIcon} from '@sanity/icons'

const Split = defineType({
  name: 'split',
  type: 'object',
  title: 'Split Section',
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
      name: 'blocks',
      type: 'array',
      title: 'Split Blocks',
      of: [defineArrayMember({type: 'splitBlock'})],
    }),
  ],
  preview: {
    ...defaultBlockPreview,
    select: {
      title: 'title',
      blocks: 'blocks',
    },
    prepare(selection) {
      const {title, blocks} = selection
      return {
        title: title ?? 'Split Section',
        subtitle: `${blocks?.length ?? 0} Split Blocks`,
        media: SplitHorizontalIcon,
      }
    },
  },
})

export default Split
