import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'
import {ImageIcon} from '@sanity/icons'

// TypeScript schema for PortfolioGrid
const PortfolioGrid = defineType({
  name: 'portfolioGrid',
  type: 'object',
  title: 'Portfolio Grid',
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
      name: 'projects',
      type: 'array',
      title: 'Projects',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({name: 'description', type: 'text', title: 'Description'}),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Project Image',
              options: {hotspot: true},
            }),
            defineField({name: 'link', type: 'url', title: 'Project Link'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    ...defaultBlockPreview,
    select: {
      title: 'title',
      projects: 'projects',
    },
    prepare(selection) {
      const {title, projects} = selection
      return {
        title: title ?? 'Portfolio Grid',
        subtitle: `${projects?.length ?? 0} Projects`,
        media: ImageIcon,
      }
    },
  },
})

export default PortfolioGrid
