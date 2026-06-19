'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: 'conferences',
    tab: 'Conferences',
    heading: 'Conferences',
    body: [
      'SMJMUN hosts India\'s most rigorous Model United Nations conferences — from school-level summits to international assemblies. Each conference is designed to challenge delegates, build real negotiation skills, and create experiences that stay with participants for life.',
    ],
    image: '/images/hero-1.png',
    href: '/conferences',
  },
  {
    id: 'programs',
    tab: 'Programs',
    heading: 'Programs',
    body: [
      'Our training programs exist to bridge the gap between ambition and ability. From first-time delegates to seasoned chairs, every program is structured to accelerate growth in public speaking, critical thinking, and global awareness.',
    ],
    image: '/images/hero-2.png',
    href: '/programs',
  },
  {
    id: 'training',
    tab: 'Training Cell',
    heading: 'Training Cell',
    body: [
      'The SMJMUN Training Cell is the institution\'s academic backbone. It designs curriculum, runs intensive workshops, and certifies delegates before every conference season.',
    ],
    image: '/images/training.png',
    href: '/programs',
  },
  {
    id: 'institution',
    tab: 'Institution Services',
    heading: 'Institution Services',
    body: [
      'SMJMUN partners with schools and colleges across India to establish, train, and sustain their own MUN chapters. We provide end-to-end institutional support — from curriculum design to conference management.',
    ],
    image: '/images/institution.png',
    href: '/programs',
  },
  {
    id: 'partnerships',
    tab: 'Partnerships',
    heading: 'Partnerships',
    body: [
      'Strategic partnerships are how SMJMUN scales its mission. We collaborate with educational institutions, government bodies, and global organizations to bring world-class diplomacy education to more students.',
    ],
    image: '/images/partnerships-image.png',
    href: '/partnerships',
  },
  {
    id: 'community',
    tab: 'Community',
    heading: 'Community',
    body: [
      'The SMJMUN alumni network spans thousands of delegates across the country. Our community events, mentorship programs, and digital platforms keep that network active and growing.',
    ],
    image: '/images/SHCOOL-PHOTO-1.png',
    href: '/conferences',
  },
];

