"use client"

import type React from "react"
import { useEffect } from "react"

declare global {
  interface Window {
    google: any
    googleTranslateElementInit: () => void
  }
}

export function GoogleTranslateProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check if script is already loaded
    if (document.getElementById("google-translate-script")) {
      return
    }

    // Initialize callback function
    window.googleTranslateElementInit = () => {
      console.log("Google Translate script initialized and ready!")
    }

    // Add Google Translate script
    const script = document.createElement("script")
    script.id = "google-translate-script"
    script.type = "text/javascript"
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    script.onload = () => {
      console.log("Google Translate script loaded successfully")
    }
    script.onerror = () => {
      console.error("Failed to load Google Translate script")
    }

    document.head.appendChild(script)

    // Add custom styles to hide unwanted Google Translate elements
    const addCustomStyles = () => {
      if (document.getElementById("google-translate-custom-styles")) {
        return
      }

      const style = document.createElement("style")
      style.id = "google-translate-custom-styles"
      style.textContent = `
        /* Hide Google Translate banner and branding */
        .goog-te-banner-frame,
        .goog-te-balloon-frame,
        .goog-te-ftab {
          display: none !important;
        }
        
        /* Reset body positioning */
        body {
          top: 0 !important;
          position: static !important;
        }
        
        /* Hide Google branding in widgets */
        .goog-logo-link {
          display: none !important;
        }

        /* Style the translate frame */
        .goog-te-menu-frame {
          z-index: 9999 !important;
        }
      `
      document.head.appendChild(style)
    }

    // Add styles immediately and after delays to ensure they apply
    addCustomStyles()
    setTimeout(addCustomStyles, 1000)
    setTimeout(addCustomStyles, 3000)

    return () => {
      // Cleanup on unmount
      const script = document.getElementById("google-translate-script")
      if (script) {
        script.remove()
      }
      const styles = document.getElementById("google-translate-custom-styles")
      if (styles) {
        styles.remove()
      }
    }
  }, [])

  return <>{children}</>
}
