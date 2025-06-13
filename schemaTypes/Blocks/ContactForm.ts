import {defineArrayMember, defineField, defineType} from 'sanity'
import {blockStyleFields, seoFields} from '../pageBuilder.config'
import {EnvelopeIcon} from '@sanity/icons'
import type {StringRule, TextRule, ArrayRule} from '@sanity/types'

// TypeScript schema for ContactForm
const ContactForm = defineType({
  name: 'contactForm',
  type: 'object',
  title: 'Contact Form',
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'fields', title: 'Form Fields'},
    {name: 'submission', title: 'Form Submission'},
    {name: 'layout', title: 'Layout'},
    {name: 'style', title: 'Style'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Content Fields
    defineField({
      name: 'title',
      type: 'string',
      title: 'Form Title',
      description: 'The main heading for your contact form',
      validation: (rule: StringRule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Form Subtitle',
      description: 'Optional subtitle displayed below the title',
      group: 'content',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Form Description',
      description: 'A brief description of what this form is for',
      validation: (rule: TextRule) => rule.max(200),
      group: 'content',
    }),

    // Form Fields
    defineField({
      name: 'formFields',
      type: 'array',
      title: 'Form Fields',
      description: 'Add and arrange form fields',
      group: 'fields',
      of: [
        defineArrayMember({
          type: 'object',
          groups: [
            {name: 'basic', title: 'Basic Settings'},
            {name: 'validation', title: 'Validation'},
            {name: 'advanced', title: 'Advanced'},
          ],
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Field Label',
              validation: (rule: StringRule) => rule.required(),
              group: 'basic',
            }),
            defineField({
              name: 'type',
              type: 'string',
              title: 'Field Type',
              options: {
                list: [
                  {title: 'Single Line Text', value: 'text'},
                  {title: 'Multi Line Text', value: 'textarea'},
                  {title: 'Email', value: 'email'},
                  {title: 'Phone', value: 'tel'},
                  {title: 'Number', value: 'number'},
                  {title: 'Date', value: 'date'},
                  {title: 'Time', value: 'time'},
                  {title: 'URL', value: 'url'},
                  {title: 'Checkbox', value: 'checkbox'},
                  {title: 'Radio Buttons', value: 'radio'},
                  {title: 'Select Dropdown', value: 'select'},
                  {title: 'File Upload', value: 'file'},
                ],
              },
              validation: (rule: StringRule) => rule.required(),
              group: 'basic',
            }),
            defineField({
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder Text',
              description: 'Text shown when the field is empty',
              group: 'basic',
            }),
            defineField({
              name: 'helpText',
              type: 'string',
              title: 'Help Text',
              description: 'Additional information displayed below the field',
              group: 'basic',
            }),

            // Validation Settings
            defineField({
              name: 'required',
              type: 'boolean',
              title: 'Required Field',
              description: 'Make this field mandatory',
              initialValue: false,
              group: 'validation',
            }),
            defineField({
              name: 'validation',
              type: 'object',
              title: 'Validation Rules',
              group: 'validation',
              hidden: ({parent}) => !parent?.required,
              fields: [
                defineField({
                  name: 'minLength',
                  type: 'number',
                  title: 'Minimum Length',
                  hidden: ({parent}) =>
                    !['text', 'textarea', 'email', 'tel', 'url'].includes(parent?.type),
                }),
                defineField({
                  name: 'maxLength',
                  type: 'number',
                  title: 'Maximum Length',
                  hidden: ({parent}) =>
                    !['text', 'textarea', 'email', 'tel', 'url'].includes(parent?.type),
                }),
                defineField({
                  name: 'pattern',
                  type: 'string',
                  title: 'Pattern (Regex)',
                  description: 'Custom validation pattern',
                  hidden: ({parent}) => !['text', 'tel'].includes(parent?.type),
                }),
                defineField({
                  name: 'min',
                  type: 'number',
                  title: 'Minimum Value',
                  hidden: ({parent}) => parent?.type !== 'number',
                }),
                defineField({
                  name: 'max',
                  type: 'number',
                  title: 'Maximum Value',
                  hidden: ({parent}) => parent?.type !== 'number',
                }),
                defineField({
                  name: 'customError',
                  type: 'string',
                  title: 'Custom Error Message',
                  description: 'Message shown when validation fails',
                }),
              ],
            }),

            // Advanced Settings
            defineField({
              name: 'options',
              type: 'array',
              title: 'Options',
              description: 'Add options for select, radio, or checkbox fields',
              hidden: ({parent}) => !['select', 'radio', 'checkbox'].includes(parent?.type),
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      type: 'string',
                      title: 'Option Label',
                      validation: (rule: StringRule) => rule.required(),
                    }),
                    defineField({
                      name: 'value',
                      type: 'string',
                      title: 'Option Value',
                      validation: (rule: StringRule) => rule.required(),
                    }),
                  ],
                }),
              ],
              group: 'advanced',
            }),
            defineField({
              name: 'defaultValue',
              type: 'string',
              title: 'Default Value',
              description: 'Pre-filled value when the form loads',
              group: 'advanced',
            }),
            defineField({
              name: 'width',
              type: 'string',
              title: 'Field Width',
              options: {
                list: [
                  {title: 'Full Width', value: 'full'},
                  {title: 'Half Width', value: 'half'},
                  {title: 'Third Width', value: 'third'},
                ],
              },
              initialValue: 'full',
              group: 'advanced',
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
                title: label || 'Unnamed Field',
                subtitle: `${type}${required ? ' (Required)' : ''}`,
                media: EnvelopeIcon,
              }
            },
          },
        }),
      ],
    }),

    // Form Submission Settings
    defineField({
      name: 'submitButton',
      type: 'object',
      title: 'Submit Button',
      group: 'submission',
      fields: [
        defineField({
          name: 'text',
          type: 'string',
          title: 'Button Text',
          validation: (rule: StringRule) => rule.required(),
          initialValue: 'Send Message',
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
        defineField({
          name: 'align',
          type: 'string',
          title: 'Button Alignment',
          options: {
            list: [
              {title: 'Left', value: 'left'},
              {title: 'Center', value: 'center'},
              {title: 'Right', value: 'right'},
            ],
          },
          initialValue: 'left',
        }),
      ],
    }),
    defineField({
      name: 'notifications',
      type: 'object',
      title: 'Form Notifications',
      group: 'submission',
      fields: [
        defineField({
          name: 'successMessage',
          type: 'text',
          title: 'Success Message',
          description: 'Message shown after successful form submission',
          validation: (rule: TextRule) => rule.required(),
          initialValue: 'Thank you for your message. We will get back to you soon.',
        }),
        defineField({
          name: 'errorMessage',
          type: 'text',
          title: 'Error Message',
          description: 'Message shown if form submission fails',
          validation: (rule: TextRule) => rule.required(),
          initialValue: 'Sorry, there was an error submitting your message. Please try again.',
        }),
      ],
    }),
    defineField({
      name: 'emailNotification',
      type: 'object',
      title: 'Email Notification',
      group: 'submission',
      fields: [
        defineField({
          name: 'to',
          type: 'array',
          title: 'Notification Emails',
          of: [
            defineArrayMember({
              type: 'string',
              validation: (rule: StringRule) => rule.email(),
            }),
          ],
          validation: (rule: ArrayRule<string>) => rule.min(1),
        }),
        defineField({
          name: 'subject',
          type: 'string',
          title: 'Email Subject',
          validation: (rule: StringRule) => rule.required(),
          initialValue: 'New Contact Form Submission',
        }),
        defineField({
          name: 'replyTo',
          type: 'boolean',
          title: 'Use Submitter Email as Reply-To',
          description: 'If the form includes an email field, use it as the reply-to address',
          initialValue: true,
        }),
      ],
    }),

    // Layout Settings
    defineField({
      name: 'layout',
      title: 'Form Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Stacked', value: 'stacked'},
          {title: 'Two Columns', value: 'twoColumns'},
        ],
      },
      initialValue: 'stacked',
      group: 'layout',
    }),
    defineField({
      name: 'spacing',
      title: 'Field Spacing',
      type: 'string',
      options: {
        list: [
          {title: 'Tight', value: 'tight'},
          {title: 'Normal', value: 'normal'},
          {title: 'Relaxed', value: 'relaxed'},
        ],
      },
      initialValue: 'normal',
      group: 'layout',
    }),
    defineField({
      name: 'containerWidth',
      title: 'Form Width',
      type: 'string',
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
      style: 'style',
    },
    prepare(selection) {
      const {title, subtitle, formFields, layout, style} = selection
      const layoutIndicator = layout ? ` • ${layout}` : ''
      const fieldsIndicator = formFields ? ` • ${formFields.length} fields` : ''
      const styleIndicator = style?.backgroundColor ? ` • ${style.backgroundColor}` : ''

      return {
        title: title || 'Contact Form',
        subtitle: `${subtitle ? `${subtitle} • ` : ''}Form${fieldsIndicator}${layoutIndicator}${styleIndicator}`,
        media: EnvelopeIcon,
      }
    },
  },
})

export default ContactForm
