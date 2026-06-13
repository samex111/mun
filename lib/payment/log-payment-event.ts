interface PaymentLogPayload {
  registrationId: string;
  hdfcOrderId?: string;
  status?: string;
  event: string;
}

/**
 * Structured payment logging. Never logs card data, credentials, or keys.
 */
export function logPaymentEvent(payload: PaymentLogPayload): void {
  console.info("[payment]", {
    ...payload,
    timestamp: new Date().toISOString(),
  });
}
