import { APIError } from "expresscheckout-nodejs";
import { getHdfcClient } from "@/lib/hdfc/client";
import { stripHttpField } from "@/lib/hdfc/strip-http";
import type { HdfcOrderStatusResponse } from "@/lib/hdfc/types";

/**
 * Queries HDFC Order Status API. Pure HDFC communication — no database updates.
 */
export async function checkHdfcOrderStatus(
  orderId: string
): Promise<HdfcOrderStatusResponse> {
  const juspay = getHdfcClient();

  try {
    const response = await juspay.order.status(orderId);
    return stripHttpField(
      response as Record<string, unknown>
    ) as unknown as HdfcOrderStatusResponse;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw error;
  }
}
