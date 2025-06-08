"use client"

import { motion } from "framer-motion"
import { Clock, ShieldCheck, Phone } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function QuickInfoBar() {
  const { t } = useLanguage()

  const infoItems = [
    {
      icon: ShieldCheck,
      title: t("quickInfo.freeCancel"),
      description: t("quickInfo.freeCancel24h"),
    },
    {
      icon: Clock,
      title: t("quickInfo.support247"),
      description: t("quickInfo.permanentAssist"),
    },
    {
      icon: Phone,
      title: "+212 664 342 254",
      description: "info@gorentcarmarrakech.com",
    },
  ]

  return (
    <div className="bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {infoItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center py-4 px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
