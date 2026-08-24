import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "ethio_eureka_admin_session";

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "authenticated_session_token_2026", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return Boolean(session && session.value === "authenticated_session_token_2026");
}
