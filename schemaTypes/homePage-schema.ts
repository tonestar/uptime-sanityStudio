// @ts-nocheck

import {defineField, defineType, defineArrayMember} from 'sanity'
import {blockSchemas} from '../schemaTypes/loadBlockSchemas'
import {pageBuilderConfig} from '../schemaTypes/pageBuilder.config'

// sanity/schemas/homepage.js
export default defineType({
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  groups: [
    {name: 'content', title: 'Content'},
    // {name: 'hero', title: 'Hero Section'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'The title of the page',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Homepage subtitle',
      type: 'string',
      description: "What's the subtitle of the homepage hero?",
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    // defineField({
    //   name: 'slug',
    //   type: 'slug',
    //   title: 'Slug',
    //   description: 'The URL path for this page',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //   },
    //   validation: (rule) => rule.required(),
    //   group: 'content',
    // }),
    // defineField({
    //   name: 'heroTitle',
    //   title: 'Homepage Hero Title',
    //   type: 'string',
    //   description: 'The main headline in the hero section',
    //   validation: (rule) => rule.required().max(100),
    //   group: 'hero',
    // }),
    // defineField({
    //   name: 'subtitle',
    //   title: 'Homepage Subtitle',
    //   type: 'text',
    //   description: 'A compelling subtitle to support the main headline',
    //   validation: (rule) => rule.max(200),
    //   group: 'hero',
    // }),
    // defineField({
    //   name: 'image',
    //   title: 'Homepage Hero Image',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //   },
    //   fields: [
    //     defineField({
    //       name: 'alt',
    //       type: 'string',
    //       title: 'Alternative Text',
    //       description: 'Important for SEO and accessibility',
    //       validation: (rule) => rule.required(),
    //     }),
    //     defineField({
    //       name: 'caption',
    //       type: 'string',
    //       title: 'Caption',
    //       description: 'Optional caption for the image',
    //     }),
    //   ],
    //   group: 'hero',
    // }),
    // defineField({
    //   name: 'content',
    //   type: 'array',
    //   title: 'Main Content',
    //   description: 'The main content of the page',
    //   of: [
    //     {
    //       type: 'block',
    //       styles: [
    //         {title: 'Normal', value: 'normal'},
    //         {title: 'H1', value: 'h1'},
    //         {title: 'H2', value: 'h2'},
    //         {title: 'H3', value: 'h3'},
    //         {title: 'Quote', value: 'blockquote'},
    //       ],
    //       marks: {
    //         decorators: [
    //           {title: 'Strong', value: 'strong'},
    //           {title: 'Emphasis', value: 'em'},
    //         ],
    //       },
    //     },
    //     {type: 'image'},
    //   ],
    //   group: 'content',
    // }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page Builder',
      description: 'Add and arrange content blocks for this page',
      of: blockSchemas.map((schema) =>
        defineArrayMember({
          type: schema.name,
          title: schema.title || schema.name,
        }),
      ),
      ...pageBuilderConfig,
      group: 'content',
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO Settings',
      group: 'seo',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'SEO Title',
          description: 'Override the default page title for search engines',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Meta Description',
          description: 'Brief description for search engine results',
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'keywords',
          type: 'array',
          title: 'Keywords',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Social Share Image',
          description: 'Image for social media sharing (recommended: 1200x630px)',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heroTitle',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Home Page',
        subtitle: subtitle || '',
        media: media,
      }
    },
  },
})