export default function OurProgramsSection() {
  // ── Single source of truth. Background AND content always in sync. ──────────
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // pendingIndex lets us track the latest requested index so rapid hovers
  // always resolve to wherever the user landed, not an intermediate stop.
  const pendingIndex = useRef<number>(0);

  const switchTo = useCallback((index: number) => {
    // Always record the latest intent
    pendingIndex.current = index;

    // Already there — nothing to do
    if (activeIndex === index) return;

    // Kick off the fade-out, then swap once it finishes
    setAnimating(true);

    if (animTimer.current) clearTimeout(animTimer.current);
    animTimer.current = setTimeout(() => {
      // Use the *latest* pending index, not the stale closure value,
      // so rapid hovers resolve to the tab the user is actually on.
      setActiveIndex(pendingIndex.current);
      setAnimating(false);
    }, 200);
  }, [activeIndex]);

  const handleTabHover = useCallback((index: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    // Small debounce so accidental brush-overs don't trigger switches
    hoverTimer.current = setTimeout(() => switchTo(index), 80);
  }, [switchTo]);

  const handleTabClick = useCallback((index: number) => {
    // On click we skip the hover debounce and switch immediately
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    switchTo(index);
  }, [switchTo]);

  const active = PROGRAMS[activeIndex];

  return (
    <>
      <style>{`
        .prog-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 40px;
          padding: 13px 28px;
          border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,0.55);
          color: rgba(255,255,255,0.90);
          font-family: system-ui, sans-serif;
          font-size: 14px;
          letter-spacing: 0.03em;
          text-decoration: none;
          background: transparent;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: color 300ms ease, border-color 300ms ease;
        }

        .prog-read-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background: #bb8b57;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }

        .prog-read-btn:hover::before { transform: scaleX(1); }
        .prog-read-btn:hover { border-color: #bb8b57; color: #ffffff; }

        .prog-read-btn span,
        .prog-read-btn svg { position: relative; z-index: 1; }

        .prog-tab-btn {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 20px 24px 20px 20px;
          min-width: 240px;
          text-align: left;
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          transition: background 220ms ease;
        }

        .prog-tab-btn:hover {
          background: rgba(255,255,255,0.04);
        }

        .prog-tab-label {
          font-family: system-ui, sans-serif;
          font-size: clamp(12px, 1.05vw, 14px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: color 220ms ease;
        }
      `}</style>

      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: '90vh', backgroundColor: '#050505' }}
      >
        {/* ── Background images: crossfade ──────────────────────────────────── */}
        {PROGRAMS.map((prog, i) => (
          <div
            key={prog.id}
            aria-hidden
            className="absolute inset-0"
            style={{
              opacity: i === activeIndex ? 1 : 0,
              transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1)',
              pointerEvents: 'none',
            }}
          >
            <img
              src={prog.image}
              alt=""
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />

            {/* Lighter base overlay — let the image breathe like Reliance */}
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.28)' }} />

            {/* Left gradient — heavier for text legibility, fades to nothing by 55% */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.50) 25%, rgba(0,0,0,0.15) 55%, transparent 75%)',
              }}
            />

            {/* Right gradient — for tab legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 25%, transparent 55%)',
              }}
            />

            {/* Bottom vignette — grounds the section */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 40%)',
              }}
            />
          </div>
        ))}

        {/* ── Foreground ──────────────────────────────────────────────────────── */}
        <div
          className="relative z-10 flex flex-col"
          style={{ minHeight: '90vh' }}
        >
          {/* Overline — pinned top-left like Reliance, detached from content */}
          <div className="flex items-center gap-3 px-10 md:px-16 lg:px-20 pt-10">
            <span
              style={{
                width: '9px',
                height: '9px',
                background: '#bb8b57',
                transform: 'rotate(45deg)',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#bb8b57',
                fontWeight: 600,
              }}
            >
              Our Programs
            </span>
          </div>

          {/* Main row — content left, tabs right */}
          <div className="flex flex-col md:flex-row flex-1">

            {/* LEFT: content */}
            <div
              className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-12 md:py-16"
              style={{ flex: '0 0 auto', width: 'min(680px, 100%)', maxWidth: '100%' }}
            >
              {/* Animated content block */}
              <div
                style={{
                  opacity: animating ? 0 : 1,
                  transform: animating ? 'translateY(14px)' : 'translateY(0)',
                  transition: 'opacity 200ms ease, transform 200ms ease',
                }}
              >
                {/* Heading — big and dominant */}
                <h2
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontWeight: 400,
                    fontSize: 'clamp(72px, 8vw, 110px)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    color: '#ffffff',
                    marginBottom: '32px',
                    textShadow: '0 2px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  {active.heading}
                </h2>

                {/* Body paragraphs — wider, lighter weight, Reliance-style */}
                <div style={{ maxWidth: '38ch' }}>
                  {active.body.map((para, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: 'system-ui, sans-serif',
                        fontSize: 'clamp(16px, 1.3vw, 20px)',
                        lineHeight: 1.65,
                        color: 'rgba(255,255,255,0.90)',
                        fontWeight: 300,
                        marginBottom: i < active.body.length - 1 ? '20px' : '0',
                        textShadow: '0 1px 12px rgba(0,0,0,0.5)',
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Read more */}
                <Link href={active.href} className="prog-read-btn">
                  <span>read more</span>
                  <ArrowRight style={{ width: '15px', height: '15px' }} />
                </Link>
              </div>
            </div>

            {/* Spacer */}
            <div className="hidden md:block flex-1" />

            {/* RIGHT: tab navigation — vertically centered */}
            <div
              className="
                flex flex-row md:flex-col
                overflow-x-auto md:overflow-x-visible
                justify-start md:justify-center
                px-6 md:px-0 py-4 md:py-0
                md:pr-14 lg:pr-20
              "
              style={{ flexShrink: 0 }}
            >
              {PROGRAMS.map((prog, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={prog.id}
                    onMouseEnter={() => handleTabHover(i)}
                    onClick={() => handleTabClick(i)}
                    className={`prog-tab-btn${isActive ? ' is-active' : ''}`}
                    style={{
                      borderBottom:
                        i < PROGRAMS.length - 1
                          ? '1px solid rgba(255,255,255,0.10)'
                          : 'none',
                      // Active: left amber border accent (Reliance pattern)
                      borderLeft: isActive
                        ? '3px solid #bb8b57'
                        : '3px solid transparent',
                      paddingLeft: '20px',
                      transition: 'border-color 250ms ease',
                    }}
                  >
                    <span
                      className="prog-tab-label text-2xl!"
                      style={{
                        fontWeight: isActive ? 700 : 400,
                        color:  '#ffffff',
                      }}
                      
                    >
                      {prog.tab}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}