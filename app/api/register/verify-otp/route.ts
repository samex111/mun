import { NextResponse } from "next/server";
import { RegistrationStatus } from "@prisma/client";
import { ConferenceService } from "@/lib/sanity/conference/service";
import type { Conference } from "@/lib/sanity/conference/types";
import { db } from "@/lib/db";
import { normalizeEmail } from "@/lib/validations/registration";
import { verifyOtpSchema } from "@/lib/validations/verify-otp";
import { verifyOtpRecord } from "@/lib/otp/verify-otp";
import { createRegistrationFromDraft } from "@/lib/registration/create-registration";

async function isCapacityReached(conference: Conference): Promise<boolean> {
  if (conference.capacity == null) return false;

  const registrationCount = await db.registration.count({
    where: {
      conferenceId: conference._id,
      status: {
        in: [RegistrationStatus.PENDING_PAYMENT, RegistrationStatus.PAID],
      },
    },
  });

  return registrationCount >= conference.capacity;
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const parsed = verifyOtpSchema.safeParse(body);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Validation failed";
      return NextResponse.json(
        { success: false, message },
        { status: 400 }
      );
    }

    const email = normalizeEmail(parsed.data.email);
    const { otp, conferenceSlug } = parsed.data;

    const otpResult = await verifyOtpRecord(email, otp);

    if (!otpResult.success) {
      switch (otpResult.error) {
        case "NOT_FOUND":
          return NextResponse.json(
            { success: false, message: "No verification code found for this email." },
            { status: 404 }
          );
        case "EXPIRED":
          return NextResponse.json(
            { success: false, message: "Verification code has expired." },
            { status: 403 }
          );
        case "MAX_ATTEMPTS":
          return NextResponse.json(
            { success: false, message: "Maximum verification attempts exceeded." },
            { status: 429 }
          );
        case "INVALID":
          return NextResponse.json(
            { success: false, message: "Invalid verification code." },
            { status: 401 }
          );
      }
    }

    const conference = await ConferenceService.getConferenceBySlug(conferenceSlug);

    if (!conference) {
      return NextResponse.json(
        { success: false, message: "Conference not found." },
        { status: 404 }
      );
    }

    const draft = await db.registrationDraft.findFirst({
      where: {
        email,
        conferenceId: conference._id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!draft) {
      return NextResponse.json(
        { success: false, message: "Registration draft not found." },
        { status: 404 }
      );
    }

    const existingRegistration = await db.registration.findUnique({
      where: {
        email_conferenceId: {
          email,
          conferenceId: conference._id,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already registered for this conference.",
        },
        { status: 409 }
      );
    }

    if (await isCapacityReached(conference)) {
      return NextResponse.json(
        { success: false, message: "This conference has reached capacity." },
        { status: 403 }
      );
    }

    const registration = await db.$transaction(async (tx) => {
      const created = await createRegistrationFromDraft(draft, conference, tx);

      await tx.otpVerification.delete({
        where: { id: otpResult.record.id },
      });

      await tx.registrationDraft.delete({
        where: { id: draft.id },
      });

      return created;
    });

    return NextResponse.json({
      success: true,
      message: "Registration verified successfully.",
      registrationId: registration.id,
    });
  } catch (error) {
    console.error("[POST /api/register/verify-otp]", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
