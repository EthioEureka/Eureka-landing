import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "admin@ethio-eureka.com";
    const expectedPassword = process.env.ADMIN_PASSWORD || "ethio-eureka-secret-2026";

    if (email === expectedEmail && password === expectedPassword) {
      await setAdminSession();
      return NextResponse.json({ success: true, message: "Logged in successfully" });
    }

    return NextResponse.json(
      { success: false, error: "Invalid admin email or password" },
      { status: 401 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication failed";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
