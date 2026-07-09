import { defineQuery } from "next-sanity";

export const FAQS_QUERY = defineQuery(
  `*[_type == "faq" && status == "published"] | order(priority desc, _createdAt asc){
    _id,
    _type,
    question,
    answer,
    category,
    priority,
    keywords,
    status
  }`
);
