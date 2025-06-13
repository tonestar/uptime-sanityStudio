import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'

// TypeScript schema for TeamMembers
const TeamMembers = defineType({
  name: 'teamMembers',
  type: 'object',
  title: 'Team Members',
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
      name: 'members',
      type: 'array',
      title: 'Team Members',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string', title: 'Name'}),
            defineField({name: 'role', type: 'string', title: 'Role'}),
            defineField({name: 'bio', type: 'text', title: 'Bio'}),
            defineField({name: 'image', type: 'image', title: 'Photo'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    ...defaultBlockPreview,
    prepare(selection) {
      const prepared = defaultBlockPreview.prepare(selection)
      return {
        ...prepared,
        subtitle: 'Team Members Grid',
      }
    },
  },
})

export default TeamMembers
