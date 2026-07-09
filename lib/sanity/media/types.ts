import type { SanityImage } from "../shared/types";

export interface Media {
  _id: string;
  _type: "media";
  title: string;
  publisher?: string;
  url?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
}
