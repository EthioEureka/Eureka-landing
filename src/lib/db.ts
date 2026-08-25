import { supabase, isSupabaseConfigured } from "./supabase";
import {
  defaultProjects,
  defaultServices,
  defaultTestimonials,
  defaultSiteSettings,
} from "./seed-data";
import { Project, Service, Testimonial, ContactSubmission, SiteSettings } from "./types";

// Persistent global memory store interface to survive Next.js HMR reloads
interface GlobalMemoryStore {
  __memoryProjects?: Project[];
  __memoryServices?: Service[];
  __memoryTestimonials?: Testimonial[];
  __memorySubmissions?: ContactSubmission[];
  __memorySettings?: SiteSettings;
}

const globalStore = globalThis as unknown as GlobalMemoryStore;

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

if (!globalStore.__memoryProjects) {
  globalStore.__memoryProjects = [...defaultProjects];
}
if (!globalStore.__memoryServices) {
  globalStore.__memoryServices = [...defaultServices];
}
if (!globalStore.__memoryTestimonials) {
  globalStore.__memoryTestimonials = [...defaultTestimonials];
}
if (!globalStore.__memorySubmissions) {
  globalStore.__memorySubmissions = [...INITIAL_SUBMISSIONS];
}
if (!globalStore.__memorySettings) {
  globalStore.__memorySettings = { ...defaultSiteSettings };
}

const memoryProjects: Project[] = globalStore.__memoryProjects;
const memoryServices: Service[] = globalStore.__memoryServices;
const memoryTestimonials: Testimonial[] = globalStore.__memoryTestimonials;
const defaultSubmissions: ContactSubmission[] = globalStore.__memorySubmissions;
let memorySettings: SiteSettings = globalStore.__memorySettings;

/* ==========================================================================
   GETTERS (READ OPERATIONS FOR PUBLIC LANDING PAGE & ADMIN)
   ========================================================================== */

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
  const foundInMemory = memoryProjects.find((p) => p.slug === slugOrId || p.id === slugOrId);
  if (!isSupabaseConfigured || !supabase) {
    return foundInMemory || null;
  }
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
      .maybeSingle();

    if (error || !data) {
      return foundInMemory || null;
    }
    return data as Project;
  } catch {
    return foundInMemory || null;
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

/* ==========================================================================
   FULL CRUD OPERATIONS (PROJECTS, SERVICES, TESTIMONIALS, LEADS, SETTINGS)
   ========================================================================== */

export function generateSlug(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// --- PROJECTS CRUD ---
export async function createProject(project: Omit<Project, "id">): Promise<{ success: boolean; data?: Project; error?: string }> {
  const slug = (project.slug && project.slug.trim()) || generateSlug(project.title);
  const newProject: Project = { id: `proj-${Date.now()}`, ...project, slug };
  memoryProjects.unshift(newProject);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, data: newProject };
  }
  try {
    const { data, error } = await supabase.from("projects").insert([newProject]).select().maybeSingle();
    if (error || !data) return { success: true, data: newProject };
    return { success: true, data: data as Project };
  } catch {
    return { success: true, data: newProject };
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<{ success: boolean; data?: Project; error?: string }> {
  const finalUpdates = { ...updates };
  if (finalUpdates.title && !finalUpdates.slug) {
    finalUpdates.slug = generateSlug(finalUpdates.title);
  }

  const idx = memoryProjects.findIndex((p) => p.id === id || p.slug === id);
  if (idx !== -1) {
    memoryProjects[idx] = { ...memoryProjects[idx], ...finalUpdates };
  }

  if (!isSupabaseConfigured || !supabase) {
    if (idx !== -1) return { success: true, data: memoryProjects[idx] };
    return { success: false, error: "Project not found" };
  }
  try {
    const { data, error } = await supabase
      .from("projects")
      .update(finalUpdates)
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
    if (error && idx === -1) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch {
    return { success: true };
  }
}

// --- SERVICES CRUD ---
export async function createService(service: Omit<Service, "id">): Promise<{ success: boolean; data?: Service; error?: string }> {
  const slug = (service.slug && service.slug.trim()) || generateSlug(service.title);
  const newService: Service = { id: `serv-${Date.now()}`, ...service, slug };
  memoryServices.push(newService);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, data: newService };
  }
  try {
    const { data, error } = await supabase.from("services").insert([newService]).select().maybeSingle();
    if (error || !data) return { success: true, data: newService };
    return { success: true, data: data as Service };
  } catch {
    return { success: true, data: newService };
  }
}

export async function updateService(id: string, updates: Partial<Service>): Promise<{ success: boolean; data?: Service; error?: string }> {
  const finalUpdates = { ...updates };
  if (finalUpdates.title && (!finalUpdates.slug || !finalUpdates.slug.trim())) {
    finalUpdates.slug = generateSlug(finalUpdates.title);
  }

  const idx = memoryServices.findIndex((s) => s.id === id || s.slug === id);
  if (idx !== -1) {
    memoryServices[idx] = { ...memoryServices[idx], ...finalUpdates };
  }

  if (!isSupabaseConfigured || !supabase) {
    if (idx !== -1) return { success: true, data: memoryServices[idx] };
    return { success: false, error: "Service not found" };
  }
  try {
    const { data, error } = await supabase.from("services").update(finalUpdates).or(`id.eq.${id},slug.eq.${id}`).select().maybeSingle();
    if (error || !data) {
      if (idx !== -1) return { success: true, data: memoryServices[idx] };
      return { success: false, error: error?.message || "Update failed" };
    }
    return { success: true, data: data as Service };
  } catch {
    if (idx !== -1) return { success: true, data: memoryServices[idx] };
    return { success: false, error: "Update failed" };
  }
}

export async function deleteService(id: string): Promise<{ success: boolean; error?: string }> {
  const idx = memoryServices.findIndex((s) => s.id === id || s.slug === id);
  if (idx !== -1) {
    memoryServices.splice(idx, 1);
  }

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }
  try {
    const { error } = await supabase.from("services").delete().or(`id.eq.${id},slug.eq.${id}`);
    if (error && idx === -1) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: true };
  }
}

