import fs from "fs";
import { Juspay } from "expresscheckout-nodejs";

function loadKey(pathOrContent: string | undefined, envContent: string | undefined): string {
  if (envContent) {
    return envContent.replace(/\\n/g, "\n");
  }

  if (!pathOrContent) {
    throw new Error(
      "HDFC key not configured. Set HDFC_PUBLIC_KEY_PATH/HDFC_PRIVATE_KEY_PATH or HDFC_PUBLIC_KEY/HDFC_PRIVATE_KEY."
    );
  }

  return fs.readFileSync(pathOrContent, "utf8");
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

let cachedClient: Juspay | undefined;

/**
 * Configured HDFC/Juspay SDK client. No business logic.
 */
export function getHdfcClient(): Juspay {
  if (cachedClient) {
    return cachedClient;
  }

  const publicKey = loadKey(
    process.env.HDFC_PUBLIC_KEY_PATH,
    process.env.HDFC_PUBLIC_KEY
  );
  const privateKey = loadKey(
    process.env.HDFC_PRIVATE_KEY_PATH,
    process.env.HDFC_PRIVATE_KEY
  );

  cachedClient = new Juspay({
    merchantId: getRequiredEnv("HDFC_MERCHANT_ID"),
    baseUrl: getRequiredEnv("HDFC_BASE_URL"),
    jweAuth: {
      keyId: getRequiredEnv("HDFC_KEY_UUID"),
      publicKey,
      privateKey,
    },
  });

  return cachedClient;
}

export function getPaymentPageClientId(): string {
  return getRequiredEnv("HDFC_PAYMENT_PAGE_CLIENT_ID");
}

export function getAppUrl(): string {
  const url = process.env.APP_URL;
  if (!url) {
    throw new Error("Missing required environment variable: APP_URL");
  }
  return url.replace(/\/$/, "");
}
