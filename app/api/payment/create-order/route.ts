import { NextResponse } from "next/server";
import { APIError } from "expresscheckout-nodejs";
import { PaymentError } from "@/lib/payment/errors";
import { createPaymentSession } from "@/lib/payment/create-payment-session";
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

    const result = await createPaymentSession(parsed.data.registrationId);

    return NextResponse.json({
      success: true,
      registrationId: result.registrationId,
      hdfcOrderId: result.hdfcOrderId,
      paymentUrl: result.paymentUrl,
    });
  } catch (error) {
    if (error instanceof PaymentError) {
      return NextResponse.json(
        { success: false, message: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    if (error instanceof APIError) {
      console.error("[POST /api/payment/create-order] HDFC API error", error.message);
      return NextResponse.json(
        { success: false, message: "Payment gateway request failed." },
        { status: 401 }
      );
    }

    console.error("[POST /api/payment/create-order]", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
