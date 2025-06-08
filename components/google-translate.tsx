"use client"

import { useEffect, useState } from "react"
import { Globe, ChevronDown } from "lucide-react"

declare global {
  interface Window {
    google: any
    googleTranslateElementInit: () => void
  }
}

interface GoogleTranslateProps {
  variant?: "header" | "footer"
}

export function GoogleTranslate({ variant = "header" }: GoogleTranslateProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let attempts = 0
    const maxAttempts = 20

    const initializeGoogleTranslate = () => {
      attempts++

      // Check if Google Translate is fully loaded
      if (
        window.google &&
        window.google.translate &&
        window.google.translate.TranslateElement &&
        window.google.translate.TranslateElement.InlineLayout
      ) {
        try {
          const elementId = `google_translate_element_${variant}_${Date.now()}`

          // Create the translate element
          const translateDiv = document.createElement("div")
          translateDiv.id = elementId
          translateDiv.style.display = "inline-block"

          // Find the container
          const container = document.querySelector(`[data-translate-container="${variant}"]`)
          if (container && !container.querySelector(`#${elementId}`)) {
            container.appendChild(translateDiv)

            // Initialize the translate element
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: "en,fr,es,ar,de,it,pt,ru,zh,ja",
                layout: window.google.translate.TranslateElement.InlineLayout.DROPDOWN,
                autoDisplay: false,
                multilanguagePage: true,
              },
              elementId,
            )

            setIsLoaded(true)
            return true
          }
        } catch (error) {
          console.warn("Google Translate initialization error:", error)
        }
      }

      // If not loaded and haven't exceeded max attempts, try again
      if (attempts < maxAttempts) {
        setTimeout(initializeGoogleTranslate, 500)
      } else {
        console.warn("Google Translate failed to load after maximum attempts")
      }

      return false
    }

    // Start initialization
    const timeout = setTimeout(initializeGoogleTranslate, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [variant])

  if (variant === "header") {
    return (
      <>
        <div className="relative group">
          <div className="flex items-center text-white hover:text-primary transition-colors cursor-pointer">
            <Globe className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium mr-1">{isLoaded ? "Language" : "Loading..."}</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div
            data-translate-container="header"
            className="absolute top-full right-0 mt-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>

        <style jsx global>{`
          [data-translate-container="header"] .goog-te-gadget {
            font-family: inherit !important;
            font-size: 14px !important;
          }
          
          [data-translate-container="header"] .goog-te-combo {
            background: white !important;
            border: 1px solid #e5e7eb !important;
            border-radius: 8px !important;
            padding: 8px 12px !important;
            font-size: 14px !important;
            color: #374151 !important;
            min-width: 180px !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          }
          
          [data-translate-container="header"] .goog-te-gadget-simple {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
          
          [data-translate-container="header"] .goog-te-gadget-simple .goog-te-menu-value {
            display: none !important;
          }

          [data-translate-container="header"] .goog-te-gadget-icon {
            display: none !important;
          }
        `}</style>
      </>
    )
  }

  return null
}
