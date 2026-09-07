import { NextResponse } from "next/server";
import { fetchAllPartnersAdmin, createPartner, updatePartner, deletePartner } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const partners = await fetchAllPartnersAdmin();
    return NextResponse.json(partners);
  } catch (error) {
    console.error("Admin partners GET error:", error);
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: "Partner name is required" }, { status: 400 });
    }
    const result = await createPartner({
      name: body.name,
      logo_url: body.logo_url || "",
      website_url: body.website_url || "",
      sort_order: Number(body.sort_order) || 1,
      published: body.published !== false,
    });
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Create failed" }, { status: 400 });
    }
    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    console.error("Admin partner POST error:", error);
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "Partner ID is required" }, { status: 400 });
    }
    const result = await updatePartner(body.id, body);
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Update failed" }, { status: 400 });
    }
    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Admin partner PUT error:", error);
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Partner ID is required" }, { status: 400 });
    }
    const result = await deletePartner(id);
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Delete failed" }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin partner DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
  }
}
