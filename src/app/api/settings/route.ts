import { NextResponse } from "next/server";
import { fetchSiteSettings } from "@/lib/db";

export async function GET() {
  try {
    const settings = await fetchSiteSettings();
    return NextResponse.json({ settings });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
