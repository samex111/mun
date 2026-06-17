"use client";

import { useId } from "react";
import AnimatedCollage from "./AnimatedCollage";

interface SMJMaskProps {
  className?: string;
}

/**
 * SMJMask
 *
 * Uses an SVG <mask> (white text on black background) rather than
 * <clipPath> + <foreignObject>.
 *
 * Why:
 *   • <clipPath> + <foreignObject> has notorious Safari / iOS bugs.
 *   • <mask> + <image href> is universally reliable.
 *   • useId() avoids duplicate-ID collisions when the component mounts
 *     in multiple places (preview, story, page).
 *
 * Architecture:
 *   1. An invisible SVG defines the mask ("SMJ" white text on black rect).
 *   2. A sibling div holds the actual AnimatedCollage HTML.
 *   3. CSS clip-path via SVG mask reference (mask-image + mask-mode) is
 *      applied to that div through an inline style pointing at the mask.
 *
 * Note on the "HTML + SVG mask-image" technique:
 *   We render the collage as normal HTML (better image quality, Next Image
 *   compatible, no rasterisation) and apply the SVG text shape as a CSS
 *   mask via `mask-image: url(#id)`. This is supported in all modern browsers
 *   including Safari 15.4+.
 */
export default function SMJMask({ className = "" }: SMJMaskProps) {
  const uid = useId();
  const maskId = `${uid.replace(/:/g, "")}-smj-mask`;

  return (
    <div
      className={`relative w-full select-none ${className}`}
      // Intrinsic ratio: viewBox is 600×200, so height = 33.33%
      style={{ aspectRatio: "600 / 200" }}
    >
      
        <AnimatedCollage />
    </div>
  );
}
