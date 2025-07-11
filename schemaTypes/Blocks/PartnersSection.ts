import {defineType, defineField} from 'sanity'

const partnersSection = defineType({
  name: 'partnersSection',
  title: 'Partners Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the partners section',
      validation: (Rule) => Rule.max(100).warning('Heading should be concise'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description text below the heading',
      validation: (Rule) => Rule.max(500).warning('Keep description under 500 characters'),
    }),
    defineField({
      name: 'partnerImages',
      title: 'Partner Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'partnerImage',
          title: 'Partner Image',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Alternative text for accessibility',
                  validation: (Rule) =>
                    Rule.required().error('Alt text is required for accessibility'),
                }),
              ],
            }),
            defineField({
              name: 'link',
              title: 'Link (Optional)',
              type: 'object',
              fields: [
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  description: 'Link destination',
                  validation: (Rule) =>
                    Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel'],
                    }),
                }),
                defineField({
                  name: 'openInNewTab',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  description: 'Should the link open in a new tab?',
                  initialValue: false,
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'image.alt',
              media: 'image',
              subtitle: 'link.url',
            },
            prepare(selection) {
              const {title, media, subtitle} = selection
              return {
                title: title || 'Partner Image',
                media,
                subtitle: subtitle ? `Links to: ${subtitle}` : 'No link',
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.max(12).warning('Consider limiting to 12 images for better performance'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
      media: 'partnerImages.0.image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Partners Section',
        subtitle: subtitle ? `${subtitle.substring(0, 100)}...` : 'No description',
        media,
      }
    },
  },
})

export default partnersSection
