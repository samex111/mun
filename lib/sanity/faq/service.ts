import { sanityFetch } from "../client";
import { FAQS_QUERY } from "./queries";
import type { FAQ } from "./types";

export class FAQService {
  static async getFAQs(): Promise<FAQ[]> {
    return sanityFetch<FAQ[]>({
      query: FAQS_QUERY,
      tags: ["faq"],
    });
  }
}
