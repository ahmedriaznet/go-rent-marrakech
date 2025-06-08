"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/context/language-context"
import { ChevronDown, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  variant?: "navbar" | "footer"
}

export function LanguageSwitcher({ variant = "navbar" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ar", name: "العربية", flag: "🇲🇦" },
  ]

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as "en" | "fr" | "es" | "ar")
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (variant === "navbar") {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center text-white hover:text-primary transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Globe className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium mr-1">
            {languages.find((lang) => lang.code === language)?.name || "Language"}
          </span>
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen ? "rotate-180" : "")} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100",
                    language === lang.code ? "bg-gray-50 text-primary font-medium" : "text-gray-700",
                  )}
                  role="menuitem"
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Footer variant
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
      <h4 className="font-medium mb-3 flex items-center text-white">
        <Globe className="w-5 h-5 mr-2 text-primary" />
        Select Language
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              "px-3 py-2 text-sm rounded-md transition-all flex items-center justify-center",
              language === lang.code
                ? "bg-primary text-white shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/10",
            )}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  )
}
