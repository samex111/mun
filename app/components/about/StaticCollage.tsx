"use client";

import { MUN_IMAGES, COLLAGE_VIEWPORT } from "./wordmark-data";

/**
 * StaticCollage
 *
 * Conference imagery — no motion. Institutional, fixed, authoritative.
 * Mild cool desaturation reinforces the "enduring institution" contrast
 * against SMJ's warmer, living feel.
 */
export default function StaticCollage() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: COLLAGE_VIEWPORT.width,
          height: COLLAGE_VIEWPORT.height,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {MUN_IMAGES.map((img) => (
          <div
            key={img.id}
            style={{
              position: "absolute",
              left: img.x,
              top: img.y,
              width: img.width,
              height: img.height,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                // Cool, slightly desaturated for the institutional contrast
                filter: "saturate(0.85) brightness(0.95)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
