import { sanityFetch } from "../client";
import { SITE_SETTINGS_QUERY } from "./queries";
import type { SiteSettings } from "./types";

export class SiteSettingsService {
  static async getSiteSettings(): Promise<SiteSettings | null> {
    return sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ["siteSettings"],
    });
  }
}
