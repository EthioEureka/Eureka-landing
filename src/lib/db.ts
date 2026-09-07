import { supabase, isSupabaseConfigured, getDbClient } from "./supabase";
import {
  defaultProjects,
  defaultServices,
  defaultTestimonials,
  defaultSiteSettings,
  defaultPartners,
} from "./seed-data";
import { Project, Service, Testimonial, ContactSubmission, SiteSettings, Partner } from "./types";

function getDb() {
  return getDbClient() || supabase;
}

export function isUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

export function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "00000000-0000-4000-8000-" + Date.now().toString(16).padStart(12, "0");
}


// Persistent global memory store interface to survive Next.js HMR reloads
interface GlobalMemoryStore {
  __memoryProjects?: Project[];
  __memoryServices?: Service[];
  __memoryTestimonials?: Testimonial[];
  __memorySubmissions?: ContactSubmission[];
  __memorySettings?: SiteSettings;
  __memoryPartners?: Partner[];
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
if (!globalStore.__memoryPartners) {
  globalStore.__memoryPartners = [...defaultPartners];
}

const memoryProjects: Project[] = globalStore.__memoryProjects;
const memoryServices: Service[] = globalStore.__memoryServices;
const memoryTestimonials: Testimonial[] = globalStore.__memoryTestimonials;
const defaultSubmissions: ContactSubmission[] = globalStore.__memorySubmissions;
let memorySettings: SiteSettings = globalStore.__memorySettings;
const memoryPartners: Partner[] = globalStore.__memoryPartners;


/* ==========================================================================
   GETTERS (READ OPERATIONS FOR PUBLIC LANDING PAGE & ADMIN)
   ========================================================================== */

export async function fetchProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) {
    return memoryProjects.filter((p) => p.published !== false);
  }
  try {
    const db = getDb();
    if (!db) return memoryProjects.filter((p) => p.published !== false);
    const { data, error } = await db
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("Supabase fetchProjects error:", error.message);
      return memoryProjects.filter((p) => p.published !== false);
    }
    return (data || []) as Project[];
  } catch {
    return memoryProjects.filter((p) => p.published !== false);
  }
}

export async function fetchAllProjectsAdmin(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) {
    return memoryProjects;
  }
  try {
    const db = getDb();
    if (!db) return memoryProjects;
    const { data, error } = await db
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetchAllProjectsAdmin error:", error.message);
      return memoryProjects;
    }
    return (data || []) as Project[];
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
    const db = getDb();
    if (!db) return foundInMemory || null;
    let query = db.from("projects").select("*");
    if (isUUID(slugOrId)) {
      query = query.or(`slug.eq.${slugOrId},id.eq.${slugOrId}`);
    } else {
      query = query.eq("slug", slugOrId);
    }
    const { data, error } = await query.maybeSingle();

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
    const db = getDb();
    if (!db) return memoryServices.filter((s) => s.published !== false);
    const { data, error } = await db
      .from("services")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("Supabase fetchServices error:", error.message);
      return memoryServices.filter((s) => s.published !== false);
    }
    return (data || []) as Service[];
  } catch {
    return memoryServices.filter((s) => s.published !== false);
  }
}

export async function fetchAllServicesAdmin(): Promise<Service[]> {
  if (!isSupabaseConfigured || !supabase) {
    return memoryServices;
  }
  try {
    const db = getDb();
    if (!db) return memoryServices;
    const { data, error } = await db
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return memoryServices;
    }
    return (data || []) as Service[];
  } catch {
    return memoryServices;
  }
}

