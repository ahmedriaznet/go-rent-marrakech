import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/context/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Go Rent Car Marrakech - Premium Car Rental Service",
  description:
    "Explore Marrakech and Morocco with our premium car rental service. Choose from our wide selection of vehicles for your perfect Moroccan adventure.",
  openGraph: {
    title: "Go Rent Car Marrakech - Premium Car Rental Service",
    description: "Explore Marrakech and Morocco with our premium car rental service.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png", // Updated to point to the new favicon
    // You can also add other icon types if needed:
    // apple: "/apple-icon.png",
    // shortcut: "/favicon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <Navbar />
            <div className="pt-10">{children}</div>
            <Footer />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
