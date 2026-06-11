import type { PortableTextBlock } from "next-sanity";

// ─── Sanity Image Reference ────────────────────────────────────────
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  alt?: string;
  caption?: string;
}

// ─── Homepage (Singleton) ──────────────────────────────────────────
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

// ─── Conference ────────────────────────────────────────────────────
export type ConferenceStatus = "draft" | "upcoming" | "live" | "completed";

export interface Committee {
  name: string;
  agenda?: string;
  chairperson?: string;
}

export interface Conference {
  _id: string;
  _type: "conference";
  title: string;
  slug: { current: string };
  heroImage: SanityImage;
  overview?: PortableTextBlock[];
  venue?: string;
  date?: string;
  registrationFee?: number;
  capacity?: number;
  registrationOpen: boolean;
  registrationCloseDate?: string;
  status: ConferenceStatus;
  featured: boolean;
  committees?: Committee[];
  agenda?: PortableTextBlock[];
  gallery?: SanityImage[];
  seoTitle?: string;
  seoDescription?: string;
}

// ─── Blog ──────────────────────────────────────────────────────────
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

// ─── Gallery ───────────────────────────────────────────────────────
export interface Gallery {
  _id: string;
  _type: "gallery";
  title: string;
  description?: string;
  images: SanityImage[];
  conference?: { _ref: string };
  conferenceName?: string;
}

// ─── Testimonial ───────────────────────────────────────────────────
export interface Testimonial {
  _id: string;
  _type: "testimonial";
  name: string;
  role?: string;
  quote: string;
  avatar?: SanityImage;
  conference?: { _ref: string };
  conferenceName?: string;
}

// ─── Media / Press ─────────────────────────────────────────────────
export interface Media {
  _id: string;
  _type: "media";
  title: string;
  publisher?: string;
  url?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
}
