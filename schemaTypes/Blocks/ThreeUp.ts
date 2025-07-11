import {defineArrayMember, defineField, defineType} from 'sanity'

const threeUp = defineType({
  name: 'threeUp',
  type: 'object',
  title: 'ThreeUp',
  fields: [
    defineField({
      name: 'byline',
      type: 'string',
      title: 'Byline',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'threeUpBlocks',
      type: 'array',
      title: 'ThreeUpBlocks',
      of: [defineArrayMember({type: 'threeUpBlock'})],
    }),
  ],
})

export default threeUp
