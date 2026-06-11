import { createHash, timingSafeEqual } from "crypto";

export function hashOtp(otp: string): string {
  return createHash("sha256").update(otp).digest("hex");
}

export function verifyOtp(otp: string, hash: string): boolean {
  const hashed = hashOtp(otp);
  try {
    return timingSafeEqual(Buffer.from(hashed), Buffer.from(hash));
  } catch {
    return false;
  }
}
