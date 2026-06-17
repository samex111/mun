"use client";

import { useId } from "react";
import StaticCollage from "./StaticCollage";

interface MUNMaskProps {
  className?: string;
}

/**
 * MUNMask
 *
 * Same mask strategy as SMJMask — SVG <mask> applied via CSS mask-image.
 * No animation. Institutional, fixed, enduring.
 *
 * Separate mask from SMJMask because:
 *  • Different content (StaticCollage vs AnimatedCollage)
 *  • Different IDs (useId prevents collision)
 *  • Keeps each half independently composable
 */
export default function MUNMask({ className = "" }: MUNMaskProps) {
  const uid = useId();
  const maskId = `${uid.replace(/:/g, "")}-mun-mask`;

  return (
    <div
      className={`relative w-full select-none ${className}`}
      style={{ aspectRatio: "600 / 200" }}
    >
      {/* ── SVG mask definition ── */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId} maskUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
            <rect width="100%" height="100%" fill="black" />
            <svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet">
              <text
                x="50%"
                y="172"
                textAnchor="middle"
                fontFamily="'Inter', 'Neue Haas Grotesk', 'Helvetica Neue', Arial, sans-serif"
                fontWeight="900"
                fontSize="195"
                letterSpacing="-8"
                fill="white"
              >
                MUN
              </text>
            </svg>
          </mask>
        </defs>
      </svg>

      {/* ── Static collage, clipped to letter shapes ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          WebkitMaskImage: `url(#${maskId})`,
          maskImage: `url(#${maskId})`,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <StaticCollage />
      </div>
    </div>
  );
}