export async function fetchServiceById(idOrSlug: string): Promise<Service | null> {
  const foundInMemory = memoryServices.find((s) => s.id === idOrSlug || s.slug === idOrSlug);
  if (!isSupabaseConfigured || !supabase) {
    return foundInMemory || null;
  }
  try {
    const db = getDb();
    if (!db) return foundInMemory || null;
    let query = db.from("services").select("*");
    if (isUUID(idOrSlug)) {
      query = query.or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
    } else {
      query = query.eq("slug", idOrSlug);
    }
    const { data, error } = await query.maybeSingle();

    if (error || !data) {
      return foundInMemory || null;
    }
    return data as Service;
  } catch {
    return foundInMemory || null;
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) {
    return memoryTestimonials.filter((t) => t.published !== false);
  }
  try {
    const db = getDb();
    if (!db) return memoryTestimonials.filter((t) => t.published !== false);
    const { data, error } = await db
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("Supabase fetchTestimonials error:", error.message);
      return memoryTestimonials.filter((t) => t.published !== false);
    }
    return (data || []) as Testimonial[];
  } catch {
    return memoryTestimonials.filter((t) => t.published !== false);
  }
}

export async function fetchAllTestimonialsAdmin(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) {
    return memoryTestimonials;
  }
  try {
    const db = getDb();
    if (!db) return memoryTestimonials;
    const { data, error } = await db
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return memoryTestimonials;
    }
    return (data || []) as Testimonial[];
  } catch {
    return memoryTestimonials;
  }
}

export async function fetchTestimonialById(id: string): Promise<Testimonial | null> {
  const foundInMemory = memoryTestimonials.find((t) => t.id === id);
  if (!isSupabaseConfigured || !supabase) {
    return foundInMemory || null;
  }
  try {
    const db = getDb();
    if (!db) return foundInMemory || null;
    const { data, error } = await db
      .from("testimonials")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return foundInMemory || null;
    }
    return data as Testimonial;
  } catch {
    return foundInMemory || null;
  }
}


export async function fetchSiteSettings(): Promise<SiteSettings> {
  const currentMemory = globalStore.__memorySettings || memorySettings || defaultSiteSettings;

  if (!isSupabaseConfigured || !supabase) {
    return currentMemory;
  }
  try {
    const db = getDb();
    if (!db) return currentMemory;
    const { data, error } = await db
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return currentMemory;
    }

    const merged = { ...defaultSiteSettings, ...data };
    globalStore.__memorySettings = merged;
    memorySettings = merged;
    return merged;
  } catch {
    return currentMemory;
  }
}

export async function fetchPartners(): Promise<Partner[]> {
  if (!isSupabaseConfigured || !supabase) {
    return memoryPartners.filter((p) => p.published !== false);
  }
  try {
    const db = getDb();
    if (!db) return memoryPartners.filter((p) => p.published !== false);
    const { data, error } = await db
      .from("partners")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("Supabase fetchPartners warning:", error.message);
      return memoryPartners.filter((p) => p.published !== false);
    }
    const formatted = (data || []).map((p: any) => ({
      ...p,
      logo_url: p.logo_url || p.logo || "",
    }));
    return formatted as Partner[];
  } catch (err) {
    console.warn("Supabase fetchPartners table catch:", err);
    return memoryPartners.filter((p) => p.published !== false);
  }
}

export async function fetchAllPartnersAdmin(): Promise<Partner[]> {
  if (!isSupabaseConfigured || !supabase) {
    return memoryPartners;
  }
  try {
    const db = getDb();
    if (!db) return memoryPartners;
    const { data, error } = await db
      .from("partners")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("Supabase fetchAllPartnersAdmin warning:", error.message);
      return memoryPartners;
    }
    const formatted = (data || []).map((p: any) => ({
      ...p,
      logo_url: p.logo_url || p.logo || "",
    }));
    return formatted as Partner[];
  } catch (err) {
    console.warn("Supabase fetchAllPartnersAdmin table catch:", err);
    return memoryPartners;
  }
}

