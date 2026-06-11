export default function Loading() {
  return (
    <>
      {/* Header Skeleton */}
      <div
        style={{
          backgroundColor: "#042147",
          padding: "180px 0 100px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 8vw" }}>
          <div
            style={{
              width: "160px",
              height: "12px",
              backgroundColor: "rgba(187,139,87,0.3)",
              margin: "0 auto 24px",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "400px",
              maxWidth: "100%",
              height: "48px",
              backgroundColor: "rgba(255,255,255,0.08)",
              margin: "0 auto 20px",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              width: "320px",
              maxWidth: "100%",
              height: "16px",
              backgroundColor: "rgba(255,255,255,0.05)",
              margin: "0 auto",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div
        style={{
          backgroundColor: "#f8f8f8",
          padding: "100px 0 120px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 8vw",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "40px",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#ffffff",
                overflow: "hidden",
                animation: "pulse 2s ease-in-out infinite",
                animationDelay: `${i * 150}ms`,
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  backgroundColor: "rgba(4,33,71,0.06)",
                }}
              />
              <div style={{ padding: "28px" }}>
                <div
                  style={{
                    width: "70%",
                    height: "20px",
                    backgroundColor: "rgba(4,33,71,0.08)",
                    borderRadius: "3px",
                    marginBottom: "16px",
                  }}
                />
                <div
                  style={{
                    width: "50%",
                    height: "12px",
                    backgroundColor: "rgba(4,33,71,0.05)",
                    borderRadius: "2px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
