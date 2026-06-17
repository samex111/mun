"use client";

import { motion } from "framer-motion";
import type { CollageImage } from "./types";

interface DelegatePhotoProps {
  image: CollageImage;
}

/**
 * A single photo tile inside the animated SMJ collage.
 *
 * Key choices vs. v1:
 * - Multi-keyframe arrays per axis → organic, non-mechanical drift
 * - "linear" easing on the keyframe sequence (Framer handles per-segment ease)
 * - willChange: "transform" so the browser layer-promotes the element
 * - No opacity animation — the mask alone handles visibility
 */
export default function DelegatePhoto({ image }: DelegatePhotoProps) {
  const { src, alt, initialX, initialY, width, height, motionConfig } = image;

  const animateProp: Record<string, unknown> = {};

  if (motionConfig.x) animateProp.x = motionConfig.x;
  if (motionConfig.y) animateProp.y = motionConfig.y;
  if (motionConfig.scale) animateProp.scale = motionConfig.scale;
  if (motionConfig.rotate) animateProp.rotate = motionConfig.rotate;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: initialX,
        top: initialY,
        width,
        height,
        willChange: "transform",
      }}
      animate={animateProp}
      transition={{
        duration: motionConfig.duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        times: motionConfig.x
          ? motionConfig.x.map((_, i) => i / (motionConfig.x!.length - 1))
          : undefined,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          // Subtle warmth tint for the SMJ "human stories" feel
          filter: "saturate(1.15) brightness(1.05)",
        }}
      />
    </motion.div>
  );
}
