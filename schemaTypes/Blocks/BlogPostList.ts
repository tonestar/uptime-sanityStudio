import {defineField, defineType} from 'sanity'
// import {blockStyleFields, seoFields} from '../pageBuilder.config'
import {DocumentsIcon} from '@sanity/icons'
import type {StringRule, NumberRule, TextRule} from '@sanity/types'

// TypeScript schema for BlogPostList
const BlogPostList = defineType({
  name: 'blogPostList',
  type: 'object',
  title: 'Blog Post List',
  icon: DocumentsIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'settings', title: 'List Settings'},
    // {name: 'style', title: 'Style'},
    // {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      description: 'The heading for this blog post section',
      validation: (rule: StringRule) => rule.required().max(100),
      group: 'content',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Section Description',
      description: 'A brief introduction to this collection of posts',
      validation: (rule: TextRule) => rule.max(200),
      group: 'content',
    }),
    defineField({
      name: 'filter',
      type: 'object',
      title: 'Post Filters',
      group: 'settings',
      fields: [
        defineField({
          name: 'categories',
          type: 'array',
          title: 'Filter by Categories',
          of: [{type: 'reference', to: {type: 'category'}}],
          description: 'Only show posts from these categories',
        }),
        defineField({
          name: 'tags',
          type: 'array',
          title: 'Filter by Tags',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
      ],
    }),
    defineField({
      name: 'display',
      type: 'object',
      title: 'Display Settings',
      group: 'settings',
      fields: [
        defineField({
          name: 'postsToShow',
          type: 'number',
          title: 'Number of Posts',
          description: 'Maximum number of posts to display',
          validation: (rule: NumberRule) => rule.required().min(1).max(12),
          initialValue: 3,
        }),
        defineField({
          name: 'columns',
          type: 'number',
          title: 'Columns',
          description: 'Number of columns to display posts in',
          options: {
            list: [
              {title: '1 Column', value: 1},
              {title: '2 Columns', value: 2},
              {title: '3 Columns', value: 3},
              {title: '4 Columns', value: 4},
            ],
          },
          validation: (rule: NumberRule) => rule.required(),
          initialValue: 3,
        }),
        defineField({
          name: 'showFeaturedImage',
          type: 'boolean',
          title: 'Show Featured Image',
          initialValue: true,
        }),
        defineField({
          name: 'showExcerpt',
          type: 'boolean',
          title: 'Show Excerpt',
          initialValue: true,
        }),
        defineField({
          name: 'showDate',
          type: 'boolean',
          title: 'Show Date',
          initialValue: true,
        }),
        defineField({
          name: 'showAuthor',
          type: 'boolean',
          title: 'Show Author',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'sortBy',
      type: 'string',
      title: 'Sort Posts By',
      options: {
        list: [
          {title: 'Newest First', value: 'dateDesc'},
          {title: 'Oldest First', value: 'dateAsc'},
          {title: 'Title A-Z', value: 'titleAsc'},
          {title: 'Title Z-A', value: 'titleDesc'},
        ],
      },
      initialValue: 'dateDesc',
      group: 'settings',
    }),
    defineField({
      name: 'cta',
      type: 'object',
      title: 'Call to Action',
      group: 'content',
      fields: [
        defineField({
          name: 'text',
          type: 'string',
          title: 'Button Text',
          initialValue: 'View All Posts',
        }),
        defineField({
          name: 'link',
          type: 'url',
          title: 'Button Link',
          validation: (rule) => rule.uri({allowRelative: true}),
        }),
        defineField({
          name: 'style',
          type: 'string',
          title: 'Button Style',
          options: {
            list: [
              {title: 'Primary', value: 'primary'},
              {title: 'Secondary', value: 'secondary'},
              {title: 'Text Link', value: 'text'},
            ],
          },
          initialValue: 'primary',
        }),
      ],
    }),
    defineField({
      name: 'width',
      type: 'string',
      title: 'Container Width',
      options: {
        list: [
          {title: 'Full Width', value: 'full'},
          {title: 'Container Width', value: 'container'},
          {title: 'Narrow', value: 'narrow'},
        ],
      },
      initialValue: 'container',
      group: 'settings',
    }),
    // Add style fields
    // ...blockStyleFields.map((field) => ({...field, group: 'style'})),
    // Add SEO fields
    // ...seoFields.map((field) => ({...field, group: 'seo'})),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      postsToShow: 'display.postsToShow',
      layout: 'width',
    },
    prepare(selection) {
      const {title, description, postsToShow, layout} = selection
      const layoutIndicator = layout ? ` • ${layout}` : ''
      const postsIndicator = postsToShow ? ` • ${postsToShow} posts` : ''

      return {
        title: title || 'Blog Post List',
        subtitle: `${description ? `${description} • ` : ''}${postsIndicator}${layoutIndicator}`,
        media: DocumentsIcon,
      }
    },
  },
})

export default BlogPostList
