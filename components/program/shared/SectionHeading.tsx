"use client";

import { Reveal } from "./Reveal";
import { GoldBorder } from "./GoldBorder";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  heading: string;
  subtitle?: string;
  className?: string;
  /** Center-align (default) or left-align */
  align?: "center" | "left";
}

export function SectionHeading({
  label,
  heading,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <Reveal className={cn(isCenter && "text-center", className)}>
      <div className={cn("mb-10 md:mb-12", isCenter && "flex flex-col items-center")}>
        {label && (
          <p className="mb-4 font-[family-name:var(--font-inter)] text-[11px] font-medium uppercase tracking-[0.25em] text-[#BB8B57]">
            {label}
          </p>
        )}

        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold leading-[1.15] text-white md:text-2xl lg:text-3xl">
          {heading}
        </h2>

        <GoldBorder orientation="horizontal" className="mt-5 mb-5" />

        {subtitle && (
          <p
            className={cn(
              "font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#C8C8C8]",
              isCenter ? "max-w-xl" : "max-w-md"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}
