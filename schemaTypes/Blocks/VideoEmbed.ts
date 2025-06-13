import {defineField, defineType} from 'sanity'
import {blockStyleFields} from '../pageBuilder.config'
import {PlayIcon} from '@sanity/icons'
import type {StringRule, UrlRule, TextRule} from '@sanity/types'

// TypeScript schema for VideoEmbed
const VideoEmbed = defineType({
  name: 'videoEmbed',
  type: 'object',
  title: 'Video Embed',
  icon: PlayIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'settings', title: 'Video Settings'},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The title of the video section',
      validation: (rule: StringRule) => rule.required().max(100),
      group: 'content',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'A brief description of the video content',
      validation: (rule: TextRule) => rule.max(200),
      group: 'content',
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Video URL',
      description: 'Supports YouTube, Vimeo, or other video platform URLs',
      validation: (rule: UrlRule) => rule.required().uri({scheme: ['http', 'https']}),
      group: 'content',
    }),
    defineField({
      name: 'settings',
      type: 'object',
      title: 'Video Settings',
      group: 'settings',
      fields: [
        defineField({
          name: 'autoplay',
          type: 'boolean',
          title: 'Autoplay',
          description: 'Start playing automatically (may be blocked by browsers)',
          initialValue: false,
        }),
        defineField({
          name: 'muted',
          type: 'boolean',
          title: 'Start Muted',
          description: 'Start the video without sound',
          initialValue: true,
        }),
        defineField({
          name: 'loop',
          type: 'boolean',
          title: 'Loop Video',
          description: 'Replay the video when it ends',
          initialValue: false,
        }),
        defineField({
          name: 'controls',
          type: 'boolean',
          title: 'Show Controls',
          description: 'Display video player controls',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect Ratio',
      description: 'The display ratio of the video',
      options: {
        list: [
          {title: '16:9 (Widescreen)', value: '16:9'},
          {title: '4:3 (Standard)', value: '4:3'},
          {title: '1:1 (Square)', value: '1:1'},
          {title: '9:16 (Vertical)', value: '9:16'},
        ],
      },
      initialValue: '16:9',
      group: 'settings',
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
    ...blockStyleFields.map((field) => ({...field, group: 'style'})),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
      description: 'description',
      aspectRatio: 'aspectRatio',
    },
    prepare({title, url, description, aspectRatio}) {
      const aspectIndicator = aspectRatio ? ` • ${aspectRatio}` : ''
      const descriptionPreview = description
        ? ` • ${description.slice(0, 30)}${description.length > 30 ? '...' : ''}`
        : ''

      return {
        title: title || 'Video Embed',
        subtitle: `${url ? 'Video' : 'No URL set'}${aspectIndicator}${descriptionPreview}`,
        media: PlayIcon,
      }
    },
  },
})

export default VideoEmbed
