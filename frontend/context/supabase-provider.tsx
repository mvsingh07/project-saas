"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getSupabaseBrowserClient } from "@/toolbar/supabase"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

type SupabaseContextType = {
  supabase: SupabaseClient<Database>
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export function SupabaseProvider({ children }: { children: ReactNode }) {
  // Use state to ensure the client is only created once per component instance
  const [supabase] = useState(() => getSupabaseBrowserClient())

  useEffect(() => {
    // This is just to ensure the supabase client is initialized
    const checkClient = async () => {
      await supabase.auth.getSession()
    }
    checkClient()
  }, [supabase])

  return <SupabaseContext.Provider value={{ supabase }}>{children}</SupabaseContext.Provider>
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context.supabase
}
