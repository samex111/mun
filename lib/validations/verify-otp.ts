import { z } from "zod";

export const verifyOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
  conferenceSlug: z
    .string()
    .trim()
    .min(1, "Conference is required"),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
