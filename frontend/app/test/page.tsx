"use client"
import { createClient } from "@/lib/client"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [full_name, setUsername] = useState<string | null>(null)
  const supabase = createClient()
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) {
        console.error("Error fetching user:", error.message)
        return
      }

      if (user) {
        setUserEmail(user.email ?? null)
        setUsername(user.user_metadata?.full_name || "N/A")
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">User Info</h2>
      <p>
        <strong>Email:</strong> {userEmail}
      </p>
      <p>
        <strong>Username:</strong> {full_name}
      </p>
    </div>
  )
}
