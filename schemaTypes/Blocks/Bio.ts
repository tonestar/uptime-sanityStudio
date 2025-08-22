import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'
import {UserIcon} from '@sanity/icons'

const bio = defineType({
  name: 'bio',
  type: 'object',
  title: 'Bio',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'position',
      type: 'string',
      title: 'Position',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'layout',
      type: 'boolean',
      title: 'Put the image on the right?',
      initialValue: false,
    }),
  ],
  preview: {
    ...defaultBlockPreview,
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title ?? 'Bio',
        subtitle: subtitle ?? 'Team Member Bio',
        media: media ?? UserIcon,
      }
    },
  },
})

export default bio
