import { APIError } from "expresscheckout-nodejs";
import { getHdfcClient, getPaymentPageClientId } from "@/lib/hdfc/client";
import { stripHttpField } from "@/lib/hdfc/strip-http";
import type {
  CreateHdfcOrderInput,
  HdfcOrderSessionResponse,
} from "@/lib/hdfc/types";

/**
 * Creates an HDFC order session. Pure HDFC communication — no database updates.
 */
export async function createHdfcOrder(
  input: CreateHdfcOrderInput
): Promise<HdfcOrderSessionResponse> {
  const juspay = getHdfcClient();

  try {
    const response = await juspay.orderSession.create({
      order_id: input.orderId,
      amount: input.amount,
      payment_page_client_id: getPaymentPageClientId(),
      action: "paymentPage",
      return_url: input.returnUrl,
      currency: "INR",
      customer_email: input.customerEmail,
      customer_phone: input.customerPhone,
      first_name: input.firstName,
      last_name: input.lastName,
    });

    return stripHttpField(
      response as Record<string, unknown>
    ) as unknown as HdfcOrderSessionResponse;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw error;
  }
}
