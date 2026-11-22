import Link from "next/link";
import { redirect } from "next/navigation";
import { XCircle } from "lucide-react";
import { getSession } from "@/lib/session";

export default async function PaymentCancelPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  return (
    <main className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <XCircle className="size-16 text-destructive" />
      <h1 className="text-3xl font-extrabold">Payment cancelled</h1>
      <p className="text-muted-foreground">
        No money was taken. You are still on the Free plan and can upgrade any
        time.
      </p>
      <Link
        href="/dashboard/vendor/subscription"
        className="glow-red rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
      >
        Back to Subscription
      </Link>
    </main>
  );
}
