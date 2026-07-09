import { defineQuery } from "next-sanity";

export const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial"]{
    _id,
    _type,
    name,
    role,
    quote,
    avatar,
    "conferenceName": conference->title
  }`
);
