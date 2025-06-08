"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { BookingForm } from "@/components/booking-form"
import { useLanguage } from "@/context/language-context"

export function Hero() {
  const { t, language } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/jemaa-el-fnaa-sunset.webp"
          alt="Jemaa el-Fnaa square in Marrakech at sunset with Koutoubia Mosque"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0">{t("hero.subtitle")}</p>

            {/* Decorative Element */}
            <div className="hidden lg:block w-24 h-2 bg-primary mb-8 rounded-full"></div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8">
              {[
                { number: "10+", text: "Years Experience" },
                { number: "50K+", text: "Happy Customers" },
                { number: "100+", text: "Premium Cars" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center lg:items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <span className="text-3xl font-bold text-primary">{stat.number}</span>
                  <span className="text-white/80 text-sm">{stat.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {language === "en" ? "Book Your Car Now" : "Réservez Votre Voiture Maintenant"}
            </h2>
            <BookingForm isHero={true} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
