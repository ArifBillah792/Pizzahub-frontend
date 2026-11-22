"use server";

import { apiFetch } from "@/lib/api";

export async function startCheckout() {
  return apiFetch("/subscriptions/checkout", { method: "POST", auth: true });
}

export async function cancelSubscription() {
  return apiFetch("/subscriptions/cancel", { method: "POST", auth: true });
}

export async function getMyPlan() {
  return apiFetch("/me", { auth: true });
}
