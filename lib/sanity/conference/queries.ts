import { defineQuery } from "next-sanity";

export const CONFERENCES_QUERY = defineQuery(
  `*[_type == "conference" && status != "draft"] | order(date desc){
    _id,
    _type,
    title,
    slug,
    heroImage,
    venue,
    date,
    registrationFee,
    capacity,
    registrationOpen,
    status,
    featured
  }`
);

export const FEATURED_CONFERENCES_QUERY = defineQuery(
  `*[_type == "conference" && featured == true && status != "draft"] | order(date desc){
    _id,
    _type,
    title,
    slug,
    heroImage,
    venue,
    date,
    registrationFee,
    status,
    featured
  }`
);

export const CONFERENCE_BY_SLUG_QUERY = defineQuery(
  `*[_type == "conference" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    heroImage,
    overview,
    venue,
    date,
    registrationFee,
    capacity,
    registrationOpen,
    registrationCloseDate,
    status,
    featured,
    committees,
    agenda,
    gallery,
    seoTitle,
    seoDescription
  }`
);

export const CONFERENCE_BY_ID_QUERY = defineQuery(
  `*[_type == "conference" && _id == $id][0]{
    _id,
    title,
    venue,
    date
  }`
);
