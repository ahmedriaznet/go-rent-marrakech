"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Car, Users, Fuel, Wind, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"

interface CarCardProps {
  id: number
  name: string
  image: string
  price: number
  transmission: string
  seats: number
  category: string
  fuel?: string
  ac?: boolean
  popular?: boolean
}

export function CarCard({ id, name, image, price, transmission, seats, category, fuel, ac, popular }: CarCardProps) {
  const { t, language } = useLanguage()

  return (
    <div className="group h-full">
      {/* Card with 3D effect on hover */}
      <motion.div
        className="bg-white rounded-2xl overflow-hidden h-full flex flex-col relative border border-gray-100"
        whileHover={{
          y: -10,
          x: -5,
          rotateY: 5,
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Popular ribbon */}
        {popular && (
          <div className="absolute top-5 right-0 z-10">
            <div className="bg-primary text-white font-bold py-1 px-4 text-sm shadow-lg relative">
              {language === "en" ? "POPULAR CHOICE" : "CHOIX POPULAIRE"}
              <div className="absolute top-0 -left-3 h-0 w-0 border-t-[12px] border-r-[12px] border-b-[12px] border-transparent border-r-primary"></div>
            </div>
          </div>
        )}

        {/* Image section */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105 p-4"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Category badge */}
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-white/90 backdrop-blur-sm text-primary font-medium px-3 py-1 shadow-md">
              {category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{name}</h3>

          {/* Price tag */}
          <div className="mb-4 inline-block">
            <div className="bg-primary/10 rounded-lg px-3 py-1.5 inline-flex items-center">
              <span className="text-2xl font-bold text-primary">{price}€</span>
              <span className="text-gray-600 text-sm ml-1">/{language === "en" ? "day" : "jour"}</span>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-4">
            <div className="flex items-center text-gray-700 text-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                <Car className="w-4 h-4 text-primary" />
              </div>
              <span>{transmission}</span>
            </div>

            <div className="flex items-center text-gray-700 text-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span>
                {seats} {t("fleet.seats")}
              </span>
            </div>

            {fuel && (
              <div className="flex items-center text-gray-700 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                  <Fuel className="w-4 h-4 text-primary" />
                </div>
                <span>{fuel}</span>
              </div>
            )}

            {ac && (
              <div className="flex items-center text-gray-700 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                  <Wind className="w-4 h-4 text-primary" />
                </div>
                <span>{t("fleet.climate")}</span>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-5 pb-5">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
            <Link href={`/cars/${id}`} className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl shadow-lg group">
                {t("fleet.bookNow")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
