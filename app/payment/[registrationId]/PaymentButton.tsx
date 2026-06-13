"use client";

import { useState } from "react";

interface PaymentButtonProps {
  registrationId: string;
}

export default function PaymentButton({ registrationId }: PaymentButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handlePayment() {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId }),
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
        paymentUrl?: string;
      };

      if (!response.ok || !result.success || !result.paymentUrl) {
        setError(result.message ?? "Unable to start payment. Please try again.");
        setIsLoading(false);
        return;
      }

      window.location.replace(result.paymentUrl);
    } catch {
      setError("Unable to start payment. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <div
          role="alert"
          style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "13px",
            color: "#83090e",
            padding: "16px",
            marginBottom: "24px",
            backgroundColor: "rgba(131,9,14,0.06)",
            border: "1px solid rgba(131,9,14,0.15)",
          }}
        >
          {error}
        </div>
      )}

      <button
        type="button"
        className="btn-primary"
        onClick={handlePayment}
        disabled={isLoading}
        style={{
          width: "100%",
          opacity: isLoading ? 0.7 : 1,
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Redirecting to HDFC..." : "Proceed to HDFC Payment"}
      </button>
    </div>
  );
}
