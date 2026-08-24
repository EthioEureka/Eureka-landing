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
    const newSub: ContactSubmission = {
      id: `sub-${Date.now()}`,
      created_at: new Date().toISOString(),
      ...payload,
      status: "new",
    };
    defaultSubmissions.unshift(newSub);
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

/* ==========================================================================
   FULL CRUD OPERATIONS (PROJECTS, SERVICES, TESTIMONIALS, LEADS, SETTINGS)
   ========================================================================== */

// Memory stores for local fallback
const memoryProjects: Project[] = [...defaultProjects];
const memoryServices: Service[] = [...defaultServices];
const memoryTestimonials: Testimonial[] = [...defaultTestimonials];
let memorySettings: SiteSettings = { ...defaultSiteSettings };
const defaultSubmissions: ContactSubmission[] = [
  {
    id: "sub-1",
    created_at: new Date().toISOString(),
    name: "Bethlehem Alemu",
    email: "bethlehem@kalityfreight.example.com",
    company: "Kality Logistics",
    phone: "+251 911 000 111",
    service: "Website Design & Development",
    budget: "$10,000 - $25,000",
    message: "We need a complete web application redesign and tracking portal for our regional fleet.",
    status: "new",
  },
  {
    id: "sub-2",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    name: "Yonas Tadesse",
    email: "yonas@abyssiniacraft.example.com",
    company: "Abyssinia Artisan Group",
    phone: "+251 911 222 333",
    service: "Branding & Identity",
    budget: "$5,000 - $10,000",
    message: "Looking for visual identity and luxury e-commerce platform for international artisan exports.",
    status: "contacted",
  },
];

// --- PROJECTS CRUD ---
export async function createProject(project: Omit<Project, "id">): Promise<{ success: boolean; data?: Project; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const newProject: Project = { id: `proj-${Date.now()}`, ...project };
    memoryProjects.unshift(newProject);
    return { success: true, data: newProject };
  }
  try {
    const { data, error } = await supabase.from("projects").insert([project]).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Project };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Create failed" };
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<{ success: boolean; data?: Project; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = memoryProjects.findIndex((p) => p.id === id || p.slug === id);
    if (idx !== -1) {
      memoryProjects[idx] = { ...memoryProjects[idx], ...updates };
      return { success: true, data: memoryProjects[idx] };
    }
    return { success: false, error: "Project not found" };
  }
  try {
    const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Project };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}

export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = memoryProjects.findIndex((p) => p.id === id || p.slug === id);
    if (idx !== -1) {
      memoryProjects.splice(idx, 1);
      return { success: true };
    }
    return { success: false, error: "Project not found" };
  }
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Delete failed" };
  }
}

// --- SERVICES CRUD ---
export async function createService(service: Omit<Service, "id">): Promise<{ success: boolean; data?: Service; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const newService: Service = { id: `serv-${Date.now()}`, ...service };
    memoryServices.push(newService);
    return { success: true, data: newService };
  }
  try {
    const { data, error } = await supabase.from("services").insert([service]).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Service };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Create failed" };
  }
}

export async function updateService(id: string, updates: Partial<Service>): Promise<{ success: boolean; data?: Service; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = memoryServices.findIndex((s) => s.id === id || s.slug === id);
    if (idx !== -1) {
      memoryServices[idx] = { ...memoryServices[idx], ...updates };
      return { success: true, data: memoryServices[idx] };
    }
    return { success: false, error: "Service not found" };
  }
  try {
    const { data, error } = await supabase.from("services").update(updates).eq("id", id).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Service };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}

export async function deleteService(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = memoryServices.findIndex((s) => s.id === id || s.slug === id);
    if (idx !== -1) {
      memoryServices.splice(idx, 1);
      return { success: true };
    }
    return { success: false, error: "Service not found" };
  }
  try {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Delete failed" };
  }
}

// --- TESTIMONIALS CRUD ---
export async function createTestimonial(testimonial: Omit<Testimonial, "id">): Promise<{ success: boolean; data?: Testimonial; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const newT: Testimonial = { id: `testi-${Date.now()}`, ...testimonial };
    memoryTestimonials.push(newT);
    return { success: true, data: newT };
  }
  try {
    const { data, error } = await supabase.from("testimonials").insert([testimonial]).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Testimonial };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Create failed" };
  }
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<{ success: boolean; data?: Testimonial; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = memoryTestimonials.findIndex((t) => t.id === id);
    if (idx !== -1) {
      memoryTestimonials[idx] = { ...memoryTestimonials[idx], ...updates };
      return { success: true, data: memoryTestimonials[idx] };
    }
    return { success: false, error: "Testimonial not found" };
  }
  try {
    const { data, error } = await supabase.from("testimonials").update(updates).eq("id", id).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Testimonial };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}

export async function deleteTestimonial(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = memoryTestimonials.findIndex((t) => t.id === id);
    if (idx !== -1) {
      memoryTestimonials.splice(idx, 1);
      return { success: true };
    }
    return { success: false, error: "Testimonial not found" };
  }
  try {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Delete failed" };
  }
}

// --- CONTACT SUBMISSIONS CRUD ---
export async function fetchContactSubmissions(): Promise<ContactSubmission[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultSubmissions;
  }
  try {
    const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    if (error || !data) return defaultSubmissions;
    return data as ContactSubmission[];
  } catch {
    return defaultSubmissions;
  }
}

export async function updateContactStatus(id: string, status: ContactSubmission["status"]): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const sub = defaultSubmissions.find((s) => s.id === id);
    if (sub) {
      sub.status = status;
      return { success: true };
    }
    return { success: false, error: "Lead not found" };
  }
  try {
    const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}

export async function deleteContactSubmission(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = defaultSubmissions.findIndex((s) => s.id === id);
    if (idx !== -1) {
      defaultSubmissions.splice(idx, 1);
      return { success: true };
    }
    return { success: false, error: "Lead not found" };
  }
  try {
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Delete failed" };
  }
}

// --- SITE SETTINGS ---
export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<{ success: boolean; data?: SiteSettings; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    memorySettings = { ...memorySettings, ...updates };
    return { success: true, data: memorySettings };
  }
  try {
    const { data, error } = await supabase.from("site_settings").upsert([updates]).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data: data as SiteSettings };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Save failed" };
  }
}

