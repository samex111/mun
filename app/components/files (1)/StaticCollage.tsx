"use client";

import { MUN_IMAGES, COLLAGE_VIEWPORT } from "./wordmark-data";

export default function StaticCollage() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
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
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
