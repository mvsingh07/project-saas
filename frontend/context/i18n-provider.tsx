"use client"

import { type ReactNode, useEffect, useState } from "react"
import i18n from "i18next"
import { initReactI18next, I18nextProvider } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import { resources } from "@/toolbar/i18n"

interface I18nProviderProps {
  children: ReactNode
}

// Initialize i18n outside of component to prevent re-initialization
if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      debug: process.env.NODE_ENV === "development",
      interpolation: {
        escapeValue: false,
      },
    })
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(i18n.isInitialized)

  useEffect(() => {
    if (!isInitialized && i18n.isInitialized) {
      setIsInitialized(true)
    }
  }, [isInitialized])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
