"use client";

import { motion } from "framer-motion";
import SMJMask from "./SMJMask";
import MUNMask from "./MUNMask";

/**
 * SMJMUNWordmark
 *
 * Desktop/Tablet: SMJ and MUN sit side-by-side, visually reading as one word.
 * Mobile: stacked vertically so letters stay legible.
 *
 * Layout fix vs v1:
 *   The two halves use `flex-1` (equal shares) inside a flex row on md+.
 *   Each mask's SVG has the same viewBox (600×200) and aspect-ratio, so
 *   the glyphs scale proportionally and the gap between them is zero —
 *   they read as a continuous SMJMUN.
 *
 *   On mobile we switch to flex-col, each mask takes full width.
 */
export default function SMJMUNWordmark() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
      aria-label="SMJMUN"
    >
      <div
        className="
          flex
          flex-col
          items-stretch
          md:flex-row
          md:items-stretch
          w-full
          gap-0
        "
      >
        {/* ── SMJ — Living Human Stories ── */}
        <div className="w-full md:flex-1">
          <SMJMask />
        </div>

        {/* ── MUN — Enduring Institution ── */}
        <div className="w-full md:flex-1">
          <MUNMask />
        </div>
        dksvpoinb 
      </div>
    </motion.div>
  );
}
