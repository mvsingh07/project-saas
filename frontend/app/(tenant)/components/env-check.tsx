"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

export function EnvironmentCheck() {
  const { t } = useTranslation()
  const [hasSupabaseUrl, setHasSupabaseUrl] = useState<boolean | null>(null)
  const [hasSupabaseKey, setHasSupabaseKey] = useState<boolean | null>(null)

  useEffect(() => {
    setHasSupabaseUrl(!!process.env.NEXT_PUBLIC_SUPABASE_URL!)
    setHasSupabaseKey(!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  }, [])

  if (hasSupabaseUrl === null || hasSupabaseKey === null) {
    return null
  }

  if (hasSupabaseUrl && hasSupabaseKey) {
    return null
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{t("ui.error", "Environment Variables Missing")}</AlertTitle>
      <AlertDescription>
        {!hasSupabaseUrl && (
          <div>
            {t("env.missingSupabaseUrl", "NEXT_PUBLIC_SUPABASE_URL is missing")}
          </div>
        )}
        {!hasSupabaseKey && (
          <div>
            {t(
              "env.missingSupabaseKey",
              "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing"
            )}
          </div>
        )}
      </AlertDescription>
    </Alert>
  )
}
