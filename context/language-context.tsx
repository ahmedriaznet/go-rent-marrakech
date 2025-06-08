"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { en } from "@/translations/en"
import { fr } from "@/translations/fr"
import { es } from "@/translations/es"
import { ar } from "@/translations/ar"

type Language = "en" | "fr" | "es" | "ar"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en,
  fr,
  es,
  ar,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check if there's a saved language preference in localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "fr", "es", "ar"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      if (["en", "fr", "es", "ar"].includes(browserLang)) {
        setLanguage(browserLang as Language)
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)

      // Set HTML dir attribute for RTL languages
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

      // Set HTML lang attribute
      document.documentElement.lang = language
    }
  }, [language, mounted])

  const t = (key: string): string => {
    // Split the key by dots to access nested properties
    const keys = key.split(".")
    let value: any = translations[language]

    // Navigate through the nested properties
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // If key not found, return the key itself or fallback to English
        value = getValueFromFallback(keys) || key
        break
      }
    }

    return typeof value === "string" ? value : key
  }

  // Fallback to English if translation is missing
  const getValueFromFallback = (keys: string[]): string | undefined => {
    let value: any = translations.en
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return undefined
      }
    }
    return typeof value === "string" ? value : undefined
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
