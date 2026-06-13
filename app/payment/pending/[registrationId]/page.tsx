import PaymentLayout from "@/app/payment/components/PaymentLayout";
import VerifyPayment from "@/app/payment/pending/[registrationId]/VerifyPayment";

export const dynamic = "force-dynamic";

export default async function PaymentPendingPage({
  params,
}: {
  params: Promise<{ registrationId: string }>;
}) {
  const { registrationId } = await params;

  return (
    <PaymentLayout>
      <VerifyPayment registrationId={registrationId} />
    </PaymentLayout>
  );
}
