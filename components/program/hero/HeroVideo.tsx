"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "../shared/FadeIn";
import type { HeroData } from "../types";

interface HeroVideoProps {
  data: HeroData;
}

export function HeroVideo({ data }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative flex h-[90vh] w-full items-end overflow-hidden">
      {/* Background media */}
      {data.videoSrc ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full opacity-[0.7] object-cover"
          poster={data.imageSrc}
        >
          <source src={data.videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={data.imageSrc}
          alt={data.imageAlt || data.heading}
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      )}

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6 pb-16 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn delay={0.2} distance={15}>
            <p className="mb-4 font-[family-name:var(--font-inter)] text-[11px] font-medium uppercase tracking-[0.25em] text-[#BB8B57]">
              {data.badge}
            </p>
          </FadeIn>

          <FadeIn delay={0.4} distance={20}>
            <h1 className="mb-5 max-w-2xl font-[family-name:var(--font-playfair)] text-3xl font-bold leading-[1.05] text-white md:text-4xl lg:text-5xl">
              {data.heading}
            </h1>
          </FadeIn>

          <FadeIn delay={0.6} distance={15}>
            <p className="mb-7 max-w-md font-[family-name:var(--font-inter)] text-sm leading-relaxed text-white/75">
              {data.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.8} distance={10}>
            <div className="flex flex-wrap items-center gap-3">
              {data.primaryCTA && (
                <Link
                  href={data.primaryCTA.href}
                  className="inline-flex items-center bg-[#83090E] px-6 py-3 font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-[0.15em] text-white transition-opacity duration-400 hover:opacity-85"
                >
                  {data.primaryCTA.label}
                </Link>
              )}
              {data.secondaryCTA && (
                <Link
                  href={data.secondaryCTA.href}
                  className="inline-flex items-center border border-white/30 px-6 py-3 font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-400 hover:border-white hover:bg-white/5"
                >
                  {data.secondaryCTA.label}
                </Link>
              )}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="h-5 w-5 text-white/40" />
      </motion.div>
    </section>
  );
}
