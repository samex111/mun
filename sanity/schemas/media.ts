import { defineField, defineType } from "sanity";

export const media = defineType({
  name: "media",
  title: "Media & Press",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publisher",
      title: "Publisher / Source",
      type: "string",
      description: "e.g. Times of India, NDTV, The Hindu",
    }),
    defineField({
      name: "url",
      title: "Article URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publisher",
      media: "coverImage",
    },
  },
  orderings: [
    {
      title: "Published (Newest)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
