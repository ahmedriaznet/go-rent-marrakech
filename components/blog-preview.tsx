"use client"

import { motion } from "framer-motion"
import { BlogCard } from "@/components/blog-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function BlogPreview() {
  const { t } = useLanguage()

  const blogPosts = [
    {
      title: t("blog.items.top10.title"),
      excerpt: t("blog.items.top10.excerpt"),
      image: "/marrakech-medina-markets.png",
      date: t("blog.items.top10.date"),
      slug: "top-10-places-to-visit-in-marrakech",
    },
    {
      title: t("blog.items.roadTrip.title"),
      excerpt: t("blog.items.roadTrip.excerpt"),
      image: "/essaouira-coastal-road.png",
      date: t("blog.items.roadTrip.date"),
      slug: "road-trip-guide-marrakech-to-essaouira",
    },
    {
      title: t("blog.items.drivingTips.title"),
      excerpt: t("blog.items.drivingTips.excerpt"),
      image: "/morocco-mountain-road.png",
      date: t("blog.items.drivingTips.date"),
      slug: "driving-in-morocco-tips-and-advice",
    },
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1 text-sm hover:bg-primary/20">
            {t("blog.badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("blog.title")}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("blog.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BlogCard {...post} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-colors group"
          >
            {t("blog.readMore")}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