export async function createPartner(partner: Omit<Partner, "id">): Promise<{ success: boolean; data?: Partner; error?: string }> {
  const logoValue = partner.logo_url || "";
  const newPartner: Partner = { id: generateUUID(), ...partner, logo_url: logoValue };
  memoryPartners.push(newPartner);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, data: newPartner };
  }
  try {
    const db = getDb();
    if (!db) return { success: true, data: newPartner };
    const insertPayload = {
      id: newPartner.id,
      name: newPartner.name,
      logo: logoValue,
      logo_url: logoValue,
      website_url: newPartner.website_url || "",
      sort_order: Number(newPartner.sort_order) || 1,
      published: newPartner.published !== false,
    };
    const { data, error } = await db.from("partners").insert([insertPayload]).select().maybeSingle();
    if (error) {
      console.error("Supabase createPartner error:", error.message);
      if (error.message?.includes("table") || error.code === "PGRST204") {
        return { success: true, data: newPartner };
      }
      return { success: false, error: error.message };
    }
    if (data) {
      const formatted: Partner = { ...data, logo_url: data.logo_url || data.logo || logoValue };
      const idx = memoryPartners.findIndex(p => p.id === newPartner.id);
      if (idx !== -1) memoryPartners[idx] = formatted;
      return { success: true, data: formatted };
    }
    return { success: true, data: newPartner };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Create partner failed";
    return { success: false, error: msg };
  }
}

export async function updatePartner(id: string, updates: Partial<Partner>): Promise<{ success: boolean; data?: Partner; error?: string }> {
  const idx = memoryPartners.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryPartners[idx] = { ...memoryPartners[idx], ...updates };
  }

  if (!isSupabaseConfigured || !supabase) {
    if (idx !== -1) return { success: true, data: memoryPartners[idx] };
    return { success: false, error: "Partner not found" };
  }
  try {
    const db = getDb();
    if (!db) return { success: false, error: "Database client unavailable" };
    const updatePayload: any = { ...updates };
    if (updates.logo_url !== undefined) {
      updatePayload.logo = updates.logo_url;
      updatePayload.logo_url = updates.logo_url;
    }
    const { data, error } = await db.from("partners").update(updatePayload).eq("id", id).select().maybeSingle();
    if (error) {
      console.error("Supabase updatePartner error:", error.message);
      if (error.message?.includes("table") || error.code === "PGRST204") {
        return { success: true, data: memoryPartners[idx] };
      }
      return { success: false, error: error.message };
    }
    if (data) {
      const formatted: Partner = { ...data, logo_url: data.logo_url || data.logo || updates.logo_url };
      if (idx !== -1) memoryPartners[idx] = formatted;
      return { success: true, data: formatted };
    }
    return { success: true, data: memoryPartners[idx] };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Update partner failed";
    return { success: false, error: msg };
  }
}

export async function deletePartner(id: string): Promise<{ success: boolean; error?: string }> {
  const idx = memoryPartners.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryPartners.splice(idx, 1);
  }

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }
  try {
    const db = getDb();
    if (!db) return { success: true };
    const { error } = await db.from("partners").delete().eq("id", id);
    if (error) {
      console.error("Supabase deletePartner error:", error.message);
      if (error.message?.includes("table") || error.code === "PGRST204") {
        return { success: true };
      }
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Delete partner failed";
    return { success: false, error: msg };
  }
}

