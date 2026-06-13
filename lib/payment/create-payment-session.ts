import { RegistrationStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { createHdfcOrder } from "@/lib/hdfc/create-order";
import { getAppUrl } from "@/lib/hdfc/client";
import type { HdfcOrderSessionResponse } from "@/lib/hdfc/types";
import {
  alreadyPaid,
  invalidStatus,
  registrationNotFound,
} from "@/lib/payment/errors";
import { generateHdfcOrderId } from "@/lib/payment/generate-order-id";
import { logPaymentEvent } from "@/lib/payment/log-payment-event";

export interface PaymentSessionResult {
  registrationId: string;
  hdfcOrderId: string;
  paymentUrl: string;
  session: HdfcOrderSessionResponse;
}

function roundAmount(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export async function createPaymentSession(
  registrationId: string
): Promise<PaymentSessionResult> {
  const registration = await db.registration.findUnique({
    where: { id: registrationId },
  });

  if (!registration) {
    throw registrationNotFound();
  }

  if (registration.status === RegistrationStatus.PAID) {
    throw alreadyPaid();
  }

  const payableStatuses: RegistrationStatus[] = [
    RegistrationStatus.PENDING_PAYMENT,
    RegistrationStatus.PAYMENT_FAILED,
  ];

  if (!payableStatuses.includes(registration.status)) {
    throw invalidStatus(
      "Registration is not eligible for payment at this time."
    );
  }

  const hdfcOrderId = generateHdfcOrderId();
  const amount = roundAmount(registration.conferenceFee);
  const returnUrl = `${getAppUrl()}/payment/pending/${registrationId}`;

  logPaymentEvent({
    event: "create_order_start",
    registrationId,
    hdfcOrderId,
  });

  const session = await createHdfcOrder({
    orderId: hdfcOrderId,
    amount,
    returnUrl,
    customerEmail: registration.email,
    customerPhone: registration.phone,
    firstName: registration.firstName,
    lastName: registration.lastName,
  });

  await db.registration.update({
    where: { id: registrationId },
    data: {
      hdfcOrderId,
      status: RegistrationStatus.PENDING_PAYMENT,
    },
  });

  const paymentUrl = session.payment_links?.web;
  if (!paymentUrl) {
    throw new Error("HDFC did not return a payment URL.");
  }

  logPaymentEvent({
    event: "create_order_success",
    registrationId,
    hdfcOrderId,
    status: session.status,
  });

  return {
    registrationId,
    hdfcOrderId,
    paymentUrl,
    session,
  };
}
