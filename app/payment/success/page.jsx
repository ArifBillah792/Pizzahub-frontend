import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { PaymentStatus } from "@/components/payment-status";

export default async function PaymentSuccessPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <PaymentStatus />
    </main>
  );
}
