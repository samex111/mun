'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  type: 'principal' | 'student' | 'partner';
}

const testimonials: Testimonial[] = [
  {
    quote: 'SMJ MUN has fundamentally transformed how our students approach problem-solving. They don\'t just debate — they negotiate, empathize, and lead.',
    name: 'Dr. Meera Sharma',
    role: 'Principal, Delhi Public School',
    type: 'principal',
  },
  {
    quote: 'The level of professionalism and institutional quality that SMJ MUN brings to every conference is unmatched. Our partnership has elevated our entire academic program.',
    name: 'Prof. Rajiv Mehta',
    role: 'Dean of Student Affairs, Amity University',
    type: 'principal',
  },
  {
    quote: 'Since partnering with SMJ MUN, we\'ve seen a 40% increase in student participation in extracurricular leadership programs. The impact is measurable.',
    name: 'Mrs. Anita Krishnan',
    role: 'Vice Principal, Ryan International School',
    type: 'principal',
  },
  {
    quote: 'SMJ MUN didn\'t just teach me to speak. It taught me to listen — and that changed everything about how I lead.',
    name: 'Arjun Kapoor',
    role: 'Best Delegate, SMJ MUN International 2024',
    type: 'student',
  },
  {
    quote: 'Working with SMJ MUN on our annual conference was seamless. Their attention to protocol, logistics, and delegate experience is world-class.',
    name: 'Vikram Desai',
    role: 'Partner, Global Youth Leadership Forum',
    type: 'partner',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        backgroundColor: '#f8f8f8',
        padding: '140px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '0 8vw',
          textAlign: 'center' as const,
          position: 'relative',
          minHeight: '320px',
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Large decorative quote mark */}
        <span
          style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'Georgia, serif',
            fontSize: '140px',
            lineHeight: 1,
            color: '#bb8b57',
            opacity: 0.12,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          &ldquo;
        </span>

        {/* Quote with crossfade */}
        <div style={{ position: 'relative', width: '100%' }}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              style={{
                position: index === current ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                right: 0,
                opacity: index === current ? 1 : 0,
                transition: 'opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                pointerEvents: index === current ? 'auto' : 'none',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-heading), Georgia, serif',
                  fontSize: 'clamp(22px, 3vw, 38px)',
                  lineHeight: 1.35,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: '#042147',
                  marginBottom: '40px',
                  letterSpacing: '-0.01em',
                }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Gold rule */}
              <div
                style={{
                  width: '40px',
                  height: '1px',
                  backgroundColor: '#bb8b57',
                  margin: '0 auto 24px',
                }}
              />

              {/* Attribution */}
              <p
                style={{
                  fontFamily: 'var(--font-body), system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  color: '#042147',
                  marginBottom: '4px',
                }}
              >
                {testimonial.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body), system-ui, sans-serif',
                  fontSize: '13px',
                  color: '#042147',
                  opacity: 0.5,
                }}
              >
                {testimonial.role}
              </p>
            </div>
          ))}
        </div>

        {/* Discreet counter */}
        <div
          style={{
            marginTop: '48px',
            fontFamily: 'var(--font-body), system-ui, sans-serif',
            fontSize: '12px',
            color: '#042147',
            opacity: 0.3,
            letterSpacing: '0.1em',
          }}
        >
          {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}
