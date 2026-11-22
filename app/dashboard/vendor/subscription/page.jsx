import { Check, Crown } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { UpgradeButton } from "@/components/vendor/upgrade-button";
import { CancelSubscriptionButton } from "@/components/vendor/cancel-subscription-button";

const FREE_FEATURES = [
  "Up to 3 active menu items",
  "Basic vendor dashboard",
  "Order management",
];
const PREMIUM_FEATURES = [
  "Unlimited active menu items",
  "Premium vendor badge",
  "Featured placement on the home page",
  "All Free features",
];

export default async function SubscriptionPage() {
  const [{ data: me, error }, { data: items }] = await Promise.all([
    apiFetch("/me", { auth: true }),
    apiFetch("/menu-items/mine", { auth: true }),
  ]);

  if (error) {
    return (
      <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
        {error}
      </p>
    );
  }

  const isPremium = me.isPremium;
  const activeCount =
    items?.filter((i) => ["pending", "approved"].includes(i.status)).length ??
    0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Subscription</h1>
        <p className="mt-1 text-muted-foreground">
          Current plan:{" "}
          <span className="font-semibold text-accent capitalize">
            {isPremium ? "Premium" : "Free"}
          </span>
          {isPremium && me.subscriptionExpiresAt && (
            <> · renews or ends on {formatDate(me.subscriptionExpiresAt)}</>
          )}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Free */}
        <div
          className={`flex flex-col gap-5 rounded-3xl border bg-card p-6 ${!isPremium ? "border-primary" : "border-border"}`}
        >
          <div>
            <h2 className="text-xl font-bold">Free</h2>
            <p className="mt-2 text-4xl font-extrabold">
              $0
              <span className="text-base font-medium text-muted-foreground">
                {" "}
                /month
              </span>
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="size-4 text-green-400" /> {f}
              </li>
            ))}
          </ul>
          {!isPremium && (
            <div className="mt-auto rounded-xl bg-muted p-3 text-sm">
              <span className="font-semibold">{activeCount} of 3</span> active
              items used
            </div>
          )}
        </div>

        {/* Premium */}
        <div className="glow-red relative flex flex-col gap-5 rounded-3xl border border-primary bg-card p-6">
          <span className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            {isPremium ? "Your plan" : "Most popular"}
          </span>
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Crown className="size-5 text-accent" /> Premium
            </h2>
            <p className="mt-2 text-4xl font-extrabold">
              $9.99
              <span className="text-base font-medium text-muted-foreground">
                {" "}
                /month
              </span>
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="size-4 text-green-400" /> {f}
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            {isPremium ? <CancelSubscriptionButton /> : <UpgradeButton />}
          </div>
        </div>
      </div>
    </div>
  );
}
