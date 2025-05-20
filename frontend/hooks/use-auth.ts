"use client"

import { useState, useEffect } from "react"
import { getSupabaseBrowserClient } from "@/toolbar/supabase"
import type { User as SupabaseUser, Session } from "@supabase/supabase-js"
import type { User } from "@/types"
import { useRouter } from "next/navigation"

interface AuthFormData {
  email?: string
  password?: string
  full_name?: string
  role?: string
}

export function useAuth() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Function to safely fetch user data without causing recursion
  const fetchUserData = async (userId: string) => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single()

      if (error) {
        console.error("Error fetching user data:", error.message)
        return null
      }

      return data as User
    } catch (error: any) {
      console.error("Unexpected error fetching user data:", error.message)
      return null
    }
  }

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
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
          // Fetch user data with a delay to avoid potential race conditions
          setTimeout(async () => {
            const userData = await fetchUserData(session.user.id)
            if (userData && isMounted) {
              setUserData(userData)
            }
            if (isMounted) setLoading(false)
          }, 100)
        } else if (isMounted) {
          setLoading(false)
        }
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
        // Fetch user data with a delay to avoid potential race conditions
        setTimeout(async () => {
          const userData = await fetchUserData(session.user.id)
          if (userData && isMounted) {
            setUserData(userData)
          }
          if (isMounted) setLoading(false)
          router.refresh()
        }, 100)
      } else if (isMounted) {
        setUserData(null)
        setLoading(false)
        router.refresh()
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [router])

  const signUp = async ({
    email,
    password,
    full_name,
    role = "client",
  }: AuthFormData) => {
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    const supabase = getSupabaseBrowserClient()

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

  const signIn = async ({ email, password }: AuthFormData) => {
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    const supabase = getSupabaseBrowserClient()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // Don't try to fetch user data here to avoid potential recursion
      // The onAuthStateChange listener will handle fetching user data

      return data
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    }
  }

  const signOut = async () => {
    const supabase = getSupabaseBrowserClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Error signing out:", error.message)
      throw error
    }

    router.push("/auth/login")
  }

  const updateUserData = async (updates: Partial<User>) => {
    if (!user) return null

    const supabase = getSupabaseBrowserClient()

    try {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single()

      if (error) {
        console.error("Error updating user data:", error.message)
        throw error
      }

      setUserData(data as User)
      return data
    } catch (error) {
      console.error("Unexpected error updating user data:", error)
      throw error
    }
  }

  return {
    user,
    userData,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateUserData,
  }
}
