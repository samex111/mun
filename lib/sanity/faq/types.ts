import type { PortableTextBlock } from "next-sanity";

export interface FAQ {
  _id: string;
  _type: "faq";
  question: string;
  answer: PortableTextBlock[];
  category: string;
  priority?: number;
  keywords?: string[];
  status: "draft" | "published" | "archived";
}
