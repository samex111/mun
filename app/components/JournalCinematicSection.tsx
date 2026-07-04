'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Quote {
  id: number;
  chunks: string[];
  accentChunk?: number;
}

const QUOTES: Quote[] = [
  {
    id: 1,
    chunks: ['Some conferences end.', "The ideas don't."],
  },
  {
    id: 2,
    chunks: ['Some speeches are forgotten.', 'The confidence remains.'],
  },
  {
    id: 3,
    chunks: ["Negotiation", "isn't about winning.", "It's about", 'understanding.'],
    accentChunk: 3,
  },
  {
    id: 4,
    chunks: ['Every delegate', 'walks into committee', 'with opinions.', 'They leave', 'with perspective.'],
  },
  {
    id: 5,
    chunks: ['Every story', 'deserves', 'to be shared.'],
  },
];

const TOTAL_STATES = QUOTES.length + 1; // 5 quotes + 1 CTA
const SLICE = 1 / TOTAL_STATES;

// ─── Progress Dots (static position, only color animates) ─────────────────────

function ProgressDots({ active }: { active: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.12)' }} />
      {QUOTES.map((q) => (
        <motion.div
          key={q.id}
          animate={{
            backgroundColor: q.id <= active ? '#BB8B57' : 'rgba(255,255,255,0.2)',
            boxShadow: q.id === active ? '0 0 7px rgba(187,139,87,0.6)' : 'none',
            scale: q.id === active ? 1.4 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ width: 5, height: 5, borderRadius: '50%' }}
        />
      ))}
      <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.12)' }} />
    </div>
  );
}

// ─── Quote text — only this changes ──────────────────────────────────────────

function ActiveQuote({ quote, progress }: { quote: Quote; progress: number }) {
  const n = quote.chunks.length;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.14em' }}>
      {quote.chunks.map((chunk, i) => {
        const chunkProgress = Math.min(1, Math.max(0,
          (progress - i / n) / (1 / n)
        ));
        const opacity = 0.13 + chunkProgress * 0.87;
        const isAccent = quote.accentChunk !== undefined && i === quote.accentChunk;
        const color = isAccent && chunkProgress > 0.5 ? '#BB8B57' : '#ffffff';

        return (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 30px)',
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              display: 'block',
              opacity,
              color,
              transition: 'opacity 0.25s ease, color 0.5s ease',
            }}
          >
            {chunk}
          </span>
        );
      })}
    </div>
  );
}

// ─── CTA state ────────────────────────────────────────────────────────────────

function BlogCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* Echo of final quote, fully lit */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.14em' }}>
        {QUOTES[4].chunks.map((chunk, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === QUOTES[4].chunks.length - 1 ? 0.92 : 1 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(20px, 4vw, 40px)',
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              display: 'block',
            }}
          >
            {chunk}
          </motion.span>
        ))}
      </div>

      {/* Gold rule */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 44 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{ height: 1, background: '#BB8B57' }}
      />

      {/* Sub-copy */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: 'clamp(13px, 1.3vw, 15px)',
          color: 'rgba(255,255,255,0.4)',
          lineHeight: 1.75,
          maxWidth: 360,
        }}
      >
        Read the ideas, experiences &amp; perspectives<br />
        that continue long after the closing gavel.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.65 }}
      >
        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '11px 26px',
            border: '1px solid rgba(187,139,87,0.55)',
            borderRadius: 6,
            background: 'rgba(187,139,87,0.08)',
            transition: 'background 0.25s ease, border-color 0.25s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(187,139,87,0.16)';
            el.style.borderColor = '#BB8B57';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(187,139,87,0.08)';
            el.style.borderColor = 'rgba(187,139,87,0.55)';
          }}
        >
          <span>Read the Journal</span>
          <span style={{ fontSize: 14, lineHeight: 1 }}>→</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function JournalCinematicSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const [quoteProgress, setQuoteProgress] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const quotesEnd = QUOTES.length * SLICE;
      if (v >= quotesEnd) {
        setShowCTA(true);
        setActiveQuoteIdx(QUOTES.length - 1);
        setQuoteProgress(1);
        return;
      }
      setShowCTA(false);
      const qIdx = Math.min(QUOTES.length - 1, Math.floor(v / SLICE));
      const subProgress = (v - qIdx * SLICE) / SLICE;
      setActiveQuoteIdx(qIdx);
      setQuoteProgress(Math.min(1, Math.max(0, subProgress)));
    });
  }, [scrollYProgress]);

  const currentQuote = QUOTES[activeQuoteIdx];

  return (
    <section
      ref={containerRef}
      id="journal-cinematic"
      aria-label="SMJ MUN Journal storytelling"
      style={{ height: `${TOTAL_STATES * 100}vh`, position: 'relative' }}
    >
      {/* ── Sticky panel ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {/* Soft gold ambient glow behind the container */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '70vw',
            height: '70vh',
            background: 'radial-gradient(circle, rgba(187,139,87,0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        {/* ── EDITORIAL CONTAINER ── */}
        <div
          style={{
            position: 'relative',
            width: '85vw',
            maxWidth: '1280px',
            height: '70vh',
            maxHeight: '800px',
            // minHeight: '600px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ── STATIC background image inside container ── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('/images/ceremony-1.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              /* Heavy blur + desaturation so it never competes with text */
              // filter: 'blur(1px) saturate(0.25) brightness(0.22)',
              transform: 'scale(1.06)', /* prevent blur edge bleed */
            }}
          />

          {/* Thin dark overlay to unify tone and ensure text legibility */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(8, 8, 8, 0.65)',
            }}
          />

          {/* Noise grain inside the container for texture */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('/images/noise.png')",
              opacity: 0.04,
              pointerEvents: 'none',
            }}
          />

          {/* ── DESKTOP layout ── */}
          <div
            className="hidden md:flex"
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: 1080,
              margin: '0 auto',
              padding: '0 6vw',
              alignItems: 'flex-start',
              gap: 56,
            }}
          >
            {/* Left: static progress dots */}
            {/* <div style={{ flexShrink: 0, paddingTop: 12 }}>
              <ProgressDots active={activeQuoteIdx + 1} />
            </div> */}

            {/* Right: static quote mark + changing text */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

              {/* ── STATIC large quote mark ── */}
              <div
                aria-hidden="true"
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(80px, 9vw, 120px)',
                  lineHeight: 0.75,
                  color: '#BB8B57',
                  fontWeight: 700,
                  opacity: 0.55,
                  userSelect: 'none',
                  marginBottom: 24,
                }}
              >
                &ldquo;
              </div>

              {/* ── ONLY THIS CHANGES: quote text ── */}
              <div style={{ minHeight: 'clamp(200px, 32vh, 380px)' }}>
                <AnimatePresence mode="wait">
                  {!showCTA ? (
                    <motion.div
                      key={`q-${activeQuoteIdx}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <ActiveQuote quote={currentQuote} progress={quoteProgress} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cta"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <BlogCTA />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── MOBILE layout ── */}
          <div
            className="flex flex-col md:hidden"
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              height: '100%',
              padding: '40px 24px 50px',
              justifyContent: 'center',
            }}
          >
            {/* Static quote mark */}
            <div
              aria-hidden="true"
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 64,
                lineHeight: 0.75,
                color: '#BB8B57',
                fontWeight: 700,
                opacity: 0.55,
                userSelect: 'none',
                marginBottom: 20,
              }}
            >
              &ldquo;
            </div>

            {/* Changing text */}
            <AnimatePresence mode="wait">
              {!showCTA ? (
                <motion.div
                  key={`mq-${activeQuoteIdx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ActiveQuote quote={currentQuote} progress={quoteProgress} />
                </motion.div>
              ) : (
                <motion.div key="mcta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <BlogCTA />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile progress pills */}
            {!showCTA && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 0, right: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {QUOTES.map((q) => (
                  <motion.div
                    key={q.id}
                    animate={{
                      width: q.id === activeQuoteIdx + 1 ? 20 : 5,
                      backgroundColor: q.id <= activeQuoteIdx + 1 ? '#BB8B57' : 'rgba(255,255,255,0.2)',
                    }}
                    transition={{ duration: 0.35 }}
                    style={{ height: 4, borderRadius: 2 }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Scroll cue — only on first state before any progress */}
          <AnimatePresence>
            {activeQuoteIdx === 0 && quoteProgress < 0.12 && (
              <motion.div
                key="scroll-cue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                style={{
                  position: 'absolute',
                  bottom: '32px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: 9,
                    letterSpacing: '0.35em',
                    color: 'rgba(255,255,255,0.22)',
                    textTransform: 'uppercase',
                  }}
                >
                  Scroll
                </p>
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  style={{
                    width: 1,
                    height: 24,
                    background: 'linear-gradient(to bottom, rgba(187,139,87,0.55), transparent)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
               <motion.div
  animate={{ y: [0, 12, 0] }}
  transition={{ repeat: Infinity, duration: 1.8 }}
  className="absolute bottom-30 left-1/2 -translate-x-1/2 z-10000000 flex flex-col gap-1"
>
{[0, 1, 2].map((i) => (
  <motion.div
    key={i}
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{
      repeat: Infinity,
      duration: 1.5,
      delay: i * 0.2,
    }}
    className="h-4 w-4 rotate-45 border-b-2 border-r-2 border-white/60"
  />
))}
</motion.div>
        </div>
      </div>
    </section>
  );
}