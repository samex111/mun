import { sanityFetch } from "../client";
import {
  CONFERENCES_QUERY,
  FEATURED_CONFERENCES_QUERY,
  CONFERENCE_BY_SLUG_QUERY,
  CONFERENCE_BY_ID_QUERY,
} from "./queries";
import type { Conference } from "./types";

export class ConferenceService {
  static async getConferences(): Promise<Conference[]> {
    return sanityFetch<Conference[]>({
      query: CONFERENCES_QUERY,
      tags: ["conference"],
    });
  }

  static async getFeaturedConferences(): Promise<Conference[]> {
    return sanityFetch<Conference[]>({
      query: FEATURED_CONFERENCES_QUERY,
      tags: ["conference"],
    });
  }

  static async getConferenceBySlug(slug: string): Promise<Conference | null> {
    return sanityFetch<Conference | null>({
      query: CONFERENCE_BY_SLUG_QUERY,
      params: { slug },
      tags: ["conference", `conference:${slug}`],
    });
  }

  static async getConferenceById(id: string): Promise<Pick<Conference, "_id" | "title" | "venue" | "date"> | null> {
    return sanityFetch<Pick<Conference, "_id" | "title" | "venue" | "date"> | null>({
      query: CONFERENCE_BY_ID_QUERY,
      params: { id },
      tags: ["conference", `conference:${id}`],
    });
  }
}
