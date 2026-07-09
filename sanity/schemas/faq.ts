import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Organization", value: "organization" },
          { title: "General", value: "general" },
          { title: "Registration", value: "registration" },
          { title: "Programs", value: "programs" },
          { title: "Partnership", value: "partnership" },
          { title: "Contact", value: "contact" },
          { title: "MUN Basics", value: "mun_basics" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "number",
      description: "Higher number means it shows up first",
      initialValue: 0,
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords to help AI assistant and search match this FAQ",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    }),
    defineField({
      name: "published",
      title: "Published (Legacy)",
      type: "boolean",
      initialValue: false,
      description: "Legacy boolean flag. Consider using Status instead.",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
  },
});
