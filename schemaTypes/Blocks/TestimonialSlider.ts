import {defineArrayMember, defineField, defineType} from 'sanity'
import {defaultBlockPreview} from '../pageBuilder.config'
import {StarIcon} from '@sanity/icons'

// TypeScript schema for TestimonialSlider
const TestimonialSlider = defineType({
  name: 'testimonialSlider',
  type: 'object',
  title: 'Testimonial Slider',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      title: 'Testimonials',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'author', type: 'string', title: 'Author'}),
            defineField({name: 'role', type: 'string', title: 'Role'}),
            defineField({name: 'content', type: 'text', title: 'Content'}),
            defineField({name: 'image', type: 'image', title: 'Author Image'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    ...defaultBlockPreview,
    select: {
      title: 'title',
      testimonials: 'testimonials',
    },
    prepare(selection) {
      const {title, testimonials} = selection
      return {
        title: title ?? 'Testimonial Slider',
        subtitle: `${testimonials?.length ?? 0} Testimonials`,
        media: StarIcon,
      }
    },
  },
})

export default TestimonialSlider
