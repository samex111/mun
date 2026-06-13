"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface VerifyPaymentProps {
  registrationId: string;
}

type VerifyState = "verifying" | "pending" | "error";

export default function VerifyPayment({ registrationId }: VerifyPaymentProps) {
  const router = useRouter();
  const [state, setState] = useState<VerifyState>("verifying");
  const [message, setMessage] = useState("Verifying your payment with HDFC...");

  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    async function runVerification() {
      try {
        const response = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ registrationId }),
        });

        const result = (await response.json()) as {
          success: boolean;
          outcome?: "paid" | "pending" | "failed";
          message?: string;
        };

        if (cancelled) return;

        if (response.status === 409 && result.message) {
          router.replace(
            `/payment/success?registrationId=${encodeURIComponent(registrationId)}`
          );
          return;
        }

        if (!response.ok || !result.success) {
          setState("error");
          setMessage(result.message ?? "Payment verification failed.");
          return;
        }

        if (result.outcome === "paid") {
          router.replace(
            `/payment/success?registrationId=${encodeURIComponent(registrationId)}`
          );
          return;
        }

        if (result.outcome === "pending") {
          setState("pending");
          setMessage(
            "Payment verification is still in progress. We will check again shortly."
          );
          retryTimer = setTimeout(runVerification, 5000);
          return;
        }

        router.replace(
          `/payment/failed?registrationId=${encodeURIComponent(registrationId)}`
        );
      } catch {
        if (cancelled) return;
        setState("error");
        setMessage("Unable to verify payment. Please try again.");
      }
    }

    runVerification();

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [registrationId, router]);

  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "0 auto",
        padding: "120px 8vw 80px",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body), system-ui, sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#bb8b57",
          display: "block",
          marginBottom: "20px",
        }}
      >
        Payment Verification
      </span>
      <h1
        style={{
          fontFamily: "var(--font-heading), Georgia, serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          color: "#042147",
          marginBottom: "16px",
        }}
      >
        {state === "error" ? "Verification Error" : "Verifying Payment..."}
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body), system-ui, sans-serif",
          fontSize: "16px",
          color: "rgba(4,33,71,0.7)",
          lineHeight: 1.6,
        }}
      >
        {message}
      </p>
    </div>
  );
}
