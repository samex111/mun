import { db } from "@/lib/db";
import type { OtpVerification } from "@prisma/client";
import { verifyOtp } from "@/lib/otp/hash-otp";

const MAX_OTP_ATTEMPTS = 3;

export type VerifyOtpRecordResult =
  | { success: true; record: OtpVerification }
  | { success: false; error: "NOT_FOUND" }
  | { success: false; error: "EXPIRED" }
  | { success: false; error: "MAX_ATTEMPTS" }
  | { success: false; error: "INVALID" };

export async function verifyOtpRecord(
  email: string,
  otp: string
): Promise<VerifyOtpRecordResult> {
  const record = await db.otpVerification.findFirst({
    where: {
      email,
      verified: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!record) {
    return { success: false, error: "NOT_FOUND" };
  }

  if (record.expiresAt < new Date()) {
    return { success: false, error: "EXPIRED" };
  }

  if (record.attempts >= MAX_OTP_ATTEMPTS) {
    return { success: false, error: "MAX_ATTEMPTS" };
  }

  const isValid = verifyOtp(otp, record.otpHash);

  if (!isValid) {
    await db.otpVerification.update({
      where: { id: record.id },
      data: { attempts: { increment: 1 } },
    });
    return { success: false, error: "INVALID" };
  }

  return { success: true, record };
}
