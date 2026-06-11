import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/**
 * Generate an optimized image URL from a Sanity image asset.
 *
 * Usage:
 *   urlFor(post.coverImage).width(800).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
