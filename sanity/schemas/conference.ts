import { defineField, defineType } from "sanity";

export const conference = defineType({
  name: "conference",
  title: "Conference",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      name: "registrationFee",
      title: "Registration Fee (₹)",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "number",
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "registrationOpen",
      title: "Registration Open",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "registrationCloseDate",
      title: "Registration Close Date",
      type: "datetime",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Upcoming", value: "upcoming" },
          { title: "Live", value: "live" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description: "Show this conference prominently on the homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "committees",
      title: "Committees",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Committee Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "agenda",
              title: "Agenda",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "chairperson",
              title: "Chairperson",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "chairperson" },
          },
        },
      ],
    }),
    defineField({
      name: "agenda",
      title: "Detailed Agenda",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Override the default title for search engines",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Meta description for search engines",
      group: "seo",
    }),
  ],
  groups: [
    { name: "seo", title: "SEO", icon: () => "🔍" },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "heroImage",
    },
  },
  orderings: [
    {
      title: "Date (Newest)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date (Oldest)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