// --- TESTIMONIALS CRUD ---
export async function createTestimonial(testimonial: Omit<Testimonial, "id">): Promise<{ success: boolean; data?: Testimonial; error?: string }> {
  const newT: Testimonial = { id: `testi-${Date.now()}`, ...testimonial };
  memoryTestimonials.push(newT);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, data: newT };
  }
  try {
    const { data, error } = await supabase.from("testimonials").insert([newT]).select().maybeSingle();
    if (error || !data) return { success: true, data: newT };
    return { success: true, data: data as Testimonial };
  } catch {
    return { success: true, data: newT };
  }
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<{ success: boolean; data?: Testimonial; error?: string }> {
  const idx = memoryTestimonials.findIndex((t) => t.id === id);
  if (idx !== -1) {
    memoryTestimonials[idx] = { ...memoryTestimonials[idx], ...updates };
  }

  if (!isSupabaseConfigured || !supabase) {
    if (idx !== -1) return { success: true, data: memoryTestimonials[idx] };
    return { success: false, error: "Testimonial not found" };
  }
  try {
    const { data, error } = await supabase.from("testimonials").update(updates).eq("id", id).select().maybeSingle();
    if (error || !data) {
      if (idx !== -1) return { success: true, data: memoryTestimonials[idx] };
      return { success: false, error: error?.message || "Update failed" };
    }
    return { success: true, data: data as Testimonial };
  } catch {
    if (idx !== -1) return { success: true, data: memoryTestimonials[idx] };
    return { success: false, error: "Update failed" };
  }
}

export async function deleteTestimonial(id: string): Promise<{ success: boolean; error?: string }> {
  const idx = memoryTestimonials.findIndex((t) => t.id === id);
  if (idx !== -1) {
    memoryTestimonials.splice(idx, 1);
  }

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }
  try {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error && idx === -1) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: true };
  }
}

// --- CONTACT SUBMISSIONS CRUD ---
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
    await supabase.from("contact_submissions").insert([newSub]);
    return { success: true };
  } catch {
    return { success: true };
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
  } catch {
    if (sub) return { success: true };
    return { success: false, error: "Update failed" };
  }
}

export async function deleteContactSubmission(id: string): Promise<{ success: boolean; error?: string }> {
  const idx = defaultSubmissions.findIndex((s) => s.id === id);
  if (idx !== -1) {
    defaultSubmissions.splice(idx, 1);
  }

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }
  try {
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error && idx === -1) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: true };
  }
}

// --- SITE SETTINGS ---
export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<{ success: boolean; data?: SiteSettings; error?: string }> {
  if (!globalStore.__memorySettings) {
    globalStore.__memorySettings = { ...defaultSiteSettings };
  }
  globalStore.__memorySettings = { ...globalStore.__memorySettings, ...updates } as SiteSettings;
  memorySettings = globalStore.__memorySettings;

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, data: memorySettings };
  }
  try {
    const { data, error } = await supabase.from("site_settings").upsert([updates]).select().maybeSingle();
    if (error || !data) return { success: true, data: memorySettings };
    return { success: true, data: data as SiteSettings };
  } catch {
    return { success: true, data: memorySettings };
  }
}


