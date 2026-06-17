"use client";

import AnimatedCollage from "./AnimatedCollage";

interface SMJMaskProps {
  className?: string;
}

export default function SMJMask({ className = "" }: SMJMaskProps) {
  return (
    <div
      className={`relative select-none ${className}`}
      style={{ display: "inline-block" }}
    >
      {/*
       * Strategy:
       * 1. An SVG defines the clip path using the text "SMJ"
       * 2. The collage sits inside a container clipped to that path
       * 3. Outside the letters = transparent
       */}
      <svg
        viewBox="0 0 600 200"
        width="100%"
        height="100%"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="smj-clip">
            <text
              x="50%"
              y="168"
              textAnchor="middle"
              fontFamily="'Inter', 'Neue Haas Grotesk', 'Helvetica Neue', sans-serif"
              fontWeight="900"
              fontSize="190"
              letterSpacing="-6"
            >
              SMJ
            </text>
          </clipPath>
        </defs>

        {/* Clipped foreignObject that holds the animated collage */}
        <foreignObject
          x="0"
          y="0"
          width="600"
          height="200"
          clipPath="url(#smj-clip)"
        >
          <div
            // @ts-expect-error: xmlns required in foreignObject context
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <AnimatedCollage />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
