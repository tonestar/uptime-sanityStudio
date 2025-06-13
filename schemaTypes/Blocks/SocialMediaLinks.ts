import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'
import {LinkIcon} from '@sanity/icons'

// TypeScript schema for SocialMediaLinks
const SocialMediaLinks = defineType({
  name: 'socialMediaLinks',
  type: 'object',
  title: 'Social Media Links',
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
      name: 'links',
      type: 'array',
      title: 'Social Links',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: 'Platform',
            }),
            defineField({name: 'url', type: 'url', title: 'URL'}),
            defineField({name: 'icon', type: 'image', title: 'Platform Icon'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    ...defaultBlockPreview,
    select: {
      title: 'title',
      links: 'links',
    },
    prepare(selection) {
      const {title, links} = selection
      return {
        title: title ?? 'Social Media Links',
        subtitle: `${links?.length ?? 0} Social Platforms`,
        media: LinkIcon,
      }
    },
  },
})

export default SocialMediaLinks
