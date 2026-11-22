"use server";

import { apiFetch } from "@/lib/api";

export async function setMenuItemStatus(id, status) {
  return apiFetch(`/admin/menu-items/${id}/status`, {
    method: "PATCH",
    body: { status },
    auth: true,
  });
}

export async function adminDeleteMenuItem(id) {
  return apiFetch(`/admin/menu-items/${id}`, { method: "DELETE", auth: true });
}
