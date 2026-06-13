import { randomBytes } from "crypto";

/**
 * Generates an HDFC-compatible order ID (max 18 alphanumeric characters).
 */
export function generateHdfcOrderId(): string {
  const timePart = Date.now().toString(36).slice(-8);
  const randomPart = randomBytes(4).toString("hex").slice(0, 7);
  return `SMJ${timePart}${randomPart}`.slice(0, 18);
}
