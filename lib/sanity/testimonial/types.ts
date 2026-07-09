import type { SanityImage } from "../shared/types";

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
