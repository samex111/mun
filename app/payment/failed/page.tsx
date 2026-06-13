import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaymentLayout from "@/app/payment/components/PaymentLayout";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Payment Failed — SMJ MUN",
};

export default async function PaymentFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ registrationId?: string }>;
}) {
  const { registrationId } = await searchParams;

  if (!registrationId) {
    notFound();
  }

  const registration = await db.registration.findUnique({
    where: { id: registrationId },
  });

  if (!registration) {
    notFound();
  }

  return (
    <PaymentLayout>
      <section
        style={{
          backgroundColor: "#f8f6f2",
          padding: "120px 0 80px",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            padding: "0 8vw",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "rgba(131,9,14,0.08)",
              color: "#83090e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "28px",
            }}
          >
            ✕
          </div>

          <h1
            style={{
              fontFamily: "var(--font-heading), Georgia, serif",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              color: "#042147",
              marginBottom: "16px",
            }}
          >
            Payment Failed
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "16px",
              color: "rgba(4,33,71,0.7)",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            We could not confirm your payment for {registration.conferenceTitle}.
            No charge has been recorded as successful. You can try again below.
          </p>

          <Link
            href={`/payment/${registrationId}`}
            className="btn-primary"
            style={{
              display: "inline-block",
              textDecoration: "none",
              marginBottom: "16px",
            }}
          >
            Try Again
          </Link>

          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "13px",
              color: "rgba(4,33,71,0.5)",
            }}
          >
            <Link href="/conferences" style={{ color: "#bb8b57" }}>
              Back to Conferences
            </Link>
          </p>
        </div>
      </section>
    </PaymentLayout>
  );
}
