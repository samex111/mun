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
              width: "80px",
              height: "12px",
              backgroundColor: "rgba(187,139,87,0.3)",
              margin: "0 auto 24px",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "360px",
              maxWidth: "100%",
              height: "48px",
              backgroundColor: "rgba(255,255,255,0.08)",
              margin: "0 auto 20px",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      {/* Albums Skeleton */}
      <div style={{ backgroundColor: "#f8f8f8", padding: "100px 0 120px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 8vw",
          }}
        >
          {Array.from({ length: 2 }).map((_, albumIdx) => (
            <div key={albumIdx} style={{ marginBottom: "80px" }}>
              {/* Album title */}
              <div
                style={{
                  width: "250px",
                  height: "28px",
                  backgroundColor: "rgba(4,33,71,0.08)",
                  marginBottom: "8px",
                  borderRadius: "3px",
                }}
              />
              <div
                style={{
                  width: "120px",
                  height: "12px",
                  backgroundColor: "rgba(187,139,87,0.2)",
                  marginBottom: "32px",
                  borderRadius: "2px",
                }}
              />
              {/* Image grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "12px",
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "3 / 2",
                      backgroundColor: "rgba(4,33,71,0.05)",
                      animation: "pulse 2s ease-in-out infinite",
                      animationDelay: `${(albumIdx * 6 + i) * 100}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
