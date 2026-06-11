export default function Loading() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#042147",
          padding: "120px 0 80px",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "0 8vw",
          }}
        >
          <div
            style={{
              width: "180px",
              height: "12px",
              backgroundColor: "rgba(187,139,87,0.3)",
              marginBottom: "24px",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "420px",
              maxWidth: "80vw",
              height: "48px",
              backgroundColor: "rgba(255,255,255,0.1)",
              marginBottom: "20px",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              width: "100px",
              height: "28px",
              backgroundColor: "rgba(255,255,255,0.08)",
              marginBottom: "32px",
              borderRadius: "2px",
            }}
          />
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: `${280 - i * 20}px`,
                maxWidth: "70vw",
                height: "14px",
                backgroundColor: "rgba(255,255,255,0.06)",
                marginBottom: "12px",
                borderRadius: "2px",
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: "#ffffff", padding: "80px 0 120px" }}>
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "0 8vw",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "12px",
              backgroundColor: "rgba(187,139,87,0.2)",
              marginBottom: "20px",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "320px",
              maxWidth: "70vw",
              height: "36px",
              backgroundColor: "rgba(4,33,71,0.08)",
              marginBottom: "40px",
              borderRadius: "4px",
            }}
          />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ marginBottom: "24px" }}>
              <div
                style={{
                  width: "100px",
                  height: "10px",
                  backgroundColor: "rgba(187,139,87,0.2)",
                  marginBottom: "10px",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "48px",
                  backgroundColor: "rgba(4,33,71,0.06)",
                  borderRadius: "2px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
