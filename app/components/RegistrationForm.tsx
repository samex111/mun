"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import type { Conference } from "@/lib/sanity/types";
import { registrationSchema } from "@/lib/validations/registration";
import { verifyOtpSchema } from "@/lib/validations/verify-otp";

interface RegistrationFormProps {
  conference: Conference;
}

type FieldErrors = Partial<Record<keyof FormFields, string>>;

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  city: string;
  committeePreference: string;
  dietaryRequirements: string;
}

const INITIAL_FIELDS: FormFields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  institution: "",
  city: "",
  committeePreference: "",
  dietaryRequirements: "",
};

const labelStyle: CSSProperties = {
  fontFamily: "var(--font-body), system-ui, sans-serif",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#bb8b57",
  display: "block",
  marginBottom: "8px",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontFamily: "var(--font-body), system-ui, sans-serif",
  fontSize: "15px",
  color: "#042147",
  backgroundColor: "#ffffff",
  border: "1px solid rgba(4,33,71,0.12)",
  outline: "none",
};

const errorStyle: CSSProperties = {
  fontFamily: "var(--font-body), system-ui, sans-serif",
  fontSize: "13px",
  color: "#83090e",
  marginTop: "6px",
};

export default function RegistrationForm({ conference }: RegistrationFormProps) {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [verifiedMessage, setVerifiedMessage] = useState<string | null>(null);

  function updateField(name: keyof FormFields, value: string) {
    setFields((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError(null);
    if (!showOtpStep) {
      setSuccessMessage(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setVerifiedMessage(null);
    setRegistrationId(null);

    const payload = {
      ...fields,
      conferenceSlug: conference.slug.current,
    };

    const parsed = registrationSchema.safeParse(payload);
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !errors[field as keyof FormFields]) {
          errors[field as keyof FormFields] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setFormError(result.message ?? "Registration failed. Please try again.");
        return;
      }

      setSubmittedEmail(parsed.data.email.trim().toLowerCase());
      setShowOtpStep(true);
      setOtp("");
      setOtpError(null);
      setSuccessMessage("Verification code generated successfully.");
    } catch {
      setFormError("Unable to submit registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOtpError(null);
    setVerifiedMessage(null);

    const parsed = verifyOtpSchema.safeParse({
      email: submittedEmail,
      otp,
      conferenceSlug: conference.slug.current,
    });

    if (!parsed.success) {
      setOtpError(parsed.error.issues[0]?.message ?? "Invalid verification code.");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch("/api/register/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
        registrationId?: string;
      };

      if (!response.ok || !result.success) {
        setOtpError(result.message ?? "Verification failed. Please try again.");
        return;
      }

      setRegistrationId(result.registrationId ?? null);
      setVerifiedMessage("Registration verified successfully.");
      setSuccessMessage(null);
      setOtp("");
    } catch {
      setOtpError("Unable to verify code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  }

  const formDisabled = isSubmitting || showOtpStep || !!registrationId;

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        {formError && (
          <div
            role="alert"
            style={{
              ...errorStyle,
              padding: "16px",
              marginBottom: "32px",
              backgroundColor: "rgba(131,9,14,0.06)",
              border: "1px solid rgba(131,9,14,0.15)",
            }}
          >
            {formError}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "15px",
              color: "#042147",
              padding: "16px",
              marginBottom: "32px",
              backgroundColor: "rgba(187,139,87,0.12)",
              border: "1px solid rgba(187,139,87,0.3)",
            }}
          >
            {successMessage}
          </div>
        )}

        {verifiedMessage && (
          <div
            role="status"
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "15px",
              color: "#042147",
              padding: "16px",
              marginBottom: "32px",
              backgroundColor: "rgba(22,163,74,0.08)",
              border: "1px solid rgba(22,163,74,0.2)",
            }}
          >
            {verifiedMessage}
            {registrationId && (
              <span
                style={{
                  display: "block",
                  marginTop: "8px",
                  fontSize: "13px",
                  color: "rgba(4,33,71,0.6)",
                }}
              >
                Registration ID: {registrationId}
              </span>
            )}
          </div>
        )}

        <fieldset
          disabled={formDisabled}
          style={{
            border: "none",
            padding: 0,
            margin: 0,
            opacity: formDisabled ? 0.6 : 1,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <div>
              <label htmlFor="firstName" style={labelStyle}>
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={fields.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                style={inputStyle}
              />
              {fieldErrors.firstName && (
                <p style={errorStyle}>{fieldErrors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" style={labelStyle}>
                Last Name *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={fields.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                style={inputStyle}
              />
              {fieldErrors.lastName && (
                <p style={errorStyle}>{fieldErrors.lastName}</p>
              )}
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="email" style={labelStyle}>
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={(e) => updateField("email", e.target.value)}
              style={inputStyle}
            />
            {fieldErrors.email && <p style={errorStyle}>{fieldErrors.email}</p>}
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="phone" style={labelStyle}>
              Phone *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              value={fields.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              style={inputStyle}
            />
            {fieldErrors.phone && <p style={errorStyle}>{fieldErrors.phone}</p>}
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="institution" style={labelStyle}>
              Institution *
            </label>
            <input
              id="institution"
              name="institution"
              type="text"
              autoComplete="organization"
              value={fields.institution}
              onChange={(e) => updateField("institution", e.target.value)}
              style={inputStyle}
            />
            {fieldErrors.institution && (
              <p style={errorStyle}>{fieldErrors.institution}</p>
            )}
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="city" style={labelStyle}>
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              value={fields.city}
              onChange={(e) => updateField("city", e.target.value)}
              style={inputStyle}
            />
            {fieldErrors.city && <p style={errorStyle}>{fieldErrors.city}</p>}
          </div>

          {conference.committees && conference.committees.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <label htmlFor="committeePreference" style={labelStyle}>
                Committee Preference
              </label>
              <select
                id="committeePreference"
                name="committeePreference"
                value={fields.committeePreference}
                onChange={(e) =>
                  updateField("committeePreference", e.target.value)
                }
                style={{
                  ...inputStyle,
                  appearance: "none",
                  backgroundImage:
                    "linear-gradient(45deg, transparent 50%, #042147 50%), linear-gradient(135deg, #042147 50%, transparent 50%)",
                  backgroundPosition:
                    "calc(100% - 20px) calc(50% - 3px), calc(100% - 14px) calc(50% - 3px)",
                  backgroundSize: "6px 6px, 6px 6px",
                  backgroundRepeat: "no-repeat",
                  paddingRight: "40px",
                }}
              >
                <option value="">Select a committee (optional)</option>
                {conference.committees.map((committee) => (
                  <option key={committee.name} value={committee.name}>
                    {committee.name}
                  </option>
                ))}
              </select>
              {fieldErrors.committeePreference && (
                <p style={errorStyle}>{fieldErrors.committeePreference}</p>
              )}
            </div>
          )}

          <div style={{ marginBottom: "40px" }}>
            <label htmlFor="dietaryRequirements" style={labelStyle}>
              Dietary Requirements
            </label>
            <textarea
              id="dietaryRequirements"
              name="dietaryRequirements"
              rows={4}
              value={fields.dietaryRequirements}
              onChange={(e) =>
                updateField("dietaryRequirements", e.target.value)
              }
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "120px",
              }}
            />
            {fieldErrors.dietaryRequirements && (
              <p style={errorStyle}>{fieldErrors.dietaryRequirements}</p>
            )}
          </div>

          {!showOtpStep && !registrationId && (
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              style={{
                width: "100%",
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Submitting..." : "Continue Registration"}
            </button>
          )}
        </fieldset>
      </form>

      {showOtpStep && !registrationId && (
        <form
          onSubmit={handleVerifyOtp}
          noValidate
          style={{
            marginTop: showOtpStep ? "48px" : 0,
            paddingTop: "48px",
            borderTop: "1px solid rgba(4,33,71,0.08)",
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
              marginBottom: "16px",
            }}
          >
            Verify Your Email
          </span>
          <h3
            style={{
              fontFamily: "var(--font-heading), Georgia, serif",
              fontSize: "24px",
              fontWeight: 700,
              color: "#042147",
              marginBottom: "24px",
            }}
          >
            Enter Verification Code
          </h3>

          {otpError && (
            <div
              role="alert"
              style={{
                ...errorStyle,
                padding: "16px",
                marginBottom: "24px",
                backgroundColor: "rgba(131,9,14,0.06)",
                border: "1px solid rgba(131,9,14,0.15)",
              }}
            >
              {otpError}
            </div>
          )}

          <div style={{ marginBottom: "32px" }}>
            <label htmlFor="otp" style={labelStyle}>
              Verification Code *
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="6-digit code"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                setOtpError(null);
              }}
              style={{
                ...inputStyle,
                letterSpacing: "0.3em",
                fontSize: "20px",
                textAlign: "center",
              }}
              disabled={isVerifying}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isVerifying}
            style={{
              width: "100%",
              opacity: isVerifying ? 0.7 : 1,
              cursor: isVerifying ? "not-allowed" : "pointer",
            }}
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
    </>
  );
}
