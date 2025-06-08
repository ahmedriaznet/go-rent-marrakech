"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  title: string
  excerpt: string
  image: string
  date: string
  slug: string
  category?: string
  readTime?: string
}

export function BlogCard({ title, excerpt, image, date, slug, category, readTime }: BlogCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {category && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-secondary/80 text-white">{category}</Badge>
          </div>
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{date}</span>
          </div>

          {readTime && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{readTime}</span>
            </div>
          )}
        </div>

        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        <Link href={`/blog/${slug}`} className="inline-flex items-center text-primary font-medium mt-auto">
          Read More
          <motion.div className="ml-2" initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}
