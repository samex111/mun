import type { PortableTextBlock } from "next-sanity";
import type { SanityImage } from "../shared/types";

export interface Blog {
  _id: string;
  _type: "blog";
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImage;
  body?: PortableTextBlock[];
  author?: string;
  publishedAt: string;
  featured: boolean;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
}
