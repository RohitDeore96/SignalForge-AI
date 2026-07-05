import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

// Create the Supabase client. If credentials are missing, we fall back to a safe placeholder.
// We handle this gracefully in our state context.
export const supabase = createSupabaseClient(
  supabaseUrl || "https://mock-instance.supabase.co",
  supabaseAnonKey || "mock-anon-key-string",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// Server Action Client creator helper
export function createServerActionClient() {
  return supabase;
}
