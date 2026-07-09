import { defineQuery } from "next-sanity";

export const MEDIA_QUERY = defineQuery(
  `*[_type == "media"] | order(publishedAt desc){
    _id,
    _type,
    title,
    publisher,
    url,
    coverImage,
    publishedAt
  }`
);
