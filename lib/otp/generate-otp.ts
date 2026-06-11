import { randomInt } from "crypto";

const OTP_EXPIRY_MS = 10 * 60 * 1000;

export function generateOtp(): { otp: string; expiresAt: Date } {
  const otp = randomInt(100000, 1000000).toString();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);
  return { otp, expiresAt };
}
