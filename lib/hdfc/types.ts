export interface HdfcPaymentLinks {
  web?: string;
  mobile?: string;
  iframe?: string;
}

export interface HdfcOrderSessionResponse {
  status?: string;
  id?: string;
  order_id: string;
  payment_links?: HdfcPaymentLinks;
  sdk_payload?: Record<string, unknown>;
}

export interface HdfcOrderStatusResponse {
  status: string;
  order_id: string;
  amount: number;
  currency?: string;
  txn_id?: string;
  id?: string;
}

export interface CreateHdfcOrderInput {
  orderId: string;
  amount: number;
  returnUrl: string;
  customerEmail: string;
  customerPhone: string;
  firstName: string;
  lastName: string;
}
