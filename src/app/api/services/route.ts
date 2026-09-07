import { NextResponse } from "next/server";
import { fetchServices } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await fetchServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
