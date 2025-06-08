"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ChevronUp,
  Globe,
  CreditCard,
  Shield,
  Clock,
  Car,
  Calendar,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/context/language-context"

export function Footer() {
  const { language, setLanguage, t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
  ]

  // Updated recent blog posts
  const recentBlogPosts = [
    {
      title: t("blog.items.cheap-car-rental.title"),
      slug: "cheap-car-rental",
      date: t("blog.items.cheap-car-rental.date"),
    },
    {
      title: t("blog.items.professional-reliable-car-rental.title"),
      slug: "professional-reliable-car-rental",
      date: t("blog.items.professional-reliable-car-rental.date"),
    },
    {
      title: t("blog.items.what-to-pack-morocco-road-trip.title"),
      slug: "what-to-pack-morocco-road-trip",
      date: t("blog.items.what-to-pack-morocco-road-trip.date"),
    },
    {
      title: t("blog.items.scenic-routes-marrakech.title"),
      slug: "scenic-routes-marrakech",
      date: t("blog.items.scenic-routes-marrakech.date"),
    },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Decorative Top Wave */}
      <div className="absolute top-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53.3 600 46.7 720 43.3C840 40 960 40 1080 46.7C1200 53.3 1320 66.7 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="url(#gradient1)"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FE9305" />
              <stop offset="50%" stopColor="#117485" />
              <stop offset="100%" stopColor="#FE9305" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Pre-Footer CTA */}
      <div className="bg-gray-50 py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary to-secondary/90 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("footer.cta.title")}</h3>
                <p className="text-white/90 max-w-xl">{t("footer.cta.subtitle")}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="tel:+212612345678">
                    <Button className="bg-white text-secondary hover:bg-white/90 font-bold px-6 py-6 rounded-xl shadow-lg">
                      <Phone className="mr-2 h-5 w-5" />
                      {t("footer.cta.callUs")}
                    </Button>
                  </a>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/cars">
                    <Button className="bg-primary text-white hover:bg-primary/90 font-bold px-6 py-6 rounded-xl shadow-lg">
                      <Car className="mr-2 h-5 w-5" />
                      {t("footer.cta.bookCar")}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer with Marrakech Background */}
      <div className="relative pt-20 pb-10">
        {/* Marrakech Cityscape Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/marrakech-footer-background.jpeg"
            alt="Marrakech cityscape with Koutoubia Mosque at golden hour"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-white">
            {/* Company Info */}
            <div>
              <div className="mb-6 flex items-center">
                <div className="relative w-40 h-16 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
                  <Image src="/go-rent-logo.png" alt="GO RENT Logo" fill className="object-contain" />
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">{t("footer.company.description")}</p>
              <div className="flex space-x-4 mb-8">
                <motion.a
                  href="http://facebook.com/profile.php?id=61563514813796&mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm hover:bg-primary text-white p-3 rounded-full transition-all duration-300 border border-white/20"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Facebook className="w-5 h-5" />
                  <span className="sr-only">Facebook</span>
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/gorent_marakech_?igsh=MXF5cHRxOXozNTM4cg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm hover:bg-primary text-white p-3 rounded-full transition-all duration-300 border border-white/20"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Instagram className="w-5 h-5" />
                  <span className="sr-only">Instagram</span>
                </motion.a>
                <motion.a
                  href="https://www.tiktok.com/@go_rent_?_t=ZM-8tzal3jc6OT&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm hover:bg-primary text-white p-3 rounded-full transition-all duration-300 border border-white/20"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span className="sr-only">TikTok</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/212664342254"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm hover:bg-primary text-white p-3 rounded-full transition-all duration-300 border border-white/20"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="sr-only">WhatsApp</span>
                </motion.a>
              </div>

              {/* Language Selector - English & French Only */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  <h4 className="font-medium">{t("footer.company.selectLanguage")}</h4>
                </div>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={`px-4 py-2 text-sm rounded-md transition-all flex-1 ${
                        language === lang.code
                          ? "bg-primary text-white shadow-lg"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <motion.div
                  className="w-8 h-1 bg-gradient-to-r from-primary to-transparent mr-3"
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                ></motion.div>
                {t("footer.quickLinks.title")}
              </h3>
              <ul className="space-y-4">
                {[
                  { label: t("footer.quickLinks.home"), href: "/" },
                  { label: t("footer.quickLinks.fleet"), href: "/cars" },
                  { label: t("footer.quickLinks.whoWeAre"), href: "/who-we-are" },
                  { label: t("footer.quickLinks.blog"), href: "/blog" },
                  { label: t("footer.quickLinks.contact"), href: "/contact" },
                ].map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-2 group-hover:scale-150 transition-transform"></span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Blog Posts */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <motion.div
                  className="w-8 h-1 bg-gradient-to-r from-primary to-transparent mr-3"
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                ></motion.div>
                {t("footer.blogPosts.title")}
              </h3>
              <ul className="space-y-4">
                {recentBlogPosts.map((post, index) => (
                  <motion.li
                    key={post.slug}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/blog/${post.slug}`} className="group">
                      <div className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2 mt-2 group-hover:scale-150 transition-transform"></span>
                        <div>
                          <span className="block group-hover:text-primary transition-colors">{post.title}</span>
                          <span className="text-xs text-gray-400 flex items-center mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {post.date}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info & Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <motion.div
                  className="w-8 h-1 bg-gradient-to-r from-primary to-transparent mr-3"
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                ></motion.div>
                {t("footer.contactInfo.title")}
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                  <span className="text-gray-300">{t("footer.contactInfo.address")}</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                  <span className="text-gray-300">{t("footer.contactInfo.phone")}</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                  <span className="text-gray-300">{t("footer.contactInfo.email")}</span>
                </li>
              </ul>

              {/* Newsletter Mini Form */}
              <h4 className="font-semibold mb-3">{t("footer.contactInfo.newsletter")}</h4>
              <div className="flex">
                <Input
                  type="email"
                  placeholder={t("footer.contactInfo.emailPlaceholder")}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 rounded-l-lg rounded-r-none focus:ring-primary"
                />
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-l-none">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-white/10 pt-8 pb-6 mb-8">
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: CreditCard, text: t("footer.trustBadges.securePayments") },
                { icon: Shield, text: t("footer.trustBadges.fullyInsured") },
                { icon: Clock, text: t("footer.trustBadges.support247") },
                { icon: Car, text: t("footer.trustBadges.wellMaintained") },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <item.icon className="w-6 h-6 text-primary mr-2" />
                  <span className="text-gray-300 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
            <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} GO RENT Marrakech. {t("footer.copyright")}
            </p>
            <motion.button
              onClick={scrollToTop}
              className="bg-primary/20 backdrop-blur-sm hover:bg-primary text-white p-3 rounded-full transition-all duration-300 border border-white/20"
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              aria-label="Back to top"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
