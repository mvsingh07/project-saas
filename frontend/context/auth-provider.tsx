"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import { useSupabase } from "@/context/supabase-provider"
import type { User as SupabaseUser, Session } from "@supabase/supabase-js"
import type { User } from "@/types"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: SupabaseUser | null
  userData: User | null
  session: Session | null
  loading: boolean
  signUp: (data: {
    email: string
    password: string
    full_name?: string
    role?: string
  }) => Promise<any>
  signIn: (data: { email: string; password: string }) => Promise<any>
  signOut: () => Promise<void>
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Export the auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useSupabase()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let isMounted = true

    // Get the current session
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error.message)
          if (isMounted) setLoading(false)
          return
        }

        if (isMounted) {
          setSession(session)
          setUser(session?.user ?? null)
        }

        if (session?.user && isMounted) {
          try {
            const { data, error: userError } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single()

            if (userError) {
              console.error("Error fetching user data:", userError.message)
            } else if (isMounted) {
              setUserData(data as User)
            }
          } catch (error) {
            console.error("Error in user data fetch:", error)
          }
        }

        if (isMounted) setLoading(false)
      } catch (error) {
        console.error("Unexpected error in getSession:", error)
        if (isMounted) setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (isMounted) {
        setSession(session)
        setUser(session?.user ?? null)
      }

      if (session?.user && isMounted) {
        try {
          const { data, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (userError) {
            console.error("Error fetching user data:", userError.message)
          } else if (isMounted) {
            setUserData(data as User)
          }
        } catch (error) {
          console.error("Error in user data fetch:", error)
        }
      } else if (isMounted) {
        setUserData(null)
      }

      if (isMounted) setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signUp = async ({
    email,
    password,
    full_name,
    role = "client",
  }: {
    email: string
    password: string
    full_name?: string
    role?: string
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          role,
        },
      },
    })

    if (error) {
      throw error
    }

    return data
  }

  const signIn = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Error signing out:", error.message)
      throw error
    }

    router.push("/login")
  }

  const value = {
    user,
    userData,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Export the useAuth hook that uses the context
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
