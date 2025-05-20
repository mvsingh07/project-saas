"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useTranslation } from "react-i18next"

interface LanguageContextType {
  language: string
  changeLanguage: (lang: string) => void
  availableLanguages: { code: string; name: string; nativeName: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Define available languages outside the component to prevent recreating on each render
const availableLanguages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
]

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(i18n.language || "en")

  // Initialize language only once on mount
  useEffect(() => {
    // Check for stored language preference
    const storedLanguage = localStorage.getItem("preferredLanguage")

    if (storedLanguage) {
      // Only change if different from current
      if (i18n.language !== storedLanguage) {
        i18n.changeLanguage(storedLanguage)
      }
      setLanguage(storedLanguage)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0]
      const supportedLang = availableLanguages.find((lang) => lang.code === browserLang)

      if (supportedLang && i18n.language !== supportedLang.code) {
        i18n.changeLanguage(supportedLang.code)
        setLanguage(supportedLang.code)
      }
    }

    // Update HTML lang attribute
    document.documentElement.lang = i18n.language
  }, []) // Empty dependency array - only run once on mount

  // Listen for language changes from i18n
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      if (lng !== language) {
        setLanguage(lng)
        document.documentElement.lang = lng
      }
    }

    i18n.on("languageChanged", handleLanguageChanged)

    return () => {
      i18n.off("languageChanged", handleLanguageChanged)
    }
  }, [i18n, language])

  const changeLanguage = (lang: string) => {
    // Only change if different from current
    if (lang !== language) {
      try {
        i18n.changeLanguage(lang)
        localStorage.setItem("preferredLanguage", lang)
        // Note: We don't need to call setLanguage here as it will be triggered by the languageChanged event
      } catch (error) {
        console.error("Failed to change language:", error)
      }
    }
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
