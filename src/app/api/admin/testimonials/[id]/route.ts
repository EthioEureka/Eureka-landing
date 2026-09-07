import { NextResponse } from "next/server";
import { fetchTestimonialById, updateTestimonial, deleteTestimonial } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const testimonial = await fetchTestimonialById(id);
  if (!testimonial) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }
  return NextResponse.json({ testimonial });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const result = await updateTestimonial(id, body);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ testimonial: result.data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update testimonial";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const result = await deleteTestimonial(id);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete testimonial";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
