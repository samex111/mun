'use client';

import { motion } from 'framer-motion';
import NetworkMap from './NetworkMap';

const cities = [
  'New Delhi',
  'Dubai',
  'Singapore',
  'London',
  'New York',
];

export default function GlobalMovementSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#031833]
        py-32
        md:py-40
      "
    >
      {/* Noise Texture */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          mix-blend-soft-light
          bg-[url('/images/noise.png')]
        "
      />

      {/* Background Gold Glow */}

      <div
        className="
          absolute
          left-1/2
          top-[25%]
          h-[900px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          bg-[#bb8b57]/10
          blur-[220px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          md:px-8
        "
      >
        {/* Label */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            mb-6!
            text-xs!
            uppercase
            tracking-[0.4em]
            text-[#bb8b57]!
          "
        >
          Global Presence
        </motion.p>

        {/* Headline */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.2,
          }}
          className="
            max-w-5xl!
            text-white!
            font-heading!
            text-[clamp(4rem,10vw,9rem)]!
            leading-[0.9]
            tracking-[-0.04em]
          "
        >
          A Global
          <br />
          Movement.
        </motion.h2>

        {/* Supporting Copy */}

        <motion.p
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.2,
            duration: 1,
          }}
          className="
            mt-10!
            max-w-2xl!
            text-lg!
            leading-relaxed!
            text-white/70!
          "
        >
          From New Delhi to New York, SMJ MUN is building
          a new generation of diplomats, negotiators,
          public speakers, policymakers, and future
          leaders across the world.
        </motion.p>

        {/* Network Map */}

        <NetworkMap />

        {/* Glass City Chips */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.4,
            duration: 1,
          }}
          className="
            mt-12
            flex
            flex-wrap
            gap-4
          "
        >
          {cities.map((city, index) => (
            <motion.div
              key={city}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -3,
              }}
              className="
                rounded-full
                border!
                border-white/10!
                bg-white/5!
                px-5!
                py-3!
                text-xs!
                uppercase!
                tracking-[0.25em]
                text-white/80!
                backdrop-blur-xl
              "
            >
              {city}
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}

        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: 140,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.2,
          }}
          className="
            mt-24!
            h-px!
            bg-[#bb8b57]!
          "
        />

        {/* Editorial Statement */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
          className="
            mt-14!
            max-w-4xl!
            border-l!
            border-[#bb8b57]!
            pl-8!
            md:pl-12!
          "
        >
          <p
            className="
              text-3xl!
              md:text-5xl!
              italic!
              leading-tight!
              text-white!
            "
          >
            Connecting young minds.
            <br />
            Inspiring meaningful dialogue.
            <br />
            Creating global impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
}