"use client";

import { motion, useReducedMotion } from "framer-motion";
import SMJMUNWordmark from "./SMJMUNWordmark";

/**
 * Line reveal variants.
 * Respects prefers-reduced-motion — if the user has that set,
 * we skip the motion entirely and just show content.
 */
const lineVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.2 + i * 0.2,
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function AboutWordmarkSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="
        relative
        min-h-[80vh]
        flex flex-col items-center justify-center
        px-5 sm:px-10 lg:px-20
        py-24
        bg-[#080a0e]
        overflow-hidden
      "
    >
      {/*
       * Film-grain texture overlay.
       * Very low opacity — just enough to break up the flat black and add
       * the tactile quality you see on Stanford / MIT editorial pages.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
        }}
      />

      {/* Subtle radial vignette — draws eye to the wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 38%, transparent 40%, rgba(8,10,14,0.6) 100%)",
        }}
      />

      {/* ── Wordmark ── */}
      <div className="relative z-10 w-full max-w-[56rem]">
        <SMJMUNWordmark />
      </div>

      {/* ── Tagline ── */}
      <div className="relative z-10 mt-12 md:mt-16 text-center">
        <motion.p
          custom={0}
          variants={prefersReducedMotion ? undefined : lineVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
          className="
            font-['Cormorant_Garamond',_'Playfair_Display',_Georgia,_serif]
            text-white
            text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem]
            font-semibold
            leading-[1.08]
            tracking-tight
          "
        >
          People Change.
          <br />
          <span className="text-white/50">Purpose Remains.</span>
        </motion.p>

        <motion.p
          custom={1}
          variants={prefersReducedMotion ? undefined : lineVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
          className="
            mt-8
            font-['Inter',_sans-serif]
            text-white/30
            text-xs sm:text-sm
            tracking-[0.18em]
            uppercase
            max-w-[36rem]
            mx-auto
            leading-relaxed
          "
        >
          MUN teaches you how to speak.
          <br className="sm:hidden" />
          <span className="hidden sm:inline">&ensp;·&ensp;</span>
          SMJMUN exists to give you something worth saying.
        </motion.p>
      </div>

      {/* ── Corner editorial labels (desktop only) ── */}
      <motion.div
        custom={2}
        variants={prefersReducedMotion ? undefined : lineVariants}
        initial={prefersReducedMotion ? undefined : "hidden"}
        animate={prefersReducedMotion ? undefined : "visible"}
        className="
          pointer-events-none
          hidden lg:flex
          absolute bottom-8 left-8
          flex-col gap-1.5
        "
        aria-hidden="true"
      >
        <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-['Inter',_sans-serif]">
          SMJ — Living Human Stories
        </span>
        <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-['Inter',_sans-serif]">
          MUN — Enduring Institution
        </span>
      </motion.div>

      {/* ── Year label (desktop, bottom-right) ── */}
      <motion.div
        custom={3}
        variants={prefersReducedMotion ? undefined : lineVariants}
        initial={prefersReducedMotion ? undefined : "hidden"}
        animate={prefersReducedMotion ? undefined : "visible"}
        className="
          pointer-events-none
          hidden lg:block
          absolute bottom-8 right-8
        "
        aria-hidden="true"
      >
        <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-['Inter',_sans-serif]">
          Est. SMJMUN
        </span>
      </motion.div>
    </section>
  );
}