export async function fetchContactSubmissions(): Promise<ContactSubmission[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultSubmissions;
  }
  try {
    const db = getDb();
    if (!db) return defaultSubmissions;
    const { data, error } = await db.from("contact_submissions").select("*").order("created_at", { ascending: false });
    if (error) return defaultSubmissions;
    return (data || []) as ContactSubmission[];
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
  const newProject: Project = { id: generateUUID(), ...project, slug };
  memoryProjects.unshift(newProject);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, data: newProject };
  }
  try {
    const db = getDb();
    if (!db) return { success: true, data: newProject };
    const { data, error } = await db.from("projects").insert([newProject]).select().maybeSingle();
    if (error) {
      console.error("Supabase createProject error:", error.message);
      return { success: false, error: error.message };
    }
    if (data) {
      const idx = memoryProjects.findIndex(p => p.id === newProject.id);
      if (idx !== -1) memoryProjects[idx] = data as Project;
      return { success: true, data: data as Project };
    }
    return { success: true, data: newProject };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Create project failed";
    return { success: false, error: msg };
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
    const db = getDb();
    if (!db) {
      if (idx !== -1) return { success: true, data: memoryProjects[idx] };
      return { success: false, error: "Database not available" };
    }

    let query = db.from("projects").update(finalUpdates);
    if (isUUID(id)) {
      query = query.or(`id.eq.${id},slug.eq.${id}`);
    } else {
      query = query.eq("slug", id);
    }

    const { data, error } = await query.select().maybeSingle();

    if (error) {
      console.error("Supabase updateProject error:", error.message);
      return { success: false, error: error.message };
    }
    if (data) {
      if (idx !== -1) memoryProjects[idx] = data as Project;
      return { success: true, data: data as Project };
    }
    return { success: true, data: memoryProjects[idx] };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Update project failed";
    return { success: false, error: msg };
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
    const db = getDb();
    if (!db) return { success: true };
    let query = db.from("projects").delete();
    if (isUUID(id)) {
      query = query.or(`id.eq.${id},slug.eq.${id}`);
    } else {
      query = query.eq("slug", id);
    }
    const { error } = await query;
    if (error) {
      console.error("Supabase deleteProject error:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Delete project failed";
    return { success: false, error: msg };
  }
}

// --- SERVICES CRUD ---
export async function createService(service: Omit<Service, "id">): Promise<{ success: boolean; data?: Service; error?: string }> {
  const slug = (service.slug && service.slug.trim()) || generateSlug(service.title);
  const newService: Service = { id: generateUUID(), ...service, slug };
  memoryServices.push(newService);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, data: newService };
  }
  try {
    const db = getDb();
    if (!db) return { success: true, data: newService };
    const { data, error } = await db.from("services").insert([newService]).select().maybeSingle();
    if (error) {
      console.error("Supabase createService error:", error.message);
      return { success: false, error: error.message };
    }
    if (data) {
      const idx = memoryServices.findIndex(s => s.id === newService.id);
      if (idx !== -1) memoryServices[idx] = data as Service;
      return { success: true, data: data as Service };
    }
    return { success: true, data: newService };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Create service failed";
    return { success: false, error: msg };
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
    const db = getDb();
    if (!db) return { success: false, error: "Database client unavailable" };
    let query = db.from("services").update(finalUpdates);
    if (isUUID(id)) {
      query = query.or(`id.eq.${id},slug.eq.${id}`);
    } else {
      query = query.eq("slug", id);
    }
    const { data, error } = await query.select().maybeSingle();
    if (error) {
      console.error("Supabase updateService error:", error.message);
      return { success: false, error: error.message };
    }
    if (data) {
      if (idx !== -1) memoryServices[idx] = data as Service;
      return { success: true, data: data as Service };
    }
    return { success: true, data: memoryServices[idx] };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Update service failed";
    return { success: false, error: msg };
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
    const db = getDb();
    if (!db) return { success: true };
    let query = db.from("services").delete();
    if (isUUID(id)) {
      query = query.or(`id.eq.${id},slug.eq.${id}`);
    } else {
      query = query.eq("slug", id);
    }
    const { error } = await query;
    if (error) {
      console.error("Supabase deleteService error:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Delete service failed";
    return { success: false, error: msg };
  }
}

// --- TESTIMONIALS CRUD ---
export async function createTestimonial(testimonial: Omit<Testimonial, "id">): Promise<{ success: boolean; data?: Testimonial; error?: string }> {
  const newT: Testimonial = { id: generateUUID(), ...testimonial };
  memoryTestimonials.push(newT);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, data: newT };
  }
  try {
    const db = getDb();
    if (!db) return { success: true, data: newT };
    const { data, error } = await db.from("testimonials").insert([newT]).select().maybeSingle();
    if (error) {
      console.error("Supabase createTestimonial error:", error.message);
      return { success: false, error: error.message };
    }
    if (data) {
      const idx = memoryTestimonials.findIndex(t => t.id === newT.id);
      if (idx !== -1) memoryTestimonials[idx] = data as Testimonial;
      return { success: true, data: data as Testimonial };
    }
    return { success: true, data: newT };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Create testimonial failed";
    return { success: false, error: msg };
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
    const db = getDb();
    if (!db) return { success: false, error: "Database client unavailable" };
    let query = db.from("testimonials").update(updates);
    if (isUUID(id)) {
      query = query.eq("id", id);
    }
    const { data, error } = await query.select().maybeSingle();
    if (error) {
      console.error("Supabase updateTestimonial error:", error.message);
      return { success: false, error: error.message };
    }
    if (data) {
      if (idx !== -1) memoryTestimonials[idx] = data as Testimonial;
      return { success: true, data: data as Testimonial };
    }
    return { success: true, data: memoryTestimonials[idx] };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Update testimonial failed";
    return { success: false, error: msg };
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
    const db = getDb();
    if (!db) return { success: true };
    let query = db.from("testimonials").delete();
    if (isUUID(id)) {
      query = query.eq("id", id);
    }
    const { error } = await query;
    if (error) {
      console.error("Supabase deleteTestimonial error:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Delete testimonial failed";
    return { success: false, error: msg };
  }
}

// --- CONTACT SUBMISSIONS CRUD ---
export async function submitContactSubmission(
  payload: Omit<ContactSubmission, "id" | "created_at" | "status" | "read">
): Promise<{ success: boolean; error?: string }> {
  const newSub: ContactSubmission = {
    id: generateUUID(),
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
    const db = getDb();
    if (!db) return { success: true };
    const { error } = await db.from("contact_submissions").insert([newSub]);
    if (error) {
      console.error("Supabase submitContactSubmission error:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Submit contact failed";
    return { success: false, error: msg };
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

    const db = getDb();
    if (!db) return { success: true };
    let query = db.from("contact_submissions").update(updates);
    if (isUUID(id)) {
      query = query.eq("id", id);
    }
    const { error } = await query;
    if (error) {
      console.error("Supabase updateContactStatus error:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Update contact status failed";
    return { success: false, error: msg };
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
    const db = getDb();
    if (!db) return { success: true };
    let query = db.from("contact_submissions").delete();
    if (isUUID(id)) {
      query = query.eq("id", id);
    }
    const { error } = await query;
    if (error) {
      console.error("Supabase deleteContactSubmission error:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Delete contact submission failed";
    return { success: false, error: msg };
  }
}

// --- SITE SETTINGS ---
export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<{ success: boolean; data?: SiteSettings; error?: string }> {
  if (!globalStore.__memorySettings) {
    globalStore.__memorySettings = { ...defaultSiteSettings };
  }

  const updatedSettings = {
    ...globalStore.__memorySettings,
    ...updates,
    updated_at: new Date().toISOString()
  } as SiteSettings;

  globalStore.__memorySettings = updatedSettings;
  memorySettings = globalStore.__memorySettings;

  if (!isSupabaseConfigured || !supabase) {
    return { success: true, data: globalStore.__memorySettings };
  }
  try {
    const db = getDb();
    if (!db) return { success: true, data: globalStore.__memorySettings };

    const { data: existingRow } = await db.from("site_settings").select("id").limit(1).maybeSingle();
    const rawTarget = existingRow?.id || updates.id || globalStore.__memorySettings.id;
    const targetId = (rawTarget && isUUID(rawTarget)) ? rawTarget : "00000000-0000-0000-0000-000000000001";

    const payload = {
      ...updates,
      id: targetId,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await db.from("site_settings").upsert([payload]).select().maybeSingle();
    if (error) {
      console.error("Supabase site_settings upsert error:", error.message);
      return { success: false, error: error.message };
    } else if (data) {
      const mergedData = { ...globalStore.__memorySettings, ...data } as SiteSettings;
      globalStore.__memorySettings = mergedData;
      memorySettings = mergedData;
      return { success: true, data: mergedData };
    }
    return { success: true, data: globalStore.__memorySettings };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update site_settings in DB";
    console.error(msg, err);
    return { success: false, error: msg };
  }
}


