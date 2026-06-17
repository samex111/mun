"use client";

import { motion } from "framer-motion";
import SMJMask from "./SMJMask";
import MUNMask from "./MUNMask";

export default function SMJMUNWordmark() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/*
       * Desktop: SMJ MUN side by side (gap-0 so they read as one word)
       * Mobile:  SMJ on top, MUN below
       *
       * Each mask is given equal width so the two halves are proportional.
       */}
      <div
        className="
          flex
          flex-col items-center
          md:flex-row md:items-stretch md:justify-centerdz
          w-full gap-0
        "
      >
        {/* ── SMJ ── */}
        <div className="w-full md:w-1/2 max-w-[600px]">
          <SMJMask />
        </div>

        {/* ── MUN ── */}
        <div className="w-full md:w-1/2 max-w-[600px]">
          <MUNMask />
        </div>
      </div>
    </motion.div>
  );
}
