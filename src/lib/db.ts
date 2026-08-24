import { supabase, isSupabaseConfigured } from "./supabase";
import {
  defaultProjects,
  defaultServices,
  defaultTestimonials,
  defaultSiteSettings,
} from "./seed-data";
import { Project, Service, Testimonial, ContactSubmission, SiteSettings } from "./types";

export async function fetchProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultProjects;
  }
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultProjects;
    }
    return data as Project[];
  } catch {
    return defaultProjects;
  }
}

export async function fetchAllProjectsAdmin(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultProjects;
  }
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return defaultProjects;
    }
    return data as Project[];
  } catch {
    return defaultProjects;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured || !supabase) {
    const found = defaultProjects.find((p) => p.slug === slug);
    return found || null;
  }
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      const found = defaultProjects.find((p) => p.slug === slug);
      return found || null;
    }
    return data as Project;
  } catch {
    const found = defaultProjects.find((p) => p.slug === slug);
    return found || null;
  }
}

export async function fetchServices(): Promise<Service[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultServices;
  }
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultServices;
    }
    return data as Service[];
  } catch {
    return defaultServices;
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultTestimonials;
  }
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultTestimonials;
    }
    return data as Testimonial[];
  } catch {
    return defaultTestimonials;
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultSiteSettings;
  }
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) {
      return defaultSiteSettings;
    }
    return data as SiteSettings;
  } catch {
    return defaultSiteSettings;
  }
}

export async function submitContactSubmission(
  payload: Omit<ContactSubmission, "id" | "created_at" | "status">
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    console.log("[Local Seed Fallback] Contact Submission Received:", payload);
    return { success: true };
  }
  try {
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name: payload.name,
        email: payload.email,
        company: payload.company || "",
        phone: payload.phone || "",
        service: payload.service || "",
        budget: payload.budget || "",
        message: payload.message,
        status: "new",
      },
    ]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Submission failed";
    return { success: false, error: message };
  }
}
