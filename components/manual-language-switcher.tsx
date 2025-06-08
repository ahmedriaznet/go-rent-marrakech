"use client"

import { useEffect, useState } from "react"
import { Globe } from "lucide-react"

declare global {
  interface Window {
    google: any
    googleTranslateElementInit: () => void
  }
}

export function ManualLanguageSwitcher() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Create the translate element when component mounts
    const initializeTranslate = () => {
      console.log("Trying to initialize Google Translate widget...")

      if (!window.google) {
        console.log("Google object not found, retrying in 1 second...")
        setError("Google Translate not loaded yet")
        setTimeout(initializeTranslate, 1000)
        return
      }

      if (!window.google.translate) {
        console.log("Google Translate not found, retrying in 1 second...")
        setError("Google Translate API not ready")
        setTimeout(initializeTranslate, 1000)
        return
      }

      if (!window.google.translate.TranslateElement) {
        console.log("TranslateElement not found, retrying in 1 second...")
        setError("TranslateElement not available")
        setTimeout(initializeTranslate, 1000)
        return
      }

      // Remove any existing translate element
      const existing = document.getElementById("footer-translate-element")
      if (existing) {
        existing.innerHTML = ""
      }

      try {
        console.log("Creating Google Translate widget...")
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fr",
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: true,
            gaTrack: false,
          },
          "footer-translate-element",
        )
        console.log("Footer Google Translate widget created successfully")
        setIsLoading(false)
        setError(null)
      } catch (error) {
        console.error("Error creating footer translate widget:", error)
        setError("Error creating widget: " + (error instanceof Error ? error.message : String(error)))
      }
    }

    // Wait a bit for Google Translate to load, then initialize
    const timer = setTimeout(initializeTranslate, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
      <h4 className="font-medium mb-3 flex items-center text-white">
        <Globe className="w-5 h-5 mr-2 text-primary" />
        Select Language
      </h4>

      {/* Debug info */}
      {isLoading && <div className="text-white text-xs mb-2 bg-black/30 p-2 rounded">Loading Google Translate...</div>}

      {error && <div className="text-red-300 text-xs mb-2 bg-red-900/30 p-2 rounded">Error: {error}</div>}

      {/* Container for the Google Translate widget */}
      <div className="flex justify-center">
        <div
          id="footer-translate-element"
          className="google-translate-footer bg-white/20 p-2 rounded-md min-h-[40px] w-full flex items-center justify-center"
        >
          {isLoading ? "Loading..." : ""}
        </div>
      </div>

      <style jsx global>{`
        /* Google Translate Widget Styling */
        .google-translate-footer .goog-te-gadget {
          color: white !important;
          font-family: inherit !important;
          font-size: 14px !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .google-translate-footer .goog-te-gadget-simple {
          background-color: rgba(255, 255, 255, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          width: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .google-translate-footer .goog-te-gadget-simple .goog-te-menu-value {
          color: white !important;
          text-decoration: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
        }
        
        .google-translate-footer .goog-te-gadget-simple .goog-te-menu-value span {
          color: white !important;
          font-size: 14px !important;
          font-weight: 500 !important;
        }
        
        .google-translate-footer .goog-te-gadget-icon {
          display: none !important;
        }
        
        .google-translate-footer .goog-te-gadget-simple:hover {
          background-color: rgba(255, 255, 255, 0.3) !important;
        }
        
        /* Fix for Google Translate dropdown */
        .goog-te-menu-frame {
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2) !important;
          border-radius: 8px !important;
          overflow: hidden !important;
        }
      `}</style>
    </div>
  )
}
