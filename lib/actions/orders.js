"use server";

import { apiFetch } from "@/lib/api";

export async function createOrder(data) {
  return apiFetch("/orders", { method: "POST", body: data, auth: true });
}

export async function cancelOrder(id) {
  return apiFetch(`/orders/${id}/cancel`, { method: "PATCH", auth: true });
}

export async function updateOrderStatus(id, status) {
  return apiFetch(`/orders/${id}/status`, {
    method: "PATCH",
    body: { status },
    auth: true,
  });
}
