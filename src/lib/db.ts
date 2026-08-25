import { supabase, isSupabaseConfigured } from "./supabase";
import {
  defaultProjects,
  defaultServices,
  defaultTestimonials,
  defaultSiteSettings,
} from "./seed-data";
import { Project, Service, Testimonial, ContactSubmission, SiteSettings } from "./types";

// Memory stores for local fallback persistence
const memoryProjects: Project[] = [...defaultProjects];
const memoryServices: Service[] = [...defaultServices];
const memoryTestimonials: Testimonial[] = [...defaultTestimonials];
let memorySettings: SiteSettings = { ...defaultSiteSettings };

const INITIAL_SUBMISSIONS: ContactSubmission[] = [
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
    read: false,
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
    read: true,
  },
];

if (!(globalThis as unknown as { __memorySubmissions?: ContactSubmission[] }).__memorySubmissions) {
  (globalThis as unknown as { __memorySubmissions: ContactSubmission[] }).__memorySubmissions = [...INITIAL_SUBMISSIONS];
}
const defaultSubmissions: ContactSubmission[] = (globalThis as unknown as { __memorySubmissions: ContactSubmission[] }).__memorySubmissions;

export async function fetchProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) {
    return memoryProjects.filter((p) => p.published !== false);
  }
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return memoryProjects.filter((p) => p.published !== false);
    }
    return data as Project[];
  } catch {
    return memoryProjects.filter((p) => p.published !== false);
  }
}

export async function fetchAllProjectsAdmin(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) {
    return memoryProjects;
  }
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return memoryProjects;
    }
    return data as Project[];
  } catch {
    return memoryProjects;
  }
}

export async function fetchProjectBySlug(slugOrId: string): Promise<Project | null> {
  if (!isSupabaseConfigured || !supabase) {
    const found = memoryProjects.find((p) => p.slug === slugOrId || p.id === slugOrId);
    return found || null;
  }
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
      .maybeSingle();

    if (error || !data) {
      const found = memoryProjects.find((p) => p.slug === slugOrId || p.id === slugOrId);
      return found || null;
    }
    return data as Project;
  } catch {
    const found = memoryProjects.find((p) => p.slug === slugOrId || p.id === slugOrId);
    return found || null;
  }
}

export async function fetchServices(): Promise<Service[]> {
  if (!isSupabaseConfigured || !supabase) {
    return memoryServices.filter((s) => s.published !== false);
  }
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return memoryServices.filter((s) => s.published !== false);
    }
    return data as Service[];
  } catch {
    return memoryServices.filter((s) => s.published !== false);
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) {
    return memoryTestimonials.filter((t) => t.published !== false);
  }
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return memoryTestimonials.filter((t) => t.published !== false);
    }
    return data as Testimonial[];
  } catch {
    return memoryTestimonials.filter((t) => t.published !== false);
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured || !supabase) {
    return memorySettings;
  }
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) {
      return memorySettings;
    }
    return data as SiteSettings;
  } catch {
    return memorySettings;
  }
}

export async function submitContactSubmission(
  payload: Omit<ContactSubmission, "id" | "created_at" | "status" | "read">
): Promise<{ success: boolean; error?: string }> {
  const newSub: ContactSubmission = {
    id: `sub-${Date.now()}`,
    created_at: new Date().toISOString(),
    name: payload.name,
    email: payload.email,
    company: payload.company || "",
    phone: payload.phone || "",
    service: payload.service || "Website Design & Development",
    budget: payload.budget || "",
    message: payload.message,
    status: "new",
    read: false,
  };

  defaultSubmissions.unshift(newSub);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }
  try {
    const { error } = await supabase.from("contact_submissions").insert([newSub]);
    if (error) {
      return { success: true };
    }
    return { success: true };
  } catch {
    return { success: true };
  }
}

/* ==========================================================================
   FULL CRUD OPERATIONS (PROJECTS, SERVICES, TESTIMONIALS, LEADS, SETTINGS)
   ========================================================================== */

// --- PROJECTS CRUD ---
export async function createProject(project: Omit<Project, "id">): Promise<{ success: boolean; data?: Project; error?: string }> {
  const newProject: Project = { id: `proj-${Date.now()}`, ...project };
  memoryProjects.unshift(newProject);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, data: newProject };
  }
  try {
    const { data, error } = await supabase.from("projects").insert([project]).select().single();
    if (error) return { success: true, data: newProject };
    return { success: true, data: data as Project };
  } catch {
    return { success: true, data: newProject };
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<{ success: boolean; data?: Project; error?: string }> {
  const idx = memoryProjects.findIndex((p) => p.id === id || p.slug === id);
  if (idx !== -1) {
    memoryProjects[idx] = { ...memoryProjects[idx], ...updates };
  }

  if (!isSupabaseConfigured || !supabase) {
    if (idx !== -1) return { success: true, data: memoryProjects[idx] };
    return { success: false, error: "Project not found" };
  }
  try {
    const { data, error } = await supabase
      .from("projects")
      .update(updates)
      .or(`id.eq.${id},slug.eq.${id}`)
      .select()
      .maybeSingle();

    if (error || !data) {
      if (idx !== -1) return { success: true, data: memoryProjects[idx] };
      return { success: false, error: error?.message || "Update failed" };
    }
    return { success: true, data: data as Project };
  } catch {
    if (idx !== -1) return { success: true, data: memoryProjects[idx] };
    return { success: false, error: "Update failed" };
  }
}

export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
  const idx = memoryProjects.findIndex((p) => p.id === id || p.slug === id);
  if (idx !== -1) {
    memoryProjects.splice(idx, 1);
  }

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }
  try {
    const { error } = await supabase.from("projects").delete().or(`id.eq.${id},slug.eq.${id}`);
    if (error) {
      if (idx !== -1) return { success: true };
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch {
    if (idx !== -1) return { success: true };
    return { success: false, error: "Delete failed" };
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

export async function fetchContactSubmissions(): Promise<ContactSubmission[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultSubmissions;
  }
  try {
    const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return defaultSubmissions;
    
    // Merge Supabase items with local memory items if not already present
    const supabaseIds = new Set(data.map((s: ContactSubmission) => s.id));
    const localOnly = defaultSubmissions.filter((s) => !supabaseIds.has(s.id));
    return [...data, ...localOnly] as ContactSubmission[];
  } catch {
    return defaultSubmissions;
  }
}

export async function updateContactStatus(
  id: string,
  status?: ContactSubmission["status"],
  read?: boolean
): Promise<{ success: boolean; error?: string }> {
  const sub = defaultSubmissions.find((s) => s.id === id);
  if (sub) {
    if (status !== undefined) sub.status = status;
    if (read !== undefined) sub.read = read;
  }

  if (!isSupabaseConfigured || !supabase) {
    if (sub) return { success: true };
    return { success: false, error: "Lead not found" };
  }
  try {
    const updates: Partial<ContactSubmission> = {};
    if (status !== undefined) updates.status = status;
    if (read !== undefined) updates.read = read;

    const { error } = await supabase.from("contact_submissions").update(updates).eq("id", id);
    if (error && !sub) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    if (sub) return { success: true };
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

