"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  name: string
  location: string
  rating: number
  review: string
  image?: string
}

export function TestimonialCard({ name, location, rating, review, image }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-lg relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-6 right-8 text-primary/10">
        <Quote className="w-24 h-24" />
      </div>

      <div className="flex items-center mb-6 relative z-10">
        <div className="mr-4">
          {image ? (
            <div className="w-16 h-16 rounded-full overflow-hidden relative">
              <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              <span className="font-semibold text-white text-xl">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-lg">{name}</h4>
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
      </div>

      <div className="flex items-center mb-4 relative z-10">
        <div className="flex text-yellow-400 mr-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < rating ? "fill-current" : ""}`} />
          ))}
        </div>
        <span className="text-gray-600">{rating}.0</span>
      </div>

      <p className="text-gray-700 italic relative z-10">"{review}"</p>
    </motion.div>
  )
}
