import { defineField, defineType } from "sanity";

const featureItem = defineType({
  name: "item",
  type: "object",
  title: "Item",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
    }),
  ],
});

export default featureItem;
