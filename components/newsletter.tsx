"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setEmail("")
      setIsSubscribed(true)
      toast({
        title: t("newsletter.success.title"),
        description: t("newsletter.success.message"),
      })
    }, 1000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={t("newsletter.placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white"
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
            {isLoading ? (
              t("newsletter.subscribing")
            ) : (
              <>
                {t("newsletter.button")}
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <motion.div
          className="bg-green-50 text-green-700 p-4 rounded-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <p className="font-medium">{t("newsletter.success.title")}</p>
          <p className="text-sm">{t("newsletter.success.message")}</p>
        </motion.div>
      )}
    </motion.div>
  )
}
