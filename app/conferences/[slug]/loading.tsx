export default function Loading() {
  return (
    <>
      {/* Hero Skeleton */}
      <div
        style={{
          width: "100%",
          height: "70vh",
          minHeight: "500px",
          backgroundColor: "#042147",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "8vw",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "100px",
              height: "24px",
              backgroundColor: "rgba(187,139,87,0.3)",
              marginBottom: "20px",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "450px",
              maxWidth: "70vw",
              height: "52px",
              backgroundColor: "rgba(255,255,255,0.1)",
              marginBottom: "16px",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              width: "300px",
              maxWidth: "50vw",
              height: "16px",
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>

      {/* Content Skeleton */}
      <div style={{ backgroundColor: "#ffffff", padding: "100px 0" }}>
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "0 8vw",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "12px",
              backgroundColor: "rgba(187,139,87,0.2)",
              marginBottom: "32px",
              borderRadius: "2px",
            }}
          />
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: `${85 - i * 10}%`,
                height: "14px",
                backgroundColor: "rgba(4,33,71,0.06)",
                marginBottom: "16px",
                borderRadius: "2px",
                animation: "pulse 2s ease-in-out infinite",
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Facts Skeleton */}
      <div style={{ backgroundColor: "#f8f8f8", padding: "80px 0" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 8vw",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div
                style={{
                  width: "80px",
                  height: "10px",
                  backgroundColor: "rgba(187,139,87,0.2)",
                  marginBottom: "12px",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "120px",
                  height: "20px",
                  backgroundColor: "rgba(4,33,71,0.08)",
                  borderRadius: "3px",
                  animation: "pulse 2s ease-in-out infinite",
                  animationDelay: `${i * 150}ms`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
