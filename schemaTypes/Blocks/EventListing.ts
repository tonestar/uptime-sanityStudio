import {defineArrayMember, defineField, defineType} from 'sanity'
import {blockStyleFields, seoFields} from '../pageBuilder.config'
import {CalendarIcon} from '@sanity/icons'
import type {StringRule, TextRule, ArrayRule, DateRule, SlugRule, NumberRule} from '@sanity/types'

// TypeScript schema for EventListing
const EventListing = defineType({
  name: 'eventListing',
  type: 'object',
  title: 'Event Listing',
  icon: CalendarIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'events', title: 'Events'},
    {name: 'display', title: 'Display Settings'},
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
      description: 'The main heading for your events section',
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
      description: 'A brief introduction to your events',
      validation: (rule: TextRule) => rule.max(200),
      group: 'content',
    }),

    // Events
    defineField({
      name: 'events',
      type: 'array',
      title: 'Events',
      description: 'Add and manage events',
      group: 'events',
      validation: (rule: ArrayRule<{type: string}>) => rule.min(1),
      of: [
        defineArrayMember({
          type: 'object',
          groups: [
            {name: 'basic', title: 'Basic Info'},
            {name: 'details', title: 'Event Details'},
            {name: 'location', title: 'Location'},
            {name: 'registration', title: 'Registration'},
            {name: 'media', title: 'Media'},
          ],
          fields: [
            // Basic Info
            defineField({
              name: 'name',
              type: 'string',
              title: 'Event Name',
              validation: (rule: StringRule) => rule.required(),
              group: 'basic',
            }),
            defineField({
              name: 'slug',
              type: 'slug',
              title: 'Event Slug',
              description: 'Used for the event URL',
              options: {
                source: 'name',
                maxLength: 96,
              },
              validation: (rule: SlugRule) => rule.required(),
              group: 'basic',
            }),
            defineField({
              name: 'status',
              type: 'string',
              title: 'Event Status',
              options: {
                list: [
                  {title: 'Scheduled', value: 'scheduled'},
                  {title: 'Live', value: 'live'},
                  {title: 'Canceled', value: 'canceled'},
                  {title: 'Postponed', value: 'postponed'},
                  {title: 'Sold Out', value: 'soldOut'},
                ],
              },
              initialValue: 'scheduled',
              group: 'basic',
            }),

            // Event Details
            defineField({
              name: 'startDate',
              type: 'datetime',
              title: 'Start Date & Time',
              validation: (rule: DateRule) => rule.required(),
              group: 'details',
            }),
            defineField({
              name: 'endDate',
              type: 'datetime',
              title: 'End Date & Time',
              validation: (rule: DateRule) => rule.min(rule.valueOfField('startDate')),
              group: 'details',
            }),
            defineField({
              name: 'timeZone',
              type: 'string',
              title: 'Time Zone',
              description: 'The time zone for this event',
              initialValue: 'UTC',
              group: 'details',
            }),
            defineField({
              name: 'isRecurring',
              type: 'boolean',
              title: 'Recurring Event',
              description: 'Does this event repeat?',
              initialValue: false,
              group: 'details',
            }),
            defineField({
              name: 'recurrence',
              type: 'object',
              title: 'Recurrence Pattern',
              hidden: ({parent}) => !parent?.isRecurring,
              group: 'details',
              fields: [
                defineField({
                  name: 'frequency',
                  type: 'string',
                  title: 'Frequency',
                  options: {
                    list: [
                      {title: 'Daily', value: 'daily'},
                      {title: 'Weekly', value: 'weekly'},
                      {title: 'Monthly', value: 'monthly'},
                      {title: 'Yearly', value: 'yearly'},
                    ],
                  },
                }),
                defineField({
                  name: 'interval',
                  type: 'number',
                  title: 'Interval',
                  description: 'How often the event repeats',
                  initialValue: 1,
                }),
                defineField({
                  name: 'endAfter',
                  type: 'number',
                  title: 'End After',
                  description: 'Number of occurrences',
                }),
                defineField({
                  name: 'endDate',
                  type: 'date',
                  title: 'End Date',
                  description: 'When the recurring event ends',
                }),
              ],
            }),
            defineField({
              name: 'description',
              type: 'array',
              title: 'Event Description',
              description: 'Rich text description with formatting',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H4', value: 'h4'},
                    {title: 'Quote', value: 'blockquote'},
                  ],
                  lists: [
                    {title: 'Bullet', value: 'bullet'},
                    {title: 'Numbered', value: 'number'},
                  ],
                }),
              ],
              group: 'details',
            }),

            // Location
            defineField({
              name: 'eventType',
              type: 'string',
              title: 'Event Type',
              options: {
                list: [
                  {title: 'In Person', value: 'inPerson'},
                  {title: 'Virtual', value: 'virtual'},
                  {title: 'Hybrid', value: 'hybrid'},
                ],
              },
              initialValue: 'inPerson',
              group: 'location',
            }),
            defineField({
              name: 'location',
              type: 'object',
              title: 'Physical Location',
              hidden: ({parent}) => parent?.eventType === 'virtual',
              group: 'location',
              fields: [
                defineField({
                  name: 'venue',
                  type: 'string',
                  title: 'Venue Name',
                }),
                defineField({
                  name: 'address',
                  type: 'string',
                  title: 'Street Address',
                }),
                defineField({
                  name: 'city',
                  type: 'string',
                  title: 'City',
                }),
                defineField({
                  name: 'state',
                  type: 'string',
                  title: 'State/Province',
                }),
                defineField({
                  name: 'country',
                  type: 'string',
                  title: 'Country',
                }),
                defineField({
                  name: 'postalCode',
                  type: 'string',
                  title: 'Postal Code',
                }),
              ],
            }),
            defineField({
              name: 'virtualLocation',
              type: 'object',
              title: 'Virtual Location',
              hidden: ({parent}) => parent?.eventType === 'inPerson',
              group: 'location',
              fields: [
                defineField({
                  name: 'platform',
                  type: 'string',
                  title: 'Platform',
                  options: {
                    list: [
                      {title: 'Zoom', value: 'zoom'},
                      {title: 'Google Meet', value: 'meet'},
                      {title: 'Microsoft Teams', value: 'teams'},
                      {title: 'Other', value: 'other'},
                    ],
                  },
                }),
                defineField({
                  name: 'url',
                  type: 'url',
                  title: 'Meeting URL',
                }),
                defineField({
                  name: 'additionalInfo',
                  type: 'text',
                  title: 'Additional Information',
                  description: 'Meeting ID, password, or other access details',
                }),
              ],
            }),

            // Registration
            defineField({
              name: 'registration',
              type: 'object',
              title: 'Registration Details',
              group: 'registration',
              fields: [
                defineField({
                  name: 'requiresRegistration',
                  type: 'boolean',
                  title: 'Requires Registration',
                  initialValue: false,
                }),
                defineField({
                  name: 'registrationUrl',
                  type: 'url',
                  title: 'Registration URL',
                  hidden: ({parent}) => !parent?.requiresRegistration,
                }),
                defineField({
                  name: 'capacity',
                  type: 'number',
                  title: 'Event Capacity',
                  description: 'Maximum number of attendees',
                  hidden: ({parent}) => !parent?.requiresRegistration,
                }),
                defineField({
                  name: 'price',
                  type: 'number',
                  title: 'Price',
                  description: 'Leave empty if free',
                }),
                defineField({
                  name: 'currency',
                  type: 'string',
                  title: 'Currency',
                  options: {
                    list: [
                      {title: 'USD', value: 'USD'},
                      {title: 'EUR', value: 'EUR'},
                      {title: 'GBP', value: 'GBP'},
                    ],
                  },
                  hidden: ({parent}) => !parent?.price,
                  initialValue: 'USD',
                }),
              ],
            }),

            // Media
            defineField({
              name: 'image',
              type: 'image',
              title: 'Event Image',
              description: 'Featured image for the event',
              options: {
                hotspot: true,
                metadata: ['palette', 'lqip'],
              },
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  description: 'Important for SEO and accessibility',
                }),
                defineField({
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
                }),
              ],
              group: 'media',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              date: 'startDate',
              status: 'status',
              location: 'location.venue',
              image: 'image',
            },
            prepare({title, date, status, location, image}) {
              return {
                title: title || 'Untitled Event',
                subtitle: `${date ? new Date(date).toLocaleDateString() : 'No date'} • ${
                  status || 'Draft'
                }${location ? ` • ${location}` : ''}`,
                media: image,
              }
            },
          },
        }),
      ],
    }),

    // Display Settings
    defineField({
      name: 'displayOptions',
      type: 'object',
      title: 'Display Options',
      group: 'display',
      fields: [
        defineField({
          name: 'viewMode',
          type: 'string',
          title: 'View Mode',
          options: {
            list: [
              {title: 'List', value: 'list'},
              {title: 'Grid', value: 'grid'},
              {title: 'Calendar', value: 'calendar'},
              {title: 'Timeline', value: 'timeline'},
            ],
          },
          initialValue: 'list',
        }),
        defineField({
          name: 'sortBy',
          type: 'string',
          title: 'Sort Events By',
          options: {
            list: [
              {title: 'Date (Ascending)', value: 'dateAsc'},
              {title: 'Date (Descending)', value: 'dateDesc'},
              {title: 'Name (A-Z)', value: 'nameAsc'},
              {title: 'Name (Z-A)', value: 'nameDesc'},
            ],
          },
          initialValue: 'dateAsc',
        }),
        defineField({
          name: 'showPastEvents',
          type: 'boolean',
          title: 'Show Past Events',
          description: 'Include events that have already occurred',
          initialValue: false,
        }),
        defineField({
          name: 'eventsPerPage',
          type: 'number',
          title: 'Events Per Page',
          validation: (rule: NumberRule) => rule.min(1).max(50),
          initialValue: 10,
        }),
        defineField({
          name: 'showFilters',
          type: 'boolean',
          title: 'Show Filters',
          description: 'Allow users to filter events',
          initialValue: true,
        }),
      ],
    }),

    // Layout Settings
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout Style',
      options: {
        list: [
          {title: 'Standard', value: 'standard'},
          {title: 'Compact', value: 'compact'},
          {title: 'Featured', value: 'featured'},
          {title: 'Masonry', value: 'masonry'},
        ],
      },
      initialValue: 'standard',
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
      events: 'events',
      layout: 'layout',
      viewMode: 'displayOptions.viewMode',
    },
    prepare(selection) {
      const {title, subtitle, events, layout, viewMode} = selection
      const eventCount = events?.length || 0
      const layoutIndicator = layout ? ` • ${layout}` : ''
      const viewModeIndicator = viewMode ? ` • ${viewMode} view` : ''

      return {
        title: title || 'Event Listing',
        subtitle: `${subtitle ? `${subtitle} • ` : ''}${eventCount} events${layoutIndicator}${viewModeIndicator}`,
        media: CalendarIcon,
      }
    },
  },
})

export default EventListing
