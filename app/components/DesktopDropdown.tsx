'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  open: boolean;
  items: string[];
}

export default function DesktopDropdown({
  open,
  items,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 10,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            absolute
            top-full
            left-0
            mt-5!
            w-[300px]
            bg-black
            border-t-2
            border-[#83090e]
            shadow-2xl
          "
        >
          {items.map((item) => (
            <a
              key={item}
              href="#"
              className="
                flex
                justify-between
                items-center
                px-6!
                py-4!
                border-b
                border-white/10
                text-white/90
                hover:pl-8
                hover:bg-white/5
                transition-all
              "
            >
              <span>{item}</span>

              <span>→</span>
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}