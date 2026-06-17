"use client";

import { SMJ_IMAGES, COLLAGE_VIEWPORT } from "./wordmark-data";
import DelegatePhoto from "./DelegatePhoto";

/**
 * AnimatedCollage
 *
 * Renders a large canvas of delegate photos that all drift independently.
 * The canvas is centred inside its container and oversized so slow motion
 * never reveals a hard edge or empty corner.
 *
 * This component is meant to be used inside an SVG <mask> context — it has
 * no background of its own; the mask controls what's visible.
 */
export default function AnimatedCollage() {
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
      {/* Canvas — centred and slightly oversized */}
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
        {SMJ_IMAGES.map((image) => (
          <DelegatePhoto key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
