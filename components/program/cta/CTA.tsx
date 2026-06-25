"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../shared/Reveal";
import type { CTAData } from "../types";

interface CTAProps {
  data: CTAData;
}

export function CTA({ data }: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] py-20 md:py-24">
      {/* Optional background image */}
      {data.backgroundImage && (
        <>
          <Image
            src={data.backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/80"
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center md:px-10 lg:px-16">
        <Reveal>
          <h2 className="mx-auto mb-5 max-w-2xl font-[family-name:var(--font-playfair)] text-xl font-bold leading-[1.15] text-white md:text-2xl lg:text-3xl">
            {data.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mb-8 max-w-lg font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#C8C8C8]">
            {data.description}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={data.primaryCTA.href}
              className="inline-flex items-center bg-[#83090E] px-7 py-3 font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-[0.15em] text-white transition-opacity duration-400 hover:opacity-85"
            >
              {data.primaryCTA.label}
            </Link>

            {data.secondaryCTA && (
              <Link
                href={data.secondaryCTA.href}
                className="inline-flex items-center border border-white/30 px-7 py-3 font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-400 hover:border-white hover:bg-white/5"
              >
                {data.secondaryCTA.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
