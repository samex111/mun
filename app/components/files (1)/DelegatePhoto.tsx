"use client";

import { motion } from "framer-motion";
import type { CollageImage } from "./types";

interface DelegatePhotoProps {
  image: CollageImage;
}

export default function DelegatePhoto({ image }: DelegatePhotoProps) {
  const { src, alt, initialX, initialY, width, height, motionConfig } = image;

  const animateProps: Record<string, unknown> = {};
  const fromProps: Record<string, unknown> = {};

  if (motionConfig.x) {
    fromProps.x = motionConfig.x[0];
    animateProps.x = motionConfig.x[1];
  }
  if (motionConfig.y) {
    fromProps.y = motionConfig.y[0];
    animateProps.y = motionConfig.y[1];
  }
  if (motionConfig.scale) {
    fromProps.scale = motionConfig.scale[0];
    animateProps.scale = motionConfig.scale[1];
  }
  if (motionConfig.rotate) {
    fromProps.rotate = motionConfig.rotate[0];
    animateProps.rotate = motionConfig.rotate[1];
  }

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
      initial={fromProps}
      animate={animateProps}
      transition={{
        duration: motionConfig.duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </motion.div>
  );
}
