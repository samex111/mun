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
              width: "140px",
              height: "12px",
              backgroundColor: "rgba(187,139,87,0.3)",
              margin: "0 auto 24px",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "300px",
              maxWidth: "100%",
              height: "48px",
              backgroundColor: "rgba(255,255,255,0.08)",
              margin: "0 auto 20px",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div style={{ backgroundColor: "#ffffff", padding: "100px 0 120px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 8vw",
            display: "flex",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: "1 1 55%",
              minWidth: "320px",
            }}
          >
            <div
              style={{
                aspectRatio: "3 / 2",
                backgroundColor: "rgba(4,33,71,0.06)",
                marginBottom: "24px",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <div
              style={{
                width: "80%",
                height: "24px",
                backgroundColor: "rgba(4,33,71,0.08)",
                borderRadius: "3px",
              }}
            />
          </div>
          <div
            style={{
              flex: "1 1 35%",
              minWidth: "280px",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <div
                  style={{
                    aspectRatio: "16 / 9",
                    backgroundColor: "rgba(4,33,71,0.06)",
                    marginBottom: "16px",
                    animation: "pulse 2s ease-in-out infinite",
                    animationDelay: `${i * 200}ms`,
                  }}
                />
                <div
                  style={{
                    width: "60%",
                    height: "18px",
                    backgroundColor: "rgba(4,33,71,0.08)",
                    borderRadius: "3px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
