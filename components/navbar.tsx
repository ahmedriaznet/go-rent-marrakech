"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/cars", label: t("nav.fleet") },
    { href: "/who-we-are", label: t("nav.whoWeAre") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
  ];

  return (
    <>
      {/* Top Bar - Only render when not scrolled */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 bg-secondary text-white h-10"
          >
            <div className="container mx-auto px-4 h-full flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <a
                  href="tel:+212664342254"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  +212 664 342 254
                </a>
                <a
                  href="mailto:Reservation@gorentmarrakech.com"
                  className="hidden md:flex items-center hover:text-primary transition-colors"
                >
                  <Mail className="w-3 h-3 mr-1" />
                  Reservation@gorentmarrakech.com
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center hover:text-primary transition-colors">
                    <Globe className="w-3 h-3 mr-1" />
                    {language.toUpperCase()}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </button>
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg overflow-hidden z-[100] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          language === lang.code
                            ? "bg-primary/10 text-primary"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation - Always transparent */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "top-0 py-3 bg-secondary/95"
            : "top-10 py-4 bg-transparent",
        )}
      >
        {/* Subtle Moroccan Pattern */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <svg
            className="absolute right-0 top-0 h-full w-64 text-white opacity-5"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <pattern
              id="navPattern"
              patternUnits="userSpaceOnUse"
              width="20"
              height="20"
              patternTransform="rotate(45)"
            >
              <path
                d="M10,0 L10,20 M0,10 L20,10"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#navPattern)"
            />
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <div className="relative w-32 h-12 md:w-40 md:h-14">
                  <Image
                    src="/go-rent-logo.png"
                    alt="GO RENT Car Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.dropdown ? (
                    <div
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center text-white hover:text-primary hover:bg-white/10">
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "ml-1 h-4 w-4 transition-transform duration-300",
                            activeDropdown === item.label ? "rotate-180" : "",
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl overflow-hidden"
                          >
                            {item.dropdown.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                className="block px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-4 py-2 rounded-lg font-medium transition-all duration-300 text-white hover:text-primary hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons and Social Icons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61563514813796&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/gorent_marakech_?igsh=MXF5cHRxOXozNTM4cg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@go_rent_?_t=ZM-8tzal3jc6OT&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span className="sr-only">TikTok</span>
              </a>
              <a
                href="https://wa.me/212664342254"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2"
              >
                <Link href="/cars">
                  <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative z-0">
                    {t("nav.bookNow")}
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10 ml-2"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white mt-4 mx-4 rounded-2xl shadow-xl overflow-hidden"
            >
              <nav className="p-6 space-y-4">
                {navItems.map((item, index) => (
                  <div key={index}>
                    {item.dropdown ? (
                      <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer font-medium text-gray-700 hover:text-primary transition-colors">
                          {item.label}
                          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="mt-2 ml-4 space-y-2">
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="block py-2 text-gray-600 hover:text-primary transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        className="block font-medium text-gray-700 hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4 space-y-3 border-t">
                  <div className="flex justify-center space-x-6 mb-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61563514813796&mibextid=ZbWKwL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-primary transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="https://www.instagram.com/gorent_marakech_?igsh=MXF5cHRxOXozNTM4cg=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-primary transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a
                      href="https://www.tiktok.com/@go_rent_?_t=ZM-8tzal3jc6OT&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-primary transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                      <span className="sr-only">TikTok</span>
                    </a>
                    <a
                      href="https://wa.me/212664342254"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-primary transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="sr-only">WhatsApp</span>
                    </a>
                  </div>
                  <Link href="/cars">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      {t("nav.bookNow")}
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">
                    {t("nav.selectLanguage")}
                  </p>
                  <div className="flex gap-2 justify-center">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsOpen(false);
                        }}
                        className={`px-4 py-2 text-sm rounded-md flex-1 ${
                          language === lang.code
                            ? "bg-primary/10 text-primary"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
