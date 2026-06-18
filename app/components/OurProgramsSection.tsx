'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// ─── Data — swap images & copy when ready ─────────────────────────────────
const PROGRAMS = [
  {
    id: 'conferences',
    tab: 'Conferences',
    heading: 'Conferences',
    body: [
      'SMJMUN hosts India\'s most rigorous Model United Nations conferences — from school-level summits to international assemblies. Each conference is designed to challenge delegates, build real negotiation skills, and create experiences that stay with participants for life.',
      'Our conference committees span from the UN General Assembly to specialized bodies, guided by an elite executive board trained in diplomacy and procedure.',
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
      'The SMJ Leadership Fellowship, Delegate Training Cell, and Executive Board Program are built around a single belief — that the best leaders are made through practice, not lectures.',
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
      'Participants graduate with a measurable command of MUN procedure, parliamentary debate, and resolution drafting — skills that translate directly to academic and professional life.',
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
      'Today we are one of India\'s leading MUN institutions, with a presence in multiple states and a growing network of partner institutions.',
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
      'If your institution shares a belief in the power of structured debate and youth leadership, we want to build with you.',
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
      'We believe the connections formed in a committee room can last a lifetime — and we build structures to make sure they do.',
    ],
    image: '/images/SHCOOL-PHOTO-1.png',
    href: '/conferences',
  },
];

export default function OurProgramsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Track which index we're currently animating content for
  const [contentIndex, setContentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced hover — only fires after mouse settles for 80ms
  // Guards against same-index re-renders
  const handleTabHover = useCallback((index: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setActiveIndex((prev) => {
        if (prev === index) return prev; // no-op if already active
        // Animate content out, switch, animate in
        setAnimating(true);
        if (contentTimer.current) clearTimeout(contentTimer.current);
        contentTimer.current = setTimeout(() => {
          setContentIndex(index);
          setAnimating(false);
        }, 180); // wait for fade-out before switching text
        return index;
      });
    }, 80);
  }, []);

  const active = PROGRAMS[contentIndex];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}
    >

      {/* ── Background images: all pre-rendered, crossfade by opacity ─────── */}
      {PROGRAMS.map((prog, i) => (
        <div
          key={prog.id}
          aria-hidden
          className="absolute inset-0"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: 'opacity 600ms cubic-bezier(0.22,1,0.36,1)',
            pointerEvents: 'none',
          }}
        >
          <img
            src={prog.image}
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Base dark overlay */}
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.58)' }} />
          {/* Left gradient — text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.1) 72%, rgba(0,0,0,0.25) 100%)',
            }}
          />
          {/* Center radial glow bloom */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '520px',
              height: '320px',
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at center, rgba(187,139,87,0.14) 0%, rgba(255,255,255,0.07) 40%, transparent 75%)',
              filter: 'blur(36px)',
            }}
          />
        </div>
      ))}

      {/* ── Foreground ──────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col md:flex-row"
        style={{ minHeight: '100vh' }}
      >

        {/* ── LEFT: content panel ──────────────────────────────────────────── */}
        <div
          className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20"
          style={{ flex: '0 0 auto', width: 'min(500px, 100%)', maxWidth: '100%' }}
        >

          {/* Overline */}
          <div className="flex items-center gap-2.5 mb-8">
            <span
              style={{
                width: '8px',
                height: '8px',
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
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#bb8b57',
                fontWeight: 500,
              }}
            >
              Our Programs
            </span>
          </div>

          {/*
            Content wrapper — fades in/out when tab changes.
            NO key prop here — we control animation via opacity only.
            This prevents React from remounting the element on every hover.
          */}
          <div
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(10px)' : 'translateY(0)',
              transition: 'opacity 180ms ease, transform 180ms ease',
            }}
          >
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 400,
                fontSize: 'clamp(52px, 7vw, 96px)',
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                marginBottom: '32px',
              }}
            >
              {active.heading}
            </h2>

            <div>
              {active.body.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 'clamp(13px, 1.2vw, 15px)',
                    lineHeight: 1.85,
                    color: 'rgba(255,255,255,0.62)',
                    marginBottom: i < active.body.length - 1 ? '16px' : '0',
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            <Link
              href={active.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '36px',
                padding: '12px 24px',
                border: '1px solid rgba(255,255,255,0.28)',
                color: 'rgba(255,255,255,0.82)',
                fontFamily: 'system-ui, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'border-color 220ms ease, color 220ms ease',
                width: 'fit-content',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#bb8b57';
                e.currentTarget.style.color = '#bb8b57';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.82)';
              }}
            >
              read more
              <ArrowRight style={{ width: '14px', height: '14px' }} />
            </Link>
          </div>

        </div>

        {/* Spacer */}
        <div className="hidden md:block flex-1" />

        {/* ── RIGHT: tab navigation ────────────────────────────────────────── */}
        <div
          className="
            flex flex-row md:flex-col
            overflow-x-auto md:overflow-x-visible
            justify-start md:justify-center
            px-6 md:px-0 py-4 md:py-0
            md:pr-12 lg:pr-20
          "
          style={{ flexShrink: 0 }}
        >
          {PROGRAMS.map((prog, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={prog.id}
                onMouseEnter={() => handleTabHover(i)}
                onClick={() => handleTabHover(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '18px 24px',
                  minWidth: '220px',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  // Gold outline box on active
                  outline: isActive ? '1px solid #bb8b57' : '1px solid transparent',
                  outlineOffset: '-1px',
                  borderBottom:
                    i < PROGRAMS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  transition: 'outline-color 250ms ease',
                }}
              >
                {/* Gold bottom accent on active */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#bb8b57',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 250ms ease',
                  }}
                />

                <span
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 'clamp(11px, 1vw, 13px)',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
                    transition: 'color 220ms ease, font-weight 0s',
                  }}
                >
                  {prog.tab}
                </span>
              </button>
            );
          })}
        </div>

      </div>

    </section>
  );
}
