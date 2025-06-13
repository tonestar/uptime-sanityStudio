import {defineField, defineType} from 'sanity'
import {blockStyleFields, seoFields} from '../pageBuilder.config'
import {RocketIcon} from '@sanity/icons'
import type {StringRule, TextRule} from '@sanity/types'

// TypeScript schema for NewsletterSignup
const NewsletterSignup = defineType({
  name: 'newsletterSignup',
  type: 'object',
  title: 'Newsletter Signup',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'form', title: 'Form Settings'},
    {name: 'integration', title: 'Integration'},
    {name: 'privacy', title: 'Privacy'},
    {name: 'layout', title: 'Layout'},
    {name: 'style', title: 'Style'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Content Fields
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      description: 'The main heading for your newsletter signup',
      validation: (rule: StringRule) => rule.required().max(100),
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Section Subtitle',
      description: 'Optional subtitle displayed below the title',
      group: 'content',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Section Description',
      description: 'A brief description of what subscribers will receive',
      validation: (rule: TextRule) => rule.max(200),
      group: 'content',
    }),

    // Form Settings
    defineField({
      name: 'formFields',
      type: 'array',
      title: 'Additional Form Fields',
      description: 'Add optional fields beyond the email address',
      group: 'form',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Field Label',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'type',
              type: 'string',
              title: 'Field Type',
              options: {
                list: [
                  {title: 'Text', value: 'text'},
                  {title: 'Name', value: 'name'},
                  {title: 'Phone', value: 'tel'},
                  {title: 'Checkbox', value: 'checkbox'},
                ],
              },
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'required',
              type: 'boolean',
              title: 'Required Field',
              initialValue: false,
            }),
            defineField({
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder Text',
            }),
          ],
          preview: {
            select: {
              label: 'label',
              type: 'type',
              required: 'required',
            },
            prepare({label, type, required}) {
              return {
                title: label,
                subtitle: `${type}${required ? ' (Required)' : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'submitButton',
      type: 'object',
      title: 'Submit Button',
      group: 'form',
      fields: [
        defineField({
          name: 'text',
          type: 'string',
          title: 'Button Text',
          validation: (rule: StringRule) => rule.required(),
          initialValue: 'Subscribe',
        }),
        defineField({
          name: 'style',
          type: 'string',
          title: 'Button Style',
          options: {
            list: [
              {title: 'Primary', value: 'primary'},
              {title: 'Secondary', value: 'secondary'},
              {title: 'Outline', value: 'outline'},
            ],
          },
          initialValue: 'primary',
        }),
      ],
    }),

    // Integration Settings
    defineField({
      name: 'integration',
      type: 'object',
      title: 'Newsletter Integration',
      group: 'integration',
      fields: [
        defineField({
          name: 'provider',
          type: 'string',
          title: 'Email Provider',
          options: {
            list: [
              {title: 'Mailchimp', value: 'mailchimp'},
              {title: 'ConvertKit', value: 'convertkit'},
              {title: 'Campaign Monitor', value: 'campaignMonitor'},
              {title: 'Custom API', value: 'custom'},
            ],
          },
        }),
        defineField({
          name: 'listId',
          type: 'string',
          title: 'List/Audience ID',
          description: 'The ID of the list/audience to add subscribers to',
        }),
        defineField({
          name: 'tags',
          type: 'array',
          title: 'Subscriber Tags',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
      ],
    }),

    // Privacy Settings
    defineField({
      name: 'privacy',
      type: 'object',
      title: 'Privacy Settings',
      group: 'privacy',
      fields: [
        defineField({
          name: 'showPrivacyCheckbox',
          type: 'boolean',
          title: 'Show Privacy Consent Checkbox',
          description: 'Add a required checkbox for GDPR compliance',
          initialValue: true,
        }),
        defineField({
          name: 'privacyText',
          type: 'text',
          title: 'Privacy Consent Text',
          description: 'Text displayed next to the privacy checkbox',
          initialValue:
            'I agree to receive email newsletters and accept the data privacy statement.',
        }),
        defineField({
          name: 'privacyLink',
          type: 'url',
          title: 'Privacy Policy Link',
          description: 'Link to your privacy policy page',
        }),
      ],
    }),

    // Layout Settings
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Form Layout',
      options: {
        list: [
          {title: 'Inline', value: 'inline'},
          {title: 'Stacked', value: 'stacked'},
          {title: 'Split', value: 'split'},
        ],
      },
      initialValue: 'inline',
      group: 'layout',
    }),
    defineField({
      name: 'containerWidth',
      type: 'string',
      title: 'Container Width',
      options: {
        list: [
          {title: 'Narrow', value: 'narrow'},
          {title: 'Standard', value: 'standard'},
          {title: 'Wide', value: 'wide'},
        ],
      },
      initialValue: 'standard',
      group: 'layout',
    }),

    // Add style fields
    ...blockStyleFields.map((field) => ({...field, group: 'style'})),
    // Add SEO fields
    ...seoFields.map((field) => ({...field, group: 'seo'})),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      formFields: 'formFields',
      layout: 'layout',
    },
    prepare(selection) {
      const {title, subtitle, formFields, layout} = selection
      const fieldsCount = (formFields?.length || 0) + 1 // +1 for email field
      const layoutIndicator = layout ? ` • ${layout}` : ''

      return {
        title: title || 'Newsletter Signup',
        subtitle: `${subtitle ? `${subtitle} • ` : ''}${fieldsCount} fields${layoutIndicator}`,
        media: RocketIcon,
      }
    },
  },
})

export default NewsletterSignup
