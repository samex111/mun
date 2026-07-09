import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings" && _id == "siteSettings"][0]{
    _id,
    _type,
    organizationName,
    fullName,
    aboutSMJMUN,
    mission,
    vision,
    whyJoinSMJMUN,
    history,
    coreValues,
    objectives,
    contact,
    socialLinks,
    aiAssistant,
    seoTitle,
    seoDescription
  }`
);
