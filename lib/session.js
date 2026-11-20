import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// read the logged-in user on the server (from the login cookie)
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

// allow only one role; everyone else is sent away
export async function requireRole(role) {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (session.user.role !== role) redirect(`/dashboard/${session.user.role}`);
  return session;
}
