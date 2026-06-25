"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GoldBorderProps {
  className?: string;
  /** Orientation: vertical (default) or horizontal */
  orientation?: "vertical" | "horizontal";
  /** Animate on scroll — vertical grows downward, horizontal grows rightward */
  animated?: boolean;
}

export function GoldBorder({
  className,
  orientation = "vertical",
  animated = false,
}: GoldBorderProps) {
  if (animated && orientation === "vertical") {
    return (
      <motion.div
        aria-hidden="true"
        className={cn("w-[2px] shrink-0 bg-[#BB8B57] origin-top", className)}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ alignSelf: "stretch" }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "shrink-0 bg-[#BB8B57]",
        orientation === "vertical" ? "w-[2px] self-stretch" : "h-[1px] w-16",
        className
      )}
    />
  );
}
