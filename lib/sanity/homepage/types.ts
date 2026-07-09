import type { SanityImage } from "../shared/types";

export interface Homepage {
  _id: string;
  _type: "homepage";
  heroTitle: string;
  heroSubtitle?: string;
  heroImages?: SanityImage[];
  stats?: { label: string; value: string }[];
  partnerLogos?: (SanityImage & { alt?: string })[];
  ctaText?: string;
  ctaLink?: string;
}
