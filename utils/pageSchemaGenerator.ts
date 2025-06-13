import {defineField, defineArrayMember} from 'sanity'
import {blockSchemas} from '../schemaTypes/loadBlockSchemas'
import {pageBuilderConfig} from '../schemaTypes/pageBuilder.config'

export const pageSchemaGenerator = (name: string, title: string, additionalFields = []) => ({
  name,
  type: 'document',
  title,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'The title of the page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'The URL-friendly version of the page title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'The main content of the page',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page Builder',
      of: blockSchemas.map((schema) =>
        defineArrayMember({
          type: schema.name,
          title: schema.title || schema.name,
        }),
      ),
      ...pageBuilderConfig,
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO',
      fields: [
        defineField({name: 'title', type: 'string', title: 'SEO Title'}),
        defineField({name: 'description', type: 'text', title: 'SEO Description'}),
      ],
    }),
    ...additionalFields,
  ],
})
