// import {defineArrayMember, defineField, defineType} from 'sanity'
// import {defaultBlockPreview, blockStyleFields, seoFields} from '../pageBuilder.config'
// import {StackIcon} from '@sanity/icons'
// import type {StringRule, TextRule, ArrayRule, UrlRule, ImageRule} from '@sanity/types'

// const ThreeUpBlock = defineType({
//   name: 'threeUpBlock',
//   type: 'object',
//   title: 'Three Up Block',
//   icon: StackIcon,
//   groups: [
//     {name: 'content', title: 'Content'},
//     {name: 'blocks', title: 'Content Blocks'},
//     {name: 'layout', title: 'Layout'},
//     {name: 'style', title: 'Style'},
//     {name: 'seo', title: 'SEO'},
//   ],
//   fields: [
//     // Header Content
//     defineField({
//       name: 'title',
//       type: 'string',
//       title: 'Section Title',
//       description: 'The main heading for this section',
//       validation: (rule: StringRule) => rule.required(),
//       group: 'content',
//     }),
//     defineField({
//       name: 'subtitle',
//       type: 'string',
//       title: 'Section Subtitle',
//       description: 'Optional subtitle displayed below the title',
//       group: 'content',
//     }),
//     defineField({
//       name: 'description',
//       type: 'text',
//       title: 'Section Description',
//       description: 'A brief description of this section',
//       validation: (rule: TextRule) => rule.max(200),
//       group: 'content',
//     }),

//     // Content Blocks
//     defineField({
//       name: 'blocks',
//       type: 'array',
//       title: 'Content Blocks',
//       description: 'Add exactly three content blocks',
//       validation: (rule: ArrayRule<{type: string}>) =>
//         rule.required().length(3).error('Must have exactly 3 blocks'),
//       group: 'blocks',
//       of: [
//         defineArrayMember({
//           type: 'object',
//           groups: [
//             {name: 'content', title: 'Content'},
//             {name: 'media', title: 'Media'},
//             {name: 'link', title: 'Link'},
//           ],
//           fields: [
//             // Block Content
//             defineField({
//               name: 'title',
//               type: 'string',
//               title: 'Title',
//               validation: (rule: StringRule) => rule.required(),
//               group: 'content',
//             }),
//             defineField({
//               name: 'subtitle',
//               type: 'string',
//               title: 'Subtitle',
//               description: 'Optional subtitle displayed below the title',
//               group: 'content',
//             }),
//             defineField({
//               name: 'description',
//               type: 'text',
//               title: 'Description',
//               validation: (rule: TextRule) => rule.required(),
//               group: 'content',
//             }),

//             // Block Media
//             defineField({
//               name: 'icon',
//               type: 'image',
//               title: 'Icon',
//               description: 'Optional icon displayed above the title',
//               options: {
//                 accept: 'image/svg+xml,image/png',
//               },
//               group: 'media',
//             }),
//             defineField({
//               name: 'image',
//               type: 'image',
//               title: 'Image',
//               description: 'Main image for this block',
//               options: {
//                 hotspot: true,
//                 metadata: ['palette', 'lqip'],
//               },
//               fields: [
//                 defineField({
//                   name: 'alt',
//                   type: 'string',
//                   title: 'Alternative text',
//                   description: 'Important for SEO and accessibility.',
//                   validation: (rule: StringRule) => rule.required(),
//                 }),
//                 defineField({
//                   name: 'caption',
//                   type: 'string',
//                   title: 'Caption',
//                   description: 'Optional caption for the image',
//                 }),
//               ],
//               validation: (rule: ImageRule) => rule.required(),
//               group: 'media',
//             }),

//             // Block Link
//             defineField({
//               name: 'link',
//               type: 'object',
//               title: 'Link',
//               group: 'link',
//               fields: [
//                 defineField({
//                   name: 'text',
//                   type: 'string',
//                   title: 'Button Text',
//                   validation: (rule: StringRule) => rule.max(30),
//                 }),
//                 defineField({
//                   name: 'url',
//                   type: 'url',
//                   title: 'URL',
//                   validation: (rule: UrlRule) => rule.uri({allowRelative: true}),
//                 }),
//                 defineField({
//                   name: 'style',
//                   type: 'string',
//                   title: 'Style',
//                   options: {
//                     list: [
//                       {title: 'Button - Primary', value: 'buttonPrimary'},
//                       {title: 'Button - Secondary', value: 'buttonSecondary'},
//                       {title: 'Button - Outline', value: 'buttonOutline'},
//                       {title: 'Text Link', value: 'textLink'},
//                     ],
//                   },
//                   initialValue: 'buttonPrimary',
//                 }),
//                 defineField({
//                   name: 'openInNewTab',
//                   type: 'boolean',
//                   title: 'Open in New Tab',
//                   initialValue: false,
//                 }),
//               ],
//             }),
//           ],
//           preview: {
//             select: {
//               title: 'title',
//               subtitle: 'subtitle',
//               media: 'image',
//             },
//             prepare({title, subtitle, media}) {
//               return {
//                 title: title || 'Untitled Block',
//                 subtitle: subtitle || 'Content Block',
//                 media: media,
//               }
//             },
//           },
//         }),
//       ],
//     }),

//     // Layout Settings
//     defineField({
//       name: 'layout',
//       title: 'Layout Style',
//       type: 'string',
//       options: {
//         list: [
//           {title: 'Grid', value: 'grid'},
//           {title: 'Stacked', value: 'stacked'},
//           {title: 'Carousel', value: 'carousel'},
//         ],
//       },
//       initialValue: 'grid',
//       group: 'layout',
//     }),
//     defineField({
//       name: 'spacing',
//       title: 'Block Spacing',
//       type: 'string',
//       options: {
//         list: [
//           {title: 'Tight', value: 'tight'},
//           {title: 'Normal', value: 'normal'},
//           {title: 'Wide', value: 'wide'},
//         ],
//       },
//       initialValue: 'normal',
//       group: 'layout',
//     }),
//     defineField({
//       name: 'contentAlignment',
//       title: 'Content Alignment',
//       type: 'string',
//       options: {
//         list: [
//           {title: 'Left', value: 'left'},
//           {title: 'Center', value: 'center'},
//         ],
//       },
//       initialValue: 'center',
//       group: 'layout',
//     }),
//     defineField({
//       name: 'containerWidth',
//       title: 'Container Width',
//       type: 'string',
//       options: {
//         list: [
//           {title: 'Narrow', value: 'narrow'},
//           {title: 'Standard', value: 'standard'},
//           {title: 'Wide', value: 'wide'},
//           {title: 'Full Width', value: 'full'},
//         ],
//       },
//       initialValue: 'standard',
//       group: 'layout',
//     }),

//     // Add style fields
//     ...blockStyleFields.map((field) => ({...field, group: 'style'})),
//     // Add SEO fields
//     ...seoFields.map((field) => ({...field, group: 'seo'})),
//   ],
//   preview: defaultBlockPreview,
// })

// export default ThreeUpBlock

import {defineArrayMember, defineField, defineType} from 'sanity'

const threeUpBlock = defineType({
  name: 'threeUpBlock',
  type: 'object',
  title: 'Three Up Block',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
  ],
})

export default threeUpBlock
