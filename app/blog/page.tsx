"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoroccanPattern } from "@/components/moroccan-pattern"
import { MoroccanDivider } from "@/components/moroccan-divider"
import { BlogCard } from "@/components/blog-card"
import { Calendar, ChevronRight, ChevronLeft, ArrowRight, Search } from "lucide-react"
import React from "react"
import { useLanguage } from "@/context/language-context"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Sample blog posts data
// const blogPosts = [
//   {
//     id: 2,
//     title: "Road Trip Guide: Marrakech to Essaouira",
//     slug: "road-trip-essaouira",
//     excerpt:
//       "Plan the perfect coastal road trip from Marrakech to the charming seaside town of Essaouira with our detailed guide.",
//     image: "/marrakech-essaouira-coastal-road.png",
//     date: "April 22, 2023",
//     author: "Sarah Johnson",
//     authorImage: "/woman-profile.png",
//     category: "Road Trips",
//     readTime: "7 min read",
//     featured: true,
//   },
//   {
//     id: 6,
//     title: "Professional and reliable car rental in Marrakech",
//     slug: "professional-reliable-car-rental",
//     excerpt:
//       "Go Rent offers a car rental service in Marrakech that combines professionalism, reliability, and competitive prices.",
//     image: "/Professional and reliable car rental in Marrakech.jpg",
//     date: "May 15, 2023",
//     author: "Mohammed Alami",
//     authorImage: "/middle-eastern-man.png",
//     category: "Services",
//     readTime: "5 min read",
//     featured: false,
//   },
//   {
//     id: 7,
//     title: "Automatic car rental in Marrakech",
//     slug: "automatic-car-rental",
//     excerpt: "Do you prefer simplicity and driving comfort? Choose an automatic car rental in Marrakech with Go Rent.",
//     image: "/Automatic car rental in Marrakech.jpg",
//     date: "April 22, 2023",
//     author: "Sarah Johnson",
//     authorImage: "/woman-profile.png",
//     category: "Vehicles",
//     readTime: "3 min read",
//     featured: false,
//   },
//   {
//     id: 8,
//     title: "Manual car rental in Marrakech",
//     slug: "manual-car-rental",
//     excerpt:
//       "Looking for a manual car rental in Marrakech? Manual transmission cars provide better fuel efficiency and more control.",
//     image: "/Manual car rental in Marrakech.jpg",
//     date: "April 10, 2023",
//     author: "Ahmed Hassan",
//     authorImage: "/thoughtful-man.png",
//     category: "Vehicles",
//     readTime: "4 min read",
//     featured: false,
//   },
//   {
//     id: 9,
//     title: "Cheap car rental in Marrakech",
//     slug: "cheap-car-rental",
//     excerpt:
//       "Our agency offers a wide selection of economy vehicles and SUVs, available at Marrakech Airport and in the city center.",
//     image: "/Cheap car rental in Marrakech.jpg",
//     date: "March 18, 2023",
//     author: "Fatima Zahra",
//     authorImage: "/diverse-woman-portrait.png",
//     category: "Offers",
//     readTime: "3 min read",
//     featured: false,
//   },
//   {
//     id: 10,
//     title: "Car rental in Marrakech with Go Rent",
//     slug: "car-rental-go-rent",
//     excerpt:
//       "Your journey begins here. For your travels in Morocco, trust Go Rent, your car rental specialist in Marrakech.",
//     image: "/marrakech-medina-markets-new.png",
//     date: "March 5, 2023",
//     author: "Mohammed Alami",
//     authorImage: "/middle-eastern-man.png",
//     category: "Services",
//     readTime: "5 min read",
//     featured: false,
//   },
//   {
//     id: 11,
//     title: "5 Scenic Routes Around Marrakech for Day Trips",
//     slug: "scenic-routes-marrakech",
//     excerpt:
//       "Discover the most beautiful driving routes around Marrakech that make for perfect day trips with your rental car.",
//     image: "/5 Scenic Routes Around Marrakech for Day Trips.jpg",
//     date: "July 25, 2022",
//     author: "Mohammed Alami",
//     authorImage: "/middle-eastern-man.png",
//     category: "Road Trips",
//     readTime: "6 min read",
//     featured: false,
//   },
//   {
//     id: 22,
//     title: "Car Rental Insurance in Morocco: What You Need to Know",
//     slug: "car-rental-insurance-morocco",
//     excerpt:
//       "Understand the essential insurance options for car rentals in Morocco to protect yourself and your vehicle during your travels.",
//     image: "/Car Rental Insurance in Morocco_ What You Need to Know.jpg",
//     date: "September 20, 2022",
//     author: "Karim El Fassi",
//     authorImage: "/diverse-businessman.png",
//     category: "Insurance",
//     readTime: "6 min read",
//     featured: false,
//   },
//   {
//     id: 23,
//     title: "Sustainable car rental options in Marrakech",
//     slug: "sustainable-car-rental-marrakech",
//     excerpt:
//       "Explore eco-friendly car rental options in Marrakech and learn how to minimize your environmental impact while traveling in Morocco.",
//     image: "/Eco-Friendly Car Rental Options in Morocco.jpg",
//     date: "August 10, 2022",
//     author: "Amina El Khattabi",
//     authorImage: "/diverse-woman-portrait.png",
//     category: "Sustainability",
//     readTime: "5 min read",
//     featured: false,
//   },
//   {
//     id: 24,
//     title: "Driving etiquette in Morocco",
//     slug: "driving-etiquette-morocco",
//     excerpt:
//       "Learn the unwritten rules of the road and cultural driving customs to navigate Morocco safely and respectfully.",
//     image: "/Driving Through Moroccan Villages_ Cultural Etiquette.jpg",
//     date: "July 5, 2022",
//     author: "Hassan El Amrani",
//     authorImage: "/diverse-businessman.png",
//     category: "Cultural Tips",
//     readTime: "5 min read",
//     featured: false,
//   },
//   {
//     id: 25,
//     title: "What to pack for a Morocco road trip",
//     slug: "what-to-pack-morocco-road-trip",
//     excerpt:
//       "Essential packing guide for your Morocco road trip, including must-have items for safety, comfort, and cultural respect.",
//     image: "/Road Trip Essentials_ What to Pack for Moroccan Adventures.jpg",
//     date: "June 20, 2022",
//     author: "Leila Benali",
//     authorImage: "/diverse-woman-portrait.png",
//     category: "Travel Preparation",
//     readTime: "6 min read",
//     featured: false,
//   },
//   {
//     id: 26,
//     title: "Driving from Marrakech to the Sahara Desert",
//     slug: "driving-marrakech-sahara",
//     excerpt:
//       "Complete guide to driving from Marrakech to the Sahara Desert, including route options, stops, and essential preparation tips.",
//     image: "/Desert Adventures_ Driving to the Sahara.jpg",
//     date: "May 30, 2022",
//     author: "Youssef Kadmiri",
//     authorImage: "/diverse-businessman.png",
//     category: "Desert Adventures",
//     readTime: "7 min read",
//     featured: false,
//   },
// ]

