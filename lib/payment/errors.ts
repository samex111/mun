export class PaymentError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = "PaymentError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function registrationNotFound(): PaymentError {
  return new PaymentError("Registration not found.", 404, "REGISTRATION_NOT_FOUND");
}

export function alreadyPaid(): PaymentError {
  return new PaymentError("Registration is already paid.", 409, "ALREADY_PAID");
}

export function invalidStatus(message: string): PaymentError {
  return new PaymentError(message, 400, "INVALID_STATUS");
}

export function amountMismatch(): PaymentError {
  return new PaymentError(
    "Payment amount does not match registration fee.",
    422,
    "AMOUNT_MISMATCH"
  );
}

export function orderMismatch(): PaymentError {
  return new PaymentError(
    "HDFC order ID does not match registration record.",
    422,
    "ORDER_MISMATCH"
  );
}

export function missingOrderId(): PaymentError {
  return new PaymentError(
    "No HDFC order found for this registration.",
    400,
    "MISSING_ORDER_ID"
  );
}

export function unauthorized(message = "Unauthorized request."): PaymentError {
  return new PaymentError(message, 401, "UNAUTHORIZED");
}
