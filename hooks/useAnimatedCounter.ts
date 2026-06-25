"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface UseAnimatedCounterOptions {
  /** Target number to count to */
  end: number;
  /** Duration of the count animation in ms */
  duration?: number;
  /** Suffix to append (e.g. "+", "%") */
  suffix?: string;
  /** Only animate once */
  once?: boolean;
}

/**
 * Animated counter hook that counts from 0 to `end` when
 * the ref element enters the viewport.
 *
 * Returns [ref, displayValue] — attach the ref to the
 * element you want to observe.
 */
export function useAnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  once = true,
}: UseAnimatedCounterOptions) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const [display, setDisplay] = useState(`0${suffix}`);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView) return;
    if (once && hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);

      setDisplay(`${current.toLocaleString()}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, end, duration, suffix, once]);

  return [ref, display] as const;
}
