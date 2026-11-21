"use server";

import { apiFetch } from "@/lib/api";

export async function createMenuItem(data) {
  return apiFetch("/menu-items", { method: "POST", body: data, auth: true });
}

export async function updateMenuItem(id, data) {
  return apiFetch(`/menu-items/${id}`, {
    method: "PATCH",
    body: data,
    auth: true,
  });
}

export async function setItemAvailability(id, available) {
  return apiFetch(`/menu-items/${id}/availability`, {
    method: "PATCH",
    body: { available },
    auth: true,
  });
}

export async function deleteMenuItem(id) {
  return apiFetch(`/menu-items/${id}`, { method: "DELETE", auth: true });
}
