"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TimelineStepProps {
  number: string;
  title: string;
  description: string;
  isActive: boolean;
}

/**
 * TimelineStep — pure display.
 *
 * Hierarchy:
 *   01          ← ghost number (visual anchor)
 *   ──────      ← gold thin line
 *   Title
 *   Description
 */
export function TimelineStep({
  number,
  title,
  description,
  isActive,
}: TimelineStepProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={number}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -32 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex max-w-[460px] flex-col"
        >
          {/* Ghost step number — visual anchor, not the main text */}
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.04, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-5 font-[family-name:var(--font-inter)] text-[72px] font-bold leading-none text-charcoal lg:text-[96px]"
          >
            {number}
          </motion.span>

          {/* Gold separator line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 h-[1px] w-10 origin-left bg-[#BB8B57]"
          />

          {/* Title */}
          <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-2xl font-bold leading-[1.18] text-white lg:text-[28px]">
            {title}
          </h3>

          {/* Description */}
          <p className="font-[family-name:var(--font-inter)] text-md leading-[1.85] text-white/80">
            {description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
