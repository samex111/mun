import { db } from "@/lib/db";
import type { OtpVerification } from "@prisma/client";

interface CreateOtpRecordInput {
  email: string;
  otpHash: string;
  expiresAt: Date;
}

export async function createOtpRecord(
  input: CreateOtpRecordInput
): Promise<OtpVerification> {
  await db.otpVerification.deleteMany({
    where: {
      email: input.email,
      verified: false,
    },
  });

  return db.otpVerification.create({
    data: {
      email: input.email,
      otpHash: input.otpHash,
      expiresAt: input.expiresAt,
      verified: false,
      attempts: 0,
    },
  });
}
