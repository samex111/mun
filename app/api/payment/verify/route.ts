import { NextResponse } from "next/server";
import { PaymentError } from "@/lib/payment/errors";
import {
  toPublicRegistration,
  verifyPayment,
} from "@/lib/payment/verify-payment";
import { paymentRegistrationSchema } from "@/lib/validations/payment";

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

    const parsed = paymentRegistrationSchema.safeParse(body);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Validation failed";
      return NextResponse.json(
        { success: false, message },
        { status: 400 }
      );
    }

    const result = await verifyPayment(parsed.data.registrationId);

    return NextResponse.json({
      success: true,
      outcome: result.outcome,
      hdfcStatus: result.hdfcStatus,
      registration: toPublicRegistration(result.registration),
    });
  } catch (error) {
    if (error instanceof PaymentError) {
      return NextResponse.json(
        { success: false, message: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    console.error("[POST /api/payment/verify]", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
