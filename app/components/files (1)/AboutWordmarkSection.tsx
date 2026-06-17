"use client";

import { motion } from "framer-motion";
import SMJMUNWordmark from "./SMJMUNWordmark";

// Stagger in the text lines after the wordmark appears
const lineVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.0 + i * 0.18,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function AboutWordmarkSection() {
  return (
    <section
      className="
        relative
        min-h-[80vh]
        flex flex-col items-center justify-center
        px-4 sm:px-8 lg:px-16
        py-20
        bg-black
        overflow-hidden
      "
    >
      {/* Subtle grain overlay for premium feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Wordmark ── */}
      <div className="w-full max-w-5xl">
        <SMJMUNWordmark />
      </div>

      {/* ── Tagline ── */}
      <div className="mt-10 md:mt-14 text-center space-y-3">
        <motion.p
          custom={0}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="
            font-['Cormorant_Garamond',_'Playfair_Display',_Georgia,_serif]
            text-white
            text-3xl sm:text-4xl lg:text-5xl
            font-semibold
            tracking-tight
            leading-[1.1]
          "
        >
          People Change.
          <br />
          <span className="text-white/60">Purpose Remains.</span>
        </motion.p>

        <motion.p
          custom={1}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="
            font-['Inter',_sans-serif]
            text-white/30
            text-sm sm:text-base
            tracking-widest
            uppercase
            mt-6
          "
        >
          MUN teaches you how to speak.
          <span className="hidden sm:inline">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <br className="sm:hidden" />
          SMJMUN exists to give you something worth saying.
        </motion.p>
      </div>

      {/* ── Side labels (optional editorial detail) ── */}
      <motion.div
        custom={2}
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        className="
          hidden lg:flex
          absolute bottom-10 left-10
          flex-col gap-1
        "
      >
        <span className="text-white/20 text-xs tracking-widest uppercase font-['Inter',_sans-serif]">
          SMJ — Living Human Stories
        </span>
        <span className="text-white/20 text-xs tracking-widest uppercase font-['Inter',_sans-serif]">
          MUN — Enduring Institution
        </span>
      </motion.div>
    </section>
  );
}
