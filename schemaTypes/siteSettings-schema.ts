import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {
      name: 'general',
      title: 'General Settings',
    },
    {
      name: 'seo',
      title: 'SEO Defaults',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The name of your site, used in title templates and SEO',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Default description used when no page-specific description is provided',
      validation: (Rule) =>
        Rule.max(160).warning('Descriptions should be under 160 characters for SEO'),
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Social Image',
      type: 'image',
      description: 'Default image used for social sharing when no page-specific image is provided',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Site Settings',
        subtitle: 'Global configuration',
      }
    },
  },
})