// Categories for filtering - update to reflect only the remaining posts
// const categories = [
//   { name: "All", count: blogPosts.length },
//   { name: "Road Trips", count: blogPosts.filter((post) => post.category === "Road Trips").length },
//   { name: "Services", count: blogPosts.filter((post) => post.category === "Services").length },
//   { name: "Vehicles", count: blogPosts.filter((post) => post.category === "Vehicles").length },
//   { name: "Offers", count: blogPosts.filter((post) => post.category === "Offers").length },
//   { name: "Insurance", count: blogPosts.filter((post) => post.category === "Insurance").length },
//   { name: "Sustainability", count: blogPosts.filter((post) => post.category === "Sustainability").length },
//   { name: "Cultural Tips", count: blogPosts.filter((post) => post.category === "Cultural Tips").length },
//   { name: "Travel Preparation", count: blogPosts.filter((post) => post.category === "Travel Preparation").length },
//   { name: "Desert Adventures", count: blogPosts.filter((post) => post.category === "Desert Adventures").length },
// ]

export default function BlogPage() {
  const { t, language } = useLanguage()
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  const [key, setKey] = useState(0) // Force re-render key

  useEffect(() => {
    setKey((k) => k + 1)
  }, [language])

  // Get translated blog posts
  const getBlogPosts = () => {
    const posts = [
      {
        id: 2,
        title: t("blog.posts.road-trip-essaouira.title"),
        slug: "road-trip-essaouira",
        excerpt: t("blog.posts.road-trip-essaouira.excerpt"),
        image: "/marrakech-essaouira-coastal-road.png",
        date: language === "fr" ? "22 avril 2023" : "April 22, 2023",
        author: t("blog.posts.road-trip-essaouira.author"),
        authorImage: "/diverse-woman-portrait.png", // Assuming author images are not translated
        category: t("blog.categories.Road Trips"),
        readTime: t("blog.posts.road-trip-essaouira.readTime"),
        featured: true,
      },
      {
        id: 6,
        title: t("blog.posts.professional-reliable-car-rental.title"),
        slug: "professional-reliable-car-rental",
        excerpt: t("blog.posts.professional-reliable-car-rental.excerpt"),
        image: "/Professional and reliable car rental in Marrakech.jpg",
        date: language === "fr" ? "15 mai 2023" : "May 15, 2023",
        author: t("blog.posts.professional-reliable-car-rental.author"),
        authorImage: "/middle-eastern-man.png",
        category: t("blog.categories.Services"),
        readTime: t("blog.posts.professional-reliable-car-rental.readTime"),
        featured: false,
      },
      {
        id: 7,
        title: t("blog.posts.automatic-car-rental.title"),
        slug: "automatic-car-rental",
        excerpt: t("blog.posts.automatic-car-rental.excerpt"),
        image: "/Automatic car rental in Marrakech.jpg",
        date: language === "fr" ? "22 avril 2023" : "April 22, 2023",
        author: t("blog.posts.automatic-car-rental.author"), // Use t()
        authorImage: "/woman-profile.png",
        category: t("blog.categories.Vehicles"),
        readTime: t("blog.posts.automatic-car-rental.readTime"), // Use t()
        featured: false,
      },
      {
        id: 8,
        title: t("blog.posts.manual-car-rental.title"),
        slug: "manual-car-rental",
        excerpt: t("blog.posts.manual-car-rental.excerpt"),
        image: "/Manual car rental in Marrakech.jpg",
        date: language === "fr" ? "10 avril 2023" : "April 10, 2023",
        author: t("blog.posts.manual-car-rental.author"), // Use t()
        authorImage: "/thoughtful-man.png",
        category: t("blog.categories.Vehicles"),
        readTime: t("blog.posts.manual-car-rental.readTime"), // Use t()
        featured: false,
      },
      {
        id: 9,
        title: t("blog.posts.cheap-car-rental.title"),
        slug: "cheap-car-rental",
        excerpt: t("blog.posts.cheap-car-rental.excerpt"),
        image: "/Cheap car rental in Marrakech.jpg",
        date: language === "fr" ? "18 mars 2023" : "March 18, 2023",
        author: t("blog.posts.cheap-car-rental.author"), // Use t()
        authorImage: "/diverse-woman-portrait.png",
        category: t("blog.categories.Offers"),
        readTime: t("blog.posts.cheap-car-rental.readTime"), // Use t()
        featured: false,
      },
      {
        id: 10,
        title: t("blog.posts.car-rental-go-rent.title"),
        slug: "car-rental-go-rent",
        excerpt: t("blog.posts.car-rental-go-rent.excerpt"),
        image: "/marrakech-medina-markets-new.png",
        date: language === "fr" ? "5 mars 2023" : "March 5, 2023",
        author: t("blog.posts.car-rental-go-rent.author"), // Use t()
        authorImage: "/middle-eastern-man.png",
        category: t("blog.categories.Services"),
        readTime: t("blog.posts.car-rental-go-rent.readTime"), // Use t()
        featured: false,
      },
      {
        id: 11,
        title: t("blog.posts.scenic-routes-marrakech.title"),
        slug: "scenic-routes-marrakech",
        excerpt: t("blog.posts.scenic-routes-marrakech.excerpt"),
        image: "/5 Scenic Routes Around Marrakech for Day Trips.jpg",
        date: language === "fr" ? "25 juillet 2022" : "July 25, 2022",
        author: t("blog.posts.scenic-routes-marrakech.author"), // Use t()
        authorImage: "/middle-eastern-man.png",
        category: t("blog.categories.Road Trips"),
        readTime: t("blog.posts.scenic-routes-marrakech.readTime"), // Use t()
        featured: false,
      },
      {
        id: 22,
        title: t("blog.posts.car-rental-insurance-morocco.title"),
        slug: "car-rental-insurance-morocco",
        excerpt: t("blog.posts.car-rental-insurance-morocco.excerpt"),
        image: "/Car Rental Insurance in Morocco_ What You Need to Know.jpg",
        date: language === "fr" ? "20 septembre 2022" : "September 20, 2022",
        author: t("blog.posts.car-rental-insurance-morocco.author"), // Use t()
        authorImage: "/diverse-businessman.png",
        category: t("blog.categories.Insurance"),
        readTime: t("blog.posts.car-rental-insurance-morocco.readTime"), // Use t()
        featured: false,
      },
      {
        id: 23,
        title: t("blog.posts.sustainable-car-rental-marrakech.title"),
        slug: "sustainable-car-rental-marrakech",
        excerpt: t("blog.posts.sustainable-car-rental-marrakech.excerpt"),
        image: "/Eco-Friendly Car Rental Options in Morocco.jpg",
        date: language === "fr" ? "10 août 2022" : "August 10, 2022",
        author: t("blog.posts.sustainable-car-rental-marrakech.author"), // Use t()
        authorImage: "/diverse-woman-portrait.png",
        category: t("blog.categories.Sustainability"),
        readTime: t("blog.posts.sustainable-car-rental-marrakech.readTime"), // Use t()
        featured: false,
      },
      {
        id: 24,
        title: t("blog.posts.driving-etiquette-morocco.title"),
        slug: "driving-etiquette-morocco",
        excerpt: t("blog.posts.driving-etiquette-morocco.excerpt"),
        image: "/Driving Through Moroccan Villages_ Cultural Etiquette.jpg",
        date: language === "fr" ? "5 juillet 2022" : "July 5, 2022",
        author: t("blog.posts.driving-etiquette-morocco.author"), // Use t()
        authorImage: "/diverse-businessman.png",
        category: t("blog.categories.Cultural Tips"),
        readTime: t("blog.posts.driving-etiquette-morocco.readTime"),
        featured: false,
      },
      {
        id: 25,
        title: t("blog.posts.what-to-pack-morocco-road-trip.title"),
        slug: "what-to-pack-morocco-road-trip",
        excerpt: t("blog.posts.what-to-pack-morocco-road-trip.excerpt"),
        image: "/Road Trip Essentials_ What to Pack for Moroccan Adventures.jpg",
        date: language === "fr" ? "20 juin 2022" : "June 20, 2022",
        author: t("blog.posts.what-to-pack-morocco-road-trip.author"), // Use t()
        authorImage: "/diverse-woman-portrait.png",
        category: t("blog.categories.Travel Preparation"),
        readTime: t("blog.posts.what-to-pack-morocco-road-trip.readTime"), // Use t()
        featured: false,
      },
      {
        id: 26,
        title: t("blog.posts.driving-marrakech-sahara.title"),
        slug: "driving-marrakech-sahara",
        excerpt: t("blog.posts.driving-marrakech-sahara.excerpt"),
        image: "/Desert Adventures_ Driving to the Sahara.jpg",
        date: language === "fr" ? "30 mai 2022" : "May 30, 2022",
        author: t("blog.posts.driving-marrakech-sahara.author"), // Use t()
        authorImage: "/diverse-businessman.png",
        category: t("blog.categories.Desert Adventures"),
        readTime: t("blog.posts.driving-marrakech-sahara.readTime"),
        featured: false,
      },
    ]
    return posts
  }

  const blogPosts = getBlogPosts()

  // Categories for filtering - update to reflect only the remaining posts
  const categories = [
    { name: t("blog.categories.All") || "All", count: blogPosts.length }, // Add "All" to blog.categories if not present
    {
      name: t("blog.categories.Road Trips"),
      count: blogPosts.filter((post) => post.category === t("blog.categories.Road Trips")).length,
    },
    {
      name: t("blog.categories.Services"),
      count: blogPosts.filter((post) => post.category === t("blog.categories.Services")).length,
    },
    {
      name: t("blog.categories.Vehicles"),
      count: blogPosts.filter((post) => post.category === t("blog.categories.Vehicles")).length,
    },
    {
      name: t("blog.categories.Offers"),
      count: blogPosts.filter((post) => post.category === t("blog.categories.Offers")).length,
    },
    {
      name: t("blog.categories.Insurance"),
      count: blogPosts.filter((post) => post.category === t("blog.categories.Insurance")).length,
    },
    {
      name: t("blog.categories.Sustainability"),
      count: blogPosts.filter((post) => post.category === t("blog.categories.Sustainability")).length,
    },
    {
      name: t("blog.categories.Cultural Tips"),
      count: blogPosts.filter((post) => post.category === t("blog.categories.Cultural Tips")).length,
    },
    {
      name: t("blog.categories.Travel Preparation"),
      count: blogPosts.filter((post) => post.category === t("blog.categories.Travel Preparation")).length,
    },
    {
      name: t("blog.categories.Desert Adventures"),
      count: blogPosts.filter((post) => post.category === t("blog.categories.Desert Adventures")).length,
    },
  ]

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [currentPage])

  // Parallax effect for hero section
  const y = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  // Filter posts based on search term and category
  const filteredPosts = blogPosts

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  // Get current posts for the page
  let currentPosts = []

  // If we're on page 1 and showing the featured post, adjust the slice
  if (currentPage === 1 && activeCategory === "All") {
    // On page 1 with featured post, show 5 regular posts (since featured post takes one spot)
    currentPosts = filteredPosts.slice(1, postsPerPage)
  } else {
    // On other pages or when filtering, show the regular number of posts
    currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  }

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Featured post is the first one
  const featuredPost = blogPosts.find((post) => post.featured) || blogPosts[0]

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    setKey((prev) => prev + 1) // Force re-render
  }

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setCurrentPage(1) // Reset to first page on category change
    setKey((prev) => prev + 1) // Force re-render
  }

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-[400px] md:h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y, scale }}>
            <Image
              src="/blog-hero.png"
              alt="Morocco travel blog - Desert adventures and road trip guides"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
          </motion.div>
        </div>

        {/* Moroccan Decorative Frame */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Corner */}
          <svg className="absolute top-0 left-0 w-32 h-32 text-white/20" viewBox="0 0 100 100" fill="none">
            <path d="M0,0 L40,0 C30,10 20,20 10,30 C20,20 30,10 40,0 L0,40 Z" fill="currentColor" />
            <path d="M50,0 L90,0 C80,10 70,20 60,30 C70,20 80,10 90,0 L50,40 Z" fill="currentColor" />
          </svg>

          {/* Top Right Corner */}
          <svg className="absolute top-0 right-0 w-32 h-32 text-white/20" viewBox="0 0 100 100" fill="none">
            <path d="M100,0 L60,0 C70,10 80,20 90,30 C80,20 70,10 60,0 L100,40 Z" fill="currentColor" />
            <path d="M50,0 L10,0 C20,10 30,20 40,30 C30,20 20,10 10,0 L50,40 Z" fill="currentColor" />
          </svg>
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white"
          style={{ opacity }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("blog.title")}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("blog.subtitle")}
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Moroccan-inspired divider */}
      <MoroccanDivider color="#FE9305" className="-mt-1 relative z-20" />

      {/* Blog Content Section */}
      <motion.section
        className="py-20 bg-white relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
        key={key} // Force re-render when key changes
      >
        <MoroccanPattern color="#117485" opacity={0.03} />
        <div className="container mx-auto px-4">
          {/* Search and Filter Bar */}

          {/* Featured Post */}
          {currentPage === 1 && activeCategory === "All" && (
            <motion.div className="mb-16" variants={fadeInUp}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    <Image
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">Featured</Badge>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-secondary/10 text-secondary">{featuredPost.category}</Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{featuredPost.date}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-gray-700">{featuredPost.author}</span>
                      <div className="text-sm text-gray-500">{featuredPost.readTime}</div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white group" asChild>
                        <Link href={`/blog/${featuredPost.slug}`}>
                          Read Full Article
                          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform inline" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          {currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.map((post, index) => (
                <motion.div key={post.id} variants={fadeInUp} className="h-full">
                  <BlogCard
                    title={post.title}
                    excerpt={post.excerpt}
                    image={post.image}
                    date={post.date}
                    slug={post.slug}
                    category={post.category}
                    readTime={post.readTime}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any articles matching your search criteria. Try adjusting your filters or search term.
              </p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                onClick={() => {
                  setActiveCategory("All")
                  setKey((prev) => prev + 1) // Force re-render
                }}
              >
                Clear all filters
              </Button>
            </motion.div>
          )}

          {/* Pagination */}
          {filteredPosts.length > postsPerPage && (
            <motion.div className="flex justify-center mt-12" variants={fadeInUp}>
              <nav className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 border-gray-200"
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  // Show first page, last page, current page, and pages around current
                  let pageToShow
                  if (totalPages <= 5) {
                    // If 5 or fewer pages, show all
                    pageToShow = i + 1
                  } else if (currentPage <= 3) {
                    // Near start
                    pageToShow = i + 1
                    if (i === 4) pageToShow = totalPages
                  } else if (currentPage >= totalPages - 2) {
                    // Near end
                    pageToShow = i === 0 ? 1 : totalPages - 4 + i
                  } else {
                    // Middle
                    pageToShow = currentPage - 2 + i
                    if (i === 0) pageToShow = 1
                    if (i === 4) pageToShow = totalPages
                  }

                  return (
                    <React.Fragment key={pageToShow}>
                      {i === 0 && currentPage > 3 && totalPages > 5 && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`border-gray-200 ${
                              currentPage === 1 ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : ""
                            }`}
                            onClick={() => handlePageChange(1)}
                          >
                            1
                          </Button>
                          {currentPage > 4 && <span className="mx-1">...</span>}
                        </>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className={`border-gray-200 ${
                          currentPage === pageToShow ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : ""
                        }`}
                        onClick={() => handlePageChange(pageToShow)}
                      >
                        {pageToShow}
                      </Button>

                      {i === 4 && currentPage < totalPages - 2 && totalPages > 5 && (
                        <>
                          {currentPage < totalPages - 3 && <span className="mx-1">...</span>}
                          <Button
                            variant="outline"
                            size="sm"
                            className={`border-gray-200 ${
                              currentPage === totalPages
                                ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                : ""
                            }`}
                            onClick={() => handlePageChange(totalPages)}
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                    </React.Fragment>
                  )
                })}

                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 border-gray-200"
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </nav>
            </motion.div>
          )}

          {/* Newsletter Signup */}
          <motion.div
            className="mt-20 bg-gradient-to-r from-secondary to-secondary/90 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
            variants={fadeInUp}
          >
            {/* Moroccan Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              <MoroccanPattern color="#ffffff" opacity={0.2} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("blog.ui.newsletter.title")}</h3>
                <p className="text-white/90 max-w-xl">{t("blog.ui.newsletter.description")}</p>
              </div>
              <div className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder={t("blog.ui.newsletter.placeholder")}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
                  />
                  <Button className="bg-white text-secondary hover:bg-white/90">
                    {t("blog.ui.newsletter.subscribe")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}
