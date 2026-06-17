"use client";

import StaticCollage from "./StaticCollage";

interface MUNMaskProps {
  className?: string;
}

export default function MUNMask({ className = "" }: MUNMaskProps) {
  return (
    <div
      className={`relative select-none ${className}`}
      style={{ display: "inline-block" }}
    >
      <svg
        viewBox="0 0 600 200"
        width="100%"
        height="100%"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="mun-clip">
            <text
              x="50%"
              y="168"
              textAnchor="middle"
              fontFamily="'Inter', 'Neue Haas Grotesk', 'Helvetica Neue', sans-serif"
              fontWeight="900"
              fontSize="190"
              letterSpacing="-6"
            >
              MUN
            </text>
          </clipPath>
        </defs>

        <foreignObject
          x="0"
          y="0"
          width="600"
          height="200"
          clipPath="url(#mun-clip)"
        >
          <div
            // @ts-expect-error: xmlns required in foreignObject context
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <StaticCollage />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
