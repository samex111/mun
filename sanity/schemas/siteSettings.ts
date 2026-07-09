import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "organizationName",
      title: "Organization Name",
      type: "string",
      group: "organization",
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      group: "organization",
    }),
    defineField({
      name: "aboutSMJMUN",
      title: "About SMJMUN",
      type: "text",
      group: "organization",
    }),
    defineField({
      name: "mission",
      title: "Mission",
      type: "text",
      group: "organization",
    }),
    defineField({
      name: "vision",
      title: "Vision",
      type: "text",
      group: "organization",
    }),
    defineField({
      name: "whyJoinSMJMUN",
      title: "Why Join SMJMUN",
      type: "array",
      of: [{ type: "block" }],
      group: "organization",
    }),
    defineField({
      name: "history",
      title: "History",
      type: "text",
      group: "organization",
    }),
    defineField({
      name: "coreValues",
      title: "Core Values",
      type: "array",
      of: [{ type: "string" }],
      group: "organization",
    }),
    defineField({
      name: "objectives",
      title: "Objectives",
      type: "array",
      of: [{ type: "string" }],
      group: "organization",
    }),
    defineField({
      name: "contact",
      title: "Global Contact Info",
      type: "contactInfo",
      group: "contact",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      group: "social",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
      ],
    }),
    defineField({
      name: "aiAssistant",
      title: "AI Assistant Settings",
      type: "object",
      group: "aiAssistant",
      fields: [
        defineField({ name: "greeting", title: "Greeting", type: "text" }),
        defineField({ name: "defaultFallbackMessage", title: "Default Fallback Message", type: "text" }),
        defineField({ name: "suggestedQuestions", title: "Suggested Questions", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "Global SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Global SEO Description",
      type: "text",
      group: "seo",
    }),
  ],
  groups: [
    { name: "organization", title: "Organization" },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social Links" },
    { name: "aiAssistant", title: "AI Assistant" },
    { name: "seo", title: "SEO" },
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
