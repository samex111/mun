import { defineQuery } from "next-sanity";

export const HOMEPAGE_QUERY = defineQuery(
  `*[_type == "homepage" && _id == "homepage"][0]{
    _id,
    _type,
    heroTitle,
    heroSubtitle,
    heroImages,
    stats,
    partnerLogos,
    ctaText,
    ctaLink
  }`
);
