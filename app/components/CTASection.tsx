'use client';

export default function CTASection() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#83090e',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 8vw',
          display: 'flex',
          alignItems: 'center',
          minHeight: '500px',
          flexWrap: 'wrap' as const,
        }}
      >
        {/* Text — left 60% */}
        <div
          style={{
            flex: '1 1 55%',
            padding: '160px 0',
            minWidth: '300px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '48px',
              maxWidth: '600px',
            }}
          >
            Ready To Build
            <br />
            The Future
            <br />
            Together?
          </h2>

          {/* Buttons — stacked vertically, left-aligned */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '16px',
              alignItems: 'flex-start',
            }}
          >
            <a
              href="mailto:contact@smjmun.org"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '18px 48px',
                backgroundColor: '#ffffff',
                color: '#83090e',
                fontFamily: 'var(--font-body), system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
                transition: 'opacity 0.3s ease',
              }}
            >
              Book Consultation
            </a>
            <a
              href="mailto:partnerships@smjmun.org"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '18px 48px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                fontFamily: 'var(--font-body), system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.35)',
                transition: 'all 0.3s ease',
              }}
            >
              Partner With Us
            </a>
          </div>
        </div>

        {/* Cinematic image — right 40%, partially visible */}
        <div
          style={{
            flex: '0 0 40%',
            maxWidth: '40%',
            height: '100%',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            overflow: 'hidden',
            opacity: 0.3,
          }}
          className="cta-image"
        >
          <img
            src="/images/institution.png"
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {/* Fade overlay from charcoal */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #83090e 0%, transparent 100%)',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .cta-image {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
