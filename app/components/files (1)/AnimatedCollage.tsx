"use client";

import { SMJ_IMAGES, COLLAGE_VIEWPORT } from "./wordmark-data";
import DelegatePhoto from "./DelegatePhoto";

export default function AnimatedCollage() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Inner container slightly larger than viewport so edges don't show blank */}
      <div
        style={{
          position: "relative",
          width: COLLAGE_VIEWPORT.width,
          height: COLLAGE_VIEWPORT.height,
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        }}
      >
        {SMJ_IMAGES.map((image) => (
          <DelegatePhoto key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
