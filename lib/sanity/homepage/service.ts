import { sanityFetch } from "../client";
import { HOMEPAGE_QUERY } from "./queries";
import type { Homepage } from "./types";

export class HomepageService {
  static async getHomepage(): Promise<Homepage | null> {
    return sanityFetch<Homepage | null>({
      query: HOMEPAGE_QUERY,
      tags: ["homepage"],
    });
  }
}
