export default function EditorialStatement() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: '#f8f8f8',
        padding: '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          textAlign: 'center' as const,
          padding: '0 8vw',
        }}
      >
        {/* Gold rule above */}
        <div
          style={{
            width: '80px',
            height: '1px',
            backgroundColor: '#bb8b57',
            margin: '0 auto 60px',
          }}
        />

        {/* Editorial quote */}
        <p
          style={{
            fontFamily: 'var(--font-heading), Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 52px)',
            lineHeight: 1.3,
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#042147',
            letterSpacing: '-0.01em',
          }}
        >
          &ldquo;We don&apos;t prepare students for conferences.
          <br />
          We prepare them for the world.&rdquo;
        </p>

        {/* Gold rule below */}
        <div
          style={{
            width: '80px',
            height: '1px',
            backgroundColor: '#bb8b57',
            margin: '60px auto 0',
          }}
        />
      </div>
    </section>
  );
}
