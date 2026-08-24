import { NextResponse } from "next/server";
import { submitContactSubmission } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, service, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and project message are required" },
        { status: 400 }
      );
    }

    const result = await submitContactSubmission({
      name,
      email,
      company,
      phone,
      service,
      budget,
      message,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to submit inquiry" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Inquiry received successfully" });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Server error processing inquiry";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
