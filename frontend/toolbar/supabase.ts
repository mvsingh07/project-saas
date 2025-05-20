import { createClient, SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Create a variable to store the client instance
let browserClient: ReturnType<typeof createClient<Database>> | null = null

// Create a single supabase client for the browser
export function getSupabaseBrowserClient() {
  // Return the existing client if it exists
  if (browserClient) {
    return browserClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and anon key are required")
  }

  // Create a new client and store it
  browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "auctionsphere.auth.token", // Use a unique key for this app
    },
  })

  return browserClient
}

// For server components - use a separate client with service role
let serverClient: ReturnType<typeof createClient<Database>> | null = null

export const getSupabaseServerClient = () => {
  if (serverClient) return serverClient

  const supabaseUrl =
    process.env.SUPABASE_URL! || process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Supabase URL and service key are required for server operations"
    )
  }

  serverClient = createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  })

  return serverClient
}
