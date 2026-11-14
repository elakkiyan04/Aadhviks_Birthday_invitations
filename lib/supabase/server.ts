import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isServerSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseServiceKey &&
    supabaseUrl !== "https://your-project-id.supabase.co" &&
    !supabaseUrl.includes("placeholder")
);

export const getServerSupabase = () => {
  if (!isServerSupabaseConfigured) return null;
  return createClient(supabaseUrl!, supabaseServiceKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

