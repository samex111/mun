import { sanityFetch } from "../client";
import { MEDIA_QUERY } from "./queries";
import type { Media } from "./types";

export class MediaService {
  static async getMedia(): Promise<Media[]> {
    return sanityFetch<Media[]>({
      query: MEDIA_QUERY,
      tags: ["media"],
    });
  }
}
