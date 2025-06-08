"use client"

import { motion } from "framer-motion"
import { Users, Car, MapPin, Star } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function Stats() {
  const { t } = useLanguage()

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: t("stats.clients"),
      color: "bg-blue-500",
    },
    {
      icon: Car,
      value: "100+",
      label: t("stats.vehicles"),
      color: "bg-green-500",
    },
    {
      icon: MapPin,
      value: "20+",
      label: t("stats.destinations"),
      color: "bg-purple-500",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: t("stats.rating"),
      color: "bg-yellow-500",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
