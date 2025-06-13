import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'
import {TextIcon} from '@sanity/icons'

const Heading = defineType({
  name: 'heading',
  title: 'Heading',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'byline',
      title: 'Byline',
      type: 'string', // Adjust the type if necessary
      description: 'Optional byline displayed above the title',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Left Align', value: 'leftAlign'},
          {title: 'Center Align', value: 'centerAlign'},
          {title: 'Right Align', value: 'rightAlign'},
        ],
      },
      initialValue: 'leftAlign',
    }),
  ],
  preview: {
    ...defaultBlockPreview,
    select: {
      title: 'title',
      byline: 'byline',
    },
    prepare(selection) {
      const {title, byline} = selection
      return {
        title: title ?? 'Heading',
        subtitle: byline ?? 'Text Heading Block',
        media: TextIcon,
      }
    },
  },
})

export default Heading
