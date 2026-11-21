import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Calls the Express server. With { auth: true } it adds the user's JWT.
// Always returns { data } on success or { error, status } on failure.
export async function apiFetch(
  path,
  { method = "GET", body, auth: needsAuth = false } = {},
) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  };

  if (needsAuth) {
    try {
      const { token } = await auth.api.getToken({ headers: await headers() });
      options.headers.Authorization = `Bearer ${token}`;
    } catch {
      return { error: "Please sign in first", status: 401 };
    }
  }

  if (body) options.body = JSON.stringify(body);

  try {
    const res = await fetch(`${API_URL}${path}`, options);
    const data = await res.json().catch(() => ({}));
    if (!res.ok)
      return {
        error: data.message || "Something went wrong",
        status: res.status,
      };
    return { data };
  } catch {
    return { error: "Server is not reachable. Please try again.", status: 500 };
  }
}
