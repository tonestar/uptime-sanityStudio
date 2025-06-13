import {defineField, defineType} from 'sanity'
import {CodeBlockIcon} from '@sanity/icons'
import type {StringRule} from '@sanity/types'

const code = defineType({
  name: 'code',
  title: 'Code Block',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'Plain Text', value: 'text'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'JavaScript', value: 'javascript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'SCSS', value: 'scss'},
          {title: 'JSON', value: 'json'},
          {title: 'Python', value: 'python'},
          {title: 'PHP', value: 'php'},
          {title: 'Ruby', value: 'ruby'},
          {title: 'Shell', value: 'shell'},
          {title: 'Markdown', value: 'markdown'},
          {title: 'YAML', value: 'yaml'},
        ],
      },
      initialValue: 'text',
    }),
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description: 'Optional filename to display above the code block',
    }),
    defineField({
      name: 'highlightedLines',
      title: 'Highlighted Lines',
      type: 'array',
      of: [{type: 'number'}],
      description: 'Line numbers to highlight (e.g., 1, 4, 7-9)',
    }),
    defineField({
      name: 'showLineNumbers',
      title: 'Show Line Numbers',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption to display below the code block',
    }),
  ],
  preview: {
    select: {
      title: 'filename',
      language: 'language',
      code: 'code',
    },
    prepare({title, language, code}) {
      const shortCode = code ? code.substring(0, 30) + (code.length > 30 ? '...' : '') : ''
      const languageInfo = language ? ` • ${language}` : ''

      return {
        title: title || 'Code Block',
        subtitle: `${shortCode}${languageInfo}`,
        media: CodeBlockIcon,
      }
    },
  },
})

export default code
