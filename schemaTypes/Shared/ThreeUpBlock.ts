import { defineArrayMember, defineField, defineType } from "sanity";

const threeUpBlock = defineType({
  name: "threeUpBlock",
  type: "object",
  title: "Three Up Block",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
});

export default threeUpBlock;
