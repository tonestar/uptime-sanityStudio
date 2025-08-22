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
      name: 'contentPosition',
      type: 'string',
      title: 'Content Position',
      description: 'Where to display the content relative to page builder sections',
      options: {
        list: [
          {title: 'Before Page Builder', value: 'before'},
          {title: 'After Page Builder', value: 'after'},
        ],
      },
      initialValue: 'before',
      hidden: ({document}) => !document?.content || (document.content as any[]).length === 0,
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
      name: 'showInMenu',
      type: 'boolean',
      title: 'Show in Navigation Menu',
      description: 'Toggle whether this page appears in the site navigation',
      initialValue: true,
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
