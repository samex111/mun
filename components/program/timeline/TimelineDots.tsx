"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineDotsProps {
  currentIndex: number;
  totalSteps: number;
  onDotClick?: (index: number) => void;
}

/**
 * TimelineDots — vertical dot navigation.
 * Active dot scales up with gold glow.
 */
export function TimelineDots({
  currentIndex,
  totalSteps,
  onDotClick,
}: TimelineDotsProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const isActive = i === currentIndex;

        return (
          <motion.button
            key={i}
            onClick={() => onDotClick?.(i)}
            aria-label={`Go to step ${i + 1}`}
            animate={
              isActive
                ? {
                    scale: [1, 1.4, 1.2],
                    transition: { duration: 0.4, ease: "easeOut" },
                  }
                : { scale: 1 }
            }
            className={cn(
              "relative h-2 w-2 rounded-full transition-colors duration-400",
              isActive ? "bg-[#BB8B57]" : "bg-white/20 hover:bg-white/40"
            )}
          >
            {/* Gold glow on active */}
            {isActive && (
              <motion.span
                layoutId="dot-glow"
                className="absolute inset-0 rounded-full bg-[#BB8B57]"
                style={{
                  boxShadow: "0 0 8px 3px rgba(187,139,87,0.6)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
