import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    (supabaseAnonKey || serviceRoleKey) &&
    !supabaseUrl.includes("xyzcompany") &&
    !supabaseUrl.includes("your-project-id") &&
    !supabaseUrl.includes("placeholder")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, serviceRoleKey || supabaseAnonKey)
  : null;

// Server-side admin client using service role key (or fallback to anon key)
export const getSupabaseAdmin = () => {
  const key = serviceRoleKey || supabaseAnonKey;
  if (!supabaseUrl || !key) {
    return null;
  }
  return createClient(supabaseUrl, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

export const getDbClient = () => {
  return getSupabaseAdmin() || supabase;
};

