"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { MoroccanDivider } from "@/components/moroccan-divider"

export function Destinations() {
  const { t } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const destinations = [
    {
      name: t("destinations.items.medina"),
      image: "/marrakech-medina-markets.png",
      distance: t("destinations.distance.cityCenter"),
    },
    {
      name: t("destinations.items.atlas"),
      image: "/atlas-mountains-snow.png",
      distance: t("destinations.distance.oneHalfHour"),
    },
    {
      name: t("destinations.items.essaouira"),
      image: "/essaouira-blue-boats.png",
      distance: t("destinations.distance.twoHalfHours"),
    },
    {
      name: t("destinations.items.sahara"),
      image: "/placeholder-6a6lt.png",
      distance: t("destinations.distance.eightHours"),
    },
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <MoroccanDivider color="#117485" flip={true} className="-mt-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1 text-sm hover:bg-primary/20">
            {t("destinations.badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("destinations.title")}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("destinations.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                <div className="flex items-center text-white/80 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{destination.distance}</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                    Discover
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-colors group"
          >
            {t("destinations.viewAll")}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <MoroccanDivider color="#FE9305" className="-mb-1 mt-20" />
    </section>
  )
}
