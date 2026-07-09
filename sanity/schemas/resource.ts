import { defineField, defineType } from "sanity";

export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Resource Type",
      type: "string",
      options: {
        list: [
          { title: "Brochure", value: "brochure" },
          { title: "Schedule", value: "schedule" },
          { title: "Background Guide", value: "background_guide" },
          { title: "Rulebook", value: "rulebook" },
          { title: "Other Document", value: "document" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx,.xls,.xlsx",
      },
    }),
    defineField({
      name: "link",
      title: "External Link (Optional)",
      type: "url",
    }),
  ],
});
